import { Box, Typography } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

const Footer = () => {
	return (
		<Box sx={{ bottom: 0, mb: 2, mt: "auto" }}>
			<Typography align="center" fontSize={16} color="grey">
				©2023 Workstf, Inc. All Right Reserved
			</Typography>
			<Typography align="center" fontSize={16}>
				<a href="/" style={{ color: "#212121" }}>
					<b style={{ textDecoration: "underline" }}>Privacy Policy</b>
					{"  "}
					<LaunchIcon sx={{ fontSize: "15px", verticalAlign: "middle" }} />
				</a>
			</Typography>
		</Box>
	);
};

export default Footer;
