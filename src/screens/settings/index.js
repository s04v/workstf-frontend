import FieldSettings from "../fieldSettings";
import ObjectSettings from "../objectSettings";

const Settings = ({ tab }) => {
  return !tab ? <ObjectSettings /> : <FieldSettings /> ;
}

export default Settings;