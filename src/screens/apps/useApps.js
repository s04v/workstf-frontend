import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
	updateObject,
	updateObjectList,
	updateRecords,
	updateRecordSkip,
	updateRecordTake,
	updateRecordToEdit,
	updateRecordTotal,
	updateSelectedRecord,
} from "@src/store/appSlice";
import { useAlert } from "@src/providers/alert";
import Server from "@src/services/server";
import { updateAccount } from "@src/store/accountSlice";

export const useApps = (onClose) => {
	const { setAlert } = useAlert();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();

	const id = params.id;
	const userId = params.userId;
	const appName = params.appName;

	const [loading, setLoading] = useState(true);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);

	const app = useSelector((state) => state.app);
	const selectedRecords = useSelector((state) => state.app.selectedRecords);
	const [initValues, setInitValues] = useState({});
 
	const navigateToSingleRecord = (recordId, objectName) => {
		const backPath = window.location.pathname;
		navigate(`${window.location.pathname}/${recordId}`, { state: { objectName, backPath } })
	}

	const fetchObject = async () => {
		console.log("params", params);
		const appName = params.appName;
		// const res = await Server.Object.getByAppName(appName);
		const res = await Server.App.get(appName);
		console.log("appName", appName);
		console.log("app res", res);
		if (res.error) {
			setAlert("Server error", "error");
		} else {
			const objectNames = [];
			for (const object of res.data.associations) {
				objectNames.push({ name: object.singularName, pluralName: object.pluralName, id: object._id });
				if (id && object._id === id) {
					dispatch(updateObject(object));
				}
			}
			
			if(!id && objectNames.length > 0)
				navigate(`/${appName}/${userId}/${objectNames[0]?.id}`);

			dispatch(updateObjectList(objectNames));
		}
	};

	const fetchRecords = async () => {
		const res = await Server.Object.getRecords(id, app.skip, app.take);
		if (res.error) {
			setAlert("Server error", "error");
		} else {
			dispatch(updateRecords(res.data.data));
			dispatch(updateRecordTotal(res.data.total));
			// dispatch(updateObjectList(objectNames));
		}
	};

	// -----
	const isSelected = (id) => app.selectedRecords.includes(id);

	const handleSelectAllClick = (event) => {
		if (app.selectedRecords.length === app.records.length) {
			dispatch(updateSelectedRecord([]));
		} else {
			const allRecordId = app.records.map((item) => item._id);
			dispatch(updateSelectedRecord(allRecordId));
		}
	};

	const handleSelect = (record) => {
		if (!isSelected(record._id)) {
			dispatch(updateSelectedRecord([...app.selectedRecords, record._id]));
		} else {
			const newSelected = app.selectedRecords.filter(
				(selectedId) => selectedId !== record._id
			);
			dispatch(updateSelectedRecord(newSelected));
		}
	};

	useEffect(() => {
		async function fetchData() {
			const res = await Server.Acconut.getInfo();
			dispatch(updateAccount(res.data));
		}
		const dataPromise = fetchData();
		const recordsPromise = fetchRecords();
		const objectPromise = fetchObject();

		Promise.all([dataPromise, recordsPromise, objectPromise]).then((value) => {
			if(app.objectList.length > 0)
				setLoading(false);
		})

		return () => {
			dispatch(updateRecords([]));
		};
	}, []);

	useEffect(() => {
		fetchObject();
		fetchRecords();
	}, [app.skip, app.take, id]);

	const handleOpenCreate = () => {
		makeInitValues();
		setOpenCreate(true);
	};

	const handleOpenEdit = () => {
		if (app.selectedRecords.length === 0) {
			setAlert("Select record to edit", "error");
			return;
		}

		if (app.selectedRecords.length > 1) {
			setAlert("Select only one record to edit", "error");
			return;
		}

		const record = app.records.filter(
			(item) => item._id === app.selectedRecords[0]
		)[0];
		dispatch(updateRecordToEdit(record));
		setOpenEdit(true);
	};

	const handleOpenDelete = () => {
		if (app.selectedRecords.length === 0) {
			setAlert("Select record to delete", "error");
			return;
		}
		setOpenDelete(true);
	};

	const handleChangePage = (e, newPage) => {
		dispatch(updateSelectedRecord([]));
		setPage(newPage);
		dispatch(updateRecordSkip(newPage * rowsPerPage));
	};

	const handleChangeRowsPerPage = (e) => {
		dispatch(updateSelectedRecord([]));
		setRowsPerPage(parseInt(e.target.value, 10));
		dispatch(updateRecordTake(parseInt(e.target.value, 10)));
	};

	const makeInitValues = () => {
		let values = {};
		values[app.object.primaryName] = "";
		for (const field of app.object.schema) {
			if (field.type === "multipleCheckboxes") {
				values[field.name] = {};
				for (const label of field.labels) {
					values[field.name][label] = "";
				}
			} else {
				values[field.name] = "";
			}
		}
		setInitValues(values);
	};

	const handleDeleteRecord = async () => {
		for (const id of selectedRecords) {
			await Server.Object.deleteRecord(app.object._id, id);
		}
		setAlert("Record deleted", "success");

		const updatedList = await Server.Object.getRecords(
			app.object._id,
			app.skip,
			app.take
		);
		dispatch(updateRecords(updatedList.data.data));
		dispatch(updateRecordTotal(updatedList.data.total));
		dispatch(updateSelectedRecord([]));
		onClose();
	};

	const handleCloseCreate = () => setOpenCreate(false);
	const handleCloseEdit = () => setOpenEdit(false);
	const handleCloseDelete = () => setOpenDelete(false);

	return {
		params,
		page,
		rowsPerPage,
		openCreate,
		openEdit,
		openDelete,
		app,
		navigateToSingleRecord,
		isSelected,
		handleSelectAllClick,
		handleSelect,
		handleOpenCreate,
		handleOpenEdit,
		handleOpenDelete,
		handleChangePage,
		handleChangeRowsPerPage,
		handleCloseCreate,
		handleCloseEdit,
		handleCloseDelete,
		initValues,
		handleDeleteRecord,
		loading,
	};
};
