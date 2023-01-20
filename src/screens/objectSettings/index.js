import {
	Box,
	Button,
	Divider,
	MenuItem,
	TextField,
	Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useObjectsSettings } from "./useObjectSettings";
import CreateDrawer from "./components/createDrawer";
import FolderIcon from '@mui/icons-material/Folder';
import DataTableLoader from "./components/loader";

const ObjectSettings = () => {
	const {
		openCreateObject,
		objectList,
		activeObject,
		handleChangeObject,
		handleOpenDrawer,
		handleCloseDrawer,
		loading,
		handleDelete
	} = useObjectsSettings();

	return (
		<>
			{!(Array.isArray(objectList) && objectList.length) ? (
				<Box
					sx={{
						padding: "30px",
						display: "flex",
						flexDirection: "column",
						backgroundColor: "white",
						borderRadius: "20px",
						height: "100%",
						// width: "100%",
					}}
				>
					<Box
						sx={{
							// margin: "10vh auto",
							height: "100%",
							width: "100%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Typography
							sx={{ fontSize: "84px", color: "#dcd8d8", userSelect: "none" }}
						>
							<img src="./assets/folder-icon.svg" alt="" />
						</Typography>
						<Typography sx={{textAlign: "center", width: 300}}>
							Create your own custom object and
						 	customize it to your needs.
						</Typography>
						<Button
							onClick={handleOpenDrawer}
							variant="contained"
							sx={{
								padding: "10px 20px",
								mt: 4,
								mb: 3,
								borderRadius: 1,
								display: "flex",
								gap: 1,
								justifyContent: "center"
							}}
						>
							<FolderIcon />
							<Typography sx={{fontWeight: 700}}>Create Custom Object</Typography>
						</Button>
					</Box>
				</Box>
			) : (
				<>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							backgroundColor: "white",
							width: "100%",
						}}
					>
						<Box
							sx={{
								py: 2,
								display: "flex",
								flexDirection: "column",
							}}
						>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									px: 3
								}}
							>
								<Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
									<TextField
										select
										sx={{ my: 2, width: "400px" }}
										autoComplete="off"
										name="selectedObject"
										value={activeObject && activeObject.singularName}
										label="Select a custom object"
										// onChange={(e) => setSelectedObject(e.target.value)}
										// error={formik.touched.country && Boolean(formik.errors.country)}
										// helperText={formik.touched.country && formik.errors.country}
									>
										{objectList.map((object) => (
											<MenuItem
												value={object.singularName}
												onClick={() => handleChangeObject(object)}
											>
												{object.singularName}
											</MenuItem>
										))}
									</TextField>
								</Box>
								<Button
									onClick={handleOpenDrawer}
									variant="contained"
									sx={{
										padding: "10px 20px",
										borderRadius: 1,
										display: "flex",
										gap: 1,
										justifyContent: "center"
									}}
								>
									<FolderIcon />
									<Typography sx={{}}>Create Custom Object</Typography>
								</Button>
							</Box>
						</Box>
						<Divider />
						<Box sx={{ backgroundColor: "#F7F7F7", py: 2}}>
							<Typography sx={{
								fontSize: 20,
								mx: 3,
								my: 1
							}}>
								Setup
							</Typography>
						</Box>
						<Box sx={{ px: 3, py: 2 }}>
							<Typography sx={{ mb: "10px" }}>
								<Typography sx={{ fontWeight: 600, textDecotration: "underline", color: "#212121", cursor: "pointer" }} onClick={handleDelete}>
									Delete custom object
								</Typography>
							</Typography>
							<Typography sx={{ fontSize: "14px", color: "#828282" }}>
							This is change is irreversible.
							</Typography>
						</Box>
						<Divider />
					</Box>
				</>
			)}
			{/*  */}
			<CreateDrawer open={openCreateObject} onClose={handleCloseDrawer} />
		</>
	);
};

export default ObjectSettings;
