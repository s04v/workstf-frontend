import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "@src/providers/alert";
import Server from "@src/services/server";
import {
	updateActiveObject,
	updateObjectList,
	updateSelectedFields,
	updateVisibleFields,
} from "@src/store/settingsSlice";

export const useFieldSettings = () => {
	const { setAlert } = useAlert();
	const dispatch = useDispatch();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [skip, setSkip] = useState(0);
	const [take, setTake] = useState(5);
	const [total, setTotal] = useState(0);

	const objectList = useSelector((state) => state.settings.objectList);
	const activeObject = useSelector((state) => state.settings.activeObject);

	const fields = useSelector((state) => state.settings.fields);

	const isSelected = (id) => fields.selected.includes(id);

	const [openCreateField, setOpenCreateField] = useState(false);
	const [openEditField, setOpenEditField] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [editInitValues, setEditInitValues] = useState([]);

	useEffect(() => {
		console.log(fields);
		async function fetchData() {
			const res = await Server.Object.getList();
			// if (res.data.length && !activeObject) {
			// 	dispatch(updateObjectList(res.data));
			// 	dispatch(updateActiveObject(res.data[0]));
			// }
			dispatch(updateObjectList(res.data));
		}
		fetchData();
	}, []);

	useEffect(() => {
		updateFields();
	}, [skip, take, activeObject]);

	const updateFields = () => {
		const newValue = activeObject?.schema?.slice(skip, skip + take);
		console.log("newValue", activeObject);
		dispatch(updateVisibleFields(newValue));
	};

	const handleSelectAllClick = (event) => {
		if (fields.selected.length === fields.visible.length) {
			dispatch(updateSelectedFields([]));
		} else {
			const allFieldId = fields.visible.map((item) => item._id);
			dispatch(updateSelectedFields(allFieldId));
		}
	};

	const handleSelect = (field) => {
		if (!isSelected(field._id)) {
			dispatch(updateSelectedFields([...fields.selected, field._id]));
		} else {
			const newSelected = fields.selected.filter(
				(selectedId) => selectedId !== field._id
			);
			dispatch(updateSelectedFields(newSelected));
		}
	};

	const handleChangeObject = (object) => {
		dispatch(updateActiveObject(object));
		dispatch(updateSelectedFields([]));
	};

	const handleOpenDelete = () => {
		if (fields.selected.length === 0) {
			setAlert("Select field to delete", "error");
			return;
		}
		setOpenDelete(true);
	};

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
		setSkip(newPage * rowsPerPage);
	};

	const handleChangeRowsPerPage = (e) => {
		setRowsPerPage(parseInt(e.target.value, 10));
		setTake(parseInt(e.target.value, 10));
	};

	const handleOpenEdit = (field) => {
		setEditInitValues(field);
		setOpenEditField(true);
	};

	const handleOpenCreate = () => setOpenCreateField(true);

	const handleCloseCreate = () => setOpenCreateField(false);
	const handleCloseEdit = () => setOpenEditField(false);
	const handleCloseDelete = () => setOpenDelete(false);

	return {
		page,
		rowsPerPage,
		total,
		objectList,
		activeObject,
		fields,
		isSelected,
		openCreateField,
		openEditField,
		openDelete,
		editInitValues,
		updateFields,
		handleSelectAllClick,
		handleSelect,
		handleChangeObject,
		handleOpenDelete,
		handleChangePage,
		handleChangeRowsPerPage,
		handleOpenEdit,
		handleOpenCreate,
		handleCloseCreate,
		handleCloseEdit,
		handleCloseDelete,
	};
};
