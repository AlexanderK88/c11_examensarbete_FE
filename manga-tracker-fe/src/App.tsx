import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Browse from "./pages/Browse"; // Assuming you have a Home component
import Individual from "./pages/Individual";

function App() {
  return (
    <Router>
      <main className="min-h-screen">
        <Routes>
          <Route path="/manga/:id" element={<Individual />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
