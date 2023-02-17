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
  
  const navigateBack = () => {
    const path = window.location.pathname.split('/');
    path.pop()
    navigate(path.join('/'));
  }

  useEffect(() => {
    const fetchData = async () => {
      let res = await Server.Object.getRecord(objectId, recordId);
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
    objectName,
    navigateBack,
  }
}