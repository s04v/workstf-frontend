import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlertProvider } from './utils/AlertProvider';
function App() {
  return (
    <Provider store={store}>
      <AlertProvider>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path='/signin' element={<Signin />}/>  
              <Route path='/signup' element={<Signup />}/>  
              <Route path='/home' element={<Home />}/>  
            </Routes>
          </BrowserRouter> 
        </div>
      </AlertProvider>
    </Provider>
  );
}

export default App;
