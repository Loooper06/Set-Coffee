"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

const Banner = () => {
  return (
    <Swiper
      rewind={true}
      navigation={true}
      loop={true}
      autoplay={{ delay: 4000 }}
      modules={[Navigation, Autoplay]}
      className="mySwiper home-slider"
    >
      <SwiperSlide>
        <Image
          src={"/images/slide1.jpg"}
          alt="Slide"
          width={1400}
          height={600}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={"/images/slide2.jpg"}
          alt="Slide"
          width={1400}
          height={600}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={"/images/slide3.jpg"}
          alt="Slide"
          width={1400}
          height={600}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
