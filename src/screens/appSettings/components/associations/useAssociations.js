import Server from "@src/services/server";
import { settingsStore, updateObjectList } from "@src/store/settingsSlice";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAssociations = () => {
  const dispatch = useDispatch();
  const activeApp = useSelector((state) => state.settings.app.active);
  const appList = useSelector((state) => state.settings.app.list);
  const objectList = useSelector((state) => state.settings.objectList);
  const [objects, setObjects] = useState([]);
  const [associatedObjects, setAssociatedObjects] = useState([]);
	const [selectedObject, setSelectedObject] = useState("");
  const [loading, setLoading] = useState(true);

  const prepareObjects = async () => {
		const res = await Server.App.get(activeApp._id);

		const associations = res.data.associations;
		const filteredObjects = objectList.filter(
			(item) => !associations.find((el) => el._id === item._id)
		);

		const newObjects = filteredObjects.map((obj) => {
			return { _id: obj._id, pluralName: obj.pluralName };
		});

		setObjects(newObjects);
		setAssociatedObjects(associations);
    setLoading(false);
		console.log("prepareObjects", newObjects, associations);
	};

	const handleSelectObject = (id) => setSelectedObject(id);

  const associateObject = () => {
		const newObjects = objects.filter((o) => o._id !== selectedObject._id);
		if (newObjects.length < objects.length) {
      Server.App.createAssociation(activeApp._id, selectedObject._id);

			setAssociatedObjects([...associatedObjects, selectedObject]);
			setObjects(newObjects);
			setSelectedObject("");
		}
	};

	const dissociateObject = () => {
		const newObjects = associatedObjects.filter(
			(o) => o._id !== selectedObject._id
		);
		if (newObjects.length < associatedObjects.length) {
      Server.App.removeAssociation(activeApp._id, selectedObject._id);

			setAssociatedObjects(newObjects);
			setObjects([...objects, selectedObject]);
			setSelectedObject("");
		}
	};

  useEffect(() => {
    // if(!objectList){
    //   Server.Object.getList().then(res => {
    //     dispatch(updateObjectList(res.data));
    //     setObjects(res.data);
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // } else {
    //   setObjects(objectList);
    // }

    // prepareObjects();
    console.log("associated render");
  }, []);

  useEffect(() => {
    prepareObjects();
  }, [activeApp]); 

  return {
    loading,
    objects,
    associatedObjects,
    selectedObject,
    handleSelectObject,
    associateObject,
    dissociateObject,
  };

}