import { Box, Button, Drawer, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useCreateRecordDrawer } from "./useCreateRecordDrawer";
import BooleanType from "@src/shared/components/fieldTypes/BooleanType";
import DropdownType from "@src/shared/components/fieldTypes/DropdownType";
import CheckboxType from "@src/shared/components/fieldTypes/CheckboxType";
import DateType from "@src/shared/components/fieldTypes/DateType";
import { useSelector } from "react-redux";
import { Formik, FormikProvider } from "formik";

const CreateRecordDrawer = ({ open, onClose, schema }) => {
	const { app, formik, handleClose } = useCreateRecordDrawer(onClose, schema);
	const activeObject = useSelector((state) => state.app.object);

	return (
		<Drawer
			anchor={"right"}
			open={open}
			PaperProps={{
				sx: { width: "521px" },
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 2,
					backgroundColor: "primary.main",
					px: 4,
					py: 2,
					color: "white",
				}}
			>
				<CloseIcon sx={{ fontSize: "24px", cursor: "pointer" }} onClick={handleClose} />
				<Typography sx={{ fontSize: "22px" }}>
					Create {activeObject?.singularName}
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 3,
					px: 4,
					py: 2,
				}}
			>
				<FormikProvider value={formik}>
				<form onSubmit={formik.handleSubmit} sx={{dispaly: "flex", flexDirection: "column", gap : 10}}>
					<TextField
						fullWidth
						autoComplete="off"
						name={app.object.primaryName}
						label={app.object.primaryName}
						value={formik.values[app.object.primaryName]}
						onChange={formik.handleChange}
						// error={formik.touched.firstName && Boolean(formik.errors.firstName)}
						// helperText={formik.touched.firstName && formik.errors.firstName}
					/>
					{app.object.schema?.map((field) => {
						let inputForm = null;
						switch (field.type) {
							case "number":
							case "text":
								inputForm = (
									<TextField
										fullWidth
										autoComplete="off"
										name={field.name}
										label={field.name}
										value={formik.values[field.name]}
										onChange={formik.handleChange}
										// error={formik.touched.firstName && Boolean(formik.errors.firstName)}
										// helperText={formik.touched.firstName && formik.errors.firstName}
									/>
								);
								break;
							case "boolean":
								inputForm = (
									<BooleanType
										name={field.name}
										label={field.name}
										value={formik.values[field.name]}
										onChange={formik.handleChange}
										// error={formik.touched.firstName && Boolean(formik.errors.firstName)}
										// helperText={formik.touched.firstName && formik.errors.firstName}
									/>
								);
								break;
							case "dropdown":
								inputForm = (
									<DropdownType
										name={field.name}
										label={field.name}
										value={formik.values[field.name]}
										onChange={formik.handleChange}
										data={field.labels}
										// error={formik.touched.firstName && Boolean(formik.errors.firstName)}
										// helperText={formik.touched.firstName && formik.errors.firstName}
									/>
								);
								break;
							case "multipleCheckboxes":
								inputForm = (
									<CheckboxType
										name={field.name}
										label={field.name}
										value={formik.values[field.name]}
										onChange={formik.handleChange}
										data={field.labels}
										// error={formik.touched.firstName && Boolean(formik.errors.firstName)}
										// helperText={formik.touched.firstName && formik.errors.firstName}
									/>
								);
								break;
							case "date":
								inputForm = (
									<DateType
										name={field.name}
										label={field.name}
										value={formik.values[field.name]}
										onChange={(val) =>
											formik.setFieldValue(field.name, Date.parse(val))
										}
										// error={formik.touched.firstName && Boolean(formik.errors.firstName)}
										// helperText={formik.touched.firstName && formik.errors.firstName}
									/>
								);
								break;
							default:
								break;
						}
						return (
							<Box sx={{mt: 3}}>
								{inputForm}
							</Box>
						);
					})}
					{/* </TextField> */}
					<Box sx={{ px: 4, position: "absolute", bottom: 0, left: 0, right: 0, py: 5, backgroundColor: "#FBFBFB", borderTop: "1px solid rgba(196, 196, 196, 0.29)" }}>
						<Button
							type="submit"
							variant="contained"
							sx={{ px: 4, py: 1, mr: 2, fontSize: 16}}
						>
							<b>Create {activeObject.singularName}</b>
						</Button>
						<Button
							variant="outlined"
							sx={{ px: 4, border: 2, fontSize: 16, ":hover": { border: 2 } }}
							onClick={handleClose}
						>
							<b>Cancel</b>
						</Button>
					</Box>
				</form>
				</FormikProvider>
			</Box>
		</Drawer>
	);
};

export default CreateRecordDrawer;
