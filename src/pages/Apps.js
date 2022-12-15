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
import { Link, useParams } from "react-router-dom";
import { resetRecords, updateActiveApp, updateObject, updateObjectList, updateRecords, updateRecordSkip, updateRecordTake, updateRecordToEdit, updateRecordTotal, updateSelectedRecord } from "../store/appSlice";
import CreateRecordDrawer from "../components/CreateRecordDrawer";
import EditRecordModal from "../components/EditRecordModal";
import DeleteRecordModal from "../components/DeleteRecordModal";

const Apps = (props) => {
    const { setAlert }  = useAlert();
    const dispatch = useDispatch();
    const params = useParams();
    const id = params.id;
    
    const account = useSelector(state => state.contacts);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(5);
    const [total, setTotal] = useState(0)

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const testID = "639921443e84b5b052cc9708";
    // -----

    const app = useSelector(state => state.app);
    const [initValues, setInitValues] = useState({});

    const fetchObject = async () => {
      const appName = params.appName;
      const userId = params.appName;
      const res = await Server.Object.getByAppName(appName);
      console.log('fetchData', res);
      if(res.error) {
        setAlert("Server error", 'error');
      } else {
        const objectNames = [];
        for(const object of res.data) {
          console.log(object);
          objectNames.push({name: object.singularName, id: object._id});
          if(id && object._id === id) {
            dispatch(updateObject(object));
          }
        }

        dispatch(updateObjectList(objectNames));
      }
    }

    const fetchRecords = async () => {
      const res = await Server.Object.getRecords(id, app.skip, app.take);
      if(res.error) {
        setAlert("Server error", 'error');
      } else {
        console.log('res', res);
        dispatch(updateRecords(res.data.data));
        dispatch(updateRecordTotal(res.data.total));
        // dispatch(updateObjectList(objectNames));
      }
    }

    // -----
    const isSelected = (id) => app.selectedRecords.includes(id);

    const handleSelectAllClick = (event) => {
      if(app.selectedRecords.length === app.records.length) {
          dispatch(updateSelectedRecord([]));
      } else {
          const allRecordId = app.records.map((item) => item._id);
          dispatch(updateSelectedRecord(allRecordId));
      }
    };

    const handleSelect = (record) => {
      if(!isSelected(record._id)) {
          dispatch(updateSelectedRecord([...app.selectedRecords, record._id]));
      } else {
          const newSelected = app.selectedRecords.filter((selectedId) => selectedId !== record._id);  
          dispatch(updateSelectedRecord(newSelected));
      }
    };

    useEffect(() => {
      async function fetchData() {
          const res = await Server.Acconut.getInfo();
          dispatch(updateAccount(res.data));
      }
      fetchData();
      fetchRecords();
      fetchObject();

      return () => {
        dispatch(updateRecords([]));
    }
    },[]);

    useEffect(() => {
        fetchObject();
        fetchRecords();
    },[app.skip, app.take, id]);
    

    const handleOpenCreate = () => {
      makeInitValues();
      setOpenCreate(true);
    }

    const handleOpenEdit = () => {
        if(app.selectedRecords.length === 0) {
            setAlert('Select contact to edit', 'error');
            return;
        }

        if(app.selectedRecords.length > 1) {
            setAlert('Select only one contact to edit', 'error');
            return;
        }

        const record = app.records.filter(item => item._id === app.selectedRecords[0])[0];
        console.log(record);
        dispatch(updateRecordToEdit(record));
        setOpenEdit(true);
    }

    const handleOpenDelete = () => {
        if(app.selectedRecords.length === 0) {
            setAlert('Select contact to delete', 'error');
            return;
        }
        setOpenDelete(true);
    }
    
  const handleChangePage = (e, newPage) => {
    dispatch(updateSelectedRecord([]));
    setPage(newPage);
    dispatch(updateRecordSkip(newPage * rowsPerPage));

  }

  const handleChangeRowsPerPage = (e) => {
    dispatch(updateSelectedRecord([]));
    setRowsPerPage(parseInt(e.target.value, 10));
    dispatch(updateRecordTake(parseInt(e.target.value, 10)));
  }

    const makeInitValues = () => {
      let values = {};
      values[app.object.primaryName] = "";
      for(const field of app.object.schema) {
        if(field.type === 'multipleCheckboxes'){
          values[field.name] = {};
          for(const label of field.labels) { 
            values[field.name][label] = "";
          }
        } else {
          values[field.name] = "";
        }
      }
      setInitValues(values);
    }

    return (
      <Box key={props.key} sx={{mt: 4, mb: 4, display: 'flex', height: '100%', gap: 4, position: 'relative'}}>
        <Box sx={{width: "200px"}}>
            {
              app.objectList?.map(object => <Typography sx={{textAlign: 'center',mb: 2, color: 'black', backgroundColor: (id === object.id ? '#e4e4e4': null), borderRadius: '40px', py:1 }}><Link to={`/${params.appName}/${params.userId}/${object.id}`}>{object.name}</Link></Typography>)
            }
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '20px', padding: '20px', width: '100%'}}>
          <Box sx={{display: 'flex', gap: 4, alignItems: 'center', pl: '4px'}}>
              <Checkbox
                  color="primary"
                  inputProps={{
                  'aria-label': 'select all desserts',
                  }}
                  onClick={handleSelectAllClick}
                  indeterminate={app.selectedRecords?.length > 0 && app.selectedRecords?.length < app.records?.length}
                  checked={app.records?.length > 0 && app.selectedRecords?.length === app.records?.length}
              />
              <Typography fontSize='14px' color="primary.main">
                  {app.selectedRecords.length} Selected
              </Typography>
              <Typography onClick={handleOpenEdit}fontSize='14px' color="primary.main" sx={{display: 'flex', alignItems:'center', gap: '4px', cursor: 'pointer'}}>
                  <EditIcon sx={{fontSize:"20px", color: 'black'}}/>
                  <span>Edit</span>
              </Typography>
              <Typography onClick={handleOpenDelete} fontSize='14px' color="primary.main" sx={{display: 'flex', alignItems:'center', gap: '4px', cursor: 'pointer'}}>
                  <DeleteOutlineIcon sx={{fontSize:"20px", color: 'black'}}/>
                  <span>Delete</span>
              </Typography>
              <Button onClick={handleOpenCreate} variant="contained" sx={{borderRadius: 3, fontSize: '12px', ml: 'auto', display: 'flex', alignItems:'center', gap: '5px', cursor: 'pointer'}}>
                  Add record
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
                      {id && <TableCell>ID</TableCell>}
                      <TableCell>{app.object.primaryName}</TableCell>
                      {
                        app.object.schema?.map(field => <TableCell>{field.name}</TableCell>)
                      }
                  </TableRow>
              </TableHead>
              <TableBody sx={{position: 'relative'}}>
                    {

                    }
                  {app.records.map((record) => {
                      const isRecordSelected = isSelected(record._id);
                      return <TableRow sx={{padding: 4}}>
                                  {id && <>
                                  <TableCell padding="checkbox">
                                  <Checkbox
                                      color="primary"
                                      inputProps={{
                                      'aria-label': 'select all desserts',
                                      }}
                                      onClick={() => handleSelect(record)}
                                      checked={isRecordSelected}
                                  />
                                  </TableCell>
                                  <TableCell>{record._id.substr(17)}</TableCell>
                                  <TableCell>{record.data[app.object.primaryName]}</TableCell></>
                                }
                                  { 
                                    app.object.schema?.map(field => {
                                      if(field.type === 'multipleCheckboxes'){
                                        console.log('record',record);
                                          const activeCheckboxes =  Object.keys(record?.data[field.name]) && Object.keys(record?.data[field.name]).map(item => record?.data[field.name][item][0] ? item : null).filter(item => item !== null);
                                          console.log(activeCheckboxes);
                                          return <TableCell>{activeCheckboxes.join('; ')}</TableCell>  
                                      }
                                        
                                      return <TableCell>{field.type === 'date' ? new Date(record.data[field.name]).toLocaleDateString('es-ES') : record.data[field.name]}</TableCell>
                                      
                                    })
                                  }
                                  {/* <TableCell>{contact.firstName}</TableCell>
                                  <TableCell>{contact.lastName}</TableCell>
                                  <TableCell>{contact.email}</TableCell>
                                  <TableCell>{contact.phoneNumber}</TableCell>
                                  <TableCell><span style={{padding: 3, backgroundColor: '#f7f7f7', borderRadius: '20px'}}>{new Date(contact.createDate).toLocaleDateString("en-US")} {new Date(contact.createDate).toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric'})}</span></TableCell>
                                  <TableCell><span style={{padding: 3, backgroundColor: '#f7f7f7', borderRadius: '20px'}}>{new Date(contact.updateDate).toLocaleDateString("en-US")} {new Date(contact.updateDate).toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric'})}</span></TableCell>
                                  <TableCell>{contact.country}</TableCell>
                                  <TableCell>{contact.company}</TableCell> */}
                              </TableRow>
                      })
                  }
              {app.records?.length === 0 ? <Box sx={{width: '100%', position: 'absolute', textAlign: 'center', marginTop: '15%', bottom: 0, top: 0, color: 'grey'}}>No found</Box>: ''}                        
              </TableBody>
          </Table>
          <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={app.total}
                  sx={{mt:'auto'}}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  />
          <DeleteRecordModal open={openDelete} onClose={() => setOpenDelete(false)} />
          <CreateRecordDrawer open={openCreate} onClose={() => setOpenCreate(false)} schema={initValues} />
          <EditRecordModal open={openEdit} onClose={() => setOpenEdit(false)}  />
    </Box>
    </Box>

    )
}

export default Apps;