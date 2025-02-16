import { useState } from "react";
import axios from "axios";
import "../styles/auth.css";  // ✅ Correct Styles Applied

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Director"); 
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5001/api/auth/signup", {
                name, email, password, role
            });

            localStorage.setItem("token", response.data.token);
            alert("Signup successful!");
            window.location.href = "/login"; 
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Signup</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSignup}>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="Director">Director</option>
                        <option value="Producer">Producer</option>
                        <option value="Accountant">Accountant</option>
                    </select>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;

