import { Box, Button, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	borderRadius: "20px",
	border: 0,
};

const DeleteModal = ({ open, title, message, handleDelete, onClose }) => {
	return (
		<Modal open={open} sx={{ outline: "none" }} disableAutoFocus={true}>
			<Box sx={{ ...style, width: 400 }}>
				<Box
					sx={{
						backgroundColor: "#d71111",
						color: "white",
						padding: 3,
						borderTopLeftRadius: "20px",
						borderTopRightRadius: "20px",
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					{/* <b>Detele {selected.length} contacts</b>{' '} */}
					<b>{title}</b>{" "}
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
					<Typography color="grey" fontSize="12px" sx={{ mb: 3 }}>
						{" "}
						{message}
						{/* You are about to delete {selected.length} records. Deleted records
            can't be restored and will be deleted permanently. */}
					</Typography>

					<Button
						onClick={handleDelete}
						variant="contained"
						sx={{
							px: 4,
							py: 1,
							mr: 2,
							fontSize: 12,
							backgroundColor: "#d71111",
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
							fontSize: 12,
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
