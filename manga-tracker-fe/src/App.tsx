import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Browse from "./pages/Browse"; // Assuming you have a Home component
import Individual from "./pages/Individual";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <main className="min-h-screen">
          <Routes>
            <Route path="/manga/:id" element={<Individual />} />
            <Route path="/browse" element={<Browse />} />
          </Routes>
        </main>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
