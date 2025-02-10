import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
        className='px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors inline-flex items-center space-x-2'
        onClick={logoutHandler}
    >
        <span>Logout</span>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
        >
            <path 
                fillRule="evenodd" 
                d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4.414l-4.293 4.293a1 1 0 01-1.414-1.414L12.586 6H7a1 1 0 100 2h5.586l-4.293 4.293a1 1 0 001.414 1.414L14 9.414V13a1 1 0 11-2 0V7.414z" 
                clipRule="evenodd" 
            />
        </svg>
    </button>
  )
}

export default LogoutBtn