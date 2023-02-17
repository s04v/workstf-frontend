import { useDispatch, useSelector } from "react-redux";
import Server from "@src/services/server";

import DeleteModal from "@src/shared/components/deleteModal";
import { useAlert } from "@src/providers/alert";
import { updateActiveObject, updateObjectList } from "@src/store/settingsSlice";

const DeleteObjectModal = ({ open, onClose }) => {
	const { setAlert } = useAlert();
	const dispatch = useDispatch();
	const objectList = useSelector((state) => state.settings.objectList);
	const activeObject = useSelector((state) => state.settings.activeObject);

	const handleDelete = async () => {
		const newObjectList = objectList.filter((obj) => obj._id !== activeObject._id);
		if(newObjectList.length)
			dispatch(updateActiveObject(newObjectList[0]));
		
		dispatch(updateObjectList(newObjectList));
		const res = await Server.Object.delete(activeObject._id);
		setAlert("Object deleted", 'success');
    onClose();
	}


	return (
		<DeleteModal
			open={open}
			onClose={onClose}
			handleDelete={handleDelete}
			title={`Detele object?`}
			message={`You are about to delete ${activeObject.singularName} object. Deleted objects can't be restored and will be deleted permanently.`}
		/>
	);
};

export default DeleteObjectModal;
