import { Box, Typography } from "@mui/material";

const Footer = () => {
	return (
		<Box sx={{ bottom: 0, mb: 2, mt: "auto" }}>
			<Typography align="center" fontSize={12} color="grey">
				©2023 Workstf, Inc. All Right Reserved
			</Typography>
			<Typography align="center" fontSize={12}>
				<a href="#" style={{ color: "primary.main" }}>
					<b>Privacy Policy</b>
				</a>
			</Typography>
		</Box>
	);
};

export default Footer;
