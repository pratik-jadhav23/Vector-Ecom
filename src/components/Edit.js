import React, { useContext, useEffect, useState } from 'react'
import Ct from './Ct'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Edit = () => {
    let [prod,setProd]=useState({"_id":"","name":"","price":"","desc":"","cat":""})
    let fd=new FormData()
   let obj=useContext(Ct)
   let navigate=useNavigate()
   let fun=(e)=>{
    setProd({...prod,[e.target.name]:e.target.value})
  }
    useEffect(()=>{
        let data=obj.state.proddet
        delete data['comm']
        setProd({...data})

    },[])
    let edit=()=>{
        axios.put("http://localhost:5001/edit",prod,{"headers":{"Authorization":obj.state.token,"uid":obj.state._id}}).then(()=>{
            navigate("/")
        })
    }
    let fun1=(e)=>{
        fd.append("pimg",e.target.files[0])

    }
    let editimg=()=>{
        fd.append("_id",prod._id)
        fd.append("oldimg",prod.pimg)
        axios.put("http://localhost:5001/editimg",fd,{"headers":{"Authorization":obj.state.token,"uid":obj.state._id}}).then(()=>{
            navigate("/")
        })
    }
  return (<>
    <div className='form'>
        <input type='text' placeholder='enter prod name' onChange={fun} name="name" value={prod.name}/>
<input type='text' placeholder='enter price' onChange={fun} name='price' value={prod.price}/>
<input type='text' placeholder='enter cat' onChange={fun} name='cat' value={prod.cat}/>
<textarea onChange={fun} name='desc' value={prod.desc}></textarea>
<button onClick={edit}>Edit</button>
    </div>
    <div className='form'>
        <input type='file' onChange={fun1}/>
        <button onClick={editimg}>Edit image</button>

    </div>
 </> )
}

export default Edit