import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setOrders(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const getItemSummary = (items) =>
    items.map(i => `${i.name} x${i.quantity}`).join(', ');

  return (
    <div className="myorders-container">
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map(order => {
        const totalPrice = order.items.reduce(
          (acc, i) => acc + i.price * i.quantity,
          0
        );

        return (
          <div className="order-row" key={order._id}>
            <img
              src={`${url}/images/${order.items[0]?.image}`}
              alt=""
              className="order-thumb"
            />

            <div className="order-info">
              <p className="order-items">{getItemSummary(order.items)}</p>
              <p className="order-price">₹{totalPrice}</p>
              <p className="order-count">Items: {order.items.length}</p>
              <p className="order-status">{order.status}</p>
            </div>

            <button onClick={fetchOrders} className="track-btn">Track Order</button>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;
