// src/components/HeroSlider/HeroSlider.jsx

"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

// Icons for navigation
import { ChevronLeft, ChevronRight } from "lucide-react"

// Assuming your assets are correctly imported
import slide1 from "../../assets/tap.png"
import slide2 from "../../assets/lala.png"

const slides = [
    {
        id: 1,
        image: slide1.src, // Use .src if using Next.js Image optimization or similar
        title: "Find Your Dream Car",
        subtitle: "Explore our extensive collection of premium vehicles",
    },
    {
        id: 2,
        image: slide2.src,
        title: "Premium Selection",
        subtitle: "Discover the perfect car for your lifestyle",
    },
]

const HeroSlider = () => {
    return (
        // Added 'group' for hover effects on nav buttons and 'hero-slider' for custom CSS scoping
        <div className="group relative w-full h-[60vh] md:h-[70vh] lg:h-[85vh] overflow-hidden">
            <Swiper
                // --- LOGIC: Unchanged ---
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
                            {/* --- STYLING: Background Image with Ken Burns effect --- */}
                            <div
                                className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-[8000ms] ease-in-out group-hover:scale-105"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            ></div>

                            {/* --- STYLING: Simplified, elegant overlay --- */}
                            <div className="absolute inset-0 bg-black/50"></div>

                            {/* --- STYLING: Content with consistent typography --- */}
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

            {/* --- STYLING: Custom Navigation Buttons with theme-aware styling --- */}
            <div className="hero-swiper-button-prev absolute top-1/2 -translate-y-1/2 left-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/20">
                <ChevronLeft className="w-8 h-8" />
            </div>
            <div className="hero-swiper-button-next absolute top-1/2 -translate-y-1/2 right-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/20">
                <ChevronRight className="w-8 h-8" />
            </div>

            {/* --- STYLING: Custom Pagination container --- */}
            <div className="hero-swiper-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-x-4"></div>

            {/* Add the keyframes to your global CSS if they are not already there */}
            <style jsx global>{`
                @keyframes slide-in-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-in-up {
                    animation: slide-in-up 0.8s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
            `}</style>
        </div>
    )
}

export default HeroSlider
