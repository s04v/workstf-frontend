import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Divider, MenuItem, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CreateObjectDrawer from "../components/CreateObjectDrawer";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import NestedSettingsMenu from "../components/NestedSettingsMenu";
import { updateObjectList, updateActiveObject, updateSelectedFields, updateFields, updateVisibleFields } from "../store/settingsSlice";
import { useDispatch, useSelector } from "react-redux";
import Server from "../services/server";
import CreateFieldDrawer from "../components/CreateFieldDrawer";
import useAlert from "../utils/useAlert";
import DeleteFieldsModal from "../components/DeleteFieldsModal";

const SettingsFields = () => {
    const { setAlert } = useAlert();
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(5);
    const [total, setTotal] = useState(0);

    const objectList = useSelector(state => state.settings.objectList);
    const activeObject = useSelector(state => state.settings.activeObject);

    const fields = useSelector(state => state.settings.fields);

    const isSelected = (id) => fields.selected.includes(id);

    const [openCreateField, setOpenCreateField] = useState(false);
    const [openEditField, setOpenEditField] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [editInitValues, setEditInitValues] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await Server.Object.getList();
            if(res.data.length && !activeObject) {
                dispatch(updateObjectList(res.data));
                dispatch(updateActiveObject(res.data[0]))
            }
            dispatch(updateObjectList(res.data));
        }
        fetchData();
    }, []);

    useEffect(() => {
        updateFields();
    }, [skip, take, activeObject]);

    const updateFields = () => {
        const newValue = activeObject.schema?.slice(skip, skip + take);
        dispatch(updateVisibleFields(newValue));
    }

    const handleSelectAllClick = (event) => {
        if(fields.selected.length === fields.visible.length) {
            dispatch(updateSelectedFields([]));
        } else {
            const allFieldId = fields.visible.map((item) => item._id);
            dispatch(updateSelectedFields(allFieldId));
        }
    };

    const handleSelect = (field) => {
        if(!isSelected(field._id)) {
            dispatch(updateSelectedFields([...fields.selected, field._id]));
        } else {
            const newSelected = fields.selected.filter((selectedId) => selectedId !== field._id);  
            dispatch(updateSelectedFields(newSelected));
        }
    };

    const handleChangeObject =(object) => {
        dispatch(updateActiveObject(object));
        dispatch(updateSelectedFields([]));
    }

    const handleOpenDelete = () => {
        if(fields.selected.length === 0) {
            setAlert('Select field to delete', 'error');
            return;
        }
        setOpenDelete(true);
    }

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
        setSkip(newPage * rowsPerPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setTake(parseInt(e.target.value, 10));
    }

    return (
        <Box sx={{py: "30px",display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '20px', width: '100%'}}>
            <Typography variant="h5" sx={{px: "30px", fontWeight: 500}}>Custom object</Typography>
            <Box sx={{px: "30px", marginTop: "10px ", display: "flex", flexDirection: "column"}}>
                <Box sx={{display:  "flex", gap: 3,  alignItems: "center"}}>
                    <Typography sx={{fontSize: "14px"}}><b>Select an object</b></Typography>
                    <TextField 
                        select
                        sx={{mb: 2, width: "200px"}}
                        autoComplete="off"
                        name="selectedObject"
                        value={activeObject?.singularName}
                        // onChange={(e) => dispatch(updateActiveObject(e.target.value))}
                >
                    
                    {objectList.map(object => {
                        return <MenuItem value={object.singularName} onClick={() => handleChangeObject(object)}>{object.singularName}</MenuItem>
                    } 
                    )}
                </TextField>
                </Box>
                <Box sx={{position: "relative"}}>
                    <span style={{borderBottom: "1px solid blue", padding: "10px", color: "blue", fontSize: "14px"}}>Configuration</span>
                </Box>
            </Box>
            <Divider sx={{mt:"10px"}} />
            <Typography sx={{fontSize: "14px", color: "grey", px: "30px", py: "20px"}}>Choose what information you collect about your object and how to keep your records updated.</Typography>
            <Divider />
            <Box sx={{height: '100%'}}>
                <Box sx={{mt: 2, mb: 2, display: 'flex', flexDirection: 'column', borderRadius: '20px', height: '100%'}}>
                    <Box sx={{display: 'flex', gap: 4, alignItems: 'center', pl: '4px', px: "20px"}}>
                        <Checkbox
                            color="primary"
                            inputProps={{
                            'aria-label': 'select all desserts',
                            }}
                            onClick={handleSelectAllClick}
                            indeterminate={fields.selected.length > 0 && fields.selected.length < fields.visible.length}
                            checked={fields.visible?.length > 0 && fields.selected?.length === fields.visible?.length}
                        />
                        <Typography fontSize='14px' color="primary.main">
                            {fields.selected.length} Selected
                        </Typography>
                        {/* <Typography onClick={handleOpenEdit}fontSize='14px' color="primary.main" sx={{display: 'flex', alignItems:'center', gap: '4px', cursor: 'pointer'}}> */}
                        <Typography fontSize='14px' color="primary.main" sx={{display: 'flex', alignItems:'center', gap: '4px', cursor: 'pointer'}}>
                            <EditIcon sx={{fontSize:"20px", color: 'black'}}/>
                            <span>Edit</span>
                        </Typography>
                        <Typography onClick={handleOpenDelete} fontSize='14px' color="primary.main" sx={{display: 'flex', alignItems:'center', gap: '4px', cursor: 'pointer'}}>
                            <DeleteOutlineIcon sx={{fontSize:"20px", color: 'black'}}/>
                            <span>Delete</span>
                        </Typography>
                        {/* <Button onClick={() => setOpenCreate(true)} variant="contained" sx={{borderRadius: 3, fontSize: '12px', ml: 'auto', display: 'flex', alignItems:'center', gap: '5px', cursor: 'pointer'}}> */}
                        <Button onClick={() => setOpenCreateField(true)} variant="contained" sx={{borderRadius: 3, fontSize: '12px', ml: 'auto', display: 'flex', alignItems:'center', gap: '5px', cursor: 'pointer'}}>
                            Create field
                            
                        </Button>
                    </Box>  
                    
                    <Table
                        sx={{ minWidth: 550}}
                        aria-labelledby="tableTitle"
                    >
                        <TableHead>
                            <TableRow sx={{color: 'grey'}}>
                                <TableCell padding="checkbox" sx={{ml: "20px"}}>
                                {/* <Checkbox
                                    color="primary"
                                    inputProps={{
                                    'aria-label': 'select all desserts',
                                    }}
                                /> */}
                                </TableCell>
                                <TableCell width="20%" >Name</TableCell>
                                <TableCell >Type</TableCell>
                                <TableCell >Created by</TableCell>
                                <TableCell >Create date</TableCell>
                                <TableCell >Modified date</TableCell>
                                <TableCell >Modifyed by</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{position: 'relative'}}>
                            {
                                activeObject.schema && activeObject.schema.length !== 0 
                                ?
                                fields.visible?.map(field => {
                                    const isFieldSelected = isSelected(field._id);

                                    return ( <TableRow sx={{padding: 4}} >
                                        <TableCell padding="checkbox" sx={{pl: "20px"}}>
                                            <Checkbox
                                                color="primary"
                                                inputProps={{
                                                'aria-label': 'select all desserts',
                                                }}
                                                onClick={() => handleSelect(field)}
                                                checked={isFieldSelected}
                                            />
                                        </TableCell>
                                        <TableCell sx={{display: 'flex', gap: 3}}>
                                            {field.name}
                                            <Box onClick={() => {
                                                setEditInitValues(field);
                                                setOpenEditField(true);
                                            }} fontSize='14px' color="primary.main" sx={{display: 'flex', alignItems:'center', gap: '4px', cursor: 'pointer'}}>
                                                <EditIcon sx={{fontSize:"18px", color: 'black'}}/>
                                                <span>Edit</span>
                                            </Box>
                                            </TableCell>
                                        <TableCell >{field.typeName}</TableCell>
                                        <TableCell >You </TableCell>
                                        <TableCell >{new Date(field.createdDate).toLocaleDateString("en-US")}</TableCell>
                                        <TableCell >{new Date(field.modifiedDate).toLocaleDateString("en-US")}</TableCell>
                                        <TableCell >You</TableCell>
                                    </TableRow>)
                                })
                                :
                                <Box sx={{width: '100%', position: 'absolute', textAlign: 'center', marginTop: '10%', bottom: 0, top: 0, color: 'grey'}}>No found fields</Box>
                            }
                        </TableBody>
                    </Table>
                    <TablePagination
                        sx={{mr: "20px", mt: "auto"}}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={activeObject.schema?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                    {/* <EditModal open={openEdit} onClose={() => setOpenEdit(false)} />
                    <DeleteModal open={openDelete} onClose={() => setOpenDelete(false)} />
                    <CreateDrawer open={openCreate} onClose={() => setOpenCreate(false)} /> */}
            </Box>
            </Box>
            <DeleteFieldsModal open={openDelete} onClose={() => setOpenDelete(false)} />
            <CreateFieldDrawer open={openCreateField} onClose={() => setOpenCreateField(false)} />
            <CreateFieldDrawer edit initValues={editInitValues} open={openEditField} onClose={() => setOpenEditField(false)} />
        </Box>
    );
}

export default SettingsFields;