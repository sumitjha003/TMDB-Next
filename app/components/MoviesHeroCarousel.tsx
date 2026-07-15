"use client";

import React from "react";
import { Carousel } from "antd";

interface MoviesHeroCarouselProps {
  title: string;
  subtitle?: string | null;
  images?: string[];
  height?: number;
}

const MoviesHeroCarousel: React.FC<MoviesHeroCarouselProps> = ({
  title,
  subtitle,
  images = [],
  height = 220,
}) => {
  const fallbackImages = [
    "https://tse4.mm.bing.net/th/id/OIP.eIPQ5asq8ub1tjBr5nPUdAHaEK?pid=Api&P=0&h=180",
  ];

  const heroImages = images.length ? images : fallbackImages;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height }}
    >
      <Carousel autoplay effect="fade" dots={false}>
        {heroImages.map((image, index) => (
          <div key={index}>
            <div
              className="hero-slide"
              style={{
                height,
                backgroundImage: `
                  linear-gradient(
                    to bottom,
                    rgba(0,0,0,0.4),
                    rgba(0,0,0,0.85)
                  ),
                  url(${image})
                `,
              }}
            >
              <div className="relative z-10 max-w-6xl">
                <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg">
                  {title}
                </h1>

                {subtitle && (
                  <p className="text-white/80 mt-2 text-sm md:text-base italic">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <style>{`
        .hero-slide {
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          padding: 24px 32px;
        }
      `}</style>
    </section>
  );
};

export default MoviesHeroCarousel;
