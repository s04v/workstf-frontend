import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useAlert } from "@src/providers/alert";
import Server from "@src/services/server";
import { updateActiveObject, updateObjectList } from "@src/store/settingsSlice";
import { useEffect, useState } from "react";

const validationSchema = yup.object({
	// app: yup.string("Enter application name"),
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
	const appList = useSelector((state) => state.settings.app.list);
	const [selectedApp, setSelectedApp] = useState(null);
	const editValues = activeObject ? {
		app: [],
		singularName: activeObject.singularName,
		pluralName: activeObject.pluralName,
		primaryName: activeObject.primaryName,
		primaryType: activeObject.primaryType,
	} : {};

	const initVal = !edit ? {
		app: { name : "" },
		singularName: "",
		pluralName: "",
		primaryName: "",
		primaryType: "",
	} : editValues;

	const [initValues, setInitValues] = useState(initVal);

	useEffect(() => {
		if(activeObject) {
			updateAssociations();
		}
	}, []);

	const updateAssociations = () => {
		Server.App.getAccociations(activeObject._id).then(res => {
			setInitValues({...initValues, app: res.data});
			// editValues.app = res.data;
		})
	}

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: initValues,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
				console.log('values', values);
				console.log('initValues', initValues);
			let res = null;
			if(edit) {
				res = await Server.Object.update(activeObject._id, values);

				// create new associations
				for(let association of values.app) {
					if(!initValues.app.find(item => item._id === association._id)) {
						Server.App.createAssociation(association._id, activeObject._id);
					}
				}

				// remove associations
				console.log('delete', initValues);
				for(let association of initValues.app) {
					console.log("association", association);
					if(!values.app.find(item => item._id === association._id)) {
						
						Server.App.removeAssociation(association._id, activeObject._id);
					}
				}
			} else {
				values.schema = [];
				values.associate = selectedApp && selectedApp._id;
				res = await Server.Object.create(values);
			}

			if (res.error) {
				setAlert(res.errorMessage, "error");
			} else {
				setAlert("Success", "success");
				const res = await Server.Object.getList();
				// const objectNames = res.data.map(object => object.singularName);
				const newActiveObject = res.data.find(o => o.singularName === values.singularName);
				dispatch(updateActiveObject(newActiveObject));
				dispatch(updateObjectList(res.data));
				updateAssociations();
				formik.handleReset();
				onClose();
			}
		},
	});

	const checkApp = (checked, app) => {
		if(!checked) {
			formik.setFieldValue("app", [...formik.values.app, app]);
		} else {
			const newVal = formik.values.app.filter(item => item._id !== app._id);
			formik.setFieldValue("app", newVal);
		}
	}

	const makeLabel = (app) => {
		const label = formik.values.app.map(item => item.name);
		return label.join('; ');
	}

	const handleSelectApp = (app) => {
		setSelectedApp(app);
	}

	const handleClose = () => {
		formik.handleReset();
		onClose();
	};

	return {
		formik,
		appList,
		selectedApp,
		checkApp,
		makeLabel,
		handleSelectApp,
		handleClose,
	};
};
