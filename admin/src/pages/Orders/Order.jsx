import React, { useEffect, useState } from 'react';
import './Order.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

// Bracket { url } hona zaroori hai
const Order = ({ url }) => { 

    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        // Yahan 'url' tabhi kaam karega jab upar function mein pass kiya ho
        const response = await axios.get(url + "/api/order/list");
        if (response.data.success) {
            setOrders(response.data.data);
            console.log(response.data.data);
        } else {
            toast.error("Error");
        }
    }

    const statusHandler = async (event,orderId)=> {
      const response = await axios.post(url+"/api/order/status",{
        orderId,
        status:event.target.value
      })
      if (response.data.success) {
        await fetchAllOrders();
      }
    }

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className='order add'>
          <h3>Order Page</h3>
          <div className="order-list">
             {orders.map((order, index) => (
             <div key={index} className='order-item'>
                <img src={assets.parcel_icon} alt="" />
                <div>
               <p className='order-item-food'>
              {/* Yahan ?.map use kiya gaya hai safe rehne ke liye */}
              {order.items?.map((item, i) => (
               i === order.items.length - 1 
               ? item.name + " x " + item.quantity 
               : item.name + " x " + item.quantity + ", "
              ))}
              </p>
               <p className='order-item-name'>{order.address?.firstName + " " + order.address?.lastName}</p>
               <div className='order-item-address'>
                 <p>{order.address.stree+","}</p>
                 <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.pincode}</p>
               </div>
                 <p className='order-item-phone'>{order.address.phone}</p>
                 </div>
               <p>Items : {order.items?.length}</p>
               <p>${order.amount}</p>
               <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
               </select>
             </div>
          ))}
          </div>
      </div>
    )
}

export default Order;