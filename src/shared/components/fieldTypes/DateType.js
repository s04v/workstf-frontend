import { Box, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";

const DateType = (props) => {
	const [state, setState] = useState("");

	useEffect(() => {
		console.log(new Date(state.$d).toLocaleDateString("en-US"));
	}, [state]);
	return (
		<Box>
			{props.preview && <Typography>Date</Typography>}
			<DatePicker
				sx={{ width: "100%" }}
				inputFormat="MM/DD/YYYY"
				// name={props.name}
				value={props.preview ? state : props.value}
				onChange={
					props.preview
						? (val) => {
								setState(val);
						  }
						: props.onChange
				}
				renderInput={(props) => (
					<TextField fullWidth sx={{ backgroundColor: "white" }} {...props} />
				)}
			/>
		</Box>
	);
};

export default DateType;
