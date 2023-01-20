import {
	Box,
	Button,
	Checkbox,
	Container,
	Divider,
	FormControlLabel,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import Footer from "@src/layouts/footer";
import { useSignin } from "./useSignin";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Signin = () => {
	const { formik } = useSignin();

	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				alignItems: "start",
				height: "100vh",
			}}
		>
			{/* <img src="./workstf.png" alt="" style={{ width: "200px" }} /> */}
			<img
				style={{ position: "absolute", maxHeight: "100vh" }}
				src="./assets/part-background-1.svg"
				alt="part-background"
			/>
			<Box
				sx={{
					width: "24%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					margin: "0 auto",
					height: "100vh",
				}}
			>
				<img
					src="./assets/workstf-logo.svg"
					style={{ marginTop: 100, width: "11vw" }}
					alt=""
				/>
				<Typography
					sx={{ fontFamily: "Crimson Text !important", fontSize: "36px", fontWeight: 700, mt: "60px", mb: "30px" }}
				>
					Log in to your account
				</Typography>
				<Box
					sx={{
						width: "100%",
					}}
				>
					<form onSubmit={formik.handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									name="email"
									fullWidth
									autoComplete="off"
									label="Email address "
									value={formik.values.email}
									onChange={formik.handleChange}
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									name="password"
									fullWidth
									autoComplete="off"
									label="Password"
									type={"password"}
									value={formik.values.password}
									onChange={formik.handleChange}
									error={
										formik.touched.password && Boolean(formik.errors.password)
									}
									helperText={formik.touched.password && formik.errors.password}
								/>
							</Grid>
						</Grid>
						<FormControlLabel
							sx={{ textAlign: "start !important", my: 2}}
							control={<Checkbox defaultChecked />}
							label={<span style={{ fontSize: "16px" }}>Remember me</span>}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{
								mb: 2,
								borderRadius: 1,
								fontSize: "16px",
								fontWeight: 700,
							}}
						>
							Log in {' '} <KeyboardArrowRightIcon  />
						</Button>
					</form>
					<Divider
						sx={{
							backgroundColor: "gba(33, 33, 33, 0.3)",
							mt: "40px",
							mb: "30px",
						}}
					/>
					<Typography sx={{ textAlign: "center" }}>
						Don't have an account?  
						<a
							href="/signup"
							style={{
								fontWeight: 700,
								color: "black",
								textDecoration: "underline",
							}}
						>
							Sign up 
						</a>
					</Typography>
				</Box>
				<Footer sx={{ marginBottom: 0 }} />
			</Box>
		</Box>
	);
};

export default Signin;
