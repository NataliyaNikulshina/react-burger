import React, { FC } from "react";
import { useSelector, useDispatch } from "../../services/hooks";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/home";
import NotFound404 from "../../pages/not-found";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";
import FeedPage from "../../pages/feed";
import OrderDetailsPage from "../../pages/order-details";
import IngredientDetailsPage from "../../pages/ingredients-id";
import { checkUserThunk } from "../../services/actions/user";
import ProtectedRouteElement from "../protected-route/protected-route";
import AppHeader from "../app-header/app-header";
import { getItems } from "../../services/actions/ingredients";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../modal/modal";
import { useEffect, useState } from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { setIngredientDetails } from "../../services/actions/ingredient-details";
import Loader from "../loader/loader";
import OrderDetailsInfo from "../order-details-info/order-details-info";
import { getToken } from "../../hooks/useTokens";

const App: FC = () => {
  const isLoading = useSelector((state) => state.ingredients.itemsRequest);
  const isLoadingUser = useSelector((state) => state.user.checkUserRequest);
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state?.background;
  const backgroundFeed =
    location.state?.locationFeed || location.state?.locationProfile || location;
  const navigate = useNavigate();
  const { orders } = useSelector((store) => store.wsocketFeed);
  const token = getToken();

  useEffect(() => {
    dispatch(checkUserThunk());
  }, []);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  //console.log(isLoading, isLoadingUser)
  const [visibility, changeVisibility] = useState(false);

  const onClose = () => {
    changeVisibility(false);
    navigate("/");
  };

  useEffect(() => {
    if (location.state?.ingredient) {
      dispatch(setIngredientDetails(location.state.ingredient));
      changeVisibility(true);
    }
  }, [location.state]);

  const [visibilityOrder, changeVisibilityOrder] = useState(false);

  const onCloseOrder = () => {
    changeVisibilityOrder(false);
    navigate(-1);
  };

  useEffect(() => {
    if (location.state?.locationFeed || location.state?.locationProfile) {
      //dispatch(setIngredientDetails(location.state.ingredient));
      changeVisibilityOrder(true);
    }
  }, [location.state]);

  // console.log(location.state?.locationFeed )
  // console.log(location.state )

  return !isLoading && isLoadingUser === false && orders ? (
    <>
      <AppHeader />
      <Routes location={background || location || backgroundFeed}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <ProtectedRouteElement needAuth={false}>
              <LoginPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRouteElement needAuth={false}>
              <RegisterPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRouteElement needAuth={false}>
              <ForgotPasswordPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRouteElement needAuth={false}>
              <ResetPasswordPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement needAuth={true}>
              <ProfilePage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRouteElement needAuth={true}>
              <ProfilePage />
            </ProtectedRouteElement>
          }
        >
          {location.state?.from === "profile" && orders && (
            <Route
              path=":id"
              element={
                <Modal
                  onClose={onCloseOrder}
                  children={<OrderDetailsInfo order={location.state.order} />}
                />
              }
            />
          )}
        </Route>
        <Route
          path="/profile/orders/:id"
          element={
            <ProtectedRouteElement needAuth={true}>
              <OrderDetailsPage />
            </ProtectedRouteElement>
          }
        />
        <Route path="/feed" element={<FeedPage />}>
          {location.state?.from === "feed" && orders && (
            <Route
              path=":id"
              element={
                <Modal
                  onClose={onCloseOrder}
                  children={<OrderDetailsInfo order={location.state.order} />}
                />
              }
            />
          )}
        </Route>
        <Route path="/feed/:id" element={<OrderDetailsPage />} />
        <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {background && (
        <Modal onClose={onClose} title={"Детали ингредиента"}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  ) : (
    <Loader />
  );
}

export default App;