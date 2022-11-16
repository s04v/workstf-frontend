import { Box, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import AppsIcon from '@mui/icons-material/Apps';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Footer from '../components/Footer';
import { useEffect, useState } from "react";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import CreateDrawer from "../components/CreateDrawer";
import { useDispatch, useSelector } from "react-redux";
import Server from "../services/server";
import { updateAccount } from "../store/accountSlice";
import { setContactToEdit, setSelectedContacts, updateContacts, updateSkip, updateTake, updateTotal } from "../store/contactsSlice";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import useAlert from "../utils/useAlert";

const Home = () => {
    const { setAlert }  = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const account = useSelector(state => state.account);
    const contacts = useSelector(state => state.contacts);

    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

    const isSelected = (id) => contacts.selectedContacts.includes(id);

    const handleSelectAllClick = (event) => {
        if(contacts.selectedContacts.length === contacts.data.length) {
            setSelected([]);
            dispatch(setSelectedContacts([]));
        } else {
            const allContactId = contacts.data.map((item) => item.id);
            dispatch(setSelectedContacts(allContactId));
        }
    };

    const handleSelect = (contact) => {
        if(!isSelected(contact.id)) {
            dispatch(setSelectedContacts([...contacts.selectedContacts, contact.id]));
        } else {
            const newSelected = selected.filter((selectedId) => selectedId !== contact.id);  
            dispatch(setSelectedContacts(newSelected));
        }
    };

    useEffect(() => {
        async function fetchData() {
            const res = await Server.Acconut.getInfo();
            delete res.data[0].password;
            dispatch(updateAccount(res.data[0]));
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

        const contact = contacts.data.filter(item => item.id === contacts.selectedContacts[0])[0];
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
        console.log('newPage',newPage);
        setPage(newPage);
        console.log(newPage * rowsPerPage);
        dispatch(updateSkip(newPage * rowsPerPage));
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        dispatch(updateTake(parseInt(e.target.value, 10)));
    }

    const handleLogout = () => {
        setTimeout(()=> {
            new Cookies().remove('jwt', {path: '/'});
            navigate('/signin');
        }, 500);
    }

    return (
        <Box sx={{
            display: 'flex',
            minHeight: '100vh',
        }}>
            <Box sx={{
                backgroundColor: '#f0f0f0',
                width: '60px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems:'center'
            }}>
                <AppsIcon sx={{mt:3}} />
                <HomeOutlinedIcon sx={{mt:3, backgroundColor: 'blue', padding: '5px', borderRadius: '10px', color: 'white'}} />
            </Box>
            <Box sx={{
                width: '100%',
                pt: 3,
                pr: 4,
                pl: 4,
                backgroundColor: '#f7f7f7',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}> 
                        <img src="./workstf-logo-small.png" alt="" style={{width: '40px'}}/>
                        <Typography fontSize={18}><b>Home</b></Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}> 
                        <Typography color="grey">Welcome, {account.firstName}</Typography>
                        <Typography color="blue" sx={{cursor: 'pointer', display: 'flex', alignItems:'center', gap: 1}}onClick={handleLogout}><LogoutIcon sx={{fontSize: 18}} />Logout</Typography>
                    </Box>
                </Box>
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
                        <Typography fontSize='14px' color="blue">
                            {contacts.selectedContacts.length} Selected
                        </Typography>
                        <Typography onClick={handleOpenEdit}fontSize='14px' color="blue" sx={{display: 'flex', alignItems:'center', gap: '4px', cursor: 'pointer'}}>
                            <EditIcon sx={{fontSize:"20px", color: 'black'}}/>
                            <span>Edit</span>
                        </Typography>
                        <Typography onClick={handleOpenDelete} fontSize='14px' color="blue" sx={{display: 'flex', alignItems:'center', gap: '4px', cursor: 'pointer'}}>
                            <DeleteOutlineIcon sx={{fontSize:"20px", color: 'black'}}/>
                            <span>Delete</span>
                        </Typography>
                        <Typography onClick={() => setOpenCreate(true)} fontSize='14px' color="blue" sx={{ml: 'auto', display: 'flex', alignItems:'center', gap: '5px', cursor: 'pointer'}}>
                            <span>Add contact</span> 
                            <AddCircleIcon sx={{fontSize:"24px"}} />
                        </Typography>
                    </Box>  
                    
                    <Table
                        sx={{ minWidth: 550}}
                        aria-labelledby="tableTitle"
                    >
                        <TableHead>
                            <TableRow sx={{color: 'grey'}}>
                                <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    inputProps={{
                                    'aria-label': 'select all desserts',
                                    }}
                                />
                                </TableCell>
                            
                                <TableCell sx={{width: '15%'}}>Name</TableCell>
                                <TableCell >Amount</TableCell>
                                <TableCell >Account</TableCell>
                                <TableCell >Owner</TableCell>
                                <TableCell >Created Date</TableCell>
                                <TableCell >Close Date</TableCell>
                                <TableCell >Region</TableCell>
                                <TableCell >Stage</TableCell>
                                <TableCell >Probability</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{position: 'relative'}}>
                            {contacts.data.map((contact) => {
                                const isContactSelected = isSelected(contact.id);
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
                                            <TableCell>$1000</TableCell>
                                            <TableCell>{contact.company}</TableCell>
                                            <TableCell sx={{display: 'flex', gap: 1}}><Box sx={{width:'20px', height: '20px', borderRadius: '50%', backgroundColor: '#d1cece'}}></Box>You</TableCell>
                                            <TableCell ><span style={{padding: 3, backgroundColor: '#f7f7f7', borderRadius: '20px'}}>{new Date(contact.createdDate).toLocaleDateString("en-US")}</span></TableCell>
                                            <TableCell ><span style={{padding: 3, backgroundColor: '#f7f7f7', borderRadius: '20px'}}>{contact.closeDate}</span></TableCell>
                                            <TableCell >{contact.country}</TableCell>
                                            <TableCell >Running</TableCell>
                                            <TableCell >100%</TableCell>
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
                </Box>
                <Footer />
            </Box>
            <EditModal open={openEdit} onClose={() => setOpenEdit(false)} />
            <DeleteModal open={openDelete} onClose={() => setOpenDelete(false)} />
            <CreateDrawer open={openCreate} onClose={() => setOpenCreate(false)}/>
        </Box>
    )
}

export default Home;