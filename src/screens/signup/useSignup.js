import { useFormik } from "formik";
import { useState } from "react";
import Cookies from "universal-cookie";
import * as yup from "yup";
import { useAlert } from "@src/providers/alert";
import Server from "@src/services/server";

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
	password: yup
		.string("Enter your password")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*._])(?=.{8,})/,
			"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
		)
		.required("Password is required"),
	confirmPassword: yup
		.string("Enter your password")
		.oneOf([yup.ref("password"), null], "Your passwords do not match")
		.required("Please retype your password."),
});

export const useSignup = () => {
	const { setAlert } = useAlert();

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			delete values.confirmPassword;
			const res = await Server.Auth.signUp(values);
			if (res.error) {
				setAlert(res.errorMessage, "error");
			} else {
				setAlert("Success", "success");
				const cookies = new Cookies();
				if (!cookies.get("jwt", { path: "/" })) {
					cookies.set("jwt", res.data.token, {
						maxAge: 2592000 * 12,
						path: "/",
					}); // 1 year
				}
				setTimeout(() => (window.location.href = "/home"), 1000);
			}
		},
	});


	return {
		formik,
	};
};
