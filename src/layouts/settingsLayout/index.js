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
				backgroundColor: "white",
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
				
				{ React.cloneElement(props.children, { tab }) }
			</Box>}
		</Box>
	);
};

export default SettingsLayout;
