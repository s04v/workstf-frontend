import { Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import Footer from "../components/Footer";
import * as yup from 'yup';
import { useFormik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import Server from '../services/server';
import Cookies from "universal-cookie";
import useAlert from "../utils/useAlert";

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .required('Password is required'),

  });
  

const Signin = () => {
    const { setAlert } = useAlert();
    const [showPassword, setShowPassword] = useState(false);
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // delete values.confirmPassword;
            const res = await Server.Auth.signIn(values);
            if(res.error) {
                setAlert(res.errorMessage, 'error');
            }
            else {
                setAlert("Success", 'success');
                const cookies = new Cookies();
                cookies.set('jwt', res.data.token, {maxAge: 2592000 * 12}); // 1 year
                setTimeout(() => window.location.href = '/home', 1000);
            }
        },
    });

    return (
        <Container maxWidth="md" sx={{
            paddingTop: 4,
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}
        >
            <img src="./workstf-logo.svg" alt="" />
            <Box sx={{
                width:  '50%',
                display: 'flex',
                gap: 5,
                height: '100%',
                mt: 10
            }}>
                <Box sx={{
                    width:  '100%',
                }}>
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
                    </Grid>
                    
                    <Typography fontSize={12} sx={{textDecoration:'underline',textAlign: 'center',   mt: 2, mb: 2}}><a href="#">Forgot my password</a></Typography>
                    <FormControlLabel sx={{textAlign: "start !important"}} control={<Checkbox defaultChecked />} label={<span style={{ fontSize: '12px' }}>Remember me</span>} />
                    <Button type="submit" fullWidth variant="contained" sx={{mt:3, mb:3,borderRadius: 3, fontSize: '14px'}}>Next</Button>
                    </form>
                    
                </Box>
            </Box>

            <Footer />
        </Container>
    );
}

export default Signin;
