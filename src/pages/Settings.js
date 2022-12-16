import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CreateObjectDrawer from "../components/CreateObjectDrawer";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NestedSettingsMenu from "../components/NestedSettingsMenu";
import Server from "../services/server";
import { useDispatch } from "react-redux";
import { updateAccount } from "../store/accountSlice";
const Settings = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchAccountInfo() {
            const res = await Server.Acconut.getInfo();
            dispatch(updateAccount(res.data));
        }
        fetchAccountInfo();
    },[]);
    return (
        <Box sx={{mt: 4, mb: 4, display: 'flex', height: '100%', gap: 4, position: 'relative'}}>
            <Box sx={{width: "200px"}}>
                <NestedSettingsMenu />
            </Box>
            {props.children}
        </Box>
    );
}

export default Settings;