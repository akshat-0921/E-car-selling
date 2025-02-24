import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import Auth from "./components/Auth/Auth";
import CarDetailPage from "./pages/CarDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/car-model" element={<CarDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
