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
import DeleteObjectModal from "./components/deleteModal";
import { useEffect, useState } from "react";
import Configuration from "./components/configuration";
import FieldSettings from "../fieldSettings";
import { useDispatch, useSelector } from "react-redux";
import { updateSetingsTab } from "@src/store/settingsSlice";

const ObjectSettings = () => {
	const {
		objectList,
		openCreateObject,
		handleCloseDrawer,
		activeObject,
		handleOpenDrawer,
	} = useObjectsSettings();
	const dispatch = useDispatch();
	const tab = useSelector(state => state.settings.tab);

	useEffect(() => {
		console.log("TAB",tab);
	}, [])

	return (
		<>
			<Box sx={{ backgroundColor: "#F7F7F7", px: 3}}>
			<Typography sx={{ fontWeight: 500, fontSize: 16, my: "19px", display: "flex", gap: 1}}>
				<Typography sx={{textDecoration: "underline"}}>Home</Typography>
				{" / "}
				<Typography sx={{textDecoration: "underline"}}>Settings</Typography>
				{" / "}
				<Typography sx={{textDecoration: "underline"}}>Objects</Typography>
				
				{!activeObject || !activeObject?.isDefault ? 
					<>
						{" / "}
						<Typography sx={{textDecoration: "underline"}}>Custom objects</Typography> 
					</> : ""
				}
				{activeObject ? <>{" / "} <Typography sx={{textDecoration: "underline"}}>{activeObject.pluralName}</Typography></> : ""}
				
			</Typography>
				<Typography sx={{ fontWeight: 700, fontSize: "24px", mb: 2 }}>
				{activeObject && activeObject.pluralName}
				</Typography>
			
				{/* <Typography sx={{ fontWeight: 500, fontSize: 16, my: "19px" }}>
				Home {"  /  "} Settings {"  /  "} Objects {"  /  "} {activeObject?.singularName || "Custom object"}
				</Typography>
				<Typography sx={{ fontWeight: 700, fontSize: "24px", mb: 2 }}> */}
					{/* {activeObject?.singularName || "Custom object"} */}
					{/* Custom objects */}
				{/* </Typography> */}
			</Box>
			
			{activeObject ? <Box sx={{ position: "relative", display: "flex", ml: 3, pt: 3}}>
					<Box
						onClick={() => dispatch(updateSetingsTab(0))}
						style={{
							borderBottom: !tab ? "2px solid #4787EA" : "",
							padding: "10px",
							color: !tab ? "#4787EA" : "black",
							cursor: "pointer"
						}}
					>
						Configuration
					</Box>

					<Box
						onClick={() => dispatch(updateSetingsTab(1))}
						style={{
							borderBottom: tab ? "2px solid #4787EA": "",
							padding: "10px",
							color: tab ? "#4787EA" : "black",
							cursor: "pointer"
						}}
					>
						Fields
					</Box>
			</Box> : ""}
			<Divider sx={{ mt: "0px" }} />
			{/* {!(Array.isArray(objectList) && objectList.length) ? ( */}
			{!activeObject ? (
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
				{!tab ? <Configuration /> : <FieldSettings />}
				</>
			)}
			<CreateDrawer open={openCreateObject} onClose={handleCloseDrawer} />
		</>
	);
};

export default ObjectSettings;
