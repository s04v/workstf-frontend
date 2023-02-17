import { useDispatch, useSelector } from "react-redux";
import Server from "@src/services/server";

import DeleteModal from "@src/shared/components/deleteModal";
import { useAlert } from "@src/providers/alert";
import { settingsStore, updateActiveObject, updateObjectList } from "@src/store/settingsSlice";

const DeleteObjectModal = ({ open, onClose }) => {
	const { setAlert } = useAlert();
	const dispatch = useDispatch();
	const appList = useSelector((state) => state.settings.app.list);
	const activeApp = useSelector((state) => state.settings.app.active);

	const handleDelete = async () => {
		const newAppList = appList.filter((obj) => obj._id !== activeApp._id);
		if(newAppList.length)
			dispatch(settingsStore.updateActiveApp(newAppList[0]));
		
		dispatch(settingsStore.updateAppList(newAppList));
		Server.App.delete(activeApp._id).then(res => setAlert("Application deleted", 'success')).catch(err => console.log(err));
    onClose();
	}

	return (
		<DeleteModal
			open={open}
			onClose={onClose}
			handleDelete={handleDelete}
			title={`Detele object?`}
			message={`You are about to delete ${activeApp ? activeApp.name : ""} app.`}
		/>
	);
};

export default DeleteObjectModal;
