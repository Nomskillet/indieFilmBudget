import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Films from "./pages/Films";
import CreateFilm from "./pages/CreateFilm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar"; // ✅ Import NavBar

const App = () => {
    return (
        <Router>
            <NavBar />  {/* ✅ Add NavBar here */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/films" element={<Films />} />
                <Route path="/create" element={<CreateFilm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
