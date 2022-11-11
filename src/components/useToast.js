import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

const useToast = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const showtoast = (message, type) => {
        setMessage(message);
        setType(type)
        setOpen(true);
    } 

    const toast =   
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
            <Alert onClose={() => setOpen(false)} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>;

    return [toast, showtoast];
}

export default useToast;