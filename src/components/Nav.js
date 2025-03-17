import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Ct from './Ct'

const Nav = () => {
  let obj=useContext(Ct)
  return (
    <div className='navbar navbar-dark bg-dark'>
        <Link to="/">Products</Link>
      {obj.state.token==""&&  <Link to="/reg">Register</Link>}
      {obj.state.token==""&& <Link to="/login">Login</Link>}
      {obj.state.token!=""&&obj.state.role=="admin"&&  <Link to="/add">AddProd</Link>}
      {obj.state.token!=""&& <Link to="/cart">Cart<button>{obj.state.cartlength}</button></Link>}
      {obj.state.token!=""&& <Link to="/logout">Logout</Link>}
      {obj.state.token!=""&&<div className='text-danger'>{obj.state.name}</div>}
    </div>
  )
}

export default Nav