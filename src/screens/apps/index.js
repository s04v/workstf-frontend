/* eslint-disable react-hooks/exhaustive-deps */
import {
	Box,
	Checkbox,
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import CreateRecordDrawer from "./components/createRecordDrawer";
import EditRecordModal from "./components/editRecordModal";
import DeleteRecordModal from "./components/deleteRecordModal";
import { useApps } from "./useApps";

const Apps = (props) => {
	const {
		params,
		page,
		rowsPerPage,
		openCreate,
		openEdit,
		openDelete,
		app,
		isSelected,
		handleSelectAllClick,
		handleSelect,
		handleOpenCreate,
		handleOpenEdit,
		handleOpenDelete,
		handleChangePage,
		handleChangeRowsPerPage,
		handleCloseCreate,
		handleCloseEdit,
		handleCloseDelete,
		initValues,
	} = useApps();

	return (
		<Box
			key={props.key}
			sx={{
				mt: 4,
				mb: 4,
				display: "flex",
				height: "100%",
				gap: 4,
				position: "relative",
			}}
		>
			<Box sx={{ width: "200px" }}>
				{app.objectList?.map((object) => (
					<Typography
						sx={{
							textAlign: "center",
							mb: 2,
							color: "black",
							backgroundColor: params.id === object.id ? "#e4e4e4" : null,
							borderRadius: "40px",
							py: 1,
						}}
					>
						<Link to={`/${params.appName}/${params.userId}/${object.id}`}>
							<span style={{ color: "black" }}>{object.name}</span>
						</Link>
					</Typography>
				))}
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					backgroundColor: "white",
					borderRadius: "20px",
					padding: "20px",
					width: "100%",
				}}
			>
				<Box sx={{ display: "flex", gap: 4, alignItems: "center", pl: "4px" }}>
					<Checkbox
						color="primary"
						inputProps={{
							"aria-label": "select all desserts",
						}}
						onClick={handleSelectAllClick}
						indeterminate={
							app.selectedRecords?.length > 0 &&
							app.selectedRecords?.length < app.records?.length
						}
						checked={
							app.records?.length > 0 &&
							app.selectedRecords?.length === app.records?.length
						}
					/>
					<Typography fontSize="14px" color="primary.main">
						{app.selectedRecords.length} Selected
					</Typography>
					<Typography
						onClick={handleOpenEdit}
						fontSize="14px"
						color="primary.main"
						sx={{
							display: "flex",
							alignItems: "center",
							gap: "4px",
							cursor: "pointer",
						}}
					>
						<EditIcon sx={{ fontSize: "20px", color: "black" }} />
						<span>Edit</span>
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
						<b>Add record</b>
					</Button>
				</Box>

				<Table sx={{ minWidth: 550 }} aria-labelledby="tableTitle">
					<TableHead>
						<TableRow sx={{ color: "grey" }}>
							<TableCell padding="checkbox">{/* idle */}</TableCell>
							{params.id && <TableCell>ID</TableCell>}
							<TableCell>{app.object.primaryName}</TableCell>
							{app.object.schema?.map((field) => (
								<TableCell>{field.name}</TableCell>
							))}
							<TableCell>Create Date</TableCell>
							<TableCell>Mofilied Date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody sx={{ position: "relative" }}>
						{}
						{app.records.map((record) => {
							const isRecordSelected = isSelected(record._id);
							return (
								<TableRow sx={{ padding: 4 }}>
									{params.id && (
										<>
											<TableCell padding="checkbox">
												<Checkbox
													color="primary"
													inputProps={{
														"aria-label": "select all desserts",
													}}
													onClick={() => handleSelect(record)}
													checked={isRecordSelected}
												/>
											</TableCell>
											<TableCell>{record._id.substr(17)}</TableCell>
											<TableCell>
												{record.data[app.object.primaryName]}
											</TableCell>
										</>
									)}
									{console.log(record)}
									{app.object.schema?.map((field) => {
										if (field.type === "multipleCheckboxes") {
											if (
												[field.name] in record?.data &&
												Object.keys(record?.data[field.name])
											) {
												const activeCheckboxes = Object.keys(
													record?.data[field.name]
												)
													.map((item) =>
														record?.data[field.name][item][0] ? item : null
													)
													.filter((item) => item !== null);
												return (
													<TableCell>{activeCheckboxes.join("; ")}</TableCell>
												);
											}
											return <TableCell></TableCell>;
										}

										return (
											<TableCell>
												{field.type === "date"
													? new Date(
															record.data[field.name]
													  ).toLocaleDateString("es-ES")
													: record.data[field.name]}
											</TableCell>
										);
									})}
									<TableCell>
										{new Date(record.createDate).toLocaleDateString("es-ES")}
									</TableCell>
									<TableCell>
										{new Date(record.updateDate).toLocaleDateString("es-ES")}
									</TableCell>
									{/* <TableCell>{contact.firstName}</TableCell>
                                  <TableCell>{contact.lastName}</TableCell>
                                  <TableCell>{contact.email}</TableCell>
                                  <TableCell>{contact.phoneNumber}</TableCell>
                                  <TableCell><span style={{padding: 3, backgroundColor: '#f7f7f7', borderRadius: '20px'}}>{new Date(contact.createDate).toLocaleDateString("en-US")} {new Date(contact.createDate).toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric'})}</span></TableCell>
                                  <TableCell><span style={{padding: 3, backgroundColor: '#f7f7f7', borderRadius: '20px'}}>{new Date(contact.updateDate).toLocaleDateString("en-US")} {new Date(contact.updateDate).toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric'})}</span></TableCell>
                                  <TableCell>{contact.country}</TableCell>
                                  <TableCell>{contact.company}</TableCell> */}
								</TableRow>
							);
						})}
						{app.records?.length === 0 ? (
							<Box
								sx={{
									width: "100%",
									position: "absolute",
									textAlign: "center",
									marginTop: "15%",
									bottom: 0,
									top: 0,
									color: "grey",
								}}
							>
								Not found
							</Box>
						) : (
							""
						)}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={app.total}
					sx={{ mt: "auto" }}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
				<DeleteRecordModal open={openDelete} onClose={handleCloseDelete} />
				<CreateRecordDrawer
					open={openCreate}
					onClose={handleCloseCreate}
					schema={initValues}
				/>
				<EditRecordModal open={openEdit} onClose={handleCloseEdit} />
			</Box>
		</Box>
	);
};

export default Apps;
