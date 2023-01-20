import { Box, MenuItem, TextField, Typography } from "@mui/material";

const BooleanType = (props) => {
	return (
			<TextField
				fullWidth
				select
				autoComplete="off"
				name={props.name}
				label={props.label}
				sx={{ backgroundColor: "white" }}
				value={props.value || true}
				onChange={props.onChange}
				// error={formik.touched.type && Boolean(formik.errors.type)}
				// helperText={formik.touched.type && formik.errors.type}
			>
				<MenuItem value="true">True</MenuItem>
				<MenuItem value="false">False</MenuItem>
			</TextField>
	);
};

export default BooleanType;
