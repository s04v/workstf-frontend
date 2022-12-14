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
import BooleanType from "./fieldsType/BooleanType";
import DropdownType from "./fieldsType/DropdownType";
import CheckboxType from "./fieldsType/CheckboxType";
import DateType from "./fieldsType/DateType";
import { updateRecords, updateRecordTotal, updateSelectedRecord } from "../store/appSlice";

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

const EditRecordModal = ({open, onClose}) => {
    const { setAlert } = useAlert();
    const dispatch = useDispatch();
    const [property, setProperty] = useState(null);
    const [activeType, setActiveType] = useState('');
    const app = useSelector(state => state.app);
    const recordToEdit = useSelector(state => state.app.recordToEdit);

    const handleChange = (e) => {
        setProperty(e.target.value);
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: recordToEdit?.data,
        // validationSchema: validationSchema,
        onSubmit: async (values) => {
            const updatedRecord = {...recordToEdit, data: values};
            const res = await Server.Object.updateRecord(recordToEdit.objectId, updatedRecord);
            if(res.error) {
                setAlert(res.errorMessage, 'error');
            } else {
                setAlert("Success", 'success');
                const updatedList = await Server.Object.getRecords(recordToEdit.objectId, app.skip, app.take);
                dispatch(updateRecords(updatedList.data.data));
                dispatch(updateRecordTotal(updatedList.data.total));
                dispatch(updateSelectedRecord([]));
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

    const renderField = (type, name, value, onChange) => {
        let field = null;
        switch(type) {
            case 'text':
            case 'number':
                field = <TextField 
                    fullWidth 
                    sx={{mb: 2}}
                    autoComplete="off"
                    name={name}
                    value={value}
                    onChange={onChange}
                />;
                break;     
            case 'boolean':
                field = <BooleanType name={name} value={value} onChange={onChange} />;
                break;
            case 'dropdown':
                const dropdown = app.object.schema.filter(item => item.name == name)[0];
                field = <DropdownType name={name} value={value} onChange={onChange} data={dropdown.labels} />;
                break;
            case 'multipleCheckboxes':
                field = <CheckboxType name={name} value={value} onChange={onChange} data={Object.keys(value)} />;
                break;
            case 'date':
                field = <DateType name={name} value={value} onChange={onChange} />;
                break;
            default:
                return null;
        }

        return <Box sx={{display: 'flex', justifyContent: 'center', mt: 2, mb: 3, px: 4, py: 6}}>
            {field}
        </Box>
    }

    const test = () => {
        console.log('recordToEdit', app.recordToEdit);
        console.log('object', app.object);
        console.log('activeType', activeType);
    }

    return (
        <Modal
            open={open}
            sx={{outline: 'none'}}
            disableAutoFocus={true} 
        >
            <Box sx={{ ...style, width: 400 }}>
                <Box sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    padding: 3,
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px',
                    display: 'flex',
                    justifyContent:'space-between'
                }}>
                    <b onClick={test}>Edit property</b> <CloseIcon sx={{fontSize:'24px', cursor: 'pointer'}} onClick={handleClose}/>
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
                            <MenuItem onClick={() => setActiveType(app.object.primaryType)} value={app.object.primaryName}>{app.object.primaryName}</MenuItem>
                            {app.object.schema?.map(field =>  <MenuItem onClick={() => setActiveType(field.type)} value={field.name}>{field.name}</MenuItem>)}
                        </Select>
                        {/* {console.log(formik.values)} */}
                            {property !== 'none' && ( formik.values && renderField(activeType, property, formik.values[property], formik.handleChange))
                            //     <TextField 
                            //     fullWidth 
                            //     sx={{mb: 2}}
                            //     autoComplete="off"
                            //     name={property}
                            //     value={formik.values[property]}
                            //     onChange={formik.handleChange}
                            //     error={formik.touched[property] && Boolean(formik.errors[property])}
                            //     helperText={formik.touched[property] && formik.errors[property]}
                            // />
        
                            }
                            
                        
                        </Box>
                    <Button type="submit" variant="contained" sx={{px: 4, py: 1, mr: 2, fontSize: 12}}><b>Update</b></Button>
                    <Button variant="outlined" sx={{px: 4, border: 2, fontSize: 12, ':hover': {border: 2}}} onClick={handleClose}><b>Cancel</b></Button>
                    </form>
                    </Box>

            </Box>
        </Modal>
    );
}

export default EditRecordModal;