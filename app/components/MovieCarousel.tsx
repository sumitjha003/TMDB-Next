import React from "react";
import { Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface MovieCarouselProps {
  title: string;
  tagline?: string | null;
  images?: string[];
}

type FixedCarouselRef = CarouselRef & {
  prev: () => void;
  next: () => void;
};

const MovieCarousel: React.FC<MovieCarouselProps> = ({
  title,
  tagline,
  images,
}) => {
  const carouselRef = React.useRef<FixedCarouselRef | null>(null);

  const defaultImages = [
    "https://tse4.mm.bing.net/th/id/OIP.eIPQ5asq8ub1tjBr5nPUdAHaEK?pid=Api&P=0&h=180",
    "https://tse4.mm.bing.net/th/id/OIP.eIPQ5asq8ub1tjBr5nPUdAHaEK?pid=Api&P=0&h=180",
    "https://tse4.mm.bing.net/th/id/OIP.eIPQ5asq8ub1tjBr5nPUdAHaEK?pid=Api&P=0&h=180"
  ];

  const carouselImages = images?.length ? images : defaultImages;

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md relative group mt-2 mb-5">
      <div className="relative">
        <Carousel
          ref={carouselRef}
          autoplay
          autoplaySpeed={3000}
          dots={{ className: "custom-carousel-dots" }}
          effect="fade"
        >
          {carouselImages.map((image, index) => (
            <div key={index}>
              <div className="relative h-[450px] w-full overflow-hidden flex items-end">
             
                <div
                  className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-60 transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                />
                
             
                <div className="absolute inset-0 bg-black/30" />

              
                <div
                  className="absolute inset-0 bg-contain bg-center bg-no-repeat z-10"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                />

               
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-black/40 to-transparent z-20" />

            
                <div className="relative z-30 max-w-4xl p-10 w-full">
                  <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg tracking-tight leading-tight">
                    {title}
                  </h1>
                  {tagline && (
                    <p className="text-xl italic text-gray-200 font-light drop-shadow-md border-l-4 border-blue-500 pl-4">
                      {tagline}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        <button
          onClick={handlePrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 z-20 shadow-lg cursor-pointer"
          aria-label="Previous"
        >
          <LeftOutlined style={{ fontSize: "20px" }} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 z-20 shadow-lg cursor-pointer"
          aria-label="Next"
        >
          <RightOutlined style={{ fontSize: "20px" }} />
        </button>
      </div>

      <style jsx global>{`
        .custom-carousel-dots {
          bottom: 25px !important;
        }

        .custom-carousel-dots li button {
          background: rgba(255, 255, 255, 0.4) !important;
          height: 6px !important;
          border-radius: 4px !important;
          transition: all 0.3s ease;
        }

        .custom-carousel-dots li.slick-active button {
          background: #3b82f6 !important; /* blue-500 */
          width: 25px !important;
        }

        .custom-carousel-dots li {
          margin: 0 4px !important;
        }
      `}</style>
    </div>
  );
};

export default MovieCarousel;
