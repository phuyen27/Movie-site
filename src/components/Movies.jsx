import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';

const Movies = ({ searchTerm }) =>  {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [genreList, setGenreList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 5;

  useEffect(() => {
    const filmsRef = ref(db, 'films');
    const genresRef = ref(db, 'genre');

    onValue(genresRef, (genreSnapshot) => {
      const genreData = genreSnapshot.val() || {};
      setGenres(genreData);
      setGenreList(Object.values(genreData));

      onValue(filmsRef, (filmSnapshot) => {
        const filmData = filmSnapshot.val();
        if (filmData) {
          const list = Object.entries(filmData).map(([id, film]) => {
            const genreIds = Array.isArray(film.genre) ? film.genre : [];
            const genreNames = genreIds.map((gid) => genreData[gid] || gid);
            return {
              id,
              ...film,
              genreNames,
            };
          });
          setMovies(list);
        }
      });
    });
  }, []);

  const filteredMovies = movies
  .filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter((movie) =>
    selectedGenre ? movie.genreNames.includes(selectedGenre) : true
  );


  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className='container mx-auto items-center pt-44 pb-20 px-4 sm:px-6 lg:px-8' id='movies'>
      <h2 className="text-3xl font-bold text-white mb-6">🎬 Movies</h2>

      {/* Genre filter */}
      <div className="flex gap-4 items-center mb-6 flex-wrap">
        <span
          onClick={() => {
            setSelectedGenre(null);
            setCurrentPage(1);
          }}
          className={`text-xl px-3 py-1 rounded-3xl cursor-pointer ${
            !selectedGenre ? 'bg-orange-500 text-white' : 'bg-gray-600 text-orange-300 hover:bg-gray-500 hover:text-orange-500'
          }`}
        >
          All
        </span>

        {genreList.map((genre, index) => (
          <span
            key={index}
            onClick={() => {
              setSelectedGenre(genre);
              setCurrentPage(1);
            }}
            className={`text-xl px-3 py-1 rounded-3xl cursor-pointer ${
              selectedGenre === genre
                ? 'bg-orange-500 text-white'
                : 'bg-gray-600 text-orange-300 hover:bg-gray-500 hover:text-orange-500'
            }`}
          >
            {genre}
          </span>
        ))}
      </div>

      {/* Movie list */}
      <div className="py-10 px-6 cursor-pointer max-w-7xl mx-auto">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {currentMovies.length > 0 ? (
            currentMovies.map((movie) => (
              <Link to={`/film/${movie.id}`} key={movie.id}>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                  <img src={movie.poster} alt={movie.title} className="w-full h-72 object-cover" />
                  <div className="p-3">
                    <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-white col-span-full text-center text-lg">No movies found.</p>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === i + 1
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-700 text-orange-300 hover:bg-gray-600 hover:text-orange-500'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default Movies;
