import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AppsIcon from "@mui/icons-material/Apps";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import { useBase } from "./useBase";
import Footer from "../footer";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import React, { useEffect, useState } from "react";
import Server from "@src/services/server";
import { appIcons, appIconsOptions } from "@src/shared/constants/appIcons";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountAppList } from "@src/store/accountSlice";

const BasePage = (props) => {
	const dispatch = useDispatch();
	const { account, handleLogout, makeHeader } = useBase();
	// const [appList, setAppList] = useState([]);
	const appList = useSelector(state => state.account.appList);
	useEffect(() => {
		const fetchData = async () => {
			const res = await Server.App.getList();
			console.log('get app list', res);
			// setAppList(res.data);
			dispatch(updateAccountAppList(res.data));
		}
		fetchData();

		}, [])

		console.log(props);
		return (
		<Box
			sx={{
				display: "flex",
				minHeight: "100vh",
			}}
		>
			<Box
				sx={{
					backgroundColor: "#212121",
					width: "80px",
					textAlign: "center",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<AppsIcon sx={{ mt: 3, color: "white" }} />
				<Link to="/home">
					{window.location.pathname.startsWith("/home") ?
						<HomeOutlinedIcon
						sx={{
							mt: 3,
							color: "black",
							backgroundColor: "white",
							padding: "13px",
							borderRadius: "50%",
						}}
					/> : 
					<HomeIcon
						sx={{
							mt: 3,
							padding: "13px",
							borderRadius: "50%",
							color: "white",
							":hover": { backgroundColor: "black"}
						}}
					/>}
				</Link>
				{console.log("applist", appList)}
				{appList && appList.map(app => {
					return <a href={`/${app._id}/${account._id}`}>
						{!window.location.pathname.startsWith(`/${app._id}`) ?
								React.cloneElement(appIcons[app.iconType], { sx: { 
									mt: 3,
									padding: "13px",
									borderRadius: "50%",
									color: "white",
									":hover": { backgroundColor: "black"}}})
									: 
									React.cloneElement(appIconsOptions[app.iconType], { sx: { 
										mt: 3,
												backgroundColor: "white",
												padding: "13px",
												borderRadius: "50%",
												color: "black"}})

							// 	<PersonOutlineIcon
							// 	sx={{
							// 		mt: 3,
							// 		backgroundColor: "white",
							// 		padding: "13px",
							// 		borderRadius: "50%",
							// 		color: "black",
							// 	}}
							// /> : 
							// <PersonIcon
							// 	sx={{
									
							// 	}}
							// />}
					}
					</a>
				})}
			</Box>
			<Box sx={{
				backgroundColor: "#f7f7f7",
				width: "100%",
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
			}}>
				<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							backgroundColor: "white",
							height: "70px",
							pr: 3,
							pl: 3,
							borderBottom: "2px solid rgba(0, 0, 0, 0.12)"
							// borderBottom: "1px solid black"
						}}
					>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 2,
							}}
						>
							<img src="./assets/small-logo.svg" alt="" style={{ width: "40px" }} />
							{/* <Typography fontSize={18}>
								<b>{makeHeader()}</b>
							</Typography> */}
						</Box>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 2,
							}}
						>
							<Typography color="grey">Welcome, {account.firstName}</Typography>
							<Link to="/settings">
								<SettingsIcon sx={{ color: "primary.main", padding: "10px", borderRadius: "50%", ":hover": { backgroundColor: "rgba(33, 33, 33, 0.04)" } }} />
							</Link>
							<Typography
								color="primary.main"
								sx={{
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									gap: 1,
								}}
								onClick={handleLogout}
							>
								<LogoutIcon sx={{ fontSize: 18 }} />
							</Typography>
						</Box>
				</Box>
				<Box
					sx={{
						// pt: 3,
						// pr: 4,
						// pl: 4,
						backgroundColor: "white",
						display: "flex",
						flexDirection: "column",
						height: "100%"
					}}
				>
					{props.children}
				</Box>
			</Box>
		</Box>
	);
};

export default BasePage;
