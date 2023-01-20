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

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useCreateDrawer } from "./useCreateDrawer";

const CreateDrawer = ({ open, onClose, edit, initValues }) => {
	const { formik, handleClose } = useCreateDrawer(onClose, edit, initValues);

	const renderPreview = (type, label, data = null, ) => {
		let preview = null;
		switch (type) {
			case "boolean":
				preview = <BooleanType label={label} preview />;
				break;
			case "dropdown":
				preview = <DropdownType data={data} label={label} preview />;
				break;
			case "multipleCheckboxes":
				preview = <CheckboxType data={data} label={label} preview />;
				break;
			case "date":
				preview = <DateType label={label} preview />;
				break;
			default:
				return null;
		}

		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					borderTop: "1px solid rgba(0, 0, 0, 0.23)",
					borderBottom: "1px solid rgba(0, 0, 0, 0.23)",
					py: 5,
					px: 4
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
				sx: { width: "521px" },
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
						<Box sx={{ gap: 3, px: 4 }}>
							<Box sx={{ width: "100%" }}>
								<TextField
									fullWidth
									sx={{ my: 2 }}
									autoComplete="off"
									name="name"
									label="Field name"
									value={formik.values.name}
									onChange={formik.handleChange}
									error={formik.touched.name && Boolean(formik.errors.name)}
									helperText={formik.touched.name && formik.errors.name}
								/>
							</Box>
							<Box sx={{ width: "100%" }}>
								<TextField
									select
									fullWidth
									sx={{ my: 2 }}
									autoComplete="off"
									name="type"
									label="Field type"
									value={formik.values.type || "text"}
									onChange={formik.handleChange}
									error={formik.touched.type && Boolean(formik.errors.type)}
									helperText={formik.touched.type && formik.errors.type}
								>
									<MenuItem value="text">Single-line Text</MenuItem>
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
							sx={{ display: "flex", flexDirection: "column", gap: 1, px: 4,py: 1 }}
						>
							{formik.values.type === "dropdown" ||
							formik.values.type === "multipleCheckboxes" ? (
								<FieldArray
									name="labels"
									render={(arrayHelpers) => (
										<>
											{formik.values.labels.map((label, i) => {
												return (
													<Box sx={{ display: "flex", gap: 2 }}>
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
																	padding: "15px",
																	cursor: "pointer",
																	borderRadius: "50%",
																	":hover": {
																		backgroundColor: "rgba(33, 33, 33, 0.04);"
																	}
																}}
															>
																<DeleteIcon sx={{ fontSize: "28px" }} />
															</Typography>
														) : null}
													</Box>
												);
											})}
											<Typography
												onClick={() => arrayHelpers.push(null)}
												sx={{
													display: "flex",
													width: "max-content",
													fontSize: "14px",
													cursor: "pointer",
													gap: 1,
													padding: 1,
													borderRadius: "15px",
													fontWeight: 600,
													":hover": {
														backgroundColor: "rgba(33, 33, 33, 0.04);"
													}
												}}
											>
												<AddIcon sx={{ fontSize: "18px" }} /> Add label
											</Typography>
										</>
									)}
								/>
							) : null}
							{<renderPreview type={formik.values.type} />}
						</Box>
						{
							renderPreview(formik.values.type, formik.values.name, formik.values.labels) || <Divider sx={{my: 4}} />
						}
						{/* <CheckboxType data={["label1", "label2 qwe", "label3", "label1", "label2 qwe", "label3", "label1", "label2 qwe", "label3"]} /> */}
						{/* <DropdownType data={["label1", "label2 qwe", "label3", "label1", "label2 qwe", "label3", "label1", "label2 qwe", "label3"]} /> */}
						{/* <BooleanType /> */}
						{/* <DateType /> */}

						<Box sx={{ px: 4, position: "absolute", bottom: 0, left: 0, right: 0, py: 5, backgroundColor: "#FBFBFB", borderTop: "1px solid rgba(196, 196, 196, 0.29)"}}>
							<Button
								type="submit"
								variant="contained"
								sx={{ px: 4, py: 1, mr: 2,  fontSize: "16px" }}
							>
								{edit ? <b>Save</b> : <b>Create</b>}
								
							</Button>
							<Button
								variant="outlined"
								sx={{ px: 4, py: 0.8, border: 2, fontSize: "16px", ":hover": { border: 2 } }}
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
