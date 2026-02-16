import React, { useEffect, useState } from 'react'
import burger from '../../assets/burger_img.png'
import header from '../../assets/header_img.png'
import cake from '../../assets/cake_img.png'
import hero from '../../assets/hero_img.png'
import fries from '../../assets/fries_img.png'
import Partha from '../../assets/partha_img.png'
import Dosha from '../../assets/dosha_img.png'
import './Header.css'

const Header = () => {
  const images = [burger, header, cake, hero, fries, Partha, Dosha]
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length)
    }, 2500) // Thoda slow kar diya smooth effect ke liye

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="header"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
        transition: 'background-image 1s ease-in-out'
      }}
    >
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes crafted
          with the finest ingredients and culinary expertise. One delicious meal at a time.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  )
}

export default Header
