import '../Css/Home.css';
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';

import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const [films, setFilms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const filmsRef = ref(db, 'films');
    onValue(filmsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.values(data);
        setFilms(list);
      }
    });
  }, []);

  useEffect(() => {
    if (itemRefs.current[currentIndex]) {
      itemRefs.current[currentIndex].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [currentIndex]);

  const nextFilm = () => {
    setCurrentIndex((prev) => (prev + 1) % films.length);
  };

  const prevFilm = () => {
    setCurrentIndex((prev) => (prev - 1 + films.length) % films.length);
  };

  const currentFilm = films[currentIndex];

  return (
    <div className="hero-section-wrapper mt-10" id='home'>
    <AnimatePresence mode="wait">
      {currentFilm && (
        <motion.div
          key={currentFilm.poster}
          className="hero-bg"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            backgroundImage: `url(${currentFilm.poster})`,
          }}
        />
      )}
    </AnimatePresence>

      <div className="overlay">
        {currentFilm && (
          <AnimatePresence mode="wait">
          {currentFilm && (
            <motion.div
              key={currentFilm.title} 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="film-info mt-8"
            >
              <h1>{currentFilm.title}</h1>
              <p>{currentFilm.description}</p>
              <a
                href={currentFilm.trailer}
                target="_blank"
                rel="noopener noreferrer"
              >
                See More
              </a>
            </motion.div>
          )}
        </AnimatePresence>
        
        )}

        <div className="film-carousel">
          {films.map((film, index) => (
            <img
              key={index}
              src={film.poster}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              alt={film.title}
            />
          ))}
        </div>

        <div className="controls">
          <button onClick={prevFilm}>←</button>
          <button onClick={nextFilm}>→</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
