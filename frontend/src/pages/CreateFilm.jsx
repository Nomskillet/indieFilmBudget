import { useState } from "react";
import axios from "axios";

const CreateFilm = () => {
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [revenue, setRevenue] = useState("");
  const [error, setError] = useState("");

  const handleCreateFilm = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      await axios.post(
        "http://localhost:5001/api/films",
        { title, budget, revenue },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Film created successfully!");
      window.location.href = "/films"; // Redirect to films page

    } catch (err) {
      setError(err.response?.data?.error || "Error creating film");
    }
  };

  return (
    <div>
      <h2>Create Film</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleCreateFilm}>
        <input
          type="text"
          placeholder="Film Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Revenue"
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
          required
        />
        <button type="submit">Create Film</button>
      </form>
    </div>
  );
};

export default CreateFilm;
