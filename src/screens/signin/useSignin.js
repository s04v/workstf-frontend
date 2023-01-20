import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Cookies from "universal-cookie";
import Server from "@src/services/server";
import { useAlert } from "@src/providers/alert";

const validationSchema = yup.object({
	email: yup
		.string("Enter your email")
		.email("Enter a valid email")
		.required("Email is required"),
	password: yup.string("Enter your password").required("Password is required"),
});

export const useSignin = () => {
	const { setAlert } = useAlert();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			const res = await Server.Auth.signIn(values);
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
