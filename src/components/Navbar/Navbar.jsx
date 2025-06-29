import React, { useState,useContext } from 'react'
import './Navbar.css'
import { FiSearch, FiShoppingCart } from 'react-icons/fi'; 
import { assets } from '../../assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';


function Navbar({setshowLogin}) {

 const[menu,setmenu] = useState("menu");

 const{getTotalCartAmount,token,setToken} = useContext(StoreContext);
 const navigate = useNavigate();

 const logout = () =>{
   localStorage.removeItem("token");
   setToken("");
   navigate("/")
   
 }
  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt='' className='logo'/></Link>
      <ul className="navbar-menu">
        <Link to = '/' onClick={()=>setmenu("home")} className={menu==='home'?"active":""}>Home</Link>
        <a href='#explore-menu' onClick = {()=>setmenu("menu")}className={menu==='menu'?"active":""}>Menu</a>
        <a href="#app-download"onClick={()=>setmenu("mobile-app")}className={menu==='mobile-app'?"active":""}>MobileApp</a>
        <a href ="#footer"onClick = {()=>setmenu("contact-us")}className={menu==='contact-us'?"active":""}>Contact us</a>

      </ul>
      <div className="navbar-right">
      <FiSearch className="icon" />

     
    <div className="navbar-search-icon">
      <Link to='/cart'><FiShoppingCart className="icon" /></Link>
      <div className={getTotalCartAmount()===0?"":"dot"}></div>
      </div>
      {!token?<button onClick={()=>setshowLogin(true)}>Sign In</button>
    :<div className='navbar-profile'>
      <img src={assets.profile_icon} alt="" />
      <ul className='nav-profile-dropdown'>
        <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
        <hr />
        <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
      </ul>
      </div>}
      </div>
    </div>
  )
}

export default Navbar