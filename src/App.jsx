import Routing from "./routes/Routing";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./features/store";
import { loadUser } from "./features/auth/authSlice";
import setAuthToken from "./utils/setAuthToken";

import { ToastContainer, toast } from "react-toastify";


const token = sessionStorage.getItem("token");

if (token) {
  setAuthToken(token);
}


function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  
  return (
    <Provider store={store}>
      <div className="relative">

        <Routing />
      </div>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </Provider>
  );
}

export default App;
