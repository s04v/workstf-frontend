import { useDispatch, useSelector } from "react-redux";

import DeleteModalComp from "@src/shared/components/deleteModal";
import {
	updateActiveObject,
	updateSelectedFields,
} from "@src/store/settingsSlice";
import { useAlert } from "@src/providers/alert/useAlert";
import Server from "@src/services/server";

const DeleteModal = ({ open, onClose }) => {
	const { setAlert } = useAlert();
	const dispatch = useDispatch();
	const selectedField = useSelector((state) => state.settings.fields.selected);
	const activeObject = useSelector((state) => state.settings.activeObject);

	const handleDelete = async () => {
		for (const id of selectedField) {
			console.log(id);
			await Server.Object.deleteField(activeObject._id, id);
		}
		const res = await Server.Object.get(activeObject._id);
		setAlert("Field deleted", "success");
		dispatch(updateActiveObject(res.data));
		dispatch(updateSelectedFields([]));
		onClose();
	};

	return (
		<DeleteModalComp
			open={open}
			onClose={onClose}
			handleDelete={handleDelete}
			title={`Detele ${selectedField.length} field(s)`}
			message={`You are about to delete ${selectedField.length} filed(s). Deleted fields can't be restored and will be deleted permanently.`}
		/>
	);
};

export default DeleteModal;
