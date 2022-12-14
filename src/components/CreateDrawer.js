import { Box, Button, Drawer, FormHelperText, MenuItem, Select, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import countryList from "react-select-country-list";
import Server from '../services/server';
import { useDispatch, useSelector } from "react-redux";
import { updateContacts, updateTotal } from "../store/contactsSlice";
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
    phoneNumber: yup
        .string()
        .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Phone number is not valid')
        .required('Phone number is required'),
    company: yup
        .string('Enter company name')
        .required('Company is required'),
    country: yup
        .string('Select country')
        .matches(/^(?!none$)/,'Country is required')
        .required('Country is required')
  });
  

const CreateDrawer = ({open, onClose}) => {
    const { setAlert } = useAlert();
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts);
    const countries = useMemo(() => countryList().getData(), []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            company: '',
            country: 'none',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const res = await Server.Contact.create(values);
            if(res.error) {
                setAlert(res.errorMessage, 'error');
            } else {
                setAlert("Success", 'success');
                const res = await Server.Contact.get(contacts.skip, contacts.take);
                dispatch(updateContacts(res.data.contacts));
                dispatch(updateTotal(res.data.totalCount));
                formik.handleReset();
                onClose();
            }
        },
    });

    const handleClose = () => {
        formik.handleReset();
        onClose();
    }
    return (
        <Drawer
            anchor={'right'}
            open={open}
            PaperProps={{
                sx: { width: "30%" },
            }}
        >
            <Box sx={{
                display: 'flex',
                gap: 2,
                backgroundColor: 'primary.main',
                px: 4,
                py: 2,
                color: 'white'
            }}>
                <CloseIcon sx={{fontSize:'24px'}} onClick={handleClose}/>
                <Typography sx={{fontSize:"18px"}}><b>Create contact</b></Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                px: 4,
                py: 2,
            }}>
                <form onSubmit={formik.handleSubmit}>
                    <span style={{color: 'grey', fontSize: 12}}>First name</span>
                    <TextField 
                        fullWidth 
                        sx={{mb: 2}}
                        autoComplete="off"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />

                    <span style={{color: 'grey', fontSize: 12}}>Last name</span>
                    <TextField 
                        fullWidth 
                        sx={{mb: 2}}
                        autoComplete="off"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />

                    <span style={{color: 'grey', fontSize: 12}}>Email</span>
                    <TextField 
                        fullWidth 
                        sx={{mb: 2}}
                        autoComplete="off"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <span style={{color: 'grey', fontSize: 12}}>Phone number</span>
                    <TextField 
                        fullWidth 
                        sx={{mb: 2}}
                        autoComplete="off"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    />
                    
                    <span style={{color: 'grey', fontSize: 12}}>Company</span>
                    <TextField 
                        fullWidth 
                        sx={{mb: 2}}
                        autoComplete="off"
                        name="company"
                        value={formik.values.company}
                        onChange={formik.handleChange}
                        error={formik.touched.company && Boolean(formik.errors.company)}
                        helperText={formik.touched.company && formik.errors.company}
                    />
                    
                    <span style={{color: 'grey', fontSize: 12}}>Country</span>
                 
                    <TextField 
                        fullWidth 
                        select
                        sx={{mb: 2}}
                        autoComplete="off"
                        name="country"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        error={formik.touched.country && Boolean(formik.errors.country)}
                        helperText={formik.touched.country && formik.errors.country}
                    >
                        <MenuItem value='none'>Select country</MenuItem>
                        {/* <VirtualList
                            width='100%'
                            height={800}
                            itemCount={countries.length}
                            itemSize={20} 
                            renderItem={({index, style}) =>
                            <MenuItem key={countries[index].value} value={countries[index].label}>{countries[index].label}</MenuItem>
                            }
                        /> */}
                        
                        {countries.map(country => <MenuItem key={country.value} value={country.label}>{country.label}</MenuItem>)}
                    </TextField>
                    <Box>
                        <Button type="submit" variant="contained" sx={{px: 4, py: 1, mr: 2, fontSize: 12}}><b>Create</b></Button>
                        <Button variant="outlined" sx={{px: 4, border: 2, fontSize: 12, ':hover': {border: 2}}} onClick={handleClose}><b>Cancel</b></Button>
                    </Box>
                </form>
            </Box>
        </Drawer>
    );
}

export default CreateDrawer;