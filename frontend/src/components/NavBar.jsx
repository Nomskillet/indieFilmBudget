import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css"; // ✅ Import CSS file

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // ✅ Update login state
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Remove token from localStorage
    setIsLoggedIn(false);
    navigate("/login"); // ✅ Redirect to Login after logout
  };

  return (
    <nav className="navbar"> {/* ✅ Add class */}
      <div className="nav-links">
        {isLoggedIn ? (  
          <>
            <Link to="/">Home</Link>
            <Link to="/films">Films</Link>
            <Link to="/create">Create Film</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : ( 
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
