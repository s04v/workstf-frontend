import { Box, Button, Container, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import Footer from "../components/Footer";
import * as yup from 'yup';
import { useFormik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import Server from '../services/server';
import useAlert from "../utils/useAlert";

const validationSchema = yup.object({
    firstName: yup
        .string('Enter your first name')
        .required('First name is required'),
    lastName: yup
        .string('Enter your last name')
        .required('Last name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*._])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          )
        .required('Password is required'),
    confirmPassword: yup
        .string("Enter your password")
        .oneOf([yup.ref('password'), null], 'Your passwords do not match')
        .required('Please retype your password.')

  });
  

const Signup = () => {
    const { setAlert } = useAlert();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // delete values.confirmPassword;
            const res = await Server.Auth.signUp(values);
            if(res.error) {
                setAlert(res.errorMessage, 'error');
            }
            else {
                setAlert("Success", 'success');
                setTimeout(() => window.location.href = '/signin', 1000);
            }
        },
    });

    return (
        <Container maxWidth="md" sx={{
            paddingTop: 4,
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'center',
            height: '100vh'
        }}
        >
            <img src="./workstf-logo.svg" alt="" />
            <Box sx={{
                width:  '100%',
                display: 'flex',
                gap: 5,
                height: '100%'
            }}>
                <Box sx={{
                    width:  '50%',
                    textAlign: 'center'
                }}>
                    <h1>Create your free account</h1>
                    <Button fullWidth variant="contained" sx={{mb:2, borderRadius: 3, fontSize: '14px'}} disabled>Sign up with Google</Button>
                    <Button fullWidth variant="contained" sx={{mb:2, borderRadius: 3, fontSize: '14px'}} disabled>Sign up with Linked in</Button>
                    <Typography sx={{mb:1, mt: 1}}>or</Typography>
                    <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            size="small"
                            name="firstName"
                            fullWidth
                            autoComplete="off"
                            placeholder="Last name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            size="small"
                            name="lastName"
                            fullWidth
                            autoComplete="off"
                            placeholder="First name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            size="small"
                            name="email"
                            fullWidth
                            autoComplete="off"
                            placeholder="Email"
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
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            InputProps={{ 
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() => setShowPassword(!showPassword)}
                                    >
                                        
                                      {!showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                )
                              }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            size="small"
                            name="confirmPassword"
                            fullWidth
                            autoComplete="off"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            InputProps={{ 
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        
                                      {!showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                )
                              }}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{mt:3, mb:3,borderRadius: 3, fontSize: '14px'}}>Next</Button>
                    </form>
                    <Typography align="left" fontSize={12} sx={{color: 'grey'}}> 
                        We're commited to your privacy. Workstf uses the information you provide to us to contact you about our relevant content, products, and services.
                        You may unsubscribe from these communications as any time. For more information. check out our Privacy Policy.
                    </Typography>
                </Box>
                <Box sx={{
                    width:  '50%',
                }}>
                    <img src="customer-image-compiled1_2x.png" alt="" style={{width: '100%'}} />
                    <Typography align="center" color="#0014ff" sx={{fontWeight:"500"}}><b>Workstf's CRM is 100% free.</b></Typography>
                    <Typography align="center" fontSize={12} color="grey">No credit cart needed.</Typography>
                </Box>
            </Box>

            <Footer />
        </Container>
    );
}

export default Signup;
