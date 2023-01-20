import { Box, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";

const DateType = (props) => {
	const [state, setState] = useState("");

	return (
			<DatePicker
				sx={{ width: "100%" }}
				label={props.label}
				inputFormat="MM/DD/YYYY"
				error={false}
				value={(props.preview ? state : props.value) || null}
				onChange={
					props.preview
						? (val) => {
								setState(val);
						  }
						: props.onChange
				}
				renderInput={(props) => (
					<TextField fullWidth sx={{ backgroundColor: "white" }} error={false} {...props} />
				)}
			/>
	);
};

export default DateType;
