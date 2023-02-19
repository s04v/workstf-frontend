import axios from "axios";
import Cookies from "universal-cookie";

const Http = axios.create({
	baseURL: "https://akxpzzbmsi.eu-west-1.awsapprunner.com",
	// baseURL: "http://localhost:3001/",
	timeout: 5000,
});

Http.interceptors.request.use((config) => {
	const cookies = new Cookies();
	const token = cookies.get("jwt");
	console.log("token", token);
	if (token) config.headers.Authorization = `Bearer ${token}`;

	return config;
});

export default Http;
