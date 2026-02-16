import React, { useRef } from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {

  const menuRef = useRef(null)

  const scrollLeft = () => {
    menuRef.current.scrollLeft -= 200
  }

  const scrollRight = () => {
    menuRef.current.scrollLeft += 200
  }

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes.
      </p>

      {/* MENU LIST */}
      <div className="explore-menu-list" ref={menuRef}>
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory(prev =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            className="explore-menu-list-item"
          >
            {/* IMAGE WRAPPER */}
            <div
              className={`explore-menu-img ${
                category === item.menu_name ? "active" : ""
              }`}
            >
              <img src={item.menu_image} alt={item.menu_name} />
            </div>

            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>

      {/* SCROLL ARROWS BELOW */}
      <div className="explore-menu-arrows">
        <span onClick={scrollLeft}>&lt;</span>
        <span onClick={scrollRight}>&gt;</span>
      </div>

      <hr />
    </div>
  )
}

export default ExploreMenu
