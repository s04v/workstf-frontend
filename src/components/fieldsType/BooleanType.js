import { Box, MenuItem, TextField, Typography } from "@mui/material";

const BooleanType = (props) => {
  return (
    <Box>
      {props.preview && <Typography>Boolean</Typography>}
      <TextField 
        fullWidth
        select
        autoComplete="off"
        name={props.name}
        placeholder="Select field type"
        sx={{backgroundColor: 'white'}}
        value={props.value}
        onChange={props.onChange}
        // error={formik.touched.type && Boolean(formik.errors.type)}
        // helperText={formik.touched.type && formik.errors.type}
      >
        <MenuItem value="none">Select field type</MenuItem>
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="false">False</MenuItem>

      </TextField>
    </Box>
  );
}

export default BooleanType;