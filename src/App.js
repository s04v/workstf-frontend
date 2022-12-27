import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AlertProvider } from "./providers/alert";
import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RouteCombiner } from "./routes";
import { routes } from "./routes";

const test = require("./theme.json");

const theme = createTheme(test);

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<AlertProvider>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<BrowserRouter>
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
