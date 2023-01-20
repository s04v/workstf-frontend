import {
	Box,
	Checkbox,
	Chip,
	FormControlLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import { useFormikContext } from "formik";

const CheckboxType = (props) => {
	const { setFieldValue } = useFormikContext();
	const [checkboxStates, setCheckboxStates] = useState([]);
	useEffect(() => {
		const state = [];
		for (const label of props.data) {
			state.push({ label, checked: false });
		}
		setCheckboxStates(state);
	}, [props.data]);

	const handleClick = (e, i) => {
		const prevState = [...checkboxStates];
		prevState[i].checked = !prevState[i].checked;
		setCheckboxStates(prevState);
	};

	const makeLabel = () => {
		const labels = props.data
			.map((item) => (props.value[item][0] ? item : null))
			.filter((item) => item !== null);

		return (
			<Box sx={{ position: "absolute", display: "flex", gap: 1, top: "24%"}}>
				{labels.map((label) => {
					return (
						<Chip
							label={label}
							onDelete={() => handleDelete(label)}
							deleteIcon={
								<CancelIcon onMouseDown={(event) => event.stopPropagation()} />
							}
						/>
					);
				})}
			</Box>
		);
	};

	const makePreviewLabel = () => {
		const labels = checkboxStates
			.map((item) => (item.checked ? item.label : null))
			.filter((item) => item !== null);

		return (
			<Box sx={{ position: "absolute", display: "flex", gap: 1, top: "24%"}}>
				{labels.map((label) => {
					return (
						<Chip
							label={label}
							onDelete={() => handlePreviewDelete(label)}
							deleteIcon={
								<CancelIcon onMouseDown={(event) => event.stopPropagation()} />
							}
						/>
					);
				})}
			</Box>
		);
	};

	const handleDelete = (label) => {
		console.log("TEST", `${props.name}[${label}]`);
		setFieldValue(`${props.name}[${label}]`, false);
		setCheckboxStates((prev) => prev.map((item) => item.label === label ? {...item, checked: false}: {...item}));    
	};

	const handlePreviewDelete = (label) => {
		setCheckboxStates((prev) => prev.map((item) => item.label === label ? {...item, checked: false}: {...item}));    
	};

	return (
		<TextField
			InputLabelProps={{ shrink: true }}
			fullWidth
			select
			autoComplete="off"
			name="type"
			label={props.label}
			sx={{
				backgroundColor: "white",
			}}
			value={10}
			// value={formik.values.type}
			// onChange={formik.handleChange}
			// error={formik.touched.type && Boolean(formik.errors.type)}
			// helperText={formik.touched.type && formik.errors.type}
		>
			<MenuItem value={10} sx={{ display: "none" }}>
				{props.preview ? makePreviewLabel() : makeLabel()}
			</MenuItem>
			<Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
				{!props.preview
					? props.data.map((key, i) => {
							return (
								<FormControlLabel
									sx={{
										px: 4,
										borderBottom: "1px solid #c6c6c6",
										width: "100%",
									}}
									control={
										<Checkbox
											sx={{
												color: "black",
												"&.Mui-checked": {
													color: '#4787EA'
												}
											}}
											variant="outlined"
											name={`${props.name}[${key}]`}
											checked={props.value[key][0]}
											onChange={props.onChange}
										/>
									}
									label={key}
								/>
							);
					  })
					: checkboxStates.map((key, i) => {
							return (
								<FormControlLabel
									sx={{
										px: 4,
										borderBottom: "1px solid #c6c6c6",
										width: "100%",
									}}
									control={
										<Checkbox
											sx={{
												color: "black",
												"&.Mui-checked": {
													color: '#4787EA'
												}
											}}
											variant="outlined"
											checked={checkboxStates[i].checked}
											onChange={() => handleClick(null, i)}
										/>
									}
									label={checkboxStates[i].label}
								/>
							);
					  })}
			</Box>
		</TextField>
	);
};

export default CheckboxType;
