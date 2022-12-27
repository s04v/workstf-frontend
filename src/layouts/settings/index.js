import { Box } from "@mui/material";
import Server from "@src/services/server";
import { updateAccount } from "@src/store/accountSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import NestedMenu from "./NestedMenu";

const Settings = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		async function fetchAccountInfo() {
			const res = await Server.Acconut.getInfo();
			dispatch(updateAccount(res.data));
		}
		fetchAccountInfo();
	}, []);

	return (
		<Box
			sx={{
				mt: 4,
				mb: 4,
				display: "flex",
				height: "100%",
				gap: 4,
				position: "relative",
			}}
		>
			<Box sx={{ width: "200px" }}>
				<NestedMenu />
			</Box>
			{props.children}
		</Box>
	);
};

export default Settings;
