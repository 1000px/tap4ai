'use client';

import React, { useState } from 'react';
import { Carousel } from 'antd';

import { carouselList } from '@/lib/data';

function MyCarousel() {
  return (
    <Carousel  adaptiveHeight={true} autoplay>
      {carouselList.map((el, index) => (
        <div key={index}>
          <img src={el.url} alt={`Image ${index}`} />
        </div>
      ))}
    </Carousel>
  );
}

export default MyCarousel;
