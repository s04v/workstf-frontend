import { Box, Collapse, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector } from "react-redux";
import { useFieldSettings } from "@src/screens/fieldSettings/useFieldSettings";
import { useAppSettings } from "@src/screens/appSettings/useAppSettings";
import CreateDrawer from "@src/screens/appSettings/components/createDrawer";
import { CreateDrawer as CreateObjectDrawer }  from "@src/screens/objectSettings/components/createDrawer";
import { useObjectsSettings } from "@src/screens/objectSettings/useObjectSettings";

const NestedMenu = () => {
	const [openObject, setOpenObject] = useState(false);
	const [openApp, setOpenApp] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const objectList = useSelector((state) => state.settings.objectList);
	const activeObject = useSelector((state) => state.settings.activeObject);
	const appList = useSelector((state) => state.settings.app.list);
	const activeApp = useSelector((state) => state.settings.app.active);

	const { handleChangeObject } = useFieldSettings();
	const { handleChangeApp, handleOpenDrawer, openCreateDrawer, handleCloseDrawer } = useAppSettings();
	const objectSettings = useObjectsSettings();

	const handleObjectClick = (obj) => {
		if(obj)
			handleChangeObject(obj);
	}

	const wrapHandleChangeApp = (app) => {
		const path = window.location.pathname;

		if(!app) {
			const customApps = appList.find(o => !o.isDefault) || null;
			const newApp = customApps || null;
			handleChangeApp(newApp);
		} else {
			handleChangeApp(app);
		}

		if(!path.endsWith('/custom-app')){
			navigate('/settings/custom-app');
		}
	}

	const wrapHandleChangeObject = (obj) => {
		const path = window.location.pathname;
		if(!obj) {
			const customObjects = objectList.find(o => !o.isDefault) || null;
			const newObj = customObjects || null;
			handleChangeObject(newObj);
		} else {
			handleChangeObject(obj);
		}
		if(!path.endsWith('settings')){
			navigate('/settings');
		}
	}

	console.log("objectList", objectList);
	return (
		<Box sx={{ 
			height: "100%",
			backgroundColor: "white"
		}}>
			<Box sx={{ mx: 1 }}>
				<Typography sx={{
					fontSize: 18,
					fontWeight: 700,
					py: "17px",
					px: 2,
					borderBottom: "1px solid rgba(33, 33, 33, 0.12)"
				}}>
					Settings
				</Typography>
				<Box>
					<Typography
						onClick={() => setOpenApp(!openApp)}
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							cursor: "pointer",
							padding: 1,
							px: 2,
							'&:hover': {
								background: "#F7F7F7",
						 	}
						}}
					>
						Applications
						<KeyboardArrowDownIcon />
					</Typography>
					<Collapse in={openApp}>
						{appList.map(app => {
							return app.isDefault ? <Box
							onClick={() => wrapHandleChangeApp(app)}
							sx={{
								backgroundColor: window.location.pathname.endsWith('/custom-app') && activeApp?._id === app._id ? "#F7F7F7" : null,
								color: window.location.pathname.endsWith('/custom-app') && activeApp?._id === app._id  ? "#4787EA" : "black",
								fontWeight: window.location.pathname.endsWith('/custom-app') && activeApp?._id === app._id ? 700 : null,
								padding: 1,
								pl: 5,
								cursor: "pointer",
								py: 1,
								'&:hover': {
									background: "#F7F7F7",
								}
							}}
						>
							{app.name}
						</Box> : null;
						})}
						<Box
							onClick={() => wrapHandleChangeApp(null)}
							sx={{
								backgroundColor: window.location.pathname.endsWith('/custom-app') && !activeApp?.isDefault ? "#F7F7F7" : null,
								color: window.location.pathname.endsWith('/custom-app') && !activeApp?.isDefault  ? "#4787EA" : "black",
								fontWeight: window.location.pathname.endsWith('/custom-app') && !activeApp?.isDefault ? 700 : null,
								padding: 1,
								pl: 5,
								cursor: "pointer",
								py: 1,
								'&:hover': {
									background: "#F7F7F7",
								}
							}}
						>
							Custom applications
						</Box>
					</Collapse>
				</Box>
				<Typography
					onClick={() => setOpenObject(!openObject)}
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						cursor: "pointer",
						padding: 1,
						px: 2,
						'&:hover': {
							background: "#F7F7F7",
						}
					}}
				>
					Objects & Fields
					<KeyboardArrowDownIcon />
				</Typography>
				<Collapse in={openObject}>
					{objectList && objectList.map((obj) => {
						return obj.isDefault ? <Typography
							onClick={() => wrapHandleChangeObject(obj)}
							sx={{
								backgroundColor: window.location.pathname.endsWith('settings') && activeObject?._id === obj._id ? "#F7F7F7" : null,
								color: window.location.pathname.endsWith('settings') && activeObject?._id === obj._id  ? "#4787EA" : "black",
								fontWeight: window.location.pathname.endsWith('settings') && activeObject?._id === obj._id ? 700 : null,
								padding: 1,
								pl: 5,
								cursor: "pointer",
								py: 1,
								'&:hover': {
									background: "#F7F7F7",
								}
							}}
						>
							{obj.pluralName}
						</Typography> : null;
					})}
					<Typography
						onClick={() => wrapHandleChangeObject(null)}
						sx={{
							backgroundColor: window.location.pathname.endsWith('settings') &&  !activeObject?.isDefault ? "#F7F7F7" : null,
							color: window.location.pathname.endsWith('settings') && !activeObject?.isDefault ? "#4787EA" : "black",
							fontWeight: window.location.pathname.endsWith('settings') && !activeObject?.isDefault ? 700 : null,
							padding: 1,
							pl: 5,
							cursor: "pointer",
							py: 1,
							'&:hover': {
								background: "#F7F7F7",
							}
						}}
					>
						Custom Objects
					</Typography>
				</Collapse>
			</Box>
		</Box>
	);
};

export default NestedMenu;
