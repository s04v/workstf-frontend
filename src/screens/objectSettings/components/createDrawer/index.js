import {
	Box,
	Button,
	Checkbox,
	Divider,
	Drawer,
	FormControlLabel,
	MenuItem,
	TextField,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateDrawer } from "./useCreateDrawer";
import { StarPurple500 } from "@mui/icons-material";

const CreateDrawer = ({ open, onClose, edit = false }) => {
	const { formik, appList, selectedApp, checkApp, makeLabel, handleSelectApp, handleClose } = useCreateDrawer(onClose, edit);

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
						<Typography variant="h6" sx={{ backgroundColor: "#F7F7F7", py: 1.5, px: 4 }}>
							Choose application
						</Typography>
						<Typography sx={{ fontSize: "14px", color: "grey", py: 2, px: 4, mb: 1, borderBottom: "1px solid rgba(33, 33, 33, 0.12);" }}>
							{ !edit ? "Associate you object with an app (optional):" : "Change objects application:" }
						</Typography>
						<Box sx={{ px: 4 }}>
							{ !edit ?<TextField
								fullWidth
								select
								sx={{ my: 3, fontSize: "16px" }}
								autoComplete="off"
								name="app"
								label="Select an application"
								value={selectedApp ? selectedApp.name : ""}	
								onChange={formik.handleChange}
								error={formik.touched.app && Boolean(formik.errors.app)}
								helperText={formik.touched.app && formik.errors.app}
							>
								{appList.map(app => {
									return <MenuItem value={app.name} sx={{ fontSize: "14px" }} onClick={() => handleSelectApp(app)}>
										{app.name}
									</MenuItem>
								})}
							</TextField> 
							:
							<TextField
								InputLabelProps={{ shrink: true }}
								fullWidth
								select
								autoComplete="off"
								sx={{ my: 3, fontSize: "16px" }}
								name="app"
								label={"Change objects application:"}
								value={10}
								// value={formik.values.type}
								// onChange={formik.handleChange}
								// error={formik.touched.type && Boolean(formik.errors.type)}
								// helperText={formik.touched.type && formik.errors.type}
								>
									<MenuItem value={10} sx={{ display: "none" }}>
										{makeLabel()}
									</MenuItem>
									<Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
									{Array.isArray(formik.values.app) && appList.map((app, i) => {
										const checked = formik.values.app.find(o => o._id === app._id) ? true : false;

										const val = {name: app.name, _id: app._id};
										return (
											<FormControlLabel
												sx={{
													px: 4,
													borderBottom: "1px solid #c6c6c6",
													// width: "100%",
												}}
												control={
													<Checkbox
														sx={{
															color: "black",
															"&.Mui-checked": {
																color: '#4787EA'
															}
														}}
														value={val}
														variant="outlined"
														name={`app[${i}]`}
														checked={checked}
														onChange={() => checkApp(checked, val)}
													/>
												}
												label={app.name}
											/>
										);
										})
									}
									</Box>
								</TextField>
							}
						</Box>
					</Box>
					<Box>
						<Typography variant="h6" sx={{ backgroundColor: "#F7F7F7", py: 1.5, px: 4}}>
							Configure your new custom object{" "}
						</Typography>
						<Typography sx={{ fontSize: "14px", px: 4, color: "grey", py: 2,  borderBottom: "1px solid rgba(33, 33, 33, 0.12);" }}>
							Objects name in singular and plural.
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
					<Box>
						<Typography variant="h6" sx={{ backgroundColor: "#F7F7F7", py: 1.5, px: 4}}>
							{ !edit ? "Create your primary field" : "Edit your primary field" }
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
							{ !edit ? <b>Create Object</b> : <b>Save</b> }
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

export { CreateDrawer };
export default CreateDrawer;
