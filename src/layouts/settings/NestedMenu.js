import { Box, Collapse, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NestedMenu = () => {
	const [openObject, setOpenObject] = useState(false);
	const [openApp, setOpenApp] = useState(false);
	const location = useLocation();

	return (
		<Box>
			<Box>
				<Typography
					onClick={() => setOpenObject(!openObject)}
					sx={{
						display: "flex",
						alignItems: "center",
						cursor: "pointer",
						padding: 1,
					}}
				>
					{openObject ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
					Objects
				</Typography>
				<Collapse in={openObject}>
					<Link to="/settings">
						<Typography
							sx={{
								backgroundColor:
									location.pathname === "/settings" ? "#eaeaeae3" : null,
								padding: 1,
								pl: 5,
								borderRadius: "40px",
								cursor: "pointer",
								my: 1,
								color: "primary.main",
							}}
						>
							Custom Objects
						</Typography>
					</Link>
				</Collapse>
			</Box>
			<Box>
				<Typography
					onClick={() => setOpenApp(!openApp)}
					sx={{
						display: "flex",
						alignItems: "center",
						cursor: "pointer",
						padding: 1,
					}}
				>
					{openApp ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
					Apps
				</Typography>
				<Collapse in={openApp}>
					<Box
						sx={{
							padding: 1,
							pl: 5,
							borderRadius: "40px",
							cursor: "pointer",
							my: 1,
						}}
					>
						Sales
					</Box>
					<Box
						sx={{
							padding: 1,
							pl: 5,
							borderRadius: "40px",
							cursor: "pointer",
							my: 1,
						}}
					>
						Contacts
					</Box>
				</Collapse>
			</Box>
			<Box>
				<Link to="/settings/fields">
					<Typography
						sx={{
							backgroundColor:
								location.pathname === "/settings/fields" ? "#eaeaeae3" : null,
							display: "flex",
							alignItems: "center",
							borderRadius: "40px",
							cursor: "pointer",
							padding: 1,
							pl: 2,
							color: "primary.main",
						}}
					>
						Fields
					</Typography>
				</Link>
			</Box>
		</Box>
	);
};

export default NestedMenu;
