import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import AppsIcon from '@mui/icons-material/Apps';
import Footer from '../components/Footer';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import Cookies from "universal-cookie";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import SettingsIcon from '@mui/icons-material/Settings';

const BasePage = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const account = useSelector(state => state.account);
    const activeObject = useSelector(state => state.app.object);
    const handleLogout = () => {
        setTimeout(()=> {
            new Cookies().remove('jwt', {path: '/'});
            navigate('/signin');
        }, 500);
    }

    useEffect(() => {
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
    }, []);

    const makeHeader = () => {
        if(location.pathname.startsWith('/home')) 
            return "Home";
        if(location.pathname.startsWith('/apps/sales')) {
            if(activeObject?.singularName) {
                return "Sales > " + activeObject.singularName;
            }
            return "Sales";
        }
        if(location.pathname.startsWith('/apps/crm')){
            if(activeObject?.singularName) {
                return "CRM > " + activeObject.singularName;
            }
            return "CRM";
        }
        if(location.pathname.startsWith('/settings/fields'))
            return "Settings > Fields";
        if(location.pathname.startsWith('/settings')) {
            console.log(activeObject)
            if(activeObject?.singularName) {
                return "Settings > Custom Objects > "+ activeObject.singularName;
            }
            return "Settings > Custom Objects";

        }
    }

    return (
        <Box sx={{
            display: 'flex',
            minHeight: '100vh',
        }}>
            <Box sx={{
                backgroundColor: '#f0f0f0',
                width: '80px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems:'center'
            }}>
                <AppsIcon sx={{mt:3}} />
                {location.pathname === "/home" ? 
                    <HomeOutlinedIcon  sx={{mt:3, backgroundColor: '#58BDBC', padding: '10px', borderRadius: '50%', color: 'white'}} />
                    :
                    <Link to="/home">
                        <HomeOutlinedIcon  sx={{mt:3, backgroundColor: '#58BDBC', padding: '10px', borderRadius: '50%', color: 'white'}} />
                    </Link>
                }
                {location.pathname.startsWith("/apps/crm") ? 
                    <PersonOutlineIcon  sx={{mt:3, backgroundColor: '#f07d24', padding: '10px', borderRadius: '50%', color: 'white'}} />
                    :
                    <a href="/apps/crm"><PersonOutlineIcon  sx={{mt:3, backgroundColor: '#f07d24', padding: '10px', borderRadius: '50%', color: 'white'}} /></a>
                }
                {location.pathname.startsWith("/apps/sales") ? 
                    <WorkOutlineIcon  sx={{mt:3, backgroundColor: '#d01f22', padding: '10px', borderRadius: '50%', color: 'white'}} />
                    :
                    <a href="/apps/sales"><WorkOutlineIcon  sx={{mt:3, backgroundColor: '#d01f22', padding: '10px', borderRadius: '50%', color: 'white'}} /></a>
                }
            </Box>
            <Box sx={{
                width: '100%',
                pt: 3,
                pr: 4,
                pl: 4,
                backgroundColor: '#f7f7f7',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}> 
                        <img src={"logo.png"} alt="" style={{width: '40px'}}/>
                        <Typography fontSize={18}><b>{makeHeader()}</b></Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}> 
                        <Typography color="grey">Welcome, {account.firstName}</Typography>
                        <Link to="/settings"><SettingsIcon /></Link>
                        <Typography color="primary.main" sx={{cursor: 'pointer', display: 'flex', alignItems:'center', gap: 1}}onClick={handleLogout}><LogoutIcon sx={{fontSize: 18}} />Logout</Typography>
                    </Box>
                </Box>
                {props.children}
                <Footer />
            </Box>
        </Box>
    )
}

export default BasePage;