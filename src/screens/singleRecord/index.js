import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PersonIcon from '@mui/icons-material/Person';
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSingleRecord } from "./useSingleRecord";

const SingleRecord = () => {
  const {
    loading,
    records,
    objectName,
    navigateBack
  } = useSingleRecord();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: "#F7F7F7", px: 3, py: 3}}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer",  pb: 2 }} onClick={navigateBack}> 
        <ChevronLeftIcon />
        <Typography sx={{ fontSize: 20, textDecoration: "underline" }}>
          {objectName}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", height: "100%", gap: 3 }}>
        <Box sx={{ width: "80%", gap: 3}} >
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 3 }}>
              <Paper sx={{ display: "flex", alignItems: "center", gap: 2, padding: 2 }} >
                <PersonIcon sx={{padding: 1.5, borderRadius: "50%", color: "white", backgroundColor: "#E5E5E5" }} />
                <Typography sx={{ fontSize: 20}}>
                  John Doe
                </Typography>
              </Paper>
            <Paper sx={{ height: "100%" }}>
            <Box sx={{ position: "relative", display: "flex", ml: 2, pt: 1}}>
              <Box
                style={{
                  borderBottom: "2px solid #4787EA",
                  padding: "10px",
                  color: "#4787EA",
                  cursor: "pointer"
                }}
              >
                Details
              </Box>
            </Box>
            <Divider />
              {records && Object.keys(records).map(field => {
                return (
                  <>
                  <Box sx={{px: 3, py: 2}}>
                    <Typography sx={{fontSize: 14, color: "#828282"}}>{field}</Typography>
                    {typeof records[field] === 'object' ? 
                      <Typography>{Object.keys(records[field]).map(key => records[field][key][0] === 'on' ? `${key}; ` : "")}</Typography> 
                    :
                      <Typography>{records[field]}</Typography>
                    }
                  </Box>
                  <Divider />
                  </>
                )
              })}
              

            </Paper>
          </Box>
        </Box>
        <Paper sx={{ width: "20%", height: "100%" }}>
          <Typography sx={{ fontSize: 24, padding: 2.6 }}>
            Activities
          </Typography>
          <Divider />
        </Paper>
      </Box>
    </Box>
  );
}

export default SingleRecord;