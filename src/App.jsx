import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

// Import Routes
import Routing from "./routes/Routing";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { loadUser } from "./redux/actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Alert from "./common/Alert";

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
        <Alert />
        <Routing />
      </div>
    </Provider>
  );
}

export default App;
