// src/components/HeroSlider/HeroSlider.jsx

// "use client" directive removed - not needed in Vite/CRA
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { ChevronLeft, ChevronRight } from "lucide-react";

// Corrected asset imports for Vite/CRA
import slide1 from "../../assets/tap.png";
import slide2 from "../../assets/lala.png";

const slides = [
    {
        id: 1,
        image: slide1, // .src is not needed
        title: "Find Your Dream Car",
        subtitle: "Explore our extensive collection of premium vehicles",
    },
    {
        id: 2,
        image: slide2, // .src is not needed
        title: "Premium Selection",
        subtitle: "Discover the perfect car for your lifestyle",
    },
];

const HeroSlider = () => {
    return (
        <div className="group relative w-full h-[60vh] md:h-[70vh] lg:h-[85vh] overflow-hidden">
            <Swiper
                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                effect="fade"
                loop={true}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                navigation={{
                    nextEl: ".hero-swiper-button-next",
                    prevEl: ".hero-swiper-button-prev",
                }}
                pagination={{
                    clickable: true,
                    el: ".hero-swiper-pagination",
                }}
                className="w-full h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-full">
                            <div
                                className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-[8000ms] ease-in-out group-hover:scale-105"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            ></div>
                            <div className="absolute inset-0 bg-black/50"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                                <div className="max-w-4xl mx-auto">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-in-up">
                                        {slide.title}
                                    </h1>
                                    <p
                                        className="text-lg md:text-xl max-w-2xl mx-auto animate-slide-in-up"
                                        style={{ animationDelay: "0.3s" }}
                                    >
                                        {slide.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="hero-swiper-button-prev absolute top-1/2 -translate-y-1/2 left-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/20">
                <ChevronLeft className="w-8 h-8" />
            </div>
            <div className="hero-swiper-button-next absolute top-1/2 -translate-y-1/2 right-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/20">
                <ChevronRight className="w-8 h-8" />
            </div>

            <div className="hero-swiper-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-x-4"></div>

            {/* The invalid <style> block has been removed to fix the warning. */}
        </div>
    );
};

export default HeroSlider;
