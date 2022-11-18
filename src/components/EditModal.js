import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useMemo, useState } from "react";
import * as yup from 'yup';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Server from "../services/server";
import { setSelectedContacts, updateContacts, updateTotal } from "../store/contactsSlice";
import countryList from "react-select-country-list";
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '20px',
    border: 0
  };

const EditModal = ({open, onClose}) => {
    const { setAlert } = useAlert();
    const dispatch = useDispatch();
    const contactToEdit = useSelector(state => state.contacts.contactToEdit);
    const contacts = useSelector(state => state.contacts);
    const countries = useMemo(() => countryList().getData(), []);
    const [property, setProperty] = useState('none');

    const handleChange = (e) => {
        setProperty(e.target.value);
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: contactToEdit,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const id = values._id;
            delete values._id;
            const res = await Server.Contact.update(id, values);
            if(res.error) {
                setAlert(res.errorMessage, 'error');
            } else {
                setAlert("Success", 'success');
                const res = await Server.Contact.get(contacts.skip, contacts.take);
                dispatch(updateContacts(res.data.contacts));
                dispatch(updateTotal(res.data.totalCount));
                dispatch(setSelectedContacts([]));
                setProperty('none')
                onClose();
            }
        },
    });

    const handleClose = () => {
        formik.handleReset();
        setProperty('none')
        onClose();
    }

    return (
        <Modal
            open={open}
            sx={{outline: 'none'}}
            disableAutoFocus={true} 
        >
            <Box sx={{ ...style, width: 400 }}>
                <Box sx={{
                    backgroundColor: 'blue',
                    color: 'white',
                    padding: 3,
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px',
                    display: 'flex',
                    justifyContent:'space-between'
                }}>
                    <b>Edit property</b> <CloseIcon sx={{fontSize:'24px', cursor: 'pointer'}} onClick={handleClose}/>
                </Box>
                <Box sx={{
                    padding: 3,
                }}>
                    <Typography color="grey" fontSize="12px">Property to update</Typography>
                    <form onSubmit={formik.handleSubmit}>
                    <Box fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={property}
                            onChange={handleChange}
                            fullWidth
                            sx={{mb: 2}}
                        >
                            <MenuItem value={'none'}>Select property to edit</MenuItem>
                            <MenuItem value={'firstName'}>First name</MenuItem>
                            <MenuItem value={'lastName'}>Last name</MenuItem>
                            <MenuItem value={'email'}>Email</MenuItem>
                            <MenuItem value={'phoneNumber'}>Phone number</MenuItem>
                            <MenuItem value={'company'}>Company</MenuItem>
                            <MenuItem value={'country'}>Country</MenuItem>
                        </Select>
                       
                            {property !== 'none'&& property !== 'country' && 
                                <TextField 
                                fullWidth 
                                sx={{mb: 2}}
                                autoComplete="off"
                                name={property}
                                value={formik.values[property]}
                                onChange={formik.handleChange}
                                error={formik.touched[property] && Boolean(formik.errors[property])}
                                helperText={formik.touched[property] && formik.errors[property]}
                            />
        
                            }
                            {property === 'country' && <TextField autoComplete="off" select name={property} value={formik.values.country} onChange={formik.handleChange} fullWidth  sx={{my: 3}}> 
                                {countries.map(country => <MenuItem key={country.value} value={country.label}>{country.label}</MenuItem>)}
                            </TextField>}
                        
                        </Box>
                    <Button type="submit" variant="contained" sx={{px: 4, py: 1, mr: 2, fontSize: 12}}><b>Update</b></Button>
                    <Button variant="outlined" sx={{px: 4, border: 2, fontSize: 12, ':hover': {border: 2}}} onClick={handleClose}><b>Cancel</b></Button>
                    </form>
                    </Box>

            </Box>
        </Modal>
    );
}

export default EditModal;