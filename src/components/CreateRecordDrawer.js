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
import BooleanType from "./fieldsType/BooleanType";
import DropdownType from "./fieldsType/DropdownType";
import CheckboxType from "./fieldsType/CheckboxType";
import DateType from "./fieldsType/DateType";
import { updateRecords, updateRecordTotal } from "../store/appSlice";
import { useParams } from "react-router-dom";

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
  

const CreateRecordDrawer = ({open, onClose, schema}) => {
    const { setAlert } = useAlert();
    const dispatch = useDispatch();
    const app = useSelector(state => state.app);
    const params = useParams();
    const testID = "639921443e84b5b052cc9708";

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: schema,
        // validationSchema: validationSchema,
        onSubmit: async (values) => {
            const res = await Server.Object.createRecord(params.id, {data: values});
            if(res.error) {
                setAlert(res.errorMessage, 'error');
            } else {
                setAlert("Success", 'success');
                const res = await Server.Object.getRecords(params.id, app.skip, app.take);
                dispatch(updateRecords(res.data.data));
                dispatch(updateRecordTotal(res.data.total));
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
                <Typography sx={{fontSize:"18px"}}><b>Create new record</b></Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                px: 4,
                py: 2,
            }}>

                <form onSubmit={formik.handleSubmit}>
                <span style={{color: 'grey', fontSize: 12}}>{app.object.primaryName}</span>
                <TextField 
                    fullWidth 
                    sx={{mb: 2}}
                    autoComplete="off"
                    name={app.object.primaryName}
                    value={formik.values[app.object.primaryName]}
                    onChange={formik.handleChange}
                    // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    // helperText={formik.touched.firstName && formik.errors.firstName}
                />
                  {
                    app.object.schema?.map(field => {
                      let inputForm = null;
                      switch(field.type) {
                        case 'number':
                        case 'text':
                          inputForm = <TextField 
                              fullWidth 
                              sx={{mb: 2}}
                              autoComplete="off"
                              name={field.name}
                              value={formik.values[field.name]}
                              onChange={formik.handleChange}
                              // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                              // helperText={formik.touched.firstName && formik.errors.firstName}
                          />
                          break;
                        case 'boolean': 
                          inputForm = <BooleanType 
                                name={field.name}
                                value={formik.values[field.name]}
                                onChange={formik.handleChange}
                                // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                // helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                            break;
                        case 'dropdown': 
                          inputForm = <DropdownType 
                                name={field.name}
                                value={formik.values[field.name]}
                                onChange={formik.handleChange}
                                data={field.labels}
                                // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                // helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                            break;
                        case 'multipleCheckboxes': 
                          inputForm = <CheckboxType 
                              name={field.name}
                              value={formik.values[field.name]}
                              onChange={formik.handleChange}
                              data={field.labels}
                              // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                              // helperText={formik.touched.firstName && formik.errors.firstName}
                          />
                          break;
                          case 'date': 
                            inputForm = <DateType 
                                name={field.name}
                                value={formik.values[field.name]}
                                onChange={(val) => formik.setFieldValue(field.name, Date.parse(val))}
                                // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                // helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                            break;
                      }
                      return (
                        <>
                          <span style={{color: 'grey', fontSize: 12}}>{field.name}</span>
                          {inputForm}
                        </>
                      )
                    })
                  }
                    {/* </TextField> */}
                    <Box sx={{mt: 2}}>
                        <Button type="submit" variant="contained" sx={{px: 4, py: 1, mr: 2, fontSize: 12}}><b>Create</b></Button>
                        <Button variant="outlined" sx={{px: 4, border: 2, fontSize: 12, ':hover': {border: 2}}} onClick={handleClose}><b>Cancel</b></Button>
                    </Box>
                </form>
            </Box>
        </Drawer>
    );
}

export default CreateRecordDrawer;