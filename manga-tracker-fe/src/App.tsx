import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Browse from "./pages/Browse"; // Assuming you have a Home component
import Individual from "./pages/Individual";
import Discovery from "./pages/Discovery";
import ScrollToTop from "./components/ScrollToTop";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <main className="min-h-screen">
          <ScrollToTop />
          <Routes>
            <Route path="/manga/:id" element={<Individual />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/discovery" element={<Discovery />} />
          </Routes>
        </main>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
