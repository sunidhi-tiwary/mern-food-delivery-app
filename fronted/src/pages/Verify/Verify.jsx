import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'

const Verify = () => {

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  const { url } = useContext(StoreContext)

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", {
        success,
        orderId
      })

      // thoda delay taaki spinner dikhe
      setTimeout(() => {
        if (response.data.success) {
          navigate("/myorders")
        } else {
          navigate("/")
        }
      }, 1000)

    } catch (error) {
      console.log(error)
      navigate("/")
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [])

  return (
    <div className='verify'>
      <div className="spinner"></div>
      <p>Verifying payment, please wait...</p>
    </div>
  )
}

export default Verify
