import {
	Box,
	Button,
	Divider,
	Drawer,
	MenuItem,
	TextField,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateDrawer } from "./useCreateDrawer";
import React, { useState } from "react";
import { appIconsOptions, appIcons } from "@src/shared/constants/appIcons";

const CreateDrawer = ({ open, onClose, edit }) => {
  const {
		formik,
    selectedIcon,
    handleSelectIcon,
		handleClose,
	} = useCreateDrawer(onClose, edit);

	return (
		<Drawer
			anchor={"right"}
			open={open}
			PaperProps={{
				sx: { width: "521px" },
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 2,
					backgroundColor: "primary.main",
					px: 4,
					py: 2,
					color: "white",
				}}
			>
				<CloseIcon
					sx={{ fontSize: "24px", cursor: "pointer" }}
					onClick={handleClose}
				/>
				<Typography sx={{ fontSize: "22px" }}>{edit ? "Edit application" : "Create custom app"}</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					height: "100%",
				}}
			>
				<form
					onSubmit={formik.handleSubmit}
					style={{ display: "flex", flexDirection: "column", height: "100%" }}
				>
					<Box sx={{ width: "100%" }}>
						<Typography
							variant="h6"
							sx={{ backgroundColor: "#F7F7F7", py: 1.5, px: 4 }}
						>
							{edit ? "Change your application name" : "Configure your custom app"}
							
						</Typography>
						<Typography
							sx={{
								fontSize: "14px",
								color: "grey",
								py: 2,
								px: 4,
								mb: 1,
								borderBottom: "1px solid rgba(33, 33, 33, 0.12);",
							}}
						>
							These settings can't be changed later.
						</Typography>
						<Box sx={{ px: 4 }}>
							<TextField
								fullWidth
								sx={{ my: 3, fontSize: "16px" }}
								autoComplete="off"
								name="name"
								label="App name"
								value={formik.values.name}
								onChange={formik.handleChange}
								error={formik.touched.name && Boolean(formik.errors.name)}
								helperText={formik.touched.name && formik.errors.name}
							/>
						</Box>
					</Box>
					<Box sx={{ height: "100%", display: "contents" }}>
						<Typography
							variant="h6"
							sx={{ backgroundColor: "#F7F7F7", py: 1.5, px: 4 }}
						>
							{edit ? "Change application icon" : "Choose your custom app icon"}
						</Typography>
						<Box sx={{ width: "100%", py: 3, flexGrow: 1 }}>
							<Box
								sx={{
									px: 4,
									marginBottom: "25px",
									display: "grid",
									gridTemplateColumns: "repeat(9, 1fr)",
								}}
							>
								{appIconsOptions.map((icon, i) => (
									<Box
										sx={{
											px: 1.5,
											py: 1,
											borderRadius: "50%",
											cursor: "pointer",
											backgroundColor: selectedIcon === i ? "#F7F7F7" : "unset",
										}}
										onClick={() => handleSelectIcon(i)}
									>
										{React.cloneElement(icon, { sx: { fontSize: 26 } })}
									</Box>
								))}
							</Box>
							<Divider />
							<Box sx={{ px: 4, my: 3 }}>
								<Typography sx={{ fontSize: "13px", color: "#828282" }}>
									Preview
								</Typography>
								<Box
									sx={{ display: "flex", my: 2, gap: 2, alignItems: "center" }}
								>
									<Box
										sx={{
											display: "flex",
											color: "white",
											padding: 2,
											backgroundColor: "#212121",
											borderRadius: "50%",
										}}
									>
										{React.cloneElement(appIcons[selectedIcon], {
											sx: { margin: "auto" },
										})}
									</Box>
									<Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
										{formik.values.name}
									</Typography>
								</Box>
							</Box>
							<Divider />
						</Box>

						<Box
							sx={{
								mt: "auto",
								px: 4,
								backgroundColor: "#FBFBFB",
								borderTop: "1px solid rgba(196, 196, 196, 0.29)",
							}}
						>
							<Button
								type="submit"
								variant="contained"
								sx={{
									padding: "7px 25px",
									mt: 3,
									mb: 3,
									mr: 2,
									borderRadius: 1,
									fontSize: "16px",
								}}
							>
								{edit ? <b>Save</b> : <b>Create App</b>}
								
							</Button>
							<Button
								onClick={handleClose}
								variant="outlined"
								sx={{
									padding: "7px 25px",
									mt: 3,
									mb: 3,
									borderRadius: 1,
									fontSize: "16px",
								}}
							>
								<b>Cancel</b>
							</Button>
						</Box>
					</Box>
				</form>
			</Box>
		</Drawer>
	);
};

export default CreateDrawer;
