import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";

const DropdownType = (props) => {
	const [selected, setSelected] = useState("");
	return (
			<TextField
				fullWidth
				select
				autoComplete="off"
				name={props.name}
				placeholder="Select field type"
				sx={{ backgroundColor: "white" }}
				value={props.value}
				label={props.label}
				onChange={props.onChange}
				// error={formik.touched.type && Boolean(formik.errors.type)}
				// helperText={formik.touched.type && formik.errors.type}
			>
				{props.data.map((item) => (
					<MenuItem value={item}>{item}</MenuItem>
				))}
			</TextField>
	);
};

export default DropdownType;
