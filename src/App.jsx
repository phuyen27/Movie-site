import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Navbar from './components/navbar'
import Movies from './components/Movies'
import TVSeries from './components/TVSeries'
import Top from './components/Top'
import FilmItem from './components/FilmItem'

function AppWrapper() {
  const [showFilm, setShowFilm] = useState(true);
  const location = useLocation();

  const isFilmPage = location.pathname.startsWith('/film/');

  return (
    <main className="bg-black relative">
      <Navbar />
      <Home />
      <Movies />

      {/* Nút toggle FilmItem */}
      {isFilmPage && (
        <div className="text-center mb-4">
          <button
            onClick={() => setShowFilm(prev => !prev)}
            className="text-orange-400 underline hover:text-orange-200 text-lg"
          >
            {showFilm ? 'Hide Film Info' : 'Show Film Info'}
          </button>
        </div>
      )}

      {/* Routes */}
      <Routes>
        <Route
          path="/film/:id"
          element={showFilm ? <FilmItem /> : null}
        />
      </Routes>

      <TVSeries />
      <Top />
    </main>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
