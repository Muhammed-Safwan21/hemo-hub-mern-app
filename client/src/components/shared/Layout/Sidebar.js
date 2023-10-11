import React from 'react'
import {Link, useLocation} from "react-router-dom"
import {useSelector} from 'react-redux'

const Sidebar = () => {
    const location = useLocation()
    const {user} = useSelector(state=>state.auth)
  return (
    <div>
        <div className='sidebar'>
            <div className='menu'>
                        {user?.role === 'orgnization' && (
                            <>
                                <div className={`menu-item ${location.pathname === '/' && "active"}`}>
                                <i className='fa-solid fa-warehouse'></i>
                                <Link to='/'>Inventory</Link>
                            </div>
                            <div className={`menu-item ${location.pathname === '/donor' && "active"}`}>
                                <i className='fa-solid fa-hand-holding-medical'></i>
                                <Link to='/donor'>Donor</Link>
                            </div>
                            <div className={`menu-item ${location.pathname=== '/hospital' && "active"}`}>
                                <i className='fa-solid fa-hospital'></i>
                                <Link to='/hospital'>Hospital</Link>
                            </div>
                            </>
                        )}
                         {user?.role === 'admin' && (
                            <>
                                <div className={`menu-item ${location.pathname === '/donor-list' && "active"}`}>
                                <i className='fa-solid fa-warehouse'></i>
                                <Link to='/donor-list'>Donor List</Link>
                            </div>
                            <div className={`menu-item ${location.pathname === '/hospital-list' && "active"}`}>
                                <i className='fa-solid fa-hand-holding-medical'></i>
                                <Link to='/hospital-list'>Hospital List</Link>
                            </div>
                            <div className={`menu-item ${location.pathname=== '/org-list' && "active"}`}>
                                <i className='fa-solid fa-hospital'></i>
                                <Link to='/org-list'>Organization List</Link>
                            </div>
                            </>
                        )}
                            { user?.role === 'hospital'  && (
                            <div className={`menu-item ${location.pathname === '/consumer' && "active"}`}>
                                <i className='fa-sharp fa-solid fa-building-ngo'></i>
                                <Link to='/consumer'>Consumer</Link>
                            </div>
                            )}

                            {(user?.role === 'donor' || user?.role === 'hospital' ) && (
                            <div className={`menu-item ${location.pathname === '/organization' && "active"}`}>
                                <i className='fa-sharp fa-solid fa-building-ngo'></i>
                                <Link to='/organization'>Organization</Link>
                            </div>
                            )}
                            { user?.role === 'donor'  && (
                            <div className={`menu-item ${location.pathname === '/donation' && "active"}`}>
                                <i className='fa-sharp fa-solid fa-building-ngo'></i>
                                <Link to='/donation'>Donation</Link>
                            </div>
                            )}
                       
                {/* {userMenu.map((menu,index)=>{
                        const isActive = location.pathname === menu.path;
                        return (
                            <div className={`menu-item ${isActive && "active"}`} key={index}>
                                <i className={menu.icon}></i>
                                <Link to={menu.path}>{menu.name}</Link>
                            </div>
                        )
                })} */}
            </div>
        </div>
    </div>
  )
}

export default Sidebar