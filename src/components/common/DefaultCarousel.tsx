import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/carousel.css";

interface DefaultCarouselProps {
    items: any[];
    slidesPerView?: number;
    rows?: number;
    renderItem: (item: any) => ReactNode;
}

const DefaultCarousel: React.FC<DefaultCarouselProps> = ({ 
    items,
    slidesPerView = 2,
    rows = 1,
    renderItem,
 }) => {
    return(
    <div className="carousel">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={slidesPerView}
        grid={{
          rows
        }}
        pagination={{ clickable: true }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DefaultCarousel;
