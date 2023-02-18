import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";

const { default: Server } = require("@src/services/server");
const { useEffect, useState } = require("react");
const { useParams, useLocation, useNavigate } = require("react-router-dom");

export const useSingleRecord = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
	const id = params.id;
	const recordId = params.recordId;
	const objectId = params.objectId;

  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState(null);
  const [objectName, setObjectName] = useState("");
  const [primaryField, setPrimaryField] = useState("");
  const activeObject = useSelector(state => state.app.object);

  const navigateBack = () => {
    const path = window.location.pathname.split('/');
    path.pop()
    navigate(path.join('/'));
  }

  useEffect(() => {
    console.log("selected object", activeObject);
    const fetchData = async () => {
      let res = await Server.Object.getRecord(objectId, recordId);
      const primaryName = Object.keys(res.data.data)[0];

      console.log("activeObject",activeObject)
      if(activeObject.pluralName === "Contacts") {
        setPrimaryField(`${res.data.data['First Name']} ${res.data.data['Last Name']}`);
        delete res.data.data['First Name'];
        delete res.data.data['Last Name'];
      } else if(activeObject.pluralName === "Account" || activeObject.pluralName === "Opportunities ") {
        setPrimaryField(`${res.data.data['Name']}`);
        delete res.data.data['Name'];
      } else {
        setPrimaryField(res.data.data[primaryName]);
        delete res.data.data[primaryName];
      }

      setRecords(res.data.data);
      setLoading(false);

      if(!state) {
        res = await Server.Object.get(objectId);
        setObjectName(res.data.pluralName);
      } else {
        setObjectName(state.objectName);
      }

      setLoading(false);
    }

    fetchData();
}, []);

  return {
    loading,
    records,
    primaryField,
    objectName,
    navigateBack,
  }
}