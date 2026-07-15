"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { type Movie } from "@/app/gql/graphql";
import MovieCard from "@/app/components/MovieCard";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import DeleteMovie from "@/app/components/DeleteMovie";
import EditMoviePage from "../movies/[id]/EditMovie.tsx/EditForm";
import Image from "next/image";
import { Empty } from "antd";
import { ROUTES } from "@/app/constants/routes";

type DashboardClientProps = {
  initialMovies: Movie[];
};

const DashboardClient: React.FC<DashboardClientProps> = ({ initialMovies }) => {
  const urlSearchParams = useSearchParams();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const movies = useMemo(
    () => initialMovies.filter((m): m is Movie & { id: string } => !!m?.id),
    [initialMovies]
  );

  useEffect(() => {
    if (movies.length === 0) return;

    const editId = urlSearchParams.get("edit");
    const deleteId = urlSearchParams.get("delete");

    if (!editId && !deleteId) return;

    setTimeout(() => {
      if (editId) {
        setSelectedMovieId(editId);
        setEditModalOpen(true);
      } else if (deleteId) {
        const movie = movies.find((m) => m?.id === deleteId);
        setSelectedMovie({
          id: deleteId,
          title: movie?.title || "Untitled",
        });
        setDeleteModalOpen(true);
      }

      window.history.replaceState({}, "", ROUTES.DASHBOARD);
    }, 0);
  }, [movies, urlSearchParams]);

  const handleDelete = (id: string, title: string) => {
    setSelectedMovie({ id, title });
    setDeleteModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedMovieId(id);
    setEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#020617] overflow-hidden">
<div className="relative h-[520px] md:h-[620px] lg:h-[700px] w-full bg-[#020617]">
  
  <div className="absolute inset-0">
    <Image
      src="https://i.ytimg.com/vi/V33b2B4_p40/maxresdefault.jpg"
      alt="Cinema Hero"
      fill
      priority
      className="object-cover object-top"
    />
    <div className="absolute inset-0 bg-black/55" />
    <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-[#020617]/50 to-transparent" />
    <div className="absolute inset-0 bg-linear-to-r from-[#020617] via-transparent to-transparent" />
  </div>

 
  <div className="relative z-20 container mx-auto px-12 pt-8">
    <Breadcrumbs />
  </div>

  
  <div className="relative z-20 container mx-auto px-12 h-full flex items-end pb-70">
    <div className="max-w-4xl">
      <h1
        className="
          text-[3.5rem] md:text-[4.5rem]
          font-black
          tracking-tight
          leading-[1.15]
          text-white
        "
      >
        RECENTLY ADDED
        <br />
        <span className="text-[#01B4E4]">MOVIES</span>
      </h1>

      <p className="mt-6 text-lg md:text-xl text-white/70 max-w-xl">
        A curated selection of the highest-rated cinematic masterpieces in your collection.
      </p>
    </div>
  </div>
</div>


      {/* --- MOVIE GRID SECTION --- */}
      <div className="container mx-auto px-10 pb-12 -mt-40 relative z-20">
        {movies.length === 0 ? (
          <div className="text-center py-20 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10">
            <Empty
              description={
                <span className="text-white/70 text-2xl">
                  No top-rated movies yet
                </span>
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-10 justify-center">
            {movies.map((movie) => (
              <div key={movie.id} className="flex justify-center">
                <MovieCard
                  movies={movie}
                  onDelete={() =>
                    handleDelete(movie.id, movie.title || "Untitled")
                  }
                  onEdit={(id) => handleEdit(id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedMovie && (
        <DeleteMovie
          movieId={selectedMovie.id}
          movieTitle={selectedMovie.title}
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedMovie(null);
          }}
        />
      )}

      {editModalOpen && selectedMovieId && (
        <EditMoviePage
          movieId={selectedMovieId}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedMovieId("");
          }}
        />
      )}
    </div>
  );
};

export default DashboardClient;
