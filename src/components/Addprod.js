import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'

const Addprod = () => {
  let [data,setData]=useState({'name':'','price':'','pimg':'','desc':'','cat':''})
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let fun1=(e)=>{
    setData({...data,'pimg':e.target.files[0]})
  }
  let navigate=useNavigate()
  let obj=useContext(Ct)
useEffect(()=>{
  if(obj.state.token=="")
  {
    navigate("/login")
  }

},[])

  let addprod=()=>{
    let fd=new FormData()
    for(let p in data)
    {
      fd.append(p,data[p])
    }
    axios.post('http://localhost:5001/add',fd,{"headers":{"Authorization":obj.state.token,"uid":obj.state._id}}).then((res)=>{
      navigate("/")

    })
  }
  return (
    <div className='form'>
<input type='text' placeholder='enter prod name' onChange={fun} name="name"/>
<input type='text' placeholder='enter price' onChange={fun} name='price'/>
<input type='text' placeholder='enter cat' onChange={fun} name='cat'/>
<textarea onChange={fun} name='desc'></textarea>
<input type='file' onChange={fun1}/>
<button onClick={addprod}>AddProd</button>


 
    </div>
  )
}

export default Addprod