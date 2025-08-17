"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

import slide1 from "../../assets/tap.png"
import slide2 from "../../assets/lala.png"

const slides = [
    {
        id: 1,
        image: slide1,
        title: "Find Your Dream Car",
        subtitle: "Explore our extensive collection of premium vehicles",
        gradient: "from-rose-600/80 to-orange-600/80",
    },
    {
        id: 2,
        image: slide2,
        title: "Premium Selection",
        subtitle: "Discover the perfect car for your lifestyle",
        gradient: "from-blue-600/80 to-purple-600/80",
    },
]

const HeroSlider = () => {
    return (
        <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
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
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                pagination={{
                    clickable: true,
                    el: ".swiper-pagination",
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                }}
                className="w-full h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-full">
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-center bg-cover bg-no-repeat transform scale-105 transition-transform duration-[10000ms]"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            ></div>

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>

                            {/* Animated particles background */}
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                <div
                                    className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-ping"
                                    style={{ animationDelay: "1s" }}
                                ></div>
                                <div
                                    className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse"
                                    style={{ animationDelay: "2s" }}
                                ></div>
                                <div
                                    className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full animate-ping"
                                    style={{ animationDelay: "3s" }}
                                ></div>
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 md:px-8">
                                <div className="max-w-4xl mx-auto">
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 transform translate-y-8 opacity-0 animate-slide-up">
                                        <span className="inline-block">
                                            {slide.title.split(" ").map((word, i) => (
                                                <span key={i} className="inline-block mr-3 md:mr-4" style={{ animationDelay: `${i * 200}ms` }}>
                                                    {word}
                                                </span>
                                            ))}
                                        </span>
                                    </h2>

                                    <p
                                        className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto transform translate-y-8 opacity-0 animate-slide-up font-light leading-relaxed"
                                        style={{ animationDelay: "600ms" }}
                                    >
                                        {slide.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className="swiper-button-prev !text-white !opacity-70 hover:!opacity-100 transition-all duration-300 !w-14 !h-14 !bg-white/20 backdrop-blur-sm !rounded-full flex items-center justify-center hover:!bg-white/30 hover:scale-110 !left-4 md:!left-8">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </div>
            <div className="swiper-button-next !text-white !opacity-70 hover:!opacity-100 transition-all duration-300 !w-14 !h-14 !bg-white/20 backdrop-blur-sm !rounded-full flex items-center justify-center hover:!bg-white/30 hover:scale-110 !right-4 md:!right-8">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>

            {/* Custom Pagination */}
            <div className="swiper-pagination !bottom-6 md:!bottom-8 !z-20"></div>

            <style jsx global>{`
                .swiper-pagination-bullet {
                    width: 12px !important;
                    height: 12px !important;
                    background: rgba(255, 255, 255, 0.5) !important;
                    opacity: 1 !important;
                    margin: 0 8px !important;
                    transition: all 0.3s ease !important;
                    border: 2px solid transparent !important;
                }
                .swiper-pagination-bullet-active {
                    background: white !important;
                    transform: scale(1.4) !important;
                    border-color: rgba(255, 255, 255, 0.5) !important;
                }
                @keyframes slideUp {
                    from {
                        transform: translateY(40px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                .animate-slide-up {
                    animation: slideUp 1s forwards;
                }
            `}</style>
        </div>
    )
}

export default HeroSlider
