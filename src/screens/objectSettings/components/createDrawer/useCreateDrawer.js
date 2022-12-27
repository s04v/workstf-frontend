import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useAlert } from "@src/providers/alert";
import Server from "@src/services/server";
import { updateObjectList } from "@src/store/settingsSlice";

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

export const useCreateDrawer = (onClose) => {
	const { setAlert } = useAlert();
	const dispatch = useDispatch();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			app: "",
			singularName: "",
			pluralName: "",
			primaryName: "",
			primaryType: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			values.schema = [];
			const res = await Server.Object.create(values);
			console.log(res);
			if (res.error) {
				setAlert(res.errorMessage, "error");
			} else {
				setAlert("Success", "success");
				const res = await Server.Object.getList();
				// const objectNames = res.data.map(object => object.singularName);
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
