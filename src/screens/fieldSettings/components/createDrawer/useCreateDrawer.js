import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useAlert } from "@src/providers/alert";
import Server from "@src/services/server";
import { updateActiveObject, updateObjectList } from "@src/store/settingsSlice";

const validationSchema = yup.object({
	name: yup.string("Enter field name").required("Field name is required"),
	type: yup
		.string("Enter type name")
		.matches(/^(?!none$)/, "Type name is required")
		.required("Type name is required"),
});

export const useCreateDrawer = (onClose, edit, initValues) => {
	const { setAlert } = useAlert();
	const dispatch = useDispatch();
	const activeObject = useSelector((state) => state.settings.activeObject);

	const defaultValues = {
		name: "",
		type: "none",
		labels: [null],
	};

	const formik = useFormik({
		// validateOnChange: false,
		enableReinitialize: true,
		initialValues: edit ? initValues : defaultValues,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			values.typeName = getTypeName(values.type);
			const res = edit
				? await submitEdit(activeObject._id, values)
				: await submitCreate(activeObject._id, values);

			if (res.error) {
				setAlert(res.errorMessage, "error");
			} else {
				setAlert("Success", "success");
				const updatedObjectRes = await Server.Object.get(activeObject._id);
				const objectList = await Server.Object.getList();
				dispatch(updateActiveObject(updatedObjectRes.data));
				dispatch(updateObjectList(objectList.data));
				formik.handleReset();
				onClose();
			}
		},
	});

	const submitCreate = (objectId, values) => {
		return Server.Object.createField(objectId, values);
	};

	const submitEdit = (objectId, values) => {
		const { createdDate, modifiedDate, ...newValues } = values;
		console.log(values);
		return Server.Object.updateField(objectId, newValues);
	};

	const getTypeName = (type) => {
		switch (type) {
			case "number":
				return "Number";
			case "text":
				return "Text";
			case "boolean":
				return "Boolean";
			case "dropdown":
				return "Drop-Down Select";
			case "multipleCheckboxes":
				return "Multiple Checkboxes";
			case "date":
				return "Date";
			case "time":
				return "Time";
			default:
				return null;
		}
	};

	const handleClose = () => {
		formik.handleReset();
		onClose();
	};

	const addAnotherLabel = (e) => {
		formik.values.labels.push(null);
		formik.handleChange(e);
	};

	return {
		activeObject,
		formik,
		submitCreate,
		submitEdit,
		getTypeName,
		handleClose,
		addAnotherLabel,
	};
};
