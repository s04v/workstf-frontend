import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { AlertProvider } from "./providers/alert";
import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RouteCombiner } from "./routes";
import { routes, testRoutes } from "./routes";
import BasePage from "./layouts/base";
import SettingsLayout from "./layouts/settingsLayout";
import AppSettings from "./screens/appSettings";

const test = require("./theme.json");

const theme = createTheme(test);

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<AlertProvider>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							{/* {console.log(routes)} */}
							<BrowserRouter>
								{console.log(<RouteCombiner routes={routes} />)}
								<RouteCombiner routes={routes} />
							</BrowserRouter>
						</LocalizationProvider>
					</AlertProvider>
				</Provider>
			</ThemeProvider>
		</div>
	);
}

export default App;
