import { Box, Button, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 444,
	bgcolor: "background.paper",
	borderTopLeftRadius: "4px",
	borderTopRightRadius: "4px",
	boxShadow: 24,
	border: 0,
};

const DeleteModal = ({ open, title, message, handleDelete, onClose }) => {
	return (
		<Modal open={open} sx={{ outline: "none" }} disableAutoFocus={true}>
			<Box sx={{ ...style }}>
				<Box
					sx={{
						backgroundColor: "#C63A41",
						color: "white",
						padding: 3,
						borderTopLeftRadius: "4px",
						borderTopRightRadius: "4px",
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					{/* <b>Detele {selected.length} contacts</b>{' '} */}
					{title}
					<CloseIcon
						sx={{ fontSize: "24px", cursor: "pointer" }}
						onClick={onClose}
					/>
				</Box>
				<Box
					sx={{
						padding: 3,
					}}
				>
					<Typography color="#212121"  sx={{ mb: 3 }}>
						{message}
						{/* You are about to delete {selected.length} records. Deleted records
            can't be restored and will be deleted permanently. */}
					</Typography>
					<Typography color="#C63A41"  sx={{ mb: 3 }}>
						This action cannot be reverted.
					</Typography>

					<Button
						onClick={handleDelete}
						variant="contained"
						sx={{
							px: 4,
							py: 0.7,
							mr: 2,
							backgroundColor: "#C63A41",
							":hover": { backgroundColor: "red" },
						}}
					>
						<b>Delete</b>
					</Button>
					<Button
						onClick={onClose}
						variant="outlined"
						sx={{
							px: 4,
							border: 2,
							borderColor: "#d71111",
							color: "#d71111",
							":hover": { border: 2 },
						}}
					>
						<b>Cancel</b>
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default DeleteModal;
