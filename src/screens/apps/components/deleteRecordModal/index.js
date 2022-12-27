import { useDispatch, useSelector } from "react-redux";
import Server from "@src/services/server";
import {
	updateRecords,
	updateRecordTotal,
	updateSelectedRecord,
} from "@src/store/appSlice";
import DeleteModal from "@src/shared/components/deleteModal";
import { useAlert } from "@src/providers/alert";

const DeleteRecordModal = ({ open, onClose }) => {
	const { setAlert } = useAlert();
	const dispatch = useDispatch();
	const selectedRecords = useSelector((state) => state.app.selectedRecords);
	const app = useSelector((state) => state.app);

	const handleDelete = async () => {
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

	return (
		<DeleteModal
			open={open}
			onClose={onClose}
			handleDelete={handleDelete}
			title={`Detele ${selectedRecords.length} records`}
			message={`You are about to delete ${selectedRecords.length} records. Deleted records can't be restored and will be deleted permanently.`}
		/>
	);
};

export default DeleteRecordModal;
