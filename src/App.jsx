import React from "react";
import ApplicationRoutes from "./ApplicationRoutes";
import { ContextProvider } from "./Context/AppContext";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <React.Fragment>
      <ContextProvider>
        <ApplicationRoutes />
      </ContextProvider>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </React.Fragment>
  );
};

export default App;
