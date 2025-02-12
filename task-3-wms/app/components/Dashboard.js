import React from 'react'
import '../globals.css';

const Dashboard = () => {
  return (
    <div className='bg-slate-50'>
      <div className='nav-menu'>
      <div><a className="navigation-link" href="/">
      <img alt="menu-icon"  src="https://stage.mkwms.dev/assets/navbar-menu/Dashboard.svg" width="24" height="24" className="me-2" />
      <span className="menu-title">Dashboard</span></a></div>
      <div className="nav-item"><a className="navigation-link" href="/product-master">
      <img alt="menu-icon"  src="https://stage.mkwms.dev/assets/navbar-menu/Masters.svg" width="24" height="24" className="me-2" />
      <span className="menu-title">Masters</span></a></div>
      <div className="nav-item"><a className="navigation-link" href="/">
      <img alt="menu-icon"  src="https://stage.mkwms.dev/assets/navbar-menu/Settings.svg" width="24" height="24" className="me-2" />
      <span className="menu-title">Settings</span></a></div>
      </div>
    </div>
  )
}

export default Dashboard