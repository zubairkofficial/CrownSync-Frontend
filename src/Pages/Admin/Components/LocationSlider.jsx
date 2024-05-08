import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function LocationSlider() {
  const [locationId, setLocationId] = useState('');
  const handleLocationButton = (location) => setLocationId(location);

  const locations = ["New York", "Los Angeles", "Chicago","Pakistan","Poland"]; // Add more locations as needed

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="sub-card bg-gray-100 mt-2 p-4 border border-gray-200 rounded-lg">
      <h1 className="text-xl" style={{ color: "#666666" }}>Store Location</h1>
      <Slider {...sliderSettings}>
        {locations.map(location => (
          <div key={location} className="p-2">
            <button
              className="flex-1 border-primary rounded-lg py-2 w-full"
              style={locationId === location ? {
                  background: "#E2545E",
                  color: "white",
                  padding: "2% 5%"
                } : {
                  background: "#D9D9D9B2",
                  color: "#C8C6C6",
                  padding: "2% 5%"
                }}
              onClick={() => handleLocationButton(location)}
            >
              {location}
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default LocationSlider;
