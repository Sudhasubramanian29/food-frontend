import React, { useContext,  useEffect,  useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../components/Context/StoreContext'
import axios from 'axios';
function PlaceOrder() {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

  const[data,setData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
const onchangeHandler = (event) =>{
  const name = event.target.name;
  const value = event.target.value;
  setData(data=>({...data,[name]:value}))
}

const placeOrder = async(event) =>{
       event.preventDefault();
       let orderItems = [];
       food_list.map((item)=>{
         if(cartItems[item._id]>0){
            let itemInfo =item;
            itemInfo["quantity"] = cartItems[item._id];
            orderItems.push(itemInfo)
         }
       })
       let orderData = {
        address:data,
        items:orderItems,
        amount:getTotalCartAmount()+2,
       }
       let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
       if(response.data.success){
        const {session_url} = response.data;
        window.location.replace(session_url);

       }else{
        alert("Error");
        
       }
}
   const navigate = useNavigate();
useEffect(()=>{
   if(!token){
     navigate('/cart')
   }
   else if(getTotalCartAmount()===0){
        navigate('/cart')
   }
},[token])

  return (
    <form onSubmit = {placeOrder} className='place-order'>
        <div className="place-order-left">
           <p className="title">Delivery Information</p>
           <div className="multi-fields">
            <input required name='firstname' onChange={onchangeHandler} value={data.firstname} type='text' placeholder='First Name'/>
            <input required name='lastname' onChange={onchangeHandler} value={data.lastname} type='text' placeholder='Last Name' />
           </div>
           <input required name='email' onChange={onchangeHandler} value={data.email} type="email" placeholder='Email address'/>
           <input required name='street' onChange={onchangeHandler} value={data.street} type="text"placeholder='street' />
           <div className="multi-fields">
            <input required name='city' onChange={onchangeHandler} value={data.city} type='text' placeholder='City'/>
            <input required name='state' onChange={onchangeHandler} value={data.state} type='text' placeholder='State' />
           </div>
           <div className="multi-fields">
            <input required name='zipcode' onChange={onchangeHandler} value={data.zipcode} type='text' placeholder='Zip code'/>
            <input required name='country' onChange={onchangeHandler} value={data.country} type='text' placeholder='Country' />
           </div>
           <input required name='phone' onChange={onchangeHandler} value={data.phone} type='text' placeholder='phone' />
        </div>
        <div className="place-order-right">
        <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>{getTotalCartAmount()}</p>
                </div>
                <hr></hr>
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>${getTotalCartAmount()===0?0:2}</p>
                </div>
                <hr></hr>
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
                </div>
              </div>
              <button type='submit'>PROCEED TO PAYMENT</button>

            </div>
        </div>
    </form>
  )
}

export default PlaceOrder