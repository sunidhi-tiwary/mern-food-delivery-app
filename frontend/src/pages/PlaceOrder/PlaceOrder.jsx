import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const PlaceOrder = async (event) => {
    event.preventDefault()

    let orderItems = []

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item }
        itemInfo.quantity = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }

    try {
      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        { headers: { token } }
      )

      console.log("Order Response:", response.data)

      if (response.data.success) {
        window.location.replace(response.data.session_url)
      } else {
        alert("Payment failed")
      }

    } catch (error) {
      console.log("Order Error:", error)
      alert("Something went wrong")
    }
  }


  return (
    <form onSubmit={PlaceOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>

        <input required name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='House No / Flat / Area / Landmark' />

        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State' />
        </div>

        <div className="multi-fields">
          <input required name='pincode' onChange={onChangeHandler} value={data.pincode} type='text' placeholder='PIN Code' maxLength="6" />
          <input required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country' />
        </div>

        <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>

          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
