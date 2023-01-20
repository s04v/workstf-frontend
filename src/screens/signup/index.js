import {
	Box,
	Button,
	Divider,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import Footer from "@src/layouts/footer";
import { useSignup } from "./useSignup";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export const Signup = () => {
	const {
		formik,
	} = useSignup();

	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<img
				style={{ position: "absolute", maxHeight: "100vh" }}
				src="./assets/part-background.svg"
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
				<Box
					sx={{
						width: "100%",
						textAlign: "center",
					}}
				>
					<img
						src="./assets/workstf-logo.svg"
						style={{ marginTop: 100, width: "11vw" }}
						alt=""
					/>
					<Typography
					sx={{fontFamily: "Crimson Text !important", fontSize: "36px", fontWeight: 700, mt: "60px", mb: "30px" }}
					>
						Sign up for your account
					</Typography>
					<form onSubmit={formik.handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									name="firstName"
									fullWidth
									autoComplete="off"
									label="First name"
									value={formik.values.firstName}
									onChange={formik.handleChange}
									error={
										formik.touched.firstName && Boolean(formik.errors.firstName)
									}
									helperText={
										formik.touched.firstName && formik.errors.firstName
									}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									name="lastName"
									fullWidth
									autoComplete="off"
									label="Last name"
									value={formik.values.lastName}
									onChange={formik.handleChange}
									error={
										formik.touched.lastName && Boolean(formik.errors.lastName)
									}
									helperText={formik.touched.lastName && formik.errors.lastName}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									name="email"
									fullWidth
									autoComplete="off"
									label="Email"
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
							<Grid item xs={12}>
								<TextField
									name="confirmPassword"
									fullWidth
									autoComplete="off"
									type={"password"}
									label="Confirm password"
									value={formik.values.confirmPassword}
									onChange={formik.handleChange}
									error={
										formik.touched.confirmPassword &&
										Boolean(formik.errors.confirmPassword)
									}
									helperText={
										formik.touched.confirmPassword &&
										formik.errors.confirmPassword
									}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{
								mt: 3,
								mb: 3,
								borderRadius: 1,
								fontSize: "16px",
								fontWeight: 700,
							}}
						>
							Sign up {' '}<KeyboardArrowRightIcon />
						</Button>
					</form>
					<Typography align="left" fontSize={12} sx={{ color: "grey" }}>
						We're commited to your privacy. Workstf uses the information you
						provide to us to contact you about our relevant content, products,
						and services. You may unsubscribe from these communications as any
						time. For more information. check out our <a href="#" style={{textDecoration: "underline", color: "black", fontWeight: 700}}>Privacy Policy</a>
					</Typography>
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
							href="/signin"
							style={{
								fontWeight: 700,
								color: "black",
								textDecoration: "underline",
							}}
						>
							Log in
						</a>
					</Typography>
				</Box>
				<Footer />
			</Box>
		</Box>
	);
};

export default Signup;
