"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import MovieCard from "./MovieCard";
import { useQuery } from "@apollo/client/react";
import { GET_MOVIES } from "@/app/graphql/queries";
import { ListMoviesSortFields, SortOrder } from "@/app/gql/graphql";

const FeaturedCarouselComponent = function FeaturedCarousel() {
  const [width, setWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const { data, loading } = useQuery(GET_MOVIES, {
    variables: {
      filter: {
        limit: 5,
        skip: 0,
      },
      sort: {
        field: ListMoviesSortFields.CreatedAt,
        order: SortOrder.Desc,
      },
    },
    fetchPolicy: "cache-first",
  });

  const movies = useMemo(
    () =>
      data?.movies?.data?.filter((m): m is NonNullable<typeof m> => !!m) || [],
    [data]
  );

  useEffect(() => {
    if (trackRef.current && movies.length > 0) {
      setWidth(trackRef.current.scrollWidth / 2);
    }
  }, [movies]);

  return (
    <div className="relative w-full h-[380px] overflow-hidden my-12 py-8 backdrop-blur-md rounded-2xl border-white/1 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] wrapper">
      <div className="absolute top-0 left-1/4 w-1/2 h-px bg-linear-to-r from-transparent via-purple-500/40 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-1/2 h-px bg-linear-to-r from-transparent via-pink-500/40 to-transparent" />

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full text-center">
        <span className="text-xs font-black tracking-[0.3em] text-white bg-[#020617]/50 px-4 py-1.5 rounded-full border border-[#01B4E4]/30 backdrop-blur-md shadow-[0_0_20px_rgba(1,180,228,0.2)]">
          TOP PICKS
        </span>
      </div>

      {loading && movies.length === 0 ? (
        <div className="flex w-full h-full items-center gap-12 overflow-hidden px-10">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="shrink-0 w-44">
              <div className="aspect-2/3 w-full rounded-xl bg-[#1e293b] animate-pulse border border-white/5 bg-linear-to-br from-white/5 to-transparent relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={trackRef}
          className="carousel-track flex w-max items-center h-full"
          style={{ "--w": `${width}px` } as React.CSSProperties}
        >
          {movies.map((movie, i) => (
            <div key={`a-${movie.id || i}`} className="shrink-0 mx-6 w-44">
              <MovieCard movies={movie} showActions={false} />
            </div>
          ))}

          {movies.map((movie, i) => (
            <div key={`b-${movie.id || i}`} className="shrink-0 mx-6 w-44">
              <MovieCard movies={movie} showActions={false} />
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .carousel-track {
          animation: scroll 30s linear infinite;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--w)));
          }
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

const FeaturedCarousel = React.memo(FeaturedCarouselComponent);
export default FeaturedCarousel;
