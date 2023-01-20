import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useEditRecordModal } from "./useEditRecordModal";
import BooleanType from "@src/shared/components/fieldTypes/BooleanType";
import DropdownType from "@src/shared/components/fieldTypes/DropdownType";
import CheckboxType from "@src/shared/components/fieldTypes/CheckboxType";
import DateType from "@src/shared/components/fieldTypes/DateType";
import { FormikProvider } from "formik";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	borderRadius: 2,
	border: 0,
};

const EditRecordModal = ({ open, onClose }) => {
	const {
		property,
		activeType,
		setActiveType,
		app,
		handleChange,
		formik,
		handleClose,
	} = useEditRecordModal(onClose);

	const renderField = (type, name, value, onChange, setFieldValue) => {
		let field = null;
		switch (type) {
			case "text":
			case "number":
				field = (
					<TextField
						fullWidth
						sx={{ mb: 2 }}
						autoComplete="off"
						name={name}
						value={value}
						onChange={onChange}
					/>
				);
				break;
			case "boolean":
				field = <BooleanType name={name} value={value} onChange={onChange} />;
				break;
			case "dropdown":
				const dropdown = app.object.schema.filter(
					(item) => item.name == name
				)[0];
				field = (
					<DropdownType
						name={name}
						value={value}
						onChange={onChange}
						data={dropdown.labels}
					/>
				);
				break;
			case "multipleCheckboxes":
				field = (
					<CheckboxType
						name={name}
						value={value}
						onChange={onChange}
						data={Object.keys(value)}
					/>
				);
				break;
			case "date":
				field = <DateType name={name} value={value} onChange={(val) => setFieldValue(name, Date.parse(val))} />;
				break;
			default:
				return null;
		}

		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					mt: 2,
					mb: 3,
				}}
			>
				{field}
			</Box>
		);
	};

	return (
		<Modal open={open} sx={{ outline: "none" }} disableAutoFocus={true}>
			<Box sx={{ ...style, width: 400 }}>
				<Box
					sx={{
						backgroundColor: "primary.main",
						color: "white",
						padding: 3,
						borderTopLeftRadius: 1,
						borderTopRightRadius: 1,
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					Edit property{" "}
					<CloseIcon
						sx={{ fontSize: "24px", cursor: "pointer" }}
						onClick={handleClose}
					/>
				</Box>
				<Box
					sx={{
						padding: 3,
					}}
				>
					<Typography color="grey" fontSize="12px">
						
					</Typography>
					<FormikProvider value={formik}>
					<form onSubmit={formik.handleSubmit}>
						<Box fullWidth>
							<TextField
								select
								label="Property to update"
								value={property}
								onChange={handleChange}
								fullWidth
								sx={{ mb: 2 }}
							>
								<MenuItem value={"none"}>Select property to edit</MenuItem>
								<MenuItem
									onClick={() => setActiveType(app.object.primaryType)}
									value={app.object.primaryName}
								>
									{app.object.primaryName}
								</MenuItem>
								{app.object.schema?.map((field) => (
									<MenuItem
										onClick={() => setActiveType(field.type)}
										value={field.name}
									>
										{field.name}
									</MenuItem>
								))}
							</TextField>
							{/* {console.log(formik.values)} */}
							<Box>
							{
								property !== "none" &&
									formik.values &&
									renderField(
										activeType,
										property,
										formik.values[property],
										formik.handleChange,
										formik.setFieldValue
									)
								//     <TextField
								//     fullWidth
								//     sx={{mb: 2}}
								//     autoComplete="off"
								//     name={property}
								//     value={formik.values[property]}
								//     onChange={formik.handleChange}
								//     error={formik.touched[property] && Boolean(formik.errors[property])}
								//     helperText={formik.touched[property] && formik.errors[property]}
								// />
							}

						</Box>
						</Box>
						<Button
							type="submit"
							variant="contained"
							sx={{ px: 4, py: 1, mr: 2 }}
						>
							<b>Update</b>
						</Button>
						<Button
							variant="outlined"
							sx={{ px: 4, border: 2, ":hover": { border: 2 } }}
							onClick={handleClose}
						>
							<b>Cancel</b>
						</Button>
					</form>
					</FormikProvider>
				</Box>
			</Box>
		</Modal>
	);
};

export default EditRecordModal;
