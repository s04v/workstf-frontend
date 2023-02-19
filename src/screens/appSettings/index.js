import {
	Box,
	Button,
	Divider,
	Typography,
} from "@mui/material";
import LayersIcon from '@mui/icons-material/Layers';
import { useState } from "react";
import { useAppSettings } from "./useAppSettings";
import CreateDrawer from "./components/createDrawer";
import Configuration from "./components/configuration";
import Associations from "./components/associations";
import SettingsLoader from "./components/loaders/SettingsLoader";

const AppSettings = () => {
	const {
		activeApp,
		appList,
		loading,
		openCreateDrawer,
		handleOpenDrawer,
    handleCloseDrawer,
	} = useAppSettings();

	const [tab, setTab] = useState(0); 
	return (
		<>
		{ loading ? <SettingsLoader /> : 
		<>
    <Box sx={{ backgroundColor: "#F7F7F7", px: 3}}>
			<Typography sx={{ fontWeight: 500, fontSize: 16, my: "19px", display: "flex", gap: 1}}>
				<Typography sx={{textDecoration: "underline"}}>Home</Typography>
				{" / "}
				<Typography sx={{textDecoration: "underline"}}>Settings</Typography>
				{" / "}
				<Typography sx={{textDecoration: "underline"}}>Applications</Typography>
			
				{!activeApp || !activeApp?.isDefault ? 
					<>
						{" / "}
						<Typography sx={{textDecoration: "underline"}}>Custom Applications</Typography> 
					</> : ""
				}
				{activeApp ? <>{" / "} <Typography sx={{textDecoration: "underline"}}>{activeApp.name}</Typography></> : ""}

			</Typography>
			<Typography sx={{ fontWeight: 700, fontSize: "24px", mb: 2 }}>
				{activeApp && activeApp.name}
			</Typography>
		</Box>

			
			{/* { !(Array.isArray(appList) && appList.length) ? ( */}
			{ !activeApp ? (
				<>
				<Divider sx={{ mt: "0px" }} />
				<Box
					sx={{
						padding: "30px",
						display: "flex",
						flexDirection: "column",
						backgroundColor: "white",
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
            <LayersIcon sx={{fontSize: 84, color: "#dcd8d8"}} />
						<Typography sx={{textAlign: "center", width: 250}}>
            	Create your own Custom App and elevate your workflow.
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
							<LayersIcon />
							<Typography sx={{fontWeight: 700}}>Create Custom App</Typography>
						</Button>
					</Box>
				</Box>
				</>

			) : (
				<>
				<Box sx={{ position: "relative", display: "flex", pl: 3, pt: 3, backgroundColor: "white", borderBottom: "1px solid #2121211F" }}>
						<Box
							onClick={() => setTab(0)}
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
							onClick={() => setTab(1)}
							style={{
								borderBottom: tab ? "2px solid #4787EA": "",
								padding: "10px",
								color: tab ? "#4787EA" : "black",
								cursor: "pointer"
							}}
						>
							Associations
						</Box>
				</Box>
				{ !tab ? <Configuration /> : <Associations /> }
				</>
			)}
			<CreateDrawer open={openCreateDrawer} onClose={handleCloseDrawer} />

		</>
		}
		</>
	);
};

export default AppSettings;
