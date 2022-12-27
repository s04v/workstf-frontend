import {
	Box,
	Button,
	Divider,
	Drawer,
	MenuItem,
	TextField,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FieldArray, FormikProvider } from "formik";

import DateType from "@src/shared/components/fieldTypes/DateType";
import DropdownType from "@src/shared/components/fieldTypes/DropdownType";
import BooleanType from "@src/shared/components/fieldTypes/BooleanType";
import CheckboxType from "@src/shared/components/fieldTypes/CheckboxType";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useCreateDrawer } from "./useCreateDrawer";

const CreateDrawer = ({ open, onClose, edit, initValues }) => {
	const { formik, handleClose } = useCreateDrawer(onClose, edit, initValues);

	const renderPreview = (type, data = null) => {
		let preview = null;
		switch (type) {
			case "boolean":
				preview = <BooleanType preview />;
				break;
			case "dropdown":
				preview = <DropdownType data={data} preview />;
				break;
			case "multipleCheckboxes":
				preview = <CheckboxType data={data} preview />;
				break;
			case "date":
				preview = <DateType preview />;
				break;
			default:
				return null;
		}

		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					backgroundColor: "#f2f2f25e",
					border: "#e6e6e687",
					borderStyle: "solid",
					borderWidth: "1px 0px 1px 0px",
					mt: 2,
					mb: 3,
					px: 4,
					py: 6,
				}}
			>
				{preview}
			</Box>
		);
	};

	return (
		<Drawer
			anchor={"right"}
			open={open}
			PaperProps={{
				sx: { width: "40%" },
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
					<b>Create Field</b>
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					py: 2,
				}}
			>
				<FormikProvider value={formik}>
					<form onSubmit={formik.handleSubmit}>
						<Box sx={{ display: "flex", gap: 3, px: 4 }}>
							<Box sx={{ width: "100%" }}>
								<span style={{ fontSize: 14 }}>Field name *</span>
								<TextField
									fullWidth
									sx={{ my: 2 }}
									autoComplete="off"
									name="name"
									value={formik.values.name}
									onChange={formik.handleChange}
									error={formik.touched.name && Boolean(formik.errors.name)}
									helperText={formik.touched.name && formik.errors.name}
								/>
							</Box>
							<Box sx={{ width: "100%" }}>
								<span style={{ fontSize: 14 }}>Field type *</span>
								<TextField
									select
									fullWidth
									sx={{ my: 2 }}
									autoComplete="off"
									name="type"
									placeholder="Select field type"
									value={formik.values.type || "none"}
									onChange={formik.handleChange}
									error={formik.touched.type && Boolean(formik.errors.type)}
									helperText={formik.touched.type && formik.errors.type}
								>
									<MenuItem value="none">Select field type</MenuItem>
									<MenuItem value="text">Text</MenuItem>
									<MenuItem value="number">Number</MenuItem>
									<MenuItem value="boolean">Boolean</MenuItem>
									<MenuItem value="dropdown">Dropdown</MenuItem>
									<MenuItem value="multipleCheckboxes">
										Multiple Checkboxes
									</MenuItem>
									<MenuItem value="date">Date</MenuItem>
								</TextField>
							</Box>
						</Box>
						<Box
							sx={{ display: "flex", flexDirection: "column", gap: 1, px: 4 }}
						>
							{formik.values.type === "dropdown" ||
							formik.values.type === "multipleCheckboxes" ? (
								<FieldArray
									name="labels"
									render={(arrayHelpers) => (
										<>
											{formik.values.labels.map((label, i) => {
												return (
													<Box sx={{ display: "flex", gap: 3 }}>
														<TextField
															sx={{ my: 1, width: "85%" }}
															autoComplete="off"
															name={`labels[${i}]`}
															placeholder="Enter label"
															value={formik.values.labels[i]}
															onChange={formik.handleChange}
															// error={formik.touched.name && Boolean(formik.errors.name)}
															// helperText={formik.touched.name && formik.errors.name}
														/>
														{i !== 0 ? (
															<Typography
																onClick={() => arrayHelpers.remove(i)}
																sx={{
																	display: "flex",
																	alignSelf: "center",
																	fontSize: "14px",
																	cursor: "pointer",
																}}
															>
																<DeleteOutlineIcon sx={{ fontSize: "18px" }} />{" "}
																Delete
															</Typography>
														) : null}
													</Box>
												);
											})}
											<Typography
												onClick={() => arrayHelpers.push(null)}
												sx={{
													display: "flex",
													fontSize: "14px",
													cursor: "pointer",
													gap: 1,
												}}
											>
												<AddCircleOutlineIcon sx={{ fontSize: "18px" }} /> Add
												another label{" "}
											</Typography>
										</>
									)}
								/>
							) : null}
						</Box>
						{renderPreview(formik.values.type, formik.values.labels) || (
							<Divider sx={{ my: 4 }} />
						)}
						{/* <CheckboxType data={["label1", "label2 qwe", "label3", "label1", "label2 qwe", "label3", "label1", "label2 qwe", "label3"]} /> */}
						{/* <DropdownType data={["label1", "label2 qwe", "label3", "label1", "label2 qwe", "label3", "label1", "label2 qwe", "label3"]} /> */}
						{/* <BooleanType /> */}
						{/* <DateType /> */}

						<Box sx={{ px: 4 }}>
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
				</FormikProvider>
			</Box>
		</Drawer>
	);
};

export default CreateDrawer;
