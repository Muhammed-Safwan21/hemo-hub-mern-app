import React from 'react'
import {BiSolidDonateBlood,BiUserCircle} from 'react-icons/bi'
import { useSelector } from 'react-redux'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

const Header = () => {
  const location = useLocation()
    const {user} = useSelector((state) =>state.auth)
    const navigate = useNavigate()

    //logout handler
    const handleLogout = () =>{
        localStorage.clear()
        navigate('/login')
        toast.success('Logout successfully')
    }
  return (
    <>
        <nav className='navbar'>
            <div className='container-fluid'>
                <div className='navbar-brand'><BiSolidDonateBlood color='red'/> Blood Bank</div>
                <ul className='navbar-nav flex-row'>
                 <li className='nav-item mx-3'>
                    <p className='nav-link'><BiUserCircle/> Welcome {user?.name || user?.hospitalName || user?.organizationName} &nbsp;
                    <span className="badge bg-secondary">{user?.role}</span>
                    </p>
                 </li> 
                 {(location.pathname === '/' || location.pathname === '/donor' || location.pathname === '/hospital') ? (
                  <li className='nav-item mx-3'>
                  <Link to='/analytics' className='nav-link'>Analytics</Link>
               </li> 
                 ) : (
                  <li className='nav-item mx-3'>
                  <Link to='/' className='nav-link'>Home</Link>
               </li>
                 )}
                 <li className='nav-item mx-3'>
                   <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                 </li> 
                </ul>
            </div>
        </nav>
    </>
  )
}

export default Header