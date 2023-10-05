import React from "react";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import axios from "../../api/axios";

const DetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`movie/${movieId}`);
      setMovie(response.data);
    }
    fetchData();
  }, [movieId]);

  if (!movie) return null; // skeleton animation

  return (
    <section>
      <img
        className="modal__poster-image"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="detail_image"
      />
    </section>
  );
};

export default DetailPage;
