import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import Server from "@src/services/server";
import { updateAccount } from "@src/store/accountSlice";

export const useBase = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const account = useSelector((state) => state.account);
	const activeObject = useSelector((state) => state.app.object);

	const handleLogout = () => {
		setTimeout(() => {
			new Cookies().remove("jwt", { path: "/" });
			navigate("/signin");
		}, 500);
	};

	const fetchData = async () => {
		const res = await Server.Acconut.getInfo();
		dispatch(updateAccount(res.data));
	}

	useEffect(() => {
		const cookies = new Cookies();
		const token = cookies.get("jwt", { path: "/" });
		if (!token) {
			return navigate("/signin");
		}

		const decodedJwt = jwt_decode(token);
		if (decodedJwt.exp * 1000 < Date.now()) {
			cookies.remove("jwt", { path: "/" });
			return navigate("/signin");
		}
		fetchData();
	}, []);

	const makeHeader = () => {
		if (location.pathname.startsWith("/home")) return "Home";
		if (location.pathname.startsWith("/sales")) {
			if (activeObject?.singularName) {
				return "Sales > " + activeObject.singularName;
			}
			return "Sales";
		}
		if (location.pathname.startsWith("/crm")) {
			if (activeObject?.singularName) {
				return "CRM > " + activeObject.singularName;
			}
			return "CRM";
		}
		if (location.pathname.startsWith("/settings/fields"))
			return "Settings > Fields";
		if (location.pathname.startsWith("/settings")) {
			console.log(activeObject);
			if (activeObject?.singularName) {
				return "Settings > Custom Objects > " + activeObject.singularName;
			}
			return "Settings > Custom Objects";
		}
	};

	return {
		account,
		handleLogout,
		makeHeader,
	};
};
