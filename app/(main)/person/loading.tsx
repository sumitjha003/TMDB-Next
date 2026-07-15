import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loading...",
};

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden">
      {/* Background Blurs matching PersonClient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-900/5 blur-[120px]" />
      </div>

      <div className="flex justify-start px-6 pt-6 ml-4 relative z-10">
        <div className="mt-2 w-32 h-6 bg-white/5 rounded-lg animate-pulse"></div>
      </div>

      <div className="max-w-[1400px] mx-auto p-6 md:p-12 pt-0 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div className="space-y-4 -mt-12 w-full md:w-1/2">
            <div className="h-20 w-3/4 bg-white/5 rounded-2xl animate-pulse"></div>
            <div className="h-6 w-1/2 bg-white/5 rounded-lg animate-pulse"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="w-full md:w-[350px] h-12 bg-white/5 rounded-2xl animate-pulse"></div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white/5 animate-pulse"></div>
              <div className="h-12 w-12 rounded-full bg-white/5 animate-pulse"></div>
              <div className="h-12 w-12 rounded-full bg-white/5 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-12">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="aspect-3/4 rounded-2xl bg-white/5 animate-pulse flex flex-col justify-end p-5 overflow-hidden relative"
            >
              {/* Optional: Mimic the internal structure of the card if desired, 
                  but a solid block is usually enough for a skeleton. 
                  Adding a subtle bottom block to mimic the text area */}
              <div className="h-[35%] w-full bg-[#0f172a]/20 absolute bottom-0 left-0"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
