import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useAlert } from "@src/providers/alert";
import Server from "@src/services/server";
import { updateObjectList } from "@src/store/settingsSlice";
import { useState } from "react";
import { settingsStore } from '@src/store/settingsSlice';

const validationSchema = yup.object({
	name: yup.string("Enter application name").required("Application name is required"),
});

export const useCreateDrawer = (onClose, edit) => {
	const { setAlert } = useAlert();
	const dispatch = useDispatch();
	const activeApp = useSelector(state => state.settings.app.active);
  const [selectedIcon, setSelectedIcon] = useState(0);

	const initData = edit && activeApp ? {
		name: activeApp.name,
		iconType: activeApp.iconType,
	} : {
		name: "",
		iconType: 0,
	}
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: initData,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			values.iconType = selectedIcon;
      console.log(values);

			const res = edit ? await Server.App.update(activeApp._id, values) : await Server.App.create(values);
			console.log(res);
			if (res.error) {
				setAlert(res.errorMessage, "error");
			} else {
				setAlert("Success", "success");
				const res = await Server.App.getList();
				dispatch(settingsStore.updateAppList(res.data));
				dispatch(settingsStore.updateActiveApp(res.data[0]));
        formik.handleReset();
				onClose();
			}
		},
	});

  const handleSelectIcon = (i) => setSelectedIcon(i);

	const handleClose = () => {
		formik.handleReset();
		onClose();
	};

	return {
		formik,
    selectedIcon,
    handleSelectIcon,
		handleClose,
	};
};
