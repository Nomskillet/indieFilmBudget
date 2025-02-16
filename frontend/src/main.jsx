

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Films from "./pages/Films";
import CreateFilm from "./pages/CreateFilm";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/films" element={<Films />} />
                <Route path="/create" element={<CreateFilm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />  {/* ✅ Add this */}
            </Routes>
        </Router>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);

