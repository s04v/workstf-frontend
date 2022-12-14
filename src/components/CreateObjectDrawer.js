import * as yup from 'yup';
import { Box, Button, Divider, Drawer, MenuItem, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import useAlert from "../utils/useAlert";
import Server from '../services/server';
import { useDispatch } from 'react-redux';
import { updateObjectList } from '../store/settingsSlice';

const validationSchema = yup.object({
    app: yup
        .string('Enter application name')
        .required('Application is required'),
    singularName: yup
        .string('Enter object name')
        .required('Object name is required'),
    pluralName: yup
        .string('Enter object name')
        .required('Object name is required'),
    primaryName: yup
        .string('Enter primary field name')
        .required('Primary name is required'),
    primaryType: yup
        .string('Enter Primary type')
        .required('Primary type is required'),
});

const CreateObjectDrawer = ({open, onClose}) => {
    const { setAlert } = useAlert();
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            app: '',
            singularName: '',
            pluralName: '',
            primaryName: '',
            primaryType: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            values.schema = [];
            const res = await Server.Object.create(values);
            console.log(res);
            if(res.error) {
                setAlert(res.errorMessage, 'error');
            } else {
                setAlert("Success", 'success');
                const res = await Server.Object.getList();
                // const objectNames = res.data.map(object => object.singularName);
                dispatch(updateObjectList(res.data));
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
                <Typography sx={{fontSize:"18px"}}><b>Create custom object</b></Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{px: 4, py: 5}}>
                    <Typography variant="h6" sx={{fontWeight: 700, mb: 1}}>Choose application</Typography>
                    <Typography sx={{fontSize:"12px", color: "grey", mb: 2}}>Custom object can only be created in existing application</Typography>
                    <Typography sx={{fontSize:"12px",}}>Select an application where to create custom object? *</Typography>
                    <TextField 
                        select
                        sx={{my: 2, width: "250px", fontSize: "14px"}}
                        autoComplete="off"
                        name="app"
                        value={formik.values.app}
                        onChange={formik.handleChange}
                        error={formik.touched.app && Boolean(formik.errors.app)}
                        helperText={formik.touched.app && formik.errors.app}
                    >
                        <MenuItem value='sales' sx={{fontSize: "14px"}}>Sales</MenuItem>
                        <MenuItem value='crm' sx={{fontSize: "14px"}}>CRM</MenuItem>
                    </TextField>
                </Box>
                <Divider />
                <Box sx={{px: 4, py: 5}}>
                    <Typography variant="h6" sx={{fontWeight: 700, mb: 1}}>Configure your new custom object </Typography>
                    <Typography sx={{fontSize:"12px", color: "grey", mb: 2}}>These settings can't be chenged later.</Typography>
                    <Box sx={{display: "flex", gap: 3}}>
                        <Box>
                            <Typography sx={{fontSize:"12px"}}>Object Name (Singular) *</Typography>
                            <TextField 
                                sx={{width: "250px", fontSize: "14px"}}
                                autoComplete="off"
                                name="singularName"
                                value={formik.values.singularName}
                                onChange={formik.handleChange}
                                error={formik.touched.singularName && Boolean(formik.errors.singularName)}
                                helperText={formik.touched.singularName && formik.errors.singularName}
                            />
                        </Box>
                        <Box>
                            <Typography sx={{fontSize:"12px"}}>Object name (Plural) *</Typography>
                            <TextField 
                                sx={{width: "250px", fontSize: "14px"}}
                                autoComplete="off"
                                name="pluralName"
                                value={formik.values.pluralName}
                                onChange={formik.handleChange}
                                error={formik.touched.pluralName && Boolean(formik.errors.pluralName)}
                                helperText={formik.touched.pluralName && formik.errors.pluralName}
                            />
                        </Box>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{px: 4, py: 5}}>
                    <Typography variant="h6" sx={{fontWeight: 700, mb: 1}}>Create your primary field</Typography>
                    <Typography sx={{fontSize:"12px", color: "grey", mb: 2}}>This filed will be the name for each of yours records. Example. Opportunity name.</Typography>
                    <Box sx={{display: "flex", gap: 3}}>
                        <Box>
                            <Typography sx={{fontSize:"12px"}}>Primary field name *</Typography>
                            <TextField 
                                sx={{width: "250px", fontSize: "14px"}}
                                autoComplete="off"
                                name="primaryName"
                                value={formik.values.primaryName}
                                onChange={formik.handleChange}
                                error={formik.touched.primaryName && Boolean(formik.errors.primaryName)}
                                helperText={formik.touched.primaryName && formik.errors.primaryName}
                            />
                        </Box>
                        <Box>
                            <Typography sx={{fontSize:"12px"}}>Primary field type *</Typography>
                                <TextField 
                                select
                                sx={{width: "250px", fontSize: "14px"}}
                                autoComplete="off"
                                name="primaryType"
                                value={formik.values.primaryType}
                                onChange={formik.handleChange}
                                error={formik.touched.primaryType && Boolean(formik.errors.primaryType)}
                                helperText={formik.touched.primaryType && formik.errors.primaryType}
                                >
                                    <MenuItem value='text' sx={{fontSize: "14px"}}>Single-line text</MenuItem>
                                    <MenuItem value='number' sx={{fontSize: "14px"}}>Number</MenuItem>
                                </TextField>
                        </Box>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{px: 4}}>
                    <Button type="submit" variant="contained" sx={{padding: "12px 45px", mt: 3, mb: 3, mr: 2, borderRadius: 3, fontSize: '12px'}}><b>Create</b></Button>
                    <Button onClick={handleClose} variant="outlined" sx={{padding: "12px 45px", mt: 3, mb: 3, borderRadius: 3, fontSize: '12px'}}><b>Cancel</b></Button>

                </Box>
            </form>

            </Box>
        </Drawer>
    );
}

export default CreateObjectDrawer;