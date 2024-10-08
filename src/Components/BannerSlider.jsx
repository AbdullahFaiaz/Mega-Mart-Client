import one from '../assets/six.jpg'
import two from '../assets/two.jpg'
import three from '../assets/five.jpg'


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter'
import NavbarTwo from '../Pages/Shared/NavbarTwo';




const BannerSlider = () => {
  return (
    <div>
      {/* <NavbarTwo></NavbarTwo> */}
    <div className='relative'>
   <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2300,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img className='lg:h-[45vw] md:h-[68vw] h-[85vw] w-full object-cover object-center' src={one} alt="image" /></SwiperSlide>
        <SwiperSlide><img className='lg:h-[45vw] md:h-[68vw] h-[85vw] w-full object-cover object-center' src={two} alt="image" /></SwiperSlide>
        <SwiperSlide><img className='lg:h-[45vw] md:h-[68vw] h-[85vw] w-full object-cover object-center' src={three} alt="image" /></SwiperSlide>
      
      </Swiper>
      <div className='text-[8vw] md:text-[4.5vw] text-[#000000] absolute bottom-[42%] md:bottom-[55%] right-[21%] md:right-[36%] z-10 font-semibold drop-shadow-2xl rounded-sm'><p className=''>

        </p></div>
</div>
</div>
  );
};

export default BannerSlider;
