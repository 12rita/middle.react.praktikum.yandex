import "./App.css";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToasterProvider } from "@components/Toaster";
import { store } from "@/services/ducks/store.ts";
import { Provider } from "react-redux";
import { ProtectedRouteElement } from "@components/ProtectedRoute";
import {
  Constructor,
  ForgetPassword,
  Login,
  Feed,
  Register,
  ResetPassword,
} from "@pages";
import { Page404 } from "@pages/404";
import { Modal } from "@components/Modal";
import { IngredientDetails } from "@components/BurgerIngredients";
import { PathsRoutes, ProfileRoutes } from "@/shared/routes.ts";
import { OrderDetails } from "@components/OrderDetails";
import { ProfileWrapper } from "@pages/Profile";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();
  const handleModalClose = () => {
    navigate(-1);
  };
  return (
    <ToasterProvider>
      <Provider store={store}>
        <Routes location={background || location}>
          <Route
            path={PathsRoutes.LOGIN}
            element={
              <ProtectedRouteElement anonymous={true}>
                <Login />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={PathsRoutes.INGREDIENTS}
            element={
              <ProtectedRouteElement>
                <IngredientDetails />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={PathsRoutes.ORDER}
            element={
              <ProtectedRouteElement>
                <OrderDetails />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={PathsRoutes.PROFILE + ProfileRoutes.ORDER}
            element={
              <ProtectedRouteElement>
                <OrderDetails />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={PathsRoutes.FORGET_PASSWORD}
            element={
              <ProtectedRouteElement anonymous={true}>
                <ForgetPassword />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={PathsRoutes.RESET_PASSWORD}
            element={
              <ProtectedRouteElement anonymous={true}>
                <ResetPassword />
              </ProtectedRouteElement>
            }
          />

          <Route
            path={PathsRoutes.REGISTER}
            element={
              <ProtectedRouteElement anonymous={true}>
                <Register />
              </ProtectedRouteElement>
            }
          />

          <Route
            path={PathsRoutes.CONSTRUCTOR}
            element={
              <ProtectedRouteElement>
                <Constructor />
              </ProtectedRouteElement>
            }
          />

          <Route
            path={PathsRoutes.FEED}
            element={
              <ProtectedRouteElement>
                <Feed />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={PathsRoutes.PROFILE + "/*"}
            element={
              <ProtectedRouteElement anonymous={false}>
                <ProfileWrapper />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRouteElement>
                <Page404 />
              </ProtectedRouteElement>
            }
          />
        </Routes>
        {background && (
          <Routes>
            <Route
              path={PathsRoutes.ORDER}
              element={
                <Modal onClose={handleModalClose}>
                  <OrderDetails />
                </Modal>
              }
            />
            <Route
              path={PathsRoutes.PROFILE + ProfileRoutes.ORDER}
              element={
                <Modal onClose={handleModalClose}>
                  <OrderDetails />
                </Modal>
              }
            />
            <Route
              path={PathsRoutes.INGREDIENTS}
              element={
                <Modal onClose={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </Provider>
    </ToasterProvider>
  );
}

export default App;
