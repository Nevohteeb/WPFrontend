import { useRef } from "react";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeHeader = () => {
  const swiperRef = useRef(null);

  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <div
      className="page-header"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000, // delay in ms
          disableOnInteraction: false, // autoplay continues after user interaction
        }}
        speed={1000} // transition speed
      >
        <SwiperSlide
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('/header-bg-imgs/bg1.jpg')`,
          }}
        >
          <div className="header-text">
            <h2>Header 1 Text</h2>
            <button>Call to Action</button>
          </div>
        </SwiperSlide>

        <SwiperSlide
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('/header-bg-imgs/bg2.jpg')`,
          }}
        >
          <div className="header-text">
            <h2>Header 2 Text</h2>
            <button>Call to Action</button>
          </div>
        </SwiperSlide>

        <SwiperSlide
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('/header-bg-imgs/bg3.jpg')`,
          }}
        >
          <div className="header-text">
            <h2>Header 3 Text</h2>
            <button>Call to Action</button>
          </div>
        </SwiperSlide>

        <SwiperSlide
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('/header-bg-imgs/bg4.jpg')`,
          }}
        >
          <div className="header-text">
            <h2>Header 4 Text</h2>
            <button>Call to Action</button>
          </div>
        </SwiperSlide>

        <SwiperSlide
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('/header-bg-imgs/bg5.jpg')`,
          }}
        >
          <div className="header-text">
            <h2>Header 5 Text</h2>
            <button>Call to Action</button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeHeader;
