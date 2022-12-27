import { Box, Button, Drawer, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useCreateRecordDrawer } from "./useCreateRecordDrawer";
import BooleanType from "@src/shared/components/fieldTypes/BooleanType";
import DropdownType from "@src/shared/components/fieldTypes/DropdownType";
import CheckboxType from "@src/shared/components/fieldTypes/CheckboxType";
import DateType from "@src/shared/components/fieldTypes/DateType";

const CreateRecordDrawer = ({ open, onClose, schema }) => {
	const { app, formik, handleClose } = useCreateRecordDrawer(onClose, schema);

	return (
		<Drawer
			anchor={"right"}
			open={open}
			PaperProps={{
				sx: { width: "30%" },
			}}
		>
			<Box
				sx={{
					display: "flex",
					gap: 2,
					backgroundColor: "primary.main",
					px: 4,
					py: 2,
					color: "white",
				}}
			>
				<CloseIcon sx={{ fontSize: "24px" }} onClick={handleClose} />
				<Typography sx={{ fontSize: "18px" }}>
					<b>Create new record</b>
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					px: 4,
					py: 2,
				}}
			>
				<form onSubmit={formik.handleSubmit}>
					<span style={{ color: "grey", fontSize: 12 }}>
						{app.object.primaryName}
					</span>
					<TextField
						fullWidth
						sx={{ mb: 2 }}
						autoComplete="off"
						name={app.object.primaryName}
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
										sx={{ mb: 2 }}
										autoComplete="off"
										name={field.name}
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
							<>
								<span style={{ color: "grey", fontSize: 12 }}>
									{field.name}
								</span>
								{inputForm}
							</>
						);
					})}
					{/* </TextField> */}
					<Box sx={{ mt: 2 }}>
						<Button
							type="submit"
							variant="contained"
							sx={{ px: 4, py: 1, mr: 2, fontSize: 12 }}
						>
							<b>Create</b>
						</Button>
						<Button
							variant="outlined"
							sx={{ px: 4, border: 2, fontSize: 12, ":hover": { border: 2 } }}
							onClick={handleClose}
						>
							<b>Cancel</b>
						</Button>
					</Box>
				</form>
			</Box>
		</Drawer>
	);
};

export default CreateRecordDrawer;
