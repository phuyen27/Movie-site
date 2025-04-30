import React, { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')

  const NavLinks = [
    { href: "#home", label: "Home" },
    { href: "#movies", label: "Movies" },
    { href: "#series", label: "TV Series" },
    { href: "#top", label: "Top IMDb" },
    { href: "#contact", label: "Contact" },
  ]

  const handleScroll = (href) => {
    const element = document.getElementById(href.slice(1))
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70, 
        behavior: 'smooth'
      })
      setActiveLink(href)
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className=" fixed top-0 left-0 right-0 bg-black backdrop-blur-sm z-50 border-b border-e-black shadow-amber-200">
      <div className="w-full flex justify-between items-center container mx-auto px-4 sm:px-6 lg:px-8 md:h-20 h-16">
        <div className="cursor-pointer text-xl font-bold text-orange-500">🎬 MovieSite</div>

        {/* Menu desktop */}
        <ul className="hidden md:flex gap-6 space-x-8 ">
          {NavLinks.map(link => (
            <li key={link.href}>
              <button
                onClick={() => handleScroll(link.href)}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  activeLink === link.href ? 'text-orange-600' : 'text-amber-50 hover:text-orange-500'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <div className="md:hidden text-amber-50">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-2 bg-white">
          {NavLinks.map(link => (
            <li key={link.href}>
              <button
                onClick={() => handleScroll(link.href)}
                className={`block w-full text-left text-sm font-medium ${
                  activeLink === link.href ? 'text-orange-600' : 'text-gray-700'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Navbar
