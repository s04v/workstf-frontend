import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const WithAuth = (props) => {
    const navigate = useNavigate();

    const cookies = new Cookies();
    const token = cookies.get('jwt');
    console.log(token);
    if(token === undefined) {
        return navigate('/signin');
    }

    const decodedJwt = jwt_decode(token);
    if(decodedJwt.exp * 1000 < Date.now()) {
        cookies.remove('jwt');
        return navigate('/signin');
    }

    return props.children;
}

export default WithAuth;