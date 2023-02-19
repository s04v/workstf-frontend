import {
	Box,
	TextField,
	Button,
	Typography,
	Divider,
	MenuItem,
	Paper,
} from "@mui/material";
import { useAssociations } from "./useAssociations";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useAppSettings } from "../../useAppSettings";

const Associations = () => {
	const {
		activeApp,
		appList,
		handleChangeApp,
	} = useAppSettings();

  const {
    loading,
    objects,
    associatedObjects,
    selectedObject,
    handleSelectObject,
    associateObject,
    dissociateObject,
  } = useAssociations();
	return (
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					backgroundColor: "white",
					width: "100%",
				}}
			>
				{ !activeApp.isDefault ? <Box
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
							px: 3,
						}}
					>
						<Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
							<TextField
								select
								sx={{ my: 2, width: "400px" }}
								autoComplete="off"
								name="selectedApp"
								value={activeApp && activeApp.name}
								label="Select application"
								// onChange={(e) => setSelectedObject(e.target.value)}
								// error={formik.touched.country && Boolean(formik.errors.country)}
								// helperText={formik.touched.country && formik.errors.country}
							>
								{appList.filter(obj => !obj.isDefault).map((app) => (
									<MenuItem
										value={app.name}
										onClick={() => handleChangeApp(app)}
									>
										{app.name}
									</MenuItem>
								))}
							</TextField>
						</Box>
					</Box> 
				</Box>: null}
				<Divider />
				<Box sx={{ backgroundColor: "#F7F7F7", py: 2 }}>
					<Typography
						sx={{
							fontSize: 20,
							mx: 3,
						}}
					>
						Associated Objects
					</Typography>
				</Box>
				<Box
					sx={{ mt: 2, px: 3, py: 2, display: "flex", gap: 3, height: "100%" }}
				>
					<Paper
						sx={{
							width: "460px",
						}}
					>
						<Typography sx={{ padding: 2, fontWeight: 700 }}>
							All Objects
						</Typography>
						{objects &&
							objects.map((obj) => {
								const isSelected = selectedObject._id === obj._id;
								return (
									<>
										<Divider />
										<Typography
											sx={{ padding: 2, cursor: "pointer",  backgroundColor: isSelected ? "rgba(102, 162, 255, 0.08)" : "", color: isSelected ? "#4787EA" : ""}}
											onClick={() => handleSelectObject(obj)}
										>
											{obj.pluralName}
										</Typography>
									</>
								);
							})}
            {objects.length < associatedObjects.length ? <Divider /> : null}

						{/* <Typography sx={{ padding: 2, cursor: "pointer", backgroundColor: "rgba(102, 162, 255, 0.08)", color: "#4787EA" }}>Users</Typography>
						 */}
					</Paper>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
						<ChevronRightIcon sx={{ cursor: "pointer", padding: "10px", borderRadius: "50%", ":hover": { backgroundColor: "rgba(33, 33, 33, 0.04)" } }} onClick={associateObject} />
						<ChevronLeftIcon sx={{ cursor: "pointer", padding: "10px", borderRadius: "50%", ":hover": { backgroundColor: "rgba(33, 33, 33, 0.04)" } }} onClick={dissociateObject} />
					</Box>

					<Paper
						sx={{
							width: "460px",
						}}
					>
						<Typography sx={{ padding: 2, fontWeight: 700 }}>
							Associated Objects
						</Typography>
						{!loading && associatedObjects &&
							associatedObjects.map((obj) => {
								const isSelected = selectedObject._id === obj._id;
								return (
									<>
										<Divider />
										<Typography 
                      sx={{ padding: 2, cursor: "pointer", backgroundColor: isSelected ? "rgba(102, 162, 255, 0.08)" : "", color: isSelected ? "#4787EA" : "" }}
											onClick={() => handleSelectObject(obj)}
                      >
											{obj.pluralName}
										</Typography>
									</>
								);
							})}
            {associatedObjects.length < objects.length ? <Divider /> : null}
					</Paper>
				</Box>
			</Box>
		</>
	);
};

export default Associations;
