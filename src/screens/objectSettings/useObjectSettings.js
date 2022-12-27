import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Server from "@src/services/server";
import {
	updateActiveObject,
	updateObjectList,
	updateSelectedFields,
} from "@src/store/settingsSlice";

export const useObjectsSettings = () => {
	const [openCreateObject, setOpenCreateObject] = useState(false);
	const dispatch = useDispatch();
	const objectList = useSelector((state) => state.settings.objectList);
	const activeObject = useSelector((state) => state.settings.activeObject);

	useEffect(() => {
		async function fetchData() {
			const res = await Server.Object.getList();

			if (res.data.length && !activeObject) {
				dispatch(updateActiveObject(res.data[0]));
			}

			dispatch(updateObjectList(res.data));
		}
		fetchData();
	}, []);

	const handleChangeObject = (object) => {
		dispatch(updateActiveObject(object));
		dispatch(updateSelectedFields([]));
	};

	const handleOpenDrawer = () => setOpenCreateObject(true);
	const handleCloseDrawer = () => setOpenCreateObject(false);

	return {
		openCreateObject,
		objectList,
		activeObject,
		handleChangeObject,
		handleOpenDrawer,
		handleCloseDrawer,
	};
};
