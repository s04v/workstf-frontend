import { Box, Collapse, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector } from "react-redux";
import { useFieldSettings } from "@src/screens/fieldSettings/useFieldSettings";

const NestedMenu = () => {
	const [openObject, setOpenObject] = useState(false);
	const [openApp, setOpenApp] = useState(false);
	const location = useLocation();
	const objectList = useSelector((state) => state.settings.objectList);
	const activeObject = useSelector((state) => state.settings.activeObject);
	const { handleChangeObject } = useFieldSettings();

	const handleObjectClick = (obj) => {
		if(obj)
			handleChangeObject(obj);
	}

	return (
		<Box sx={{ 
			height: "100%",
			backgroundColor: "white"
		}}>
			<Box sx={{ mx: 1 }}>
				<Typography sx={{
					fontSize: 18,
					fontWeight: 700,
					py: "13px",
					px: 2,
					borderBottom: "1px solid rgba(33, 33, 33, 0.12)"
				}}>
					Account Setup
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
							fontWeight: 700,
							'&:hover': {
								background: "#F7F7F7",
						 	}
						}}
					>
						Apps
						<KeyboardArrowDownIcon />
					</Typography>
					<Collapse in={openApp}>
						<Box
							sx={{
								padding: 1,
								pl: 5,
								cursor: "pointer",
								py: 1,
								'&:hover': {
									background: "#F7F7F7",
								}
							}}
						>
							CRM
						</Box>
						<Box
							sx={{
								padding: 1,
								pl: 5,
								cursor: "pointer",
								py: 1,
								'&:hover': {
									background: "#F7F7F7",
								}
							}}
						>
							Sales
						</Box>
						<Box
							sx={{
								padding: 1,
								pl: 5,
								cursor: "pointer",
								py: 1,
								'&:hover': {
									background: "#F7F7F7",
								}
							}}
						>
							Custom apps
						</Box>
					</Collapse>
				</Box>
				<Typography sx={{
					fontSize: 18,
					fontWeight: 700,
					py: "13px",
					px: 2,
					borderBottom: "1px solid rgba(33, 33, 33, 0.12)"
				}}>
					Object Manager
				</Typography>
				<Typography
					onClick={() => setOpenObject(!openObject)}
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						cursor: "pointer",
						padding: 1,
						px: 2,
						fontWeight: 700,
						'&:hover': {
							background: "#F7F7F7",
						}
					}}
				>
					Objects
					<KeyboardArrowDownIcon />
				</Typography>
				<Collapse in={openObject}>
					<Typography
						onClick={() => handleObjectClick(objectList ? objectList[0] : null)}
						sx={{
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
					{objectList && objectList.map((obj) => {
						return <Typography
							onClick={() => handleObjectClick(obj)}
							sx={{
								backgroundColor: activeObject?._id === obj._id ? "#F7F7F7" : null,
								color: activeObject?._id === obj._id  ? "#4787EA" : "black",
								fontWeight: activeObject?._id === obj._id ? 700 : null,
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
						</Typography>
					})}
					
				</Collapse>
			</Box>
			
		</Box>
	);
};

export default NestedMenu;
