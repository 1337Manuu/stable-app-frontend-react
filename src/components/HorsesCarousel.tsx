import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../horse-carousel.css';
import { Horse, useAppContext } from '../context/AppContextProvider';

interface HorsesCarouselProps {
  horses: Horse[];
}

const HorsesCarousel: React.FC<HorsesCarouselProps> = ({ horses }) => {
    const { setHorses } = useAppContext();
  return (
    <div className="horses-carousel">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={2}
        grid={{
          rows: 2,
        }}
        pagination={{ clickable: true }}
      >
        {horses.map((horse) => (
          <SwiperSlide key={horse.id}>
            <div className="horse-card">
              <img
                src={"sample-horse-avatar.webp"}
                alt={`${horse.name}'s avatar`}
                className="horse-avatar"
              />
              <h3 className="horse-name">{horse.name}</h3>
              <p className="horse-stall">{horse.stall.stallNumber}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HorsesCarousel;