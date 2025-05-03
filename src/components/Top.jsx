import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';

const Top = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(5);

  useEffect(() => {
    const filmsRef = ref(db, 'films');

    onValue(filmsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const movies = Object.entries(data)
          .map(([id, film]) => ({ id, ...film }))
          .filter((movie) => movie.rating >= 8.5)
          .sort((a, b) => b.rating - a.rating);

        setAllMovies(movies);
      }
    });
  }, []);

  const handleChange = (e) => {
    setDisplayLimit(Number(e.target.value));
  };

  const filteredMovies = allMovies.slice(0, displayLimit);

  return (
    <section id='top' className='container mx-auto pt-44 pb-20 px-4 sm:px-6 lg:px-8'>
      <h2 className="text-3xl font-bold text-white mb-6">🌟 Top IMDb Movies</h2>

      {/* Dropdown filter */}
      <div className="mb-6">
        <label htmlFor="topFilter" className="text-white mr-3 text-lg">Show:</label>
        <select
          id="topFilter"
          onChange={handleChange}
          value={displayLimit}
          className="p-2 rounded bg-gray-700 text-white"
        >
          <option value={5}>Top 5</option>
          <option value={10}>Top 10</option>
          <option value={50}>Top 50</option>
        </select>
      </div>

      {filteredMovies.length === 0 ? (
        <p className="text-gray-300">No top-rated movies found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img src={movie.poster} alt={movie.title} className="w-full h-72 object-cover" />
              <div className="p-3">
                <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-300">IMDb: {movie.rating}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Top;
