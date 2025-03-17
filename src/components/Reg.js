import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Reg = () => {
    let [data,setData]=useState({"_id":"","name":"","phno":"","pwd":""})
    let [msg,setMsg]=useState("")
    let navigate=useNavigate()
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    let add=()=>{
        if(data._id!=""&&data.name!=""&&data.phno!=""&&data.pwd!="")
        {
axios.post("http://localhost:5001/reg",data).then((res)=>{
    setMsg(res.data.msg)
    if(res.data.msg=="reg done")
    {
        navigate("/login")
    }
})
        }
        else{
            setMsg("enter data into all fields")
        }
    }
  return (
    <div className='container-fluid bg-primary'>
        <div className='form'>
          {msg!=""&&<div className='text-danger'>{msg}</div>}
            <input type='text' placeholder='enter Email' name="_id" onChange={fun} value={data._id}/>
            <input type='text' placeholder='enter name' name="name" onChange={fun} value={data.name}/>
            <input type='text' placeholder='enter phno' name="phno" onChange={fun} value={data.phno}/>
            <input type='password' placeholder='enter password' name="pwd" onChange={fun} value={data.pwd}/>
            <button className='btn btn-danger' onClick={add}>Register</button>

        </div>

    </div>
  )
}

export default Reg