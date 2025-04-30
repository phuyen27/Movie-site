import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import Navbar from './components/navbar'
import Movies from './components/Movies'
function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='bg-black'>
      <Navbar/>
      <Home/>
      <Movies/>
    </main>
  )
}

export default App
