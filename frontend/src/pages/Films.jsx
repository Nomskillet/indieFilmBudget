import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Films.css";

const Films = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5001/api/films", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFilms(response.data.films);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/films/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove from UI
      setFilms(films.filter((film) => film.id !== id));
    } catch (error) {
      console.error("Error deleting film:", error);
    }
  };

  return (
    <div className="films-container">
      <h1>Films</h1>
      <div className="films-grid">
        {films.map((film) => (
          <div key={film.id} className="film-card">
            <h3>{film.title}</h3>
            <p><strong>Director:</strong> {film.director || "Unknown"}</p>
            <p><strong>Budget:</strong> $0 (Placeholder)</p>
            <div className="film-actions">
              <button className="edit-btn">Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(film.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Films;
