import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CreateObjectDrawer from "../components/CreateObjectDrawer";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NestedSettingsMenu from "../components/NestedSettingsMenu";
import Server from "../services/server";
import { useDispatch, useSelector } from "react-redux";
import { updateActiveObject, updateObjectList, updateSelectedFields } from "../store/settingsSlice";
import { Link } from "react-router-dom";

const SettingsObject= () => {
    const [selectedObject, setSelectedObject] = useState('');
    const [openCreateObject, setOpenCreateObject] = useState(false);
    const dispatch = useDispatch();
    const objectList = useSelector(state => state.settings.objectList);
    const activeObject = useSelector(state => state.settings.activeObject);

    useEffect(() => {
        async function fetchData() {
            const res = await Server.Object.getList();
            console.log(res.data);

            if(res.data.length  && !activeObject) {
                // const objectNames = res.data.map(object => object.singularName);
                // setSelectedObject(objectNames[0]);
                dispatch(updateActiveObject(res.data[0]))
            }
            
            dispatch(updateObjectList(res.data));

        }
        fetchData();
    },[]);

    const handleChangeObject =(object) => {
        dispatch(updateActiveObject(object));
        dispatch(updateSelectedFields([]));
    }

    return (
        <>
        {console.log(objectList)}
            {
                !(Array.isArray(objectList) && objectList.length) ?
                    <Box sx={{padding: "30px",display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '20px', width: '100%'}}>
                        <Typography variant="h5" sx={{fontWeight: 500}}>Custom object</Typography>
                        <Box sx={{margin: "40px auto", display: "flex", flexDirection: "column", alignItems: "center", width: "300px"}}>
                            <Typography sx={{fontSize: "84px", color: "#dcd8d8", userSelect: "none"}}>{"{ }"}</Typography>
                            <Typography color="grey">Create your own custom custom objects and customise it to your business needs.</Typography>
                            <Button onClick={() => setOpenCreateObject(true)} variant="contained" sx={{padding: "15px 30px", mt:3, mb:3,borderRadius: 3, fontSize: '12px'}}><b>Create Custom Object</b></Button>
                        </Box>
                    </Box>
                :
                    <>
                        <Box sx={{py: "30px",display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '20px', width: '100%'}}>
                            <Typography variant="h5" sx={{px: "30px", fontWeight: 500}}>Custom object</Typography>
                            <Box sx={{px: "30px", marginTop: "40px ", display: "flex", flexDirection: "column"}}>
                                <Box sx={{display:  "flex", alignItems: "center", justifyContent: "space-between"}}>
                                    <Box sx={{display:  "flex", gap: 3,  alignItems: "center"}}>
                                        <Typography sx={{fontSize: "14px"}}><b>Select an object</b></Typography>
                                        <TextField 
                                            select
                                            sx={{mb: 2, width: "200px"}}
                                            autoComplete="off"
                                            name="selectedObject"
                                            value={activeObject?.singularName}
                                            // onChange={(e) => setSelectedObject(e.target.value)}
                                        // error={formik.touched.country && Boolean(formik.errors.country)}
                                        // helperText={formik.touched.country && formik.errors.country}
                                    >
                                        {objectList.map(object => 
                                            <MenuItem value={object.singularName} onClick={() => handleChangeObject(object)}>{object.singularName}</MenuItem>
                                        )}
                                    </TextField>
                                    </Box>
                                    <Button onClick={() => setOpenCreateObject(true)} variant="contained" sx={{padding: "10px 30px", height: "50px", borderRadius: 3, fontSize: '12px'}}><b>Create Custom Object</b></Button>

                                </Box>
                                <Box sx={{position: "relative"}}>
                                    <Box style={{borderBottom: "1px solid black", padding: "10px", color: "primary", fontSize: "14px", width: '85px'}}>Configuration</Box>
                                </Box>
                            </Box>
                            <Divider sx={{mt:"0px"}} />
                            <Typography sx={{fontSize: "14px", color: "grey", px: "30px", py: "20px"}}>Choose what information you collect about your object and how to keep your records updated.</Typography>
                            <Divider />
                            <Box sx={{px: "30px"}}>
                                <Typography sx={{fontSize: "14px", my: "20px"}}><b>Records</b></Typography>
                                <Typography sx={{fontSize: "14px", mb: "10px"}}><Link to="/settings/fields"><b style={{color: '#0a636d'}}>Manage {activeObject?.singularName} fields</b></Link></Typography>
                                <Typography sx={{fontSize: "12px", color: "grey"}}>Manage the information you collect about your object</Typography>
                            </Box>
                        </Box>
                        
                    </>
            }
            {/*  */}
            <CreateObjectDrawer open={openCreateObject} onClose={() => setOpenCreateObject(false)} />
        </>
    );
}

export default SettingsObject;