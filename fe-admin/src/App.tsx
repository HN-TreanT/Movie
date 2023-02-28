import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { RouterLinks } from "./const";
import Login from "./pages/login-page/login";
// import { AuthorizationPage } from "./pages/Authirization-page/AuthorizationPage";
import HomePage from "./pages/Home-Page/HomePage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <div className="MainApp">
            <div className="MainContent">
              <div className="ContentPage">
                <Routes>
                  <Route path={RouterLinks.LOGIN_PAGE} element={<Login />} />
                  {/* <Route
                    path={RouterLinks.HOME_PAGE}
                    element={<AuthorizationPage />}
                  >
                  </Route> */}
                  {/* <Route
                  path={RouterLinks.HOME_PAGE}
                  element={<HomePage/>}></Route> */}
                </Routes>
                <HomePage />
              </div>
            </div>
          </div>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
