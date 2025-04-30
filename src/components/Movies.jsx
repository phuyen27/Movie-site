import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Đường dẫn tùy bạn
import { ref, onValue } from 'firebase/database';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);  // Khai báo state genres

  useEffect(() => {
    const filmsRef = ref(db, 'films');
    onValue(filmsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, film]) => ({
          id,
          ...film,
        }));
        setMovies(list);

        const allGenres = new Set();  // Tạo Set để tránh trùng lặp genre
        list.forEach((movie) => {
          movie.genres.forEach((g) => allGenres.add(g)); // Thêm genre vào Set
        });
        setGenres(Array.from(allGenres));  // Chuyển Set thành mảng và lưu vào state genres
      }
    });
  }, []);

  return (
    <section id='movies' className='container mx-auto items-center pt-44 pb-20 px-4 sm:px-6 lg:px-8'>
      <h2 className="text-3xl font-bold text-white mb-6">🎬 Movies</h2>

      {/* Hiển thị các thể loại phim */}
      <div className="flex gap-5 items-center mb-6">
        {genres.map((genre, index) => (
          <span
            key={index}
            className="text-xl text-orange-300 bg-gray-600 rounded-4xl p-1 px-3 cursor-pointer hover:bg-gray-500 hover:text-orange-500"
          >
            {genre}
          </span>
        ))}
      </div>

      {/* Hiển thị danh sách phim */}
      <div className="py-10 px-6 cursor-pointer max-w-7xl mx-auto">
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img src={movie.poster} alt={movie.title} className="w-full h-72 object-cover" />
              <div className="p-3">
                <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Movies;
