import {
	Box,
	Button,
	Checkbox,
	Divider,
	Menu,
	MenuItem,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useFieldSettings } from "./useFieldSettings";
import DeleteModal from "./components/deleteModal";
import CreateDrawer from "./components/createDrawer";
import AddIcon from "@mui/icons-material/Add";

const FieldSettings = () => {
	const {
		page,
		rowsPerPage,
		objectList,
		activeObject,
		fields,
		isSelected,
		openCreateField,
		openEditField,
		openDelete,
		editInitValues,
		handleSelectAllClick,
		handleSelect,
		handleChangeObject,
		handleOpenDelete,
		handleChangePage,
		handleChangeRowsPerPage,
		handleOpenEdit,
		handleOpenCreate,
		handleCloseCreate,
		handleCloseEdit,
		handleCloseDelete,
	} = useFieldSettings();

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				backgroundColor: "white",
				width: "100%",
				height: "100%",
				pb: 3
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					px: 3
				}}
			>
				{!activeObject.isDefault ? <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
					<TextField
						select
						sx={{ my: 4, width: "400px" }}
						autoComplete="off"
						name="selectedObject"
						label="Select a custom object"
						value={activeObject && activeObject.singularName}
					>
						{objectList.filter(obj => !obj.isDefault).map((object) => {
							return (
								<MenuItem
									value={object.singularName}
									onClick={() => handleChangeObject(object)}
								>
									{object.singularName}
								</MenuItem>
							);
						})}
					</TextField>
				</Box> : ""}
			</Box>
			<Divider />
			<Box sx={{ height: "100%" }}>
				<Box
					sx={{
						mb: 2,
						display: "flex",
						flexDirection: "column",
						height: "100%",
					}}
				>
					<Box
						sx={{
							display: "flex",
							gap: 4,
							alignItems: "center",
							pl: "4px",
							px: 3,
							py: 2,
							mb: 3,
							backgroundColor: "#F7F7F7",
						}}
					>
						<Typography
							sx={{
								fontSize: 20,
							}}
						>
							Fields
						</Typography>
						<Button
							onClick={handleOpenCreate}
							variant="contained"
							sx={{
								borderRadius: 1,
								ml: "auto",
								display: "flex",
								alignItems: "center",
								gap: "5px",
								cursor: "pointer",
							}}
						>
							<AddIcon /> 
							<Typography>Add field</Typography>
						</Button>
					</Box>
					<Box
						sx={{
							boxShadow:
								"0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)",
							mx: 3,
							height: "100%"
						}}
					>
						<Box
							sx={{
								px: "28px",
								py: 3,
								display: "flex",
								background: "rgba(102, 162, 255, 0.08)",
								gap: 2,
							}}
						>
							<Typography sx={{ fontWeight: 600 }}>{fields.selected.length} items selected</Typography>
							<Divider
								sx={{ backgroundColor: "rgba(0, 0, 0, 0.12)" }}
								orientation="vertical"
								flexItem
							/>
							<Typography
								onClick={handleOpenDelete}
								color="primary.main"
								sx={{
									display: "flex",
									alignItems: "center",
									gap: "4px",
									cursor: "pointer",
								}}
							>
								<DeleteIcon sx={{ fontSize: "20px", color: "black" }} />
								<Typography sx={{ fontWeight: 600 }}>Delete</Typography>
							</Typography>
						</Box>
						<Table sx={{ minWidth: 550, mb: 4, }} >
							<TableHead>
								<TableRow>
									<TableCell padding="checkbox" sx={{ pl:2 }}>
										<Checkbox
											sx={{
												color: "black",
												"&.Mui-checked": {
													color: '#4787EA'
												}
											}}
											color="primary"
											inputProps={{
												"aria-label": "select all desserts",
											}}
											onClick={handleSelectAllClick}
											indeterminate={
												fields.selected.length > 0 &&
												fields.selected.length < fields.visible.length
											}
											checked={
												fields.visible?.length > 0 &&
												fields.selected?.length === fields.visible?.length
											}
										/>
									</TableCell>
									<TableCell width="20%" >Name</TableCell>
									<TableCell>Type</TableCell>
									<TableCell>Created by</TableCell>
									<TableCell>Create date</TableCell>
									<TableCell>Modified date</TableCell>
									<TableCell>Modifyed by</TableCell>
								</TableRow>
							</TableHead>
							<TableBody sx={{ position: "relative" }} >
								{console.log("fields",fields)}
								{activeObject?.schema?.length !== 0 ? (
									fields.visible?.map((field) => {
										const isFieldSelected = isSelected(field._id);
										return (
											<TableRow
												sx={{
													// padding: 4,
													":hover": { "#editButton": { display: "flex" }, backgroundColor: "rgba(0, 0, 0, 0.04)" },
													backgroundColor: isFieldSelected ? "rgba(102, 162, 255, 0.08) !important" : ""
												}}
											>
												<TableCell padding="checkbox" sx={{ pl: 2 }}>
													<Checkbox
														sx={{
															color: "black",
															"&.Mui-checked": {
																color: '#4787EA'
															}
														}}
														// color="primary"
														inputProps={{
															"aria-label": "select all desserts",
														}}
														onClick={() => handleSelect(field)}
														checked={isFieldSelected}
													/>
												</TableCell>
												<TableCell sx={{ display: "flex", gap: 3 }}>
													{field.name}
													<Box
														onClick={() => handleOpenEdit(field)}
														fontSize="14px"
														color="primary.main"
														id="editButton"
														sx={{
															display: "none",
															alignItems: "center",
															gap: "4px",
															cursor: "pointer",
														}}
													>
														<EditIcon
															sx={{ fontSize: "18px", color: "black" }}
														/>
														<span>Edit</span>
													</Box>
												</TableCell>
												<TableCell>{field.typeName}</TableCell>
												<TableCell>You </TableCell>
												<TableCell>
													{new Date(field.createdDate).toLocaleDateString(
														"en-US"
													)}
												</TableCell>
												<TableCell>
													{new Date(field.modifiedDate).toLocaleDateString(
														"en-US"
													)}
												</TableCell>
												<TableCell>You</TableCell>
											</TableRow>
										);
									})
								) : (
									<Box
										sx={{
											width: "100%",
											position: "absolute",
											textAlign: "center",
											marginTop: "10%",
											bottom: 0,
											top: 0,
											color: "grey",
										}}
									>
										No found fields
									</Box>
								)}
							</TableBody>
						</Table>
						<TablePagination
							sx={{ mr: "20px", mt: "auto",
							position: "absolute",
							bottom: 20,
							right: 0 }}
							rowsPerPageOptions={[5, 10, 25]}
							component="div"
							count={activeObject?.schema?.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Box>
				</Box>
			</Box>
			<DeleteModal open={openDelete} onClose={handleCloseDelete} />
			<CreateDrawer open={openCreateField} onClose={handleCloseCreate} />
			<CreateDrawer
				edit
				initValues={editInitValues}
				open={openEditField}
				onClose={handleCloseEdit}
			/>
		</Box>
	);
};

export default FieldSettings;
