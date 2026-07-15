import React from "react";

import { Metadata } from "next";
import CreateMovie from "./CreateMovieForm";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Create | TMDB",
    description:
      "Browse the latest movies, explore details, release dates, and more on TMDB.",

    openGraph: {
      title: "Create | TMDB",
      description:
        "Browse the latest movies, explore details, release dates, and more on TMDB.",
    },
  };
}

export default function CreateMoviePage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <CreateMovie />
    </div>
  );
}
