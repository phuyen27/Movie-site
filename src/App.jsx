import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Navbar from './components/navbar'
import Movies from './components/Movies'
import TVSeries from './components/TVSeries'
import Top from './components/Top'
import FilmItem from './components/FilmItem'
import { FiChevronDown } from 'react-icons/fi';
import Contact from './components/Contact'

function AppWrapper() {
  const [showFilm, setShowFilm] = useState(true);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const isFilmPage = location.pathname.startsWith('/film/');

  return (
    <main className="bg-black relative">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Home />
      <Movies searchTerm={searchTerm}/>

      {isFilmPage && (
        <div className=" ml-20 ">
          <button
          onClick={() => setShowFilm(prev => !prev)}
          className=" text-orange-400 underline hover:text-orange-200 text-lg cursor-pointer items-center flex gap-1"
        >
          {showFilm ? 'Hide Film Info' : 'Show Film Info'}
          <FiChevronDown
            className={`inline-block transform transition-transform duration-300 ${
              showFilm ? 'rotate-180' : ''
            }`}
          />
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
      <Contact/>
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
