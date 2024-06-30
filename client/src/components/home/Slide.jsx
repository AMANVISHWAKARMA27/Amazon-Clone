import React from 'react';
import "./slide.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Divider } from '@mui/material';
import { NavLink } from "react-router-dom"

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function Slide({ title, products }) {
  return (
    <div className='products_section'>
      <div className='products_deal'>
        <h3>{title}</h3>
        <button className='view_btn'>View All</button>
      </div>
      <Divider />
      {products ? (
        <Carousel
          responsive={responsive}
          infinite={true}
          draggable={false}
          swipeable={true}
          showDots={false}
          centerMode={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          keyBoardControl={true}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass='custom-dot-list-style'
          itemClass='carousel-item-padding-40-px'
          containerClass='carousel-container'
        >
          {products.map((e) => {
            return (
              <NavLink to={`https://amazon-clone-1-rwc2.onrender.com/getproductsone/${e.id}`}>
                <div className='products_items' key={e.id}>
                  <div className='product_img'>
                    <img src={e.url} alt='' />
                  </div>
                  <p className='products_name'>{e.title.shortTitle}</p>
                  <p className='products_offer'>{e.discount}</p>
                  <p className='products_explore'>{e.tagline}</p>
                </div>
              </NavLink>

            )
          })}
        </Carousel>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}

export default Slide;
