import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';

const TVSeries = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const filmsRef = ref(db, 'films');
    const genresRef = ref(db, 'genre');

    onValue(genresRef, (genreSnapshot) => {
      const genreData = genreSnapshot.val() || {};
      const genreEntries = Object.entries(genreData);

      // Tìm key tương ứng với "TV Series"
      const tvSeriesKey = genreEntries.find(([key, name]) => name.toLowerCase() === 'g2')?.[0];

      if (!tvSeriesKey) return;

     
      onValue(filmsRef, (filmSnapshot) => {
        const filmData = filmSnapshot.val() || {};

        const tvSeriesList = Object.entries(filmData)
          .filter(([_, film]) => Array.isArray(film.genre) && film.genre.includes(tvSeriesKey))
          .map(([id, film]) => ({
            id,
            ...film
          }));

        setSeries(tvSeriesList);
      });
    });
  }, []);

  return (
    <section id='series' className='container mx-auto items-center pt-44 pb-20 px-4 sm:px-6 lg:px-8'>
      <h2 className="text-3xl font-bold text-white mb-6">📺 TV Series</h2>

      {series.length === 0 ? (
        <p className="text-gray-300">No TV Series found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {series.map((show) => (
            <div
              key={show.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img src={show.poster} alt={show.title} className="w-full h-72 object-cover" />
              <div className="p-3">
                <h3 className="text-white text-lg font-semibold">{show.title}</h3>
                <p className="text-sm text-gray-300">{show.releaseYear}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TVSeries;
