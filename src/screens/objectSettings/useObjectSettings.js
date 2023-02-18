import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Server from "@src/services/server";
import {
	updateActiveObject,
	updateObjectList,
	updateSelectedFields,
} from "@src/store/settingsSlice";
import { useAlert } from "@src/providers/alert";

export const useObjectsSettings = () => {
	const [openCreateObject, setOpenCreateObject] = useState(false);
	const [openEditObject, setOpenEditObject] = useState(false);
	const dispatch = useDispatch();
	const { setAlert } = useAlert();
	const [openDelete, setOpenDelete] = useState(false);
	const objectList = useSelector((state) => state.settings.objectList);
	const activeObject = useSelector((state) => state.settings.activeObject);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			const res = await Server.Object.getList();
			// if (res.data.length && !activeObject) {
			// 	dispatch(updateActiveObject(res.data[0]));
			// }

			dispatch(updateObjectList(res.data));
		}
		fetchData().then(() => {
			setLoading(false);
		})
		console.log("RELOAD");
	}, []);

	const handleChangeObject = (object) => {
		dispatch(updateActiveObject(object));
		dispatch(updateSelectedFields([]));
	};

	const handleDelete = async () => {
		const newObjectList = objectList.filter((obj) => obj._id !== activeObject._id);
		if(newObjectList.length)
			dispatch(updateActiveObject(newObjectList[0]));
		
		dispatch(updateObjectList(newObjectList));
		const res = await Server.Object.delete(activeObject._id);
		setAlert("Object deleted", 'success')
	}

	const handleOpenDrawer = () => setOpenCreateObject(true);
	const handleCloseDrawer = () => setOpenCreateObject(false);

	const handleOpenEditDrawer = () => setOpenEditObject(true);
	const handleCloseEditDrawer = () => setOpenEditObject(false);

	const handleOpenDeleteModal = () => setOpenDelete(true);
	const handleCloseDelete = () => setOpenDelete(false);

	return {
		openCreateObject,
		openEditObject,
		objectList,
		activeObject,
		handleOpenEditDrawer,
		handleCloseEditDrawer,
		handleChangeObject,
		handleOpenDrawer,
		handleCloseDrawer,
		loading,
		handleDelete,
		openDelete,
		handleCloseDelete,
		handleOpenDeleteModal
	};
};
