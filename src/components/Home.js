import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Ct from "./Ct"
import { useNavigate } from "react-router-dom"

const Home = () => {
  let [prod,setProd]=useState([])
  let obj=useContext(Ct)
  let navigate=useNavigate()
  let [f,setF]=useState(true)
  useEffect(()=>{
    axios.get("http://localhost:5001/products").then((res)=>{
      setProd(res.data)
    })

  },[f])
  let addcart=(prodobj)=>{
    axios.post("http://localhost:5001/addcart",{'uid':obj.state._id,'pid':prodobj._id,'pimg':prodobj.pimg,'price':prodobj.price,'name':prodobj.name,'qty':1},{"headers":{"Authorization":obj.state.token}}).then((res)=>{
      let fl=window.confirm('continue shopping?')
      if(!fl)
      {
navigate("/cart")
      }


    })

  }
  let knowmore=(prodobj)=>{
    obj.updstate({"proddet":prodobj})
    navigate("/km")
  }
  let edit=(prodobj)=>{
    obj.updstate({"proddet":prodobj})
    navigate("/edit")
  }
  let del=(pid)=>{
    console.log(pid)
    axios.delete(`http://localhost:5001/delprod/${pid}`,{"headers":{"Authorization":obj.state.token,"uid":obj.state._id}}).then((res)=>{
      console.log(res.data)
setF(!f)
    })
  }

  return (
    <div className="container-fluid dflex" style={{"flexWrap":"wrap","justifyContent":"space-evenly","gap":"10px"}}>

      {
        prod.map((prodobj)=>{
          return(<div className="card" style={{"width":"35%"}}>
            <img src={`http://localhost:5001/pimgs/${prodobj.pimg}`} className="card-img-top"/>
            <div className="card-body">
              <h5 className="card-title text-secondary">{prodobj.name.toUpperCase()}</h5>
              <p>Price:{prodobj.price}</p>
              <p>Cat:{prodobj.cat}</p>

              <button className="btn btn-primary" onClick={()=>knowmore(prodobj)}>Know more</button>
            { obj.state.token!=""&& <button className="btn btn-warning" onClick={()=>addcart(prodobj)}>Addcart</button>}
            { obj.state.token!=""&&obj.state.role=="admin"&& <button className="btn btn-danger" onClick={()=>edit(prodobj)}>Edit</button>}
            { obj.state.token!=""&& obj.state.role=="admin"&&<button className="btn btn-info" onClick={()=>del(prodobj._id)}>Delete</button>}
              </div>
            

          </div>)
        })
      }

    </div>
  )
}

export default Home