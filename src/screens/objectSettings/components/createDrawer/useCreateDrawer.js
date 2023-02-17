import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useAlert } from "@src/providers/alert";
import Server from "@src/services/server";
import { updateActiveObject, updateObjectList } from "@src/store/settingsSlice";

const validationSchema = yup.object({
	app: yup.string("Enter application name").required("Application is required"),
	singularName: yup
		.string("Enter object name")
		.required("Object name is required"),
	pluralName: yup
		.string("Enter object name")
		.required("Object name is required"),
	primaryName: yup
		.string("Enter primary field name")
		.required("Primary name is required"),
	primaryType: yup
		.string("Enter Primary type")
		.required("Primary type is required"),
});

export const useCreateDrawer = (onClose, edit) => {
	const { setAlert } = useAlert();
	const dispatch = useDispatch();
	const activeObject = useSelector((state) => state.settings.activeObject);

	const editValues = activeObject ? {
		app: activeObject.app,
		singularName: activeObject.singularName,
		pluralName: activeObject.pluralName,
		primaryName: activeObject.primaryName,
		primaryType: activeObject.primaryType,
	} : {};

	const initValues = !edit ? {
		app: "",
		singularName: "",
		pluralName: "",
		primaryName: "",
		primaryType: "",
	} : editValues;

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: initValues,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			
			let res = null;
			if(edit) {
				res = await Server.Object.update(activeObject._id, values);
			}else {
				values.schema = [];
				res = await Server.Object.create(values);
			}

			if (res.error) {
				setAlert(res.errorMessage, "error");
			} else {
				setAlert("Success", "success");
				const res = await Server.Object.getList();
				// const objectNames = res.data.map(object => object.singularName);
				dispatch(updateActiveObject(res.data[0]));
				dispatch(updateObjectList(res.data));
				formik.handleReset();
				onClose();
			}
		},
	});

	const handleClose = () => {
		formik.handleReset();
		onClose();
	};

	return {
		formik,
		handleClose,
	};
};
