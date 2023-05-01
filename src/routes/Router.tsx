import { ReactElement } from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

import { AppHeader } from "../components";
import { ProtectedRoute } from "./ProtectedRoute";

import { routes } from "./router.config";

import "react-toastify/dist/ReactToastify.css";

const Main = styled.main``;

export const Routes = (): ReactElement => {
  return (
    <>
      <AppHeader />
      <Main>
        <ReactRoutes>
          {Object.keys(routes).map((key) => {
            return (
              <Route
                key={key}
                path={key}
                element={
                  <ProtectedRoute permissions={routes[key].permissions}>
                    {routes[key].element}
                  </ProtectedRoute>
                }
              />
            );
          })}
        </ReactRoutes>
      </Main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
