import { Box, Button, Divider, MenuItem, TextField, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { useObjectsSettings } from '../../useObjectSettings';
import CreateDrawer from '../createDrawer';
import DeleteObjectModal from '../deleteModal';

const Configuration = () => {
  const {
		openCreateObject,
		openEditObject,
		objectList,
		activeObject,
		openDelete,
		handleChangeObject,
		handleOpenDrawer,
		handleCloseDrawer,
		handleCloseDelete,
		handleOpenDeleteModal,
    handleOpenEditDrawer,
		handleCloseEditDrawer,
	} = useObjectsSettings();

  return (
    <>
    { !activeObject.isDefault ? <>
      <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <Box
        sx={{
          py: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3
          }}
        >
          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <TextField
              select
              sx={{ my: 2, width: "400px" }}
              autoComplete="off"
              name="selectedObject"
              value={activeObject && activeObject.singularName}
              label="Select a custom object"
              // onChange={(e) => setSelectedObject(e.target.value)}
              // error={formik.touched.country && Boolean(formik.errors.country)}
              // helperText={formik.touched.country && formik.errors.country}
            >
              {objectList.map((object) => (
                <MenuItem
                  value={object.singularName}
                  onClick={() => handleChangeObject(object)}
                >
                  {object.singularName}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Button
            onClick={handleOpenDrawer}
            variant="contained"
            sx={{
              padding: "10px 20px",
              borderRadius: 1,
              display: "flex",
              gap: 1,
              justifyContent: "center"
            }}
          >
            <FolderIcon />
            <Typography>Create Custom Object</Typography>
          </Button>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ backgroundColor: "#F7F7F7", py: 2}}>
        <Typography sx={{
          fontSize: 20,
          mx: 3,
          my: 1
        }}>
          Setup
        </Typography>
      </Box>
      <Box sx={{ px: 3, py: 2 }}>
        <Typography sx={{ mb: "10px" }}>
          <Typography sx={{ textDecoration: "underline", textDecorationColor: "grey", color: "#212121", cursor: "pointer" }} onClick={handleOpenEditDrawer}>
            Custom Object Settings
          </Typography>
        </Typography>
        <Typography sx={{ fontSize: "14px", color: "#828282" }}>
          Default custom object settings.
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ px: 3, py: 2 }}>
        <Typography sx={{ mb: "10px" }}>
          <Typography sx={{ textDecoration: "underline", textDecorationColor: "grey", color: "#212121", cursor: "pointer" }} onClick={handleOpenDeleteModal}>
            Delete custom object
          </Typography>
        </Typography>
        <Typography sx={{ fontSize: "14px", color: "#828282" }}>
          This is change is irreversible.
        </Typography>
      </Box>
      <Divider />
    </Box>
    <CreateDrawer open={openCreateObject} onClose={handleCloseDrawer} />
    <CreateDrawer open={openEditObject} onClose={handleCloseEditDrawer} edit/>
    <DeleteObjectModal open={openDelete} onClose={handleCloseDelete} />
    </> 
    : 
      <Box sx={{ backgroundColor: "#F7F7F7", py: 2}}>
        <Typography sx={{
          fontSize: 20,
          mx: 3,
          my: 1
        }}>
          Setup
        </Typography>
      </Box>
    }
    
  </>
  )
}

export default Configuration;