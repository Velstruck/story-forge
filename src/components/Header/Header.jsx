import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
          <polyline points="10 17 15 12 10 7"/>
          <line x1="15" y1="12" x2="3" y2="12"/>
        </svg>
      )
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <line x1="19" y1="8" x2="19" y2="14"/>
          <line x1="22" y1="11" x2="16" y2="11"/>
        </svg>
      )
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 14H3"/>
          <path d="M21 6H3"/>
          <path d="M21 10H3"/>
          <path d="M21 18H3"/>
        </svg>
      )
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      )
    },
  ]

  return (
    <header className='sticky top-0 z-50 bg-white shadow-sm'>
      <Container>
        <nav className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link to="/" className='flex items-center space-x-2'>
              <img className="h-8 w-auto" src={"./static/images/story_forge.png"} alt="Story Forge" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-1'>
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => navigate(item.slug)}
                  className='px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2'
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ) : null
            )}
            {authStatus && (
              <div className='ml-2'>
                <LogoutBtn />
              </div>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='p-2 text-gray-700 hover:bg-gray-100 rounded-lg'
            >
              <svg
                className='h-6 w-6'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                {isMenuOpen ? (
                  <path d='M6 18L18 6M6 6l12 12' />
                ) : (
                  <path d='M4 6h16M4 12h16M4 18h16' />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className='md:hidden py-2'>
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.slug)
                    setIsMenuOpen(false)
                  }}
                  className='block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors inline-flex items-center space-x-2'
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ) : null
            )}
            {authStatus && (
              <div className='px-4 py-2'>
                <LogoutBtn />
              </div>
            )}
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header