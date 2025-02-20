import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Films.css";

const Films = () => {
  const [films, setFilms] = useState([]);
  const [editingFilm, setEditingFilm] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDirector, setEditDirector] = useState("");
  const [editBudget, setEditBudget] = useState("");

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
      setFilms(films.filter((film) => film.id !== id));
    } catch (error) {
      console.error("Error deleting film:", error);
    }
  };

  const handleEditClick = (film) => {
    setEditingFilm(film.id);
    setEditTitle(film.title);
    setEditDirector(film.director || "");
    setEditBudget(film.budget || "");
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5001/api/films/${editingFilm}`,
        {
          title: editTitle,
          director: editDirector,
          budget: editBudget,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFilms(
        films.map((film) =>
          film.id === editingFilm
            ? { ...film, title: editTitle, director: editDirector, budget: editBudget }
            : film
        )
      );

      setEditingFilm(null);
    } catch (error) {
      console.error("Error updating film:", error);
    }
  };

  return (
    <div className="films-container">
      <h1>Films</h1>
      <div className="films-grid">
        {films.map((film) => (
          <div key={film.id} className="film-card">
            {editingFilm === film.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={editDirector}
                  onChange={(e) => setEditDirector(e.target.value)}
                  placeholder="Director"
                />
                <input
                  type="number"
                  value={editBudget}
                  onChange={(e) => setEditBudget(e.target.value)}
                  placeholder="Budget"
                />
                <button className="save-btn" onClick={handleUpdate}>
                  Save
                </button>
                <button className="cancel-btn" onClick={() => setEditingFilm(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <h3>{film.title}</h3>
                <p><strong>Director:</strong> {film.director || "Unknown"}</p>
                <p><strong>Budget:</strong> ${film.budget || "0"}</p>
                <div className="film-actions">
                  <button className="edit-btn" onClick={() => handleEditClick(film)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(film.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Films;

