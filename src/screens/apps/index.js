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
	Divider,
	MenuItem,
	TextField,
	Menu,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import CreateRecordDrawer from "./components/createRecordDrawer";
import EditRecordModal from "./components/editRecordModal";
import DeleteRecordModal from "./components/deleteRecordModal";
import { useApps } from "./useApps";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import useSelectObjectPopup from "./components/selectObjectPopup";
import DataTableLoader from "./components/loader";
import TextLoader from "./components/loader/TextLoader";
import { useEffect, useState } from "react";
import Server from "@src/services/server";

const Apps = (props) => {
	const {
		params,
		page,
		rowsPerPage,
		openCreate,
		openEdit,
		openDelete,
		app,
		navigateToSingleRecord,
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
		loading
	} = useApps();

	const { SelectObjectPopup, handleSelectClick } = useSelectObjectPopup();
	const [appName, setAppName] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const res = await Server.App.get(params.appName);
			console.log('get app list', res);
			setAppName(res.data.name);
		}
		fetchData();
	}, []);
	// if(!loading)
	// 	return <DataTableLoader />
	return (
		<Box
			key={props.key}
			sx={{
				mx: 3,
				mb: 4,
				display: "flex",
				flexDirection: "column",
				height: "100%",
				position: "relative",
			}}
		>
			{/* <Typography
				sx={{
					my: 2,
					fontSize: 16,
				}}
			>
				{ loading ? <TextLoader width="400px" height="20px" /> : <> Home {"  /  "} {appName} {"  /  "}{app.object.pluralName}</>}
			</Typography> */}
			<Typography sx={{ fontWeight: 500, fontSize: 16, my: "19px", display: "flex", gap: 1}}>
				<Typography sx={{textDecoration: "underline"}}>Home</Typography>
				{" / "}
				<Typography sx={{textDecoration: "underline"}}>Settings</Typography>
				{" / "}
				<Typography sx={{textDecoration: "underline"}}>{appName}</Typography>
				{" / "}
				<Typography sx={{textDecoration: "underline"}}>{app?.object?.pluralName || ""}</Typography>
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					backgroundColor: "white",
					borderRadius: 1,
					height: "100%",
					boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)"
				}}
			>
				<Box
					sx={{
						display: "flex",
						gap: 4,
						alignItems: "center",
						borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
						px: 3,
						py: 3
					}}
				>
					<Typography
						sx={{
							fontSize: 24,
							fontWeight: 600,
							display: "flex",
							alignItems: "center",
							gap: 1
						}}
					>
						{loading ? <TextLoader /> : app.object.pluralName}
						
						<MoreVertIcon sx={{ cursor: "pointer", padding: "10px", borderRadius: "50%", ":hover": { backgroundColor: "rgba(33, 33, 33, 0.04)" } }} onClick={handleSelectClick} />
						<SelectObjectPopup />
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
						<Typography>Add {app.object.singularName}</Typography>
					</Button>
				</Box>
					<Box
						sx={{
							px: 3,
							py: 3,
							display: "flex",
							alignItems: "center",
							background: "rgba(102, 162, 255, 0.08)",
							gap: 2,
							borderBottom: "1px solid rgba(0, 0, 0, 0.08)"
						}}
					>
						<Typography sx={{ fontWeight: 600, fontSize: 14 }}>{app.selectedRecords.length} items selected</Typography>
						<Divider
							sx={{ backgroundColor: "rgba(0, 0, 0, 0.12)" }}
							orientation="vertical"
							flexItem
						/>
						<Typography
							onClick={handleOpenEdit}
							color="primary.main"
							sx={{
								display: "flex",
								alignItems: "center",
								gap: "10px",
								cursor: "pointer",
								padding: "4px 4px",
								borderRadius: 1,
								":hover": { backgroundColor: "rgba(33, 33, 33, 0.04)" }
							}}
						>
							<EditIcon sx={{ fontSize: "20px", color: "black" }} />
							<Typography sx={{ fontWeight: 600, fontSize: 14 }}>Edit</Typography>
						</Typography>
						<Typography
							onClick={handleOpenDelete}
							color="primary.main"
							sx={{
								display: "flex",
								alignItems: "center",
								gap: "10px",
								cursor: "pointer",
								padding: "4px 4px",
								borderRadius: 1,
								":hover": { backgroundColor: "rgba(33, 33, 33, 0.04)" }
							}}
						>
							<DeleteIcon sx={{ fontSize: "20px", color: "black" }} />
							<Typography sx={{ fontWeight: 600, fontSize: 14 }}>Delete</Typography>
						</Typography>
					</Box>
				<Table sx={{ minWidth: 550 }} aria-labelledby="tableTitle">
					{loading ? <DataTableLoader /> : (
						<>
							<TableHead>
								<TableRow sx={{ color: "grey" }}>
									<TableCell padding="checkbox" sx={{ pl:1.7 }}>
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
											app.selectedRecords?.length > 0 &&
											app.selectedRecords?.length < app.records?.length
										}
										checked={
											app.records?.length > 0 &&
											app.selectedRecords?.length === app.records?.length
										}
									/>
									</TableCell>
									{params.id && <TableCell>ID</TableCell>}
									<TableCell>{app.object.primaryName}</TableCell>
									{app.object.schema?.map((field) => (
										<TableCell>{field.name}</TableCell>
									))}
									<TableCell>Create Date</TableCell>
									<TableCell>Modified Date</TableCell>
								</TableRow>
							</TableHead>
							<TableBody sx={{ position: "relative" }}>
								{app.records.map((record) => {
									console.log("record", record);
									const isRecordSelected = isSelected(record._id);
									return (
										<TableRow sx={{ 
											padding: 4,
											":hover": { "#editButton": { display: "flex" }, backgroundColor: "rgba(0, 0, 0, 0.04)" },
											backgroundColor: isRecordSelected ? "rgba(102, 162, 255, 0.08) !important" : ""
										}}
										onClick={() => navigateToSingleRecord(record._id, app.object.pluralName)}>
											{params.id && (
												<>
													<TableCell padding="checkbox" sx={{ pl:1.7 }}>
														<Checkbox
															sx={{
																color: "black",
																"&.Mui-checked": {
																	color: '#4787EA'
																}
															}}
															inputProps={{
																"aria-label": "select all desserts",
															}}
															onClick={(e) => {e.stopPropagation(); handleSelect(record);}}
															checked={isRecordSelected}
														/>
													</TableCell>
													<TableCell>{record._id.substr(17)}</TableCell>
													<TableCell>
														{record.data[app.object.primaryName]}
													</TableCell>
												</>
											)}
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
						</>
					)}
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
