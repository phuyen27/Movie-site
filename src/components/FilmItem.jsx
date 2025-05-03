import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

const FilmItem = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const filmRef = ref(db, `films/${id}`);
    onValue(filmRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFilm(data);
      }
    });

    // Để hiệu ứng fade-in và slide-up, khi dữ liệu được tải xong, sẽ làm cho phần tử hiển thị
    setIsVisible(true);
  }, [id]);

  if (!film) return <div className="text-white p-6">Loading...</div>;

  return (
    <section className="min-h-screen py-5 px-6 sm:px-10 lg:px-24 flex items-center justify-center bg-black">
      {/* Nội dung chính */}
      <div
        className={`w-full max-w-7xl transition-all duration-700 ease-in-out transform ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Tiêu đề */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center tracking-tight text-white">
          {film.title}
        </h1>

        {/* Nội dung chính */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mt-12">
          {/* Trailer */}
          {film.trailer && (
            <div className="w-full lg:w-2/3">
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={film.trailer.replace('watch?v=', 'embed/')}
                  title="Trailer"
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}

          {/* Thông tin phim */}
          <div className="w-full lg:w-1/3 space-y-6 text-white">
            <div className="grid grid-cols-1 gap-y-4 text-base sm:text-lg">
              <p><strong>🎬 Director:</strong> {film.director}</p>
              <p><strong>👥 Cast:</strong> {film.cast?.join(', ')}</p>
              <p><strong>📅 Year:</strong> {film.releaseYear}</p>
              <p><strong>⏱ Duration:</strong> {film.duration}</p>
              <p><strong>⭐ Rating:</strong> {film.rating}</p>
              <p><strong>💬 Language:</strong> {film.language}</p>
            </div>
          </div>
        </div>

        {/* Mô tả */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-semibold mb-3 text-white">📖 Description</h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            {film.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FilmItem;
