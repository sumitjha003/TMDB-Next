"use client";

import dayjs from "dayjs";
import { Row, Col, ConfigProvider } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Image from "next/image";
import MovieCarousel from "@/app/components/MovieCarousel";
import BackButton from "@/app/components/BackButton";

type Movie = {
  id?: string | null;
  title?: string | null;
  imageUrl?: string | null;
  tagline?: string | null;
  overview?: string | null;
  status?: string | null;
  adult?: boolean | null;
  releaseDate?: string | null;
  runtime?: number | null;
  originalLanguage?: string | null;
  originalTitle?: string | null;
  budget?: number | null;
  revenue?: number | null;
};

export default function ViewMoviePage({
  initialMovie,
}: {
  initialMovie: Movie;
}) {
  const movie = initialMovie;

  const movieImages = [
    "https://news24online.com/wp-content/uploads/2023/12/Animal-1.jpg",
    "https://i.ytimg.com/vi/V33b2B4_p40/maxresdefault.jpg",
    "https://cdn.gulte.com/wp-content/uploads/2022/03/RRR-Review.jpg",
  ];

  const formatCurrency = (amount: number | null | undefined) => {
    if (!amount) return "₹0";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getLanguageName = (code: string | null | undefined) => {
    if (!code) return "N/A";
    try {
      return new Intl.DisplayNames(["en"], { type: "language" }).of(code);
    } catch {
      return code;
    }
  };

  const profit = (movie.revenue ?? 0) - (movie.budget ?? 0);
  const isProfit = profit >= 0;

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            colorBgContainer: "transparent",
            colorBorderSecondary: "transparent",
            boxShadowTertiary: "none",
          },
        },
        token: {
          colorText: "#ffffff",
          colorTextHeading: "#ffffff",
        },
      }}
    >
      <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#020617] to-[#0f172a] pb-20 font-sans text-white">
        <div className="pt-6 px-6 mb-4">
          <Breadcrumbs />
        </div>

        <div className="max-w-7xl mx-auto px-5">
          <div className="mt-4 ml-2">
            <BackButton />
          </div>

          <MovieCarousel
            title={movie.title || "Movie Title"}
            tagline={movie.tagline || undefined}
            images={movieImages}
          />

          <Row gutter={[40, 40]} className="mt-10">
            <Col xs={24} lg={7}>
              <div className="sticky top-28 space-y-8">
                <div className="rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-transform hover:scale-[1.02] duration-500 max-w-[300px] mx-auto lg:mx-0">
                  <Image
                    src={
                      movie.imageUrl && movie.imageUrl.trim() !== ""
                        ? movie.imageUrl
                        : "/placeholder.png"
                    }
                    alt={movie.title || "Movie poster"}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover aspect-square"
                    priority
                  />
                </div>
              </div>
            </Col>

            <Col xs={24} lg={17}>
              <div className="pl-0 lg:pl-10">
                <div className="mb-10">
                  <h1 className="text-7xl md:text-8xl font-bold text-white mb-4 tracking-tighter leading-none drop-shadow-2xl uppercase">
                    {movie.title}
                  </h1>

                  {movie.originalTitle &&
                    movie.originalTitle !== movie.title && (
                      <p className="text-2xl text-white/50 font-normal italic mb-6 tracking-wide">
                        {movie.originalTitle}
                      </p>
                    )}

                  <div className="flex flex-wrap items-center gap-3 my-8">
                    <div className="inline-flex items-center justify-center bg-white/10 text-white px-5 py-2 text-sm font-bold rounded-full backdrop-blur-md uppercase tracking-widest border border-white/5 whitespace-nowrap">
                      {movie.status || "Unknown"}
                    </div>
                    {movie.adult && (
                      <div className="inline-flex items-center justify-center bg-red-600 text-white px-5 py-2 text-sm font-bold rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-red-500/50 uppercase tracking-widest whitespace-nowrap">
                        18+
                      </div>
                    )}
                  </div>

                  {movie.tagline && (
                    <div className="relative mt-6 border-l-4 border-white/20 pl-6 z-0 max-w-2xl">
                      <p className="text-2xl leading-relaxed text-gray-300 font-light italic tracking-wide">
                        {movie.tagline}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col xl:flex-row gap-10 mb-14">
                  <div className="flex-1">
                    {movie.overview && (
                      <>
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 uppercase tracking-widest">
                          <span className="w-10 h-1.5 bg-blue-500 rounded-full"></span>
                          Storyline
                        </h3>
                        <div className="text-xl leading-9 text-gray-300 font-light text-justify tracking-wide whitespace-pre-line">
                          {movie.overview}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="w-full xl:w-[350px] -mt-30 -mb-15">
                    <div className="bg-transparent border border-white/10 rounded-2xl p-8 h-full">
                      <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-8 border-b border-white/5 pb-2">
                        Movie Details
                      </h3>

                      <div className="space-y-8">
                        <div className="flex items-center gap-5 group">
                          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                            <CalendarOutlined style={{ fontSize: "22px" }} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">
                              Released
                            </p>
                            <p className="text-lg font-bold text-gray-100">
                              {movie.releaseDate
                                ? dayjs(movie.releaseDate).format("D MMM, YYYY")
                                : "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-5 group">
                          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-300">
                            <ClockCircleOutlined style={{ fontSize: "22px" }} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">
                              Duration
                            </p>
                            <p className="text-lg font-bold text-gray-100">
                              {movie.runtime
                                ? `${Math.floor(movie.runtime / 60)}h ${
                                    movie.runtime % 60
                                  }m`
                                : "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-5 group">
                          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all duration-300">
                            <GlobalOutlined style={{ fontSize: "22px" }} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">
                              Language
                            </p>
                            <p className="text-lg font-bold text-gray-100 tracking-wide">
                              {getLanguageName(movie.originalLanguage)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 uppercase tracking-widest">
                    <span className="w-10 h-1.5 bg-emerald-500 rounded-full"></span>
                    Box Office
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="relative group overflow-hidden rounded-2xl bg-transparent border border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
                      <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-2">
                        Budget
                      </p>
                      <p className="text-3xl font-bold text-white tracking-tight">
                        {formatCurrency(movie.budget)}
                      </p>
                    </div>

                    <div className="relative group overflow-hidden rounded-2xl bg-transparent border border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
                      <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-2">
                        Revenue
                      </p>
                      <p className="text-3xl font-bold text-emerald-400 tracking-tight">
                        {formatCurrency(movie.revenue)}
                      </p>
                    </div>

                    <div
                      className={`relative group overflow-hidden rounded-2xl border p-8 hover:bg-white/10 transition-all duration-300 ${
                        isProfit
                          ? "bg-transparent border-emerald-500/20"
                          : "bg-transparent border-red-500/20"
                      }`}
                    >
                      <p
                        className={`text-sm font-bold uppercase tracking-widest mb-2 ${
                          isProfit ? "text-emerald-400/60" : "text-red-400/60"
                        }`}
                      >
                        {isProfit ? "Profit" : "Loss"}
                      </p>
                      <p
                        className={`text-3xl font-bold tracking-tight ${
                          isProfit ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {formatCurrency(profit)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </ConfigProvider>
  );
}
