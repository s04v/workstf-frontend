import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { keyframes } from '@mui/system';

const blink = keyframes`
  to {
    visibility: hidden;
  }
`;

const Home = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-GB', { hour12: true }).split(':'));
  const refreshTime = () => {
    setTime(new Date().toLocaleTimeString('en-GB', { hour12: true }).split(':'));
  }

  useEffect(() => {
    const id = setInterval(refreshTime, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <Box sx={{
      backgroundImage: "url(./assets/home-bg.png)",
      backgroundSize: "cover",
      height: "100%",
    }}>
      <Typography
        sx={{
          color: "white",
          fontSize: "80px",
          textAlign: "right",
          mr: "50px",
          mt: "28px"
        }}
      >{time[0]}
        <Box sx={{
          display: "inline",
          animation: `${blink} 1s steps(2, start) infinite`
        }}>:</Box>
      {time[1]}</Typography>
    </Box>
  );
};

export default Home;