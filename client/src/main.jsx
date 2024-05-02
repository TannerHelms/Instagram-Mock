import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import ProtectedRoute from "./componets/routes/protected_route.jsx";
import RedirectRoute from "./componets/routes/redirect_route.jsx";
import "./index.css";
import Home from "./pages/( HOME )/home.jsx";
import userProfile from "./pages/( PROFILE )/userprofile.jsx";
import otherProfile from "./pages/( PROFILE )/otherprofile.jsx";
import Login from "./pages/( SIGN_IN )/login.jsx";
import SignUp from "./pages/( SIGN_IN )/sign_up.jsx";
import { persistor, store } from "./redux/store.js";
import appTheme from "./theme/mantine.js";
import Search from "./pages/( SEARCH )/search.jsx";
import Create from "./pages/( CREATE )/create.jsx";
import Groups from "./pages/( GROUPS )/group.jsx";
import GroupDetails from "./pages/( GROUPS )/group_details.jsx";

const container = document.getElementById("root");
const root = createRoot(container);

const router = createHashRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <ProtectedRoute component={Home} />,
      },
      {
        path: "/home",
        element: <ProtectedRoute component={Home} />,
      },
      {
        path: "/login",
        element: <RedirectRoute component={Login} />,
      },
      {
        path: "/sign_up",
        element: <RedirectRoute component={SignUp} />,
      },
      {
        path: "/search",
        element: <ProtectedRoute component={Search} />,
      },
      {
        path: "/create",
        element: <ProtectedRoute component={Create} />,
      },
      {
        path: "/groups",
        element: <ProtectedRoute component={Groups} />,
      },
      {
        path: "/groups/:id",
        element: <ProtectedRoute component={GroupDetails} />,
      },
      {
        path: "/userprofile",
        element: <ProtectedRoute component={userProfile} />,
      },
      {
        path: "/otherprofile/:id",
        element: <ProtectedRoute component={otherProfile} />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
      cacheTime: 1000 * 60 * 15, // 15 minutes
      useErrorBoundary: true,
      retry: 0,
    },
  },
});

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={appTheme} withGlobalStyles withNormalizeCss>
          <RouterProvider router={router} />
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
