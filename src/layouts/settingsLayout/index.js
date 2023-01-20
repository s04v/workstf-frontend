import { Box, Divider, Typography } from "@mui/material";
import DataTableLoader from "@src/screens/apps/components/loader";
import Server from "@src/services/server";
import { updateAccount } from "@src/store/accountSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SettingsLoader from "./components/loader/SettingsLoader";
import NestedMenu from "./NestedMenu";

const SettingsLayout = (props) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const activeObject = useSelector((state) => state.settings.activeObject);
	const [tab, setTab] = useState(0); 
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function fetchAccountInfo() {
			const res = await Server.Acconut.getInfo();
			dispatch(updateAccount(res.data));
		}
		fetchAccountInfo();

		setTimeout(() => setLoading(false), 500); 
	}, []);
	
	console.log("activeObject", activeObject);
	return (
		<Box
			sx={{
				// mt: 4,
				display: "flex",
				height: "100%",
				position: "relative",
			}}
		>
			<Box sx={{ width: "270px", borderRight: "1px solid rgba(33, 33, 33, 0.12)" }}>
				<NestedMenu />
			</Box>
			{loading ? <SettingsLoader /> 
			: 
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
				}}
			>
				<Box sx={{ backgroundColor: "#F7F7F7", px: 3}}>
					<Typography sx={{ fontWeight: 500, fontSize: 16, my: "19px" }}>
					Home {"  /  "} Settings {"  /  "} Objects {"  /  "} {activeObject?.singularName || "Custom object"}
					</Typography>
					<Typography sx={{ fontWeight: 700, fontSize: "24px", mb: 2 }}>
						{/* {activeObject?.singularName || "Custom object"} */}
						Custom objects
					</Typography>
				</Box>
				
				{activeObject ? <Box sx={{ position: "relative", display: "flex", ml: 3}}>
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
							Fields
						</Box>
				</Box> : ""}
				<Divider sx={{ mt: "0px" }} />
				{ React.cloneElement(props.children, { tab }) }
			</Box>}
		</Box>
	);
};

export default SettingsLayout;
