import { useAlert } from "@src/providers/alert";
import Server from "@src/services/server";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { settingsStore, updateObjectList } from "@src/store/settingsSlice";

export const useAppSettings = () => {
	const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
	const [openEditDrawer, setOpenEditDrawer] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const dispatch = useDispatch();
	const { setAlert } = useAlert();

	const activeApp = useSelector((state) => state.settings.app.active);
	const appList = useSelector((state) => state.settings.app.list);
	const [loading, setLoading] = useState(true);

	const handleChangeApp = (app) => {
		dispatch(settingsStore.updateActiveApp(app));
		console.log("app", app);
	};

	const handleOpenDrawer = () => setOpenCreateDrawer(true);
	const handleCloseDrawer = () => setOpenCreateDrawer(false);

	const handleOpenEditDrawer = () => setOpenEditDrawer(true);
	const handleCloseEditDrawer = () => setOpenEditDrawer(false);

	const handleOpenDelete = () => setOpenDelete(true);
	const handleCloseDelete = () => setOpenDelete(false);

	useEffect(() => {
		const fetchData = async () => {
			// if (!objectList) {
			// 	const res = await Server.Object.getList();
			// 	dispatch(updateObjectList(res.data));
			// 	setObjects(res.data);
			// } else {
			// 	setObjects(objectList);
			// }

			const res = await Server.App.getList();
			console.log('gel app list', res);
			if (res.data.length && !activeApp) {
				dispatch(settingsStore.updateActiveApp(res.data[0]));
			}

			dispatch(settingsStore.updateAppList(res.data));
      setLoading(false);
		};
		fetchData();
    console.log("render");
	}, []);


	return {
		activeApp,
		appList,
		openCreateDrawer,
		openDelete,
    loading,
		openEditDrawer,
		handleOpenEditDrawer,
		handleCloseEditDrawer,
		handleChangeApp,
		handleOpenDrawer,
		handleCloseDrawer,
		handleOpenDelete,
		handleCloseDelete,
	};
};
