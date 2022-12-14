import { Box, Checkbox, FormControlLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const CheckboxType = (props) => {
  const [checkboxStates, setCheckboxStates] = useState([]);

  useEffect(() => {
    const state = [];
    for(const label of props.data) { 
      state.push({label, checked: false});
    }
    setCheckboxStates(state);
  }, [props.data]);

  const handleClick = (e, i) => {
    const prevState = [...checkboxStates];
    prevState[i].checked = !prevState[i].checked;
    setCheckboxStates(prevState);
  }
  
  const makeLabel = () => {
   const labels = props.data.map(item => props.value[item][0] ? item : null).filter(item => item !== null);
   console.log(props);

   return labels.join('; ');
  }

  const makePreviewLabel = () => {
    const labels = checkboxStates.map(item => item ? item.label : null).filter(item => item !== null);
    return labels.join('; ');
  }

  return (
    <Box>
      {props.preview && <Typography>Dropdown</Typography>}
      <TextField
        fullWidth
        select 
        autoComplete="off"
        name="type"
        placeholder="Select field type"
        sx={{backgroundColor: 'white', ul:{paddingBottom: '0px !important'}}}
        value={10}
        // value={formik.values.type}
        // onChange={formik.handleChange}
        // error={formik.touched.type && Boolean(formik.errors.type)}
        // helperText={formik.touched.type && formik.errors.type}
      >
         <MenuItem value={10} sx={{display: 'none'}}>{props.preview ? makePreviewLabel() : makeLabel()}</MenuItem>
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          
          { !props.preview ?
              props.data.map((key, i) => {
                return <FormControlLabel sx={{px: 4, borderBottom: '1px solid #c6c6c6', width: '100%'}} control={<Checkbox variant="outlined" name={`${props.name}[${key}]`} checked={props.value[key][0]} onChange={props.onChange} />} label={key} />
              } )
              :
              checkboxStates.map((key, i) => {
                return <FormControlLabel sx={{px: 4, borderBottom: '1px solid #c6c6c6', width: '100%'}} control={<Checkbox variant="outlined" checked={checkboxStates[i].checked} onChange={() => handleClick(null, i)}/>} label={checkboxStates[i].label} />
              } )
          }
          
        </Box>
      </TextField>
    </Box>
  );
}

export default CheckboxType;