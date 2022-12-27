import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "@src/providers/alert";
import Server from "@src/services/server";
import {
	updateRecords,
	updateRecordTotal,
	updateSelectedRecord,
} from "@src/store/appSlice";

export const useEditRecordModal = (onClose) => {
	const { setAlert } = useAlert();
	const dispatch = useDispatch();
	const app = useSelector((state) => state.app);
	const recordToEdit = useSelector((state) => state.app.recordToEdit);
	const [property, setProperty] = useState(null);
	const [activeType, setActiveType] = useState("");

	const handleChange = (e) => {
		setProperty(e.target.value);
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: recordToEdit?.data,
		// validationSchema: validationSchema,
		onSubmit: async (values) => {
			const updatedRecord = { ...recordToEdit, data: values };
			const res = await Server.Object.updateRecord(
				recordToEdit.objectId,
				updatedRecord
			);
			if (res.error) {
				setAlert(res.errorMessage, "error");
			} else {
				setAlert("Success", "success");
				const updatedList = await Server.Object.getRecords(
					recordToEdit.objectId,
					app.skip,
					app.take
				);
				dispatch(updateRecords(updatedList.data.data));
				dispatch(updateRecordTotal(updatedList.data.total));
				dispatch(updateSelectedRecord([]));
				setProperty("none");
				onClose();
			}
		},
	});

	const handleClose = () => {
		formik.handleReset();
		setProperty("none");
		onClose();
	};

	return {
		property,
		activeType,
		setActiveType,
		app,
		handleChange,
		formik,
		handleClose,
	};
};
