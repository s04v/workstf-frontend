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

const CreateDrawer = ({ open, onClose }) => {
	const { formik, handleClose } = useCreateDrawer(onClose);

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
				<CloseIcon sx={{ fontSize: "24px", cursor: "pointer" }} onClick={handleClose} />
				<Typography sx={{ fontSize: "22px" }}>
					Create custom object
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					height: "100%"
				}}
			>
				<form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", height: "100%"}}>
					<Box sx={{width: "100%"}}>
						<Typography variant="h6" sx={{ backgroundColor: "#F7F7F7", fontWeight: 700, py: 1.5, px: 4 }}>
							Choose application
						</Typography>
						<Typography sx={{ fontSize: "14px", color: "grey", py: 2, px: 4, mb: 1, borderBottom: "1px solid rgba(33, 33, 33, 0.12);" }}>
							Associate you object with an app (optional):
						</Typography>
						<Box sx={{ px: 4,}}>
							<TextField
								fullWidth
								select
								sx={{ my: 3, fontSize: "16px" }}
								autoComplete="off"
								name="app"
								label="Select an application"
								value={formik.values.app}	
								onChange={formik.handleChange}
								error={formik.touched.app && Boolean(formik.errors.app)}
								helperText={formik.touched.app && formik.errors.app}
							>
								<MenuItem value="sales" sx={{ fontSize: "14px" }}>
									Sales
								</MenuItem>
								<MenuItem value="crm" sx={{ fontSize: "14px" }}>
									CRM
								</MenuItem>
							</TextField>
						</Box>
					</Box>
					<Box sx={{ }}>
							<Typography variant="h6" sx={{ backgroundColor: "#F7F7F7", fontWeight: 700, py: 1.5, px: 4}}>
								Configure your new custom object{" "}
							</Typography>
						<Typography sx={{ fontSize: "14px", px: 4, color: "grey", py: 2,  borderBottom: "1px solid rgba(33, 33, 33, 0.12);" }}>
							These settings can't be chenged later.
						</Typography>
						<Box sx={{ width: "100%", py: 3}}>
							<Box sx={{ px: 4, marginBottom: "25px" }}>
								<TextField
									fullWidth
									sx={{ fontSize: "14px" }}
									autoComplete="off"
									name="singularName"
									label="Object Name (Singular) *"
									value={formik.values.singularName}
									onChange={formik.handleChange}
									error={
										formik.touched.singularName &&
										Boolean(formik.errors.singularName)
									}
									helperText={
										formik.touched.singularName && formik.errors.singularName
									}
								/>
							</Box>
							<Box sx={{ px: 4 }}>
								<TextField
									fullWidth
									sx={{ fontSize: "14px" }}
									autoComplete="off"
									name="pluralName"
									label="Object name (Plural) *"
									value={formik.values.pluralName}
									onChange={formik.handleChange}
									error={
										formik.touched.pluralName &&
										Boolean(formik.errors.pluralName)
									}
									helperText={
										formik.touched.pluralName && formik.errors.pluralName
									}
								/>
							</Box>
						</Box>
					</Box>
					<Box sx={{}}>
						<Typography variant="h6" sx={{ backgroundColor: "#F7F7F7", fontWeight: 700, py: 1.5, px: 4}}>
							Create your primary field
						</Typography>
						<Typography sx={{ fontSize: "14px", px: 4, color: "grey", py: 2,  borderBottom: "1px solid rgba(33, 33, 33, 0.12);" }}>
							This filed will be the name for each of yours records. Example. Opportunity name.
						</Typography>
						
						<Box sx={{ my: 3 }}>
							<Box sx={{px: 4, marginBottom: "25px" }}>
								<TextField
									fullWidth
									sx={{ fontSize: "14px" }}
									autoComplete="off"
									name="primaryName"
									label="Primary field name *"
									value={formik.values.primaryName}
									onChange={formik.handleChange}
									error={
										formik.touched.primaryName &&
										Boolean(formik.errors.primaryName)
									}
									helperText={
										formik.touched.primaryName && formik.errors.primaryName
									}
								/>
							</Box>
							<Box sx={{ px: 4 }}>
								<TextField
									fullWidth
									select
									sx={{ fontSize: "14px" }}
									autoComplete="off"
									name="primaryType"
									label="Primary field type *"
									value={formik.values.primaryType}
									onChange={formik.handleChange}
									error={
										formik.touched.primaryType &&
										Boolean(formik.errors.primaryType)
									}
									helperText={
										formik.touched.primaryType && formik.errors.primaryType
									}
								>
									<MenuItem value="text" sx={{ fontSize: "14px" }}>
										Single-line text
									</MenuItem>
									<MenuItem value="number" sx={{ fontSize: "14px" }}>
										Number
									</MenuItem>
								</TextField>
							</Box>
						</Box>
					</Box>
					<Box sx={{ mt: "auto", px: 4, backgroundColor: "#FBFBFB", borderTop: "1px solid rgba(196, 196, 196, 0.29)"}}>
						<Button
							type="submit"
							variant="contained"
							sx={{
								padding: "7px 35px",
								mt: 3,
								mb: 3,
								mr: 2,
								borderRadius: 1,
								fontSize: "16px"
							}}
						>
							<b>Create Object</b>
						</Button>
						<Button
							onClick={handleClose}
							variant="outlined"
							sx={{
								padding: "7px 35px",
								mt: 3,
								mb: 3,
								borderRadius: 1,
								fontSize: "16px"
							}}
						>
							<b>Cancel</b>
						</Button>
					</Box>
				</form>
			</Box>
		</Drawer>
	);
};

export default CreateDrawer;
