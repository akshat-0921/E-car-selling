import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
    { id: 1, image: "/assets/slide1.jpg", title: "Slide One", desc: "Description for Slide One" },
    { id: 2, image: "/assets/slide2.jpg", title: "Slide Two", desc: "Description for Slide Two" },
    { id: 3, image: "/assets/slide3.jpg", title: "Slide Three", desc: "Description for Slide Three" },
    { id: 4, image: "/assets/slide4.jpg", title: "Slide Four", desc: "Description for Slide Four" },
    { id: 5, image: "/assets/slide5.jpg", title: "Slide Five", desc: "Description for Slide Five" },
];

const HeroSlider = () => {
    return (
        <div className="w-full h-[80vh] relative">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                navigation
                pagination={{ clickable: true }}
                className="h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="w-full h-full bg-center bg-cover flex items-center justify-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="bg-black bg-opacity-50 p-6 rounded text-white text-center">
                                <h2 className="text-3xl font-bold">{slide.title}</h2>
                                <p className="mt-2">{slide.desc}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSlider;
