import React, { useMemo } from "react";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Browse from "./pages/Browse"; // Assuming you have a Home component
import Individual from "./pages/Individual";
import Discovery from "./pages/Discovery";
import ScrollToTop from "./components/ScrollToTop";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./pages/Home";
import { AuthProvider } from "./provider/AuthProvider";
import ProtectedRoute from "./provider/ProtectedRoute";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60,
            onError: (error) => {
              console.error("Error fetching data: ", error);
            },
            retry: 2,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
            refetchOnWindowFocus: false,
          },
        },
      }),
    []
  );

  const protectedRoutes = [
    { path: "/manga/:id", component: Individual },
    { path: "/browse", component: Browse },
    { path: "/discovery", component: Discovery },
    { path: "/profile", component: Profile },
    { path: "/dashboard", component: Dashboard },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <main className="min-h-screen">
            <ScrollToTop />
            <Routes>
              {protectedRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<ProtectedRoute>{React.createElement(route.component)}</ProtectedRoute>}
                />
              ))}
              <Route path="/" element={<Home />} />
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              draggable
              theme="light"
            />
          </main>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
