import { useEffect, useState } from "react";
import axios from "axios";

const Films = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await axios.get("http://localhost:5001/api/films", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to request
          },
        });
        setFilms(response.data.films);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };

    fetchFilms();
  }, []);

  return (
    <div>
      <h1>Films</h1>
      <ul>
        {films.map((film) => (
          <li key={film.id}>{film.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Films;
