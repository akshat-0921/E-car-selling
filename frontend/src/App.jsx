
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import Auth from "./components/Auth/Auth";
import Filter from "./components/filter/Filter";
import Vehicle from "./pages/Vehicle/Vehicle";

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />}></Route>
            <Route path="/auth" element={<Auth />}></Route>
            <Route path="/filter" element={<Filter />}></Route>
            <Route path="/cars" element={<Vehicle />}></Route>
         </Routes>
      </Router>
   );
}

export default App;
