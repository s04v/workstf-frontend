import { Box, Button, Divider, MenuItem, TextField, Typography } from "@mui/material";
import { useAppSettings } from "../../useAppSettings";
import LayersIcon from '@mui/icons-material/Layers';
import CreateDrawer from "../createDrawer";
import DeleteObjectModal from "../deleteModal";

const Configuration = () => {
  const {
		activeApp,
		appList,
		openCreateDrawer,
		openDelete,

    openEditDrawer,
		handleOpenEditDrawer,
		handleCloseEditDrawer,

		handleChangeApp,
		handleOpenDrawer,
    handleCloseDrawer,
    handleOpenDelete,
    handleCloseDelete,
	} = useAppSettings();
  return (
    <>
      {
        !activeApp.isDefault ? <>
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
                name="selectedApp"
                value={activeApp && activeApp.name}
                label="Select application"
                // onChange={(e) => setSelectedObject(e.target.value)}
                // error={formik.touched.country && Boolean(formik.errors.country)}
                // helperText={formik.touched.country && formik.errors.country}
              >
                {appList.map((app) => (
                  <MenuItem
                    value={app.name}
                    onClick={() => handleChangeApp(app)}
                  >
                    {app.name}
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
              <LayersIcon />
              <Typography sx={{}}>Create Application</Typography>
            </Button>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ backgroundColor: "#F7F7F7", py: 2}}>
          <Typography sx={{
            fontSize: 20,
            mx: 3,
          }}>
            Setup
          </Typography>
        </Box>
        <Box sx={{ px: 3, py: 2 }}>
          <Typography sx={{ mb: "10px" }}>
            <Typography sx={{ textDecoration: "underline", textDecorationColor: "grey", color: "#212121", cursor: "pointer" }} 
            onClick={handleOpenEditDrawer}
            >
              Application Settings
            </Typography>
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#828282" }}>
            Default custom application settings.
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ px: 3, py: 2 }}>
          <Typography sx={{ mb: "10px" }}>
            <Typography sx={{ textDecoration: "underline", textDecorationColor: "grey", color: "#212121", cursor: "pointer" }} 
            onClick={handleOpenDelete}
            >
              Delete Application
            </Typography>
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#828282" }}>
            This is change is irreversible.
          </Typography>
        </Box>
        <Divider />
      </Box>
      <CreateDrawer open={openCreateDrawer} onClose={handleCloseDrawer} />
			<DeleteObjectModal open={openDelete} onClose={handleCloseDelete} />
        </>
        : <Box sx={{ backgroundColor: "#F7F7F7", py: 2}}>
        <Typography sx={{
          fontSize: 20,
          mx: 3,
        }}>
          Setup
        </Typography>
      </Box>
      }

      <CreateDrawer edit open={openEditDrawer} onClose={handleCloseEditDrawer} />

      
    </>
  );
}

export default Configuration;