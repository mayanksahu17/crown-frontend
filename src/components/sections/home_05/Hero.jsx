import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
// import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
} from "lucide-react";
import SolarEnergycards from "./Card";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      id: 1,
      tagline: "Complete Commercial, Residential & Industrial Solar Systems",
      title: "We Invest In The Future Of Planet!",
      description:
        "As a world wide distributor of solar supplies we endeavor to provide fast and knowledgeable service, we can get you materials by sea or air.",
      image:
        "https://res.cloudinary.com/dygdftjr8/image/upload/v1742803597/photo-realistic-high-resolution-image-glossy-electric-car-charging-sleek-station-against-vibr_ypviwq.jpg",
    },
    {
      id: 2,
      tagline: "Complete Commercial, Residential & Industrial Solar Systems",
      title: "Energize Society By Reliable Energy!",
      description:
        "As a world wide distributor of solar supplies we endeavor to provide fast and knowledgeable service, we can get you materials by sea or air.",
      image:
        "https://res.cloudinary.com/dfcbjgt3w/video/upload/v1742800328/NEW_CROWN_BANKERS_vqgvbs.mp4",
    },
  ];

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning, slides.length]);

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;

    setIsTransitioning(true);
    setCurrentSlide(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Control video playback when slide changes
  useEffect(() => {
    // Find the video element for slide index 1 (second slide)
    const videoElement = document.querySelector(
      `video[src="${slides[1].image}"]`
    );

    // Only work with the video if it exists
    if (videoElement) {
      if (currentSlide === 1) {
        // If we're on the second slide, reset the video to the beginning and play it
        videoElement.currentTime = 0;
        videoElement
          .play()
          .catch((err) => console.log("Video play error:", err));
      } else {
        // If we're not on the second slide, pause the video
        videoElement.pause();
      }
    }
  }, [currentSlide, slides]);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 z-0 transition-opacity duration-500 ease-in-out ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {slide.image.includes("video") ? (
            <video
              src={slide.image}
              autoPlay={currentSlide === index}
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              preload="auto"
            />
          ) : slide.image.includes("youtube.com") ? (
            <iframe
              src={slide.image}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            />
          ) : (
            <img
              src={slide.image || "/placeholder.svg"}
              alt={`Slide ${index + 1} background`}
              className="w-full h-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ))}

      <div className="relative z-20 h-full flex flex-col justify-center items-center px-6 max-w-7xl mx-auto">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 flex flex-col justify-center items-center transition-all duration-500 ease-in-out transform ${
              currentSlide === index
                ? "opacity-100 translate-x-0"
                : index < currentSlide ||
                  (currentSlide === 0 && index === slides.length - 1)
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            <div className="text-white space-y-6 text-center max-w-2xl">
              <p className="text-sm md:text-base font-medium font-sens">
                {slide.tagline}
              </p>
              <h1 className="text-4xl md:text-7xl lg:text-7xl font-bold leading-tight font-bethany">
                {slide.title}
              </h1>
              <p className="text-base md:text-lg mx-auto font-sans">
                {slide.description}
              </p>
              <div className="flex flex-wrap gap-4 pt-4 justify-center">
                <Link
                  href="/sign-up"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors"
                >
                  <span>Get Started </span>
                  <ArrowRight size={18} />
                </Link>
                <button
                  onClick={() =>
                    window.open("https://youtu.be/EWeTt4RbTVU", "_blank")
                  }
                  className="flex items-center gap-2 bg-transparent hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors border-2 border-green-600"
                >
                  <span>{index === 0 ? "Watch video" : "Watch video"}</span>
                  <CirclePlay size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={30} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={30} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? "bg-green-500" : "bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
