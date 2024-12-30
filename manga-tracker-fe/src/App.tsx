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

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <main className="min-h-screen">
            <ScrollToTop />
            <Routes>
              <Route
                path="/manga/:id"
                element={
                  <ProtectedRoute>
                    <Individual />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/browse"
                element={
                  <ProtectedRoute>
                    <Browse />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/discovery"
                element={
                  <ProtectedRoute>
                    <Discovery />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
