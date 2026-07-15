import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loading...",
};

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#020617] to-[#0f172a] overflow-hidden">
      <div className="relative z-10">
        {/* Header Skeleton */}
        <div className="sticky top-0 z-50 flex justify-end p-6">
          <div className="mr-200 mt-5 w-32 h-6 bg-white/5 rounded-lg animate-pulse"></div>
          <div className="rounded-3xl p-5 shadow-2xl border border-white/5 w-[600px] h-[88px] bg-white/5 animate-pulse backdrop-blur-xl"></div>
        </div>

        <div className="container mx-auto px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
            <div className="w-full">
              {/* Title Skeleton */}
              <div className="h-20 w-3/4 md:w-1/2 bg-white/5 rounded-2xl animate-pulse mb-6"></div>
              {/* Description Skeleton */}
              <div className="h-6 w-full md:w-2/3 bg-white/5 rounded-lg animate-pulse mb-2"></div>
              <div className="h-6 w-2/3 md:w-1/2 bg-white/5 rounded-lg animate-pulse"></div>
            </div>
            {/* Carousel Skeleton */}
            <div className="w-full md:w-[600px] h-[350px] bg-white/5 rounded-3xl animate-pulse hidden md:block"></div>
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="container mx-auto px-6 pb-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 justify-center max-w-8xl mx-auto">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                {/* Card Image Skeleton */}
                <div
                  className="aspect-2/3 w-full bg-white/5 rounded-2xl animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                ></div>
                {/* Card Text Skeleton */}
                <div className="h-6 w-3/4 bg-white/5 rounded-lg animate-pulse"></div>
                <div className="h-4 w-1/2 bg-white/5 rounded-lg animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
