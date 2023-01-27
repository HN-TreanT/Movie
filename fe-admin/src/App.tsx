import { Provider } from "react-redux";
import { store } from "./redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { RouterLinks } from "./const";
import Login from "./pages/login-page/login";
import { AuthorizationPage } from "./pages/Authirization-page/AuthorizationPage";
import EditInfo from "./pages/edit-page/editInfo";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="MainApp">
          <div className="MainContent">
            <div className="ContentPage">
              <Routes>
                <Route path={RouterLinks.LOGIN_PAGE} element={<Login />} />
                <Route
                  path={RouterLinks.APP_PAGE}
                  element={<AuthorizationPage />}
                >
                  <Route path={RouterLinks.EDIT_PAGE} element={<EditInfo />} />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
