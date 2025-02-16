import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      {isLoggedIn ? (  // ✅ Show these only when logged in
        <>
          <Link to="/">Home</Link> | 
          <Link to="/films">Films</Link> | 
          <Link to="/create">Create Film</Link> | 
          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        </>
      ) : ( // ✅ Show Login & Signup if NOT logged in
        <>
          <Link to="/login">Login</Link> | 
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;

