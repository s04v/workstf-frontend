import { Box, Button, Divider, Drawer, FormHelperText, MenuItem, Select, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import { FieldArray, FormikProvider, useFormik } from "formik";
import { useEffect, useMemo } from "react";
import countryList from "react-select-country-list";
import Server from '../services/server';
import { useDispatch, useSelector } from "react-redux";
import { updateContacts, updateTotal } from "../store/contactsSlice";
import useAlert from "../utils/useAlert";
import { updateActiveObject } from "../store/settingsSlice";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import DateType from "./fieldsType/DateType";
import DropdownType from "./fieldsType/DropdownType";
import BooleanType from "./fieldsType/BooleanType";
import CheckboxType from "./fieldsType/CheckboxType";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const validationSchema = yup.object({
    name: yup
        .string('Enter field name')
        .required('Field name is required'),
    type: yup
        .string('Enter type name')
        .matches(/^(?!none$)/,'Type name is required')
        .required('Type name is required'),
});

const CreateFieldDrawer = ({open, onClose, edit, initValues}) => {
    const { setAlert } = useAlert();
    const dispatch = useDispatch();
    const activeObject = useSelector(state => state.settings.activeObject);

    const defaultValues = {
        name: '',
        type: 'none',
        labels: [null]
    };

    const formik = useFormik({
        // validateOnChange: false,
        enableReinitialize: true,
        initialValues: edit ? initValues : defaultValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            values.typeName = getTypeName(values.type);
            const res = edit ? submitEdit(activeObject._id, values) : submitCreate(activeObject._id, values);                                        
            // const res = await Server.Object.createField(activeObject._id, values);
            if(res.error) {
                setAlert(res.errorMessage, 'error');
            } else {
                setAlert("Success", 'success');
                const updatedObjectRes = await Server.Object.get(activeObject._id);
                dispatch(updateActiveObject(updatedObjectRes.data))
                formik.handleReset();
                onClose();
            }
        },
    });

    const submitCreate = (objectId, values) => {
        return Server.Object.createField(objectId, values)
    }

    const submitEdit = (objectId, values) => {
        const {createdDate, modifiedDate, ...newValues} = values;
        console.log(values);
        return Server.Object.updateField(objectId,  newValues);
    }

    const getTypeName = (type) => {
        switch(type) {
            case 'number':
                return 'Number';
            case 'text':
                return 'Text';
            case 'boolean':
                return 'Boolean';
            case 'dropdown':
                return 'Drop-Down Select';
            case 'multipleCheckboxes':
                return 'Multiple Checkboxes';
            case 'date':
                return 'Date';
            case 'time':
                return 'Time';
            default:
                return null;
        }
    }

    const handleClose = () => {
        formik.handleReset();
        onClose();
    }

    const addAnotherLabel = (e) => {
        formik.values.labels.push(null);
        formik.handleChange(e);
    }

    const renderPreview = (type, data = null) => {
        let preview = null;
        switch(type) {
            case 'boolean':
                preview = <BooleanType preview />;
                break;
            case 'dropdown':
                preview = <DropdownType data={data} preview />;
                break;
            case 'multipleCheckboxes':
                preview = <CheckboxType data={data} preview />;
                break;
            case 'date':
                preview = <DateType preview />;
                break;
            default:
                return null;
        }

        return <Box sx={{display: 'flex', justifyContent: 'center', backgroundColor: '#f2f2f25e', border: '#e6e6e687', borderStyle: 'solid', borderWidth: "1px 0px 1px 0px", mt: 2, mb: 3, px: 4, py: 6}}>
            {preview}
        </Box>
    }

    return (
        <Drawer
            anchor={'right'}
            open={open}
            PaperProps={{
                sx: { width: "40%" },
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
                <Typography sx={{fontSize:"18px"}}><b>Create Field</b></Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                py: 2,
            }}>
                <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                  <Box sx={{display: 'flex', gap: 3, px: 4}}>
                    <Box sx={{width: "100%"}}>
                      <span style={{fontSize: 14}}>Field name *</span>
                      <TextField 
                        fullWidth
                        sx={{my: 2}}
                        autoComplete="off"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                      />
                    </Box>
                    <Box sx={{width: "100%"}}>
                      <span style={{fontSize: 14}}>Field type *</span>
                      <TextField 
                        select
                        fullWidth
                        sx={{my: 2}}
                        autoComplete="off"
                        name="type"
                        placeholder="Select field type"
                        value={formik.values.type || 'none'}
                        onChange={formik.handleChange}
                        error={formik.touched.type && Boolean(formik.errors.type)}
                        helperText={formik.touched.type && formik.errors.type}
                      >
                        <MenuItem value="none">Select field type</MenuItem>
                        <MenuItem value="text">Text</MenuItem>
                        <MenuItem value="number">Number</MenuItem>
                        <MenuItem value="boolean">Boolean</MenuItem>
                        <MenuItem value="dropdown">Dropdown</MenuItem>
                        <MenuItem value="checkbox">Checkbox</MenuItem>
                        <MenuItem value="multipleCheckboxes">Multiple Checkboxes</MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                        <MenuItem value="time">Time</MenuItem>
                      </TextField>
                    </Box>
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'column',  gap: 1, px: 4}}>
                    {
                        formik.values.type === 'dropdown' || formik.values.type === 'multipleCheckboxes' ?
                    
                            <FieldArray
                                name="labels"
                                render={(arrayHelpers) => (
                                    <>
                                    {
                                        formik.values.labels.map((label, i) => {
                                            return  (
                                            <Box sx={{display: 'flex', gap: 3}}>
                                                <TextField 
                                                    sx={{my: 1, width: '85%'}}
                                                    autoComplete="off"
                                                    name={`labels[${i}]`}
                                                    placeholder="Enter label"
                                                    value={formik.values.labels[i]}
                                                    onChange={formik.handleChange}
                                                    // error={formik.touched.name && Boolean(formik.errors.name)}
                                                    // helperText={formik.touched.name && formik.errors.name}
                                                />
                                                {i !== 0 ? <Typography onClick={() => arrayHelpers.remove(i)} sx={{display: 'flex', alignSelf: 'center', fontSize:'14px', cursor: 'pointer'}}><DeleteOutlineIcon sx={{fontSize: '18px'}} />  Delete</Typography> : null}
                                            </Box>)
                                        })
                                        
                                    }
                                    <Typography onClick={() => arrayHelpers.push(null)} sx={{display: 'flex', fontSize: '14px', cursor: 'pointer', gap: 1}}><AddCircleOutlineIcon sx={{fontSize: '18px'}} /> Add another label </Typography>
                                    </>
                                )} />
                            :
                            null
                    }
                    
                  </Box>
                    {
                        renderPreview(formik.values.type, formik.values.labels) || <Divider sx={{my: 4}} />
                    }
                    {/* <CheckboxType data={["label1", "label2 qwe", "label3", "label1", "label2 qwe", "label3", "label1", "label2 qwe", "label3"]} /> */}
                    {/* <DropdownType data={["label1", "label2 qwe", "label3", "label1", "label2 qwe", "label3", "label1", "label2 qwe", "label3"]} /> */}
                    {/* <BooleanType /> */}
                    {/* <DateType /> */}
                  
                  <Box sx={{px: 4}}>
                      <Button type="submit" variant="contained" sx={{px: 4, py: 1, mr: 2, fontSize: 12}}><b>Create</b></Button>
                      <Button variant="outlined" sx={{px: 4, border: 2, fontSize: 12, ':hover': {border: 2}}} onClick={handleClose}><b>Cancel</b></Button>
                  </Box>
                </form>
                </FormikProvider>
            </Box>
        </Drawer>
    );
}

export default CreateFieldDrawer;