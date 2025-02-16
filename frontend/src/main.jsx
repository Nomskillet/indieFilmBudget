

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Films from "./pages/Films";
import CreateFilm from "./pages/CreateFilm";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/films" element={<Films />} />
                <Route path="/create" element={<CreateFilm />} />
            </Routes>
        </Router>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);

