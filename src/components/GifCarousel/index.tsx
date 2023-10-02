import React, { useEffect, useRef, useState } from 'react';

import { IGif } from "@giphy/js-types";
import { Gif } from "@giphy/react-components";
import {getGifWidth} from "@giphy/js-util";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Navigation, FreeMode, Pagination, Mousewheel } from 'swiper/modules';
import { GifsResult } from '@giphy/js-fetch-api';

interface IGifCarouselProps {
  promise: Promise<GifsResult>;
  onGifClick: (value: React.SetStateAction<IGif | undefined>) => void
}
const GifCarousel = (props: IGifCarouselProps) => {
  const [gifList, setGifList] = useState<IGif[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await props.promise.then((result: GifsResult) => {
        setGifList( result.data);
      });
    };
  
    fetchData()
    console.log("GifCarousel: useEffect");
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={0}
        centeredSlides={false}
        slidesPerGroup={3}
        freeMode={true}
        navigation={true}
        mousewheel={true}
        modules={[FreeMode, Navigation, Mousewheel]}
        className="mySwiper"
      >
        {gifList.map((item:IGif) =>
          <SwiperSlide key={item.id} >
            <Gif gif={item} height={200} width={getGifWidth(item, 200)} key={item.id} style={{
              "max-width": "100%",
            }}
            onGifClick = {(gif: IGif, e: React.SyntheticEvent<HTMLElement, Event>):void => {
              e.preventDefault();
              props.onGifClick(gif);
            }}
            />
          </SwiperSlide>)}
      </Swiper>
    </>
  );
}

export default GifCarousel;
