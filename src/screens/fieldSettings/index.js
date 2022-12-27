import {
	Box,
	Button,
	Checkbox,
	Divider,
	MenuItem,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

import { useFieldSettings } from "./useFieldSettings";
import DeleteModal from "./components/deleteModal";
import CreateDrawer from "./components/createDrawer";

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
				py: "30px",
				display: "flex",
				flexDirection: "column",
				backgroundColor: "white",
				borderRadius: "20px",
				width: "100%",
			}}
		>
			<Typography variant="h5" sx={{ px: "30px", fontWeight: 500 }}>
				Custom object
			</Typography>
			<Box
				sx={{
					px: "30px",
					marginTop: "10px ",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
					<Typography sx={{ fontSize: "14px" }}>
						<b>Select an object</b>
					</Typography>
					<TextField
						select
						sx={{ mb: 2, width: "200px" }}
						autoComplete="off"
						name="selectedObject"
						value={activeObject?.singularName}
					>
						{objectList.map((object) => {
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
				</Box>
				<Box sx={{ position: "relative" }}>
					<Typography
						style={{
							borderBottom: "1px solid black",
							padding: "10px",
							color: "blue",
							fontSize: "14px",
							color: "primary.main",
							width: "85px",
						}}
					>
						Configuration
					</Typography>
				</Box>
			</Box>
			<Divider />
			<Typography
				sx={{ fontSize: "14px", color: "grey", px: "30px", py: "20px" }}
			>
				Choose what information you collect about your object and how to keep
				your records updated.
			</Typography>
			<Divider />
			<Box sx={{ height: "100%" }}>
				<Box
					sx={{
						mt: 2,
						mb: 2,
						display: "flex",
						flexDirection: "column",
						borderRadius: "20px",
						height: "100%",
					}}
				>
					<Box
						sx={{
							display: "flex",
							gap: 4,
							alignItems: "center",
							pl: "4px",
							px: "20px",
						}}
					>
						<Checkbox
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
						<Typography fontSize="14px" color="primary.main">
							{fields.selected.length} Selected
						</Typography>
						<Typography
							onClick={handleOpenDelete}
							fontSize="14px"
							color="primary.main"
							sx={{
								display: "flex",
								alignItems: "center",
								gap: "4px",
								cursor: "pointer",
							}}
						>
							<DeleteOutlineIcon sx={{ fontSize: "20px", color: "black" }} />
							<span>Delete</span>
						</Typography>
						<Button
							onClick={handleOpenCreate}
							variant="contained"
							sx={{
								borderRadius: 3,
								fontSize: "12px",
								ml: "auto",
								display: "flex",
								alignItems: "center",
								gap: "5px",
								cursor: "pointer",
							}}
						>
							Create field
						</Button>
					</Box>
					<Table sx={{ minWidth: 550 }} aria-labelledby="tableTitle">
						<TableHead>
							<TableRow sx={{ color: "grey" }}>
								<TableCell padding="checkbox" sx={{ ml: "20px" }}></TableCell>
								<TableCell width="20%">Name</TableCell>
								<TableCell>Type</TableCell>
								<TableCell>Created by</TableCell>
								<TableCell>Create date</TableCell>
								<TableCell>Modified date</TableCell>
								<TableCell>Modifyed by</TableCell>
							</TableRow>
						</TableHead>
						<TableBody sx={{ position: "relative" }}>
							{activeObject.schema && activeObject.schema.length !== 0 ? (
								fields.visible?.map((field) => {
									const isFieldSelected = isSelected(field._id);

									return (
										<TableRow
											sx={{
												padding: 4,
												":hover": { "#editButton": { display: "flex" } },
											}}
										>
											<TableCell padding="checkbox" sx={{ pl: "20px" }}>
												<Checkbox
													color="primary"
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
													<EditIcon sx={{ fontSize: "18px", color: "black" }} />
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
						sx={{ mr: "20px", mt: "auto" }}
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={activeObject.schema?.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
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
