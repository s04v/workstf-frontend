/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Checkbox, Button, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import CreateDrawer from "../components/CreateDrawer";
import { useDispatch, useSelector } from "react-redux";
import Server from "../services/server";
import { updateAccount } from "../store/accountSlice";
import { setContactToEdit, setSelectedContacts, updateContacts, updateSkip, updateTake, updateTotal } from "../store/contactsSlice";
import useAlert from "../utils/useAlert";

const Home = () => {
    const { setAlert }  = useAlert();
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

    const isSelected = (id) => contacts.selectedContacts.includes(id);

    const handleSelectAllClick = (event) => {
        if(contacts.selectedContacts.length === contacts.data.length) {
            dispatch(setSelectedContacts([]));
        } else {
            const allContactId = contacts.data.map((item) => item._id);
            dispatch(setSelectedContacts(allContactId));
        }
    };

    const handleSelect = (contact) => {
        if(!isSelected(contact._id)) {
            dispatch(setSelectedContacts([...contacts.selectedContacts, contact._id]));
        } else {
            const newSelected = contacts.selectedContacts.filter((selectedId) => selectedId !== contact._id);  
            dispatch(setSelectedContacts(newSelected));
        }
    };

    useEffect(() => {
        async function fetchData() {
            const res = await Server.Acconut.getInfo();
            dispatch(updateAccount(res.data));
        }
        fetchData();
        fetchContacts();
    },[]);

    useEffect(() => {
        fetchContacts();
    },[contacts.skip, contacts.take]);
    
    const fetchContacts = async () => {
        const res = await Server.Contact.get(contacts.skip, contacts.take);
        dispatch(updateContacts(res.data.contacts));
        dispatch(updateTotal(res.data.totalCount));
    }

    const handleOpenEdit = () => {
        if(contacts.selectedContacts.length === 0) {
            setAlert('Select contact to edit', 'error');
            return;
        }

        if(contacts.selectedContacts.length > 1) {
            setAlert('Select only one contact to edit', 'error');
            return;
        }

        const contact = contacts.data.filter(item => item._id === contacts.selectedContacts[0])[0];
        dispatch(setContactToEdit(contact));
        setOpenEdit(true);
    }

    const handleOpenDelete = () => {
        if(contacts.selectedContacts.length === 0) {
            setAlert('Select contact to delete', 'error');
            return;
        }

        setOpenDelete(true);
    }
    
    const handleChangePage = (e, newPage) => {
        setPage(newPage);
        dispatch(updateSkip(newPage * rowsPerPage));
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        dispatch(updateTake(parseInt(e.target.value, 10)));
    }

    return (
        <Box sx={{mt: 4, mb: 4, display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '20px', padding: '20px', height: '100%'}}>
            <Box sx={{display: 'flex', gap: 4, alignItems: 'center', pl: '4px'}}>
                <Checkbox
                    color="primary"
                    inputProps={{
                    'aria-label': 'select all desserts',
                    }}
                    onClick={handleSelectAllClick}
                    indeterminate={contacts.selectedContacts.length > 0 && contacts.selectedContacts.length < contacts.data.length}
                    checked={contacts.data.length > 0 && contacts.selectedContacts.length === contacts.data.length}
                />
                <Typography fontSize='14px' color="primary.main">
                    {contacts.selectedContacts.length} Selected
                </Typography>
                <Typography onClick={handleOpenEdit}fontSize='14px' color="primary.main" sx={{display: 'flex', alignItems:'center', gap: '4px', cursor: 'pointer'}}>
                    <EditIcon sx={{fontSize:"20px", color: 'black'}}/>
                    <span>Edit</span>
                </Typography>
                <Typography onClick={handleOpenDelete} fontSize='14px' color="primary.main" sx={{display: 'flex', alignItems:'center', gap: '4px', cursor: 'pointer'}}>
                    <DeleteOutlineIcon sx={{fontSize:"20px", color: 'black'}}/>
                    <span>Delete</span>
                </Typography>
                <Button onClick={() => setOpenCreate(true)} variant="contained" sx={{borderRadius: 3, fontSize: '12px', ml: 'auto', display: 'flex', alignItems:'center', gap: '5px', cursor: 'pointer'}}>
                    Add contact
                    {/* <Button>Add contact</Button>  */}
                    {/* <AddCircleIcon sx={{fontSize:"24px"}} /> */}
                </Button>
            </Box>  
            
            <Table
                sx={{ minWidth: 550}}
                aria-labelledby="tableTitle"
            >
                <TableHead>
                    <TableRow sx={{color: 'grey'}}>
                        <TableCell padding="checkbox">
                        {/* <Checkbox
                            color="primary"
                            inputProps={{
                            'aria-label': 'select all desserts',
                            }}
                        /> */}
                        </TableCell>
                    
                        <TableCell >First name</TableCell>
                        <TableCell >Last name</TableCell>
                        <TableCell >Email</TableCell>
                        <TableCell >Phone number</TableCell>
                        <TableCell >Create date</TableCell>
                        <TableCell >Modified date</TableCell>
                        <TableCell >Country</TableCell>
                        <TableCell >Company</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{position: 'relative'}}>
                    {contacts.data.map((contact) => {
                        const isContactSelected = isSelected(contact._id);
                        return <TableRow sx={{padding: 4}}>
                                    <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        inputProps={{
                                        'aria-label': 'select all desserts',
                                        }}
                                        onClick={() => handleSelect(contact)}
                                        checked={isContactSelected}
                                    />
                                    </TableCell>
                                    <TableCell>{contact.firstName}</TableCell>
                                    <TableCell>{contact.lastName}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.phoneNumber}</TableCell>
                                    <TableCell><span style={{padding: 3, backgroundColor: '#f7f7f7', borderRadius: '20px'}}>{new Date(contact.createDate).toLocaleDateString("en-US")} {new Date(contact.createDate).toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric'})}</span></TableCell>
                                    <TableCell><span style={{padding: 3, backgroundColor: '#f7f7f7', borderRadius: '20px'}}>{new Date(contact.updateDate).toLocaleDateString("en-US")} {new Date(contact.updateDate).toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric'})}</span></TableCell>
                                    <TableCell>{contact.country}</TableCell>
                                    <TableCell>{contact.company}</TableCell>
                                </TableRow>
                        })
                    }
                {contacts.data.length === 0 ? <Box sx={{width: '100%', position: 'absolute', textAlign: 'center', marginTop: '15%', bottom: 0, top: 0, color: 'grey'}}>No found contacts</Box>: ''}                        
                </TableBody>
            </Table>
            <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={contacts.total}
                    sx={{mt:'auto'}}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />
            <EditModal open={openEdit} onClose={() => setOpenEdit(false)} />
            <DeleteModal open={openDelete} onClose={() => setOpenDelete(false)} />
            <CreateDrawer open={openCreate} onClose={() => setOpenCreate(false)} />
    </Box>

    )
}

export default Home;