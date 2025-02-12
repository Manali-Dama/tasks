import React from 'react'
import '../globals.css';
  
const Topmenu = () => {
  return (
    <nav>
       <div className='main-container'>
      <div className='topmenu'>
   
          <img className='logo' src='https://stage.mkwms.dev/assets/medcart-logo.svg' width={50} height={70} alt='medkart-logo'/>
          <div className='search-form'>
          <div className="input-group me-3">
            <div className="input-group-text">
              <img alt="search-icon" src="https://stage.mkwms.dev/assets/navbar-menu/Search-icon.svg" width="24" height="24" />
            </div>
              <input type="text" className="form-control" id="navbarForm" placeholder="Search here..."/>
          </div>
        <div className="create-dropdown dropdown"> 
        <button type="button"  className="create-btn">Create
        </button>
       
      </div>
      </div>

      {/* <button onClick={() => dispatch(logout())}>Logout</button> */}
      <a className="nav-link rounded-circle dropdown-toggle" id="profile-toggle" aria-expanded="false"> 
        <div className="d-flex justify-content-center align-items-center rounded-circle text-primary cursor-pointer user-profile font-normal p-1 rounded-full bg-white ml-96 "> 
          <div className="d-flex">
            <span>M</span>
            <span>D</span></div></div></a>
           
      </div>
      </div>
    </nav>
  )
}

export default Topmenu
