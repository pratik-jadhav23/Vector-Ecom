import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Reg from "./components/Reg"
import Cart from "./components/Cart"
import Addprod from "./components/Addprod"
import Logout from "./components/Logout"
import './App.css'
import Ct from "./components/Ct"
import { useState } from "react"
import Km from "./components/Km"
import Edit from "./components/Edit"
import Nav from "./components/Nav"

const App = () => {
  let [state,setState]=useState({"token":"","_id":"","name":"","role":""})
  let updstate=(obj)=>{
    setState({...state,...obj})
  }
  let obj={"state":state,"updstate":updstate}
  return (
    <BrowserRouter>
    <Ct.Provider value={obj}>
    <Nav/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/reg" element={<Reg/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/add" element={<Addprod/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/km" element={<Km/>}/>
      <Route path="/edit" element={<Edit/>}/>
    </Routes>
    </Ct.Provider>
    </BrowserRouter>
  )
}

export default App