import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{bottom: 0, mb:2}}>
            <Typography align="center" fontSize={12} color="grey">©2023 Workstf, Inc. All Right Reserved</Typography>
            <Typography align="center" fontSize={12}><a href='#'><b>Privacy Policy</b></a></Typography>
        </Box>
    );
}

export default Footer;