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
    },
    {
        id: 2,
        image: slide2,
        title: "Premium Selection",
        subtitle: "Discover the perfect car for your lifestyle",
    },
]

const HeroSlider = () => {
    return (
        <div className="relative w-full aspect-[1/1] md:aspect-[21/9]">
            <Swiper
                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                effect="fade"
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
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
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-full">
                            <div
                                className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            ></div>
                            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transform translate-y-8 opacity-0 animate-slide-up">
                                    {slide.title}
                                </h2>
                                <p className="text-xl md:text-2xl max-w-2xl transform translate-y-8 opacity-0 animate-slide-up animation-delay-300">
                                    {slide.subtitle}
                                </p>
                                <button className="mt-8 bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors duration-300 transform translate-y-8 opacity-0 animate-slide-up animation-delay-600">
                                    Explore Now
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className="swiper-button-prev !text-white !opacity-70 hover:!opacity-100 transition-opacity duration-300 !w-12 !h-12 !bg-black/30 !rounded-full flex items-center justify-center"></div>
            <div className="swiper-button-next !text-white !opacity-70 hover:!opacity-100 transition-opacity duration-300 !w-12 !h-12 !bg-black/30 !rounded-full flex items-center justify-center"></div>

            {/* Custom Pagination */}
            <div className="swiper-pagination !bottom-6 !z-20">
                <style jsx>{`
                    :global(.swiper-pagination-bullet) {
                        width: 12px;
                        height: 12px;
                        background: rgba(255, 255, 255, 0.5);
                        opacity: 1;
                        margin: 0 6px;
                        transition: all 0.3s ease;
                    }
                    :global(.swiper-pagination-bullet-active) {
                        background: white;
                        transform: scale(1.3);
                    }
                    @keyframes slideUp {
                        from {
                            transform: translateY(30px);
                            opacity: 0;
                        }
                        to {
                            transform: translateY(0);
                            opacity: 1;
                        }
                    }
                    :global(.animate-slide-up) {
                        animation: slideUp 0.8s forwards;
                    }
                    :global(.animation-delay-300) {
                        animation-delay: 0.3s;
                    }
                    :global(.animation-delay-600) {
                        animation-delay: 0.6s;
                    }
                `}</style>
            </div>
        </div>
    )
}

export default HeroSlider
