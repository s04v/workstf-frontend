import axios from "axios";
import Cookies from "universal-cookie";

const Http = axios.create({
    baseURL: `http://localhost:3001`,
    // baseURL: `https://character-dao.herokuapp.com`,
    timeout: 5000,
});

Http.interceptors.request.use( (config) => {
    const cookies = new Cookies();
    const token = cookies.get('jwt');

    if(token)
        config.headers.Authorization = `Bearer ${token}`;

    return config;
});

export default Http;