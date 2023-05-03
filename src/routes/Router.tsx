import { ReactElement } from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { Footer } from "antd/es/layout/layout";
import { Layout } from "antd";
import "react-toastify/dist/ReactToastify.css";

import { AppBar, AppHeader } from "../components";
import { ProtectedRoute } from "./ProtectedRoute";

import { routes } from "./router.config";

import { PageLayout } from "../layouts";

const Main = styled.main``;

const StyledLayout = styled(PageLayout)`
  display: block;
  width: 100%;
`;

export const Routes = (): ReactElement => {
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <AppBar />
        <StyledLayout style={{ display: "block" }}>
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
          <Footer
            style={{
              borderTop: "1px solid #e8e8e8",
              width: "100%",
              backgroundColor: "white",
              textAlign: "center",
            }}
          >
            ©{new Date().getFullYear()} Created by book shelf company
          </Footer>
        </StyledLayout>
      </Layout>

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
