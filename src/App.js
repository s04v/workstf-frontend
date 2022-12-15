import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlertProvider } from './utils/AlertProvider';
import { createTheme, ThemeProvider } from "@mui/material";
import themeConfig from './theme.json';
import BasePage from "./pages/Base";
import Apps from "./pages/Apps";
import WithAuth from "./utils/WithAuth";
import Settings from "./pages/Settings";
import SettingsFields from "./pages/SettingsFields";
import SettingsObject from "./pages/SettingsObject";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const test = require('./theme.json');

const theme = createTheme(test);

function App() {
    return (
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <AlertProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="App">
            <BrowserRouter>
              <Routes>
                <Route path='/signin' element={<Signin />}/>  
                <Route path='/signup' element={<Signup />}/>  
                <Route path='/home' element={<BasePage><Home /></BasePage>}/>  
                <Route path='/:appName/:userId' element={<BasePage key={window.location.pathname}><Apps key={1} /></BasePage>}/>  
                <Route path='/:appName/:userId/:id' element={<BasePage key={window.location.pathname}><Apps key={2} /></BasePage>}/>  
                <Route path='/settings' element={<BasePage><Settings> <SettingsObject /> </Settings></BasePage>}/>  
                <Route path='/settings/:id' element={<BasePage><Settings> <SettingsFields /></Settings></BasePage>}/>  
              </Routes>
            </BrowserRouter> 
          </div>
        </LocalizationProvider>
      </AlertProvider>
    </Provider>
    </ThemeProvider>
  );
}

export default App;
