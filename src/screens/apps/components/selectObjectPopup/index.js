import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const { MenuItem, Menu } = require("@mui/material");

const useSelectObjectPopup = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
	const objectList = useSelector((state) => state.app.objectList);
	const userId = params.userId;
	const appName = params.appName;

  const handleSelectClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (id) => {
    navigate(`/${appName}/${userId}/${id}`);
    handleClose();
  }

  const SelectObjectPopup = () => (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      PaperProps={{
        style: {
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.12) 100%), #121212",
          color: "white",
          width: "260px",
          pb: 2,
        }
      }}
    >
      {console.log(objectList)}
      {objectList.map((obj) => {
        return <MenuItem onClick={() => handleSelect(obj.id)} sx={{
          px: 2,
          ":hover": {
            background: "rgba(255, 255, 255, 0.08)"
          }
        }}>{obj.pluralName}</MenuItem>
      })}
    </Menu>);

  return {
    SelectObjectPopup,
    handleSelectClick
  };
}

export default useSelectObjectPopup;