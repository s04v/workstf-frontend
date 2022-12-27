import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import { useSignin } from "./useSignin";

const Signin = () => {
	const { formik, showPassword, toggleShowPassword } = useSignin();

	return (
		<Container
			maxWidth="md"
			sx={{
				paddingTop: 4,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
			}}
		>
			<img src="./workstf.png" alt="" style={{ width: "200px" }} />
			<Box
				sx={{
					width: "50%",
					display: "flex",
					gap: 5,
					height: "100%",
					mt: 10,
				}}
			>
				<Box
					sx={{
						width: "100%",
					}}
				>
					<form onSubmit={formik.handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									size="small"
									name="email"
									fullWidth
									autoComplete="off"
									placeholder="Email address"
									value={formik.values.email}
									onChange={formik.handleChange}
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									size="small"
									name="password"
									fullWidth
									autoComplete="off"
									placeholder="Password"
									type={showPassword ? "text" : "password"}
									value={formik.values.password}
									onChange={formik.handleChange}
									error={
										formik.touched.password && Boolean(formik.errors.password)
									}
									helperText={formik.touched.password && formik.errors.password}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={toggleShowPassword}
												>
													{!showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</Grid>
						</Grid>
						<Typography
							fontSize={12}
							sx={{
								textDecoration: "underline",
								textAlign: "center",
								mt: 2,
								mb: 2,
							}}
						>
							<a href="#">Forgot my password</a>
						</Typography>
						<FormControlLabel
							sx={{ textAlign: "start !important" }}
							control={<Checkbox defaultChecked />}
							label={<span style={{ fontSize: "12px" }}>Remember me</span>}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 3, borderRadius: 3, fontSize: "14px" }}
						>
							Next
						</Button>
					</form>
				</Box>
			</Box>
		</Container>
	);
};

export default Signin;
