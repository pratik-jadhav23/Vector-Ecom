import React, { useContext, useEffect, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Cart = () => {
  let [cart,setCart]=useState([])
  let [ctotal,setCtotal]=useState(0)
  let obj=useContext(Ct)
  let navigate=useNavigate()
  let [f,setF]=useState(true)
  useEffect(()=>{
    if(obj.state._id=="")
    {
      navigate("/login")
    }
    else{
      axios.get(`http://localhost:5001/cart/${obj.state._id}`,{"headers":{"Authorization":obj.state.token}}).then((res)=>{
        setCart(res.data)
        obj.updstate({"cartlength":res.data.length})
        let s=0
        for(let i=0;i<res.data.length;i++)
        {
          s=s+res.data[i].qty*res.data[i].price
        }
        setCtotal(s)
      })

    }


  },[f])
  let inc=(cid)=>{
    axios.get(`http://localhost:5001/inc/${cid}`,{"headers":{"Authorization":obj.state.token}}).then((res)=>{
      setF(!f)

    })
  }

  let dec=(cid,qty)=>{
    if(qty>1)
    {
    axios.get(`http://localhost:5001/dec/${cid}`,{"headers":{"Authorization":obj.state.token}}).then((res)=>{
      setF(!f)

    })
  }
  else{
    del(cid)
  }
  }
  let del=(cid)=>{
    axios.delete(`http://localhost:5001/del/${cid}`,{"headers":{"Authorization":obj.state.token}}).then(()=>{
      setF(!f)
    })
  }
  return (
    <div>
      {cart.length==0&&<div>Your cart was empty</div>}
      {cart.length>0&&<div className="container-fluid dflex" style={{"flexWrap":"wrap","justifyContent":"space-evenly","gap":"10px"}}>
      {
        cart.map((prodobj)=>{
          return(<div className="card" style={{"width":"35%"}}>
            <img src={`http://localhost:5001/pimgs/${prodobj.pimg}`} className="card-img-top"/>
            <div className="card-body">
              <h5 className="card-title text-secondary">{prodobj.name.toUpperCase()}</h5>
              <p>Price:{prodobj.price}</p>
              <p><button onClick={()=>dec(prodobj._id,prodobj.qty)}>-</button>{prodobj.qty}<button onClick={()=>inc(prodobj._id)}>+</button></p>
              <p>Total:{prodobj.price*prodobj.qty}</p>
              <button onClick={()=>del(prodobj._id)}>Delete</button>

   </div>
            

          </div>)
        })
      }
        <div>CartTotal:{ctotal}</div>
        </div>}
    </div>
  )
}

export default Cart