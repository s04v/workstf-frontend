import { useAlert } from "@src/providers/alert";
import Server from "@src/services/server";
import { updateRecords, updateRecordTotal } from "@src/store/appSlice";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as yup from "yup";

const validationSchema = yup.object({
	firstName: yup
		.string("Enter your first name")
		.required("First name is required"),
	lastName: yup
		.string("Enter your last name")
		.required("Last name is required"),
	email: yup
		.string("Enter your email")
		.email("Enter a valid email")
		.required("Email is required"),
	phoneNumber: yup
		.string()
		.matches(
			/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
			"Phone number is not valid"
		)
		.required("Phone number is required"),
	company: yup.string("Enter company name").required("Company is required"),
	country: yup
		.string("Select country")
		.matches(/^(?!none$)/, "Country is required")
		.required("Country is required"),
});

export const useCreateRecordDrawer = (onClose, schema) => {
	const { setAlert } = useAlert();
	const dispatch = useDispatch();
	const app = useSelector((state) => state.app);
	const params = useParams();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: schema,
		// validationSchema: validationSchema,
		onSubmit: async (values) => {
			const res = await Server.Object.createRecord(params.id, { data: values });
			if (res.error) {
				setAlert(res.errorMessage, "error");
			} else {
				setAlert("Success", "success");
				const res = await Server.Object.getRecords(
					params.id,
					app.skip,
					app.take
				);
				dispatch(updateRecords(res.data.data));
				dispatch(updateRecordTotal(res.data.total));
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
		app,
		params,
		formik,
		handleClose,
	};
};
