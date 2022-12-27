import { Alert, Snackbar } from "@mui/material";
import { createContext, useState } from "react";

const initialState = {
	type: "",
	text: "",
};

const AlertContext = createContext({
	...initialState,
	setAlert: () => {},
});

export const AlertProvider = ({ children }) => {
	const [text, setText] = useState("");
	const [type, setType] = useState("");
	const [open, setOpen] = useState(false);

	const setAlert = (text, type) => {
		setText(text);
		setType(type);
		setOpen(true);
	};

	return (
		<AlertContext.Provider
			value={{
				setAlert,
			}}
		>
			{children}
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={() => setOpen(false)}
			>
				<Alert
					onClose={() => setOpen(false)}
					variant="filled"
					severity={type}
					sx={{ width: "100%" }}
				>
					{text}
				</Alert>
			</Snackbar>
		</AlertContext.Provider>
	);
};

export default AlertContext;
