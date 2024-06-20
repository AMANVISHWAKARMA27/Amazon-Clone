import React from 'react';
import Carousel from 'react-material-ui-carousel';
import "./banner.css";

const data = [
    "https://rukminim1.flixcart.com/flap/1680/280/image/1defb861e409319b.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50"
];

function Banner() {
    return (
        <Carousel 
        className='carousel' 
        autoPlay={true} 
        interval={3200} 
        animation='fade' 
        indicators = {false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        navButtonsProps={{
            style: {
                background: "#fff",
                color: "#494949",
                borderRadius: 0,
                marginTop: -22,
                height: "104px",
            }
        }}>
            {data.map((img, i) => (
                <img key={i} src={img} alt='' className='banner_img' />
            ))}
        </Carousel>
    );
}

export default Banner;
