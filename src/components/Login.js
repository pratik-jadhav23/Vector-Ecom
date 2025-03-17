import axios from 'axios'
import React, { useContext, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  let [data,setData]=useState({"_id":"","pwd":""})
  let [msg,setMsg]=useState("")
  let navigate=useNavigate()
  let obj=useContext(Ct)
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let login=()=>{
    axios.post("http://localhost:5001/login",data).then((res)=>{
      if(res.data.token!=undefined)
      {
        obj.updstate(res.data)
        navigate("/")
      }
      else{
        setMsg(res.data.msg)
      }

    })
    
  }
  return (
    <div className='container-fluid bg-primary'>
      < div className='form'>
      <div className='text-danger'>{msg}</div>
      <input type="text" placeholder='enter email' onChange={fun} value={data._id} name="_id"/>
      <input type='password' placeholder='enter password'
 onChange={fun} value={data.pwd} name="pwd"/>
 <button className='btn btn-danger' onClick={login}>Login</button>
      </div>
    </div>
  )
}

export default Login