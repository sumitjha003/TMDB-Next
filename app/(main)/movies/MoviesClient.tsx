"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Empty, ConfigProvider, theme } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import { useSession } from "next-auth/react";
import { GET_MOVIES } from "@/app/graphql/queries";
import MovieCard from "@/app/components/MovieCard";
import useDebounce from "@/app/hooks/debounce";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import dynamic from "next/dynamic";
import SearchSortFilter, {
  SortField,
  SortOrder,
} from "@/app/components/SearchSortFilter";

const DeleteMovie = dynamic(() => import("@/app/components/DeleteMovie"), {
  ssr: false,
});
const EditMoviePage = dynamic(() => import("./[id]/EditMovie.tsx/EditForm"), {
  ssr: false,
});
const LoginModal = dynamic(() => import("@/app/components/LoginModal"), {
  ssr: false,
});
import {
  ListMoviesSortFields,
  SortOrder as GraphQLSortOrder,
} from "@/app/gql/graphql";

import FeaturedCarousel from "@/app/components/FeaturedCarousel";
import { ROUTES } from "@/app/constants/routes";

type Movie = {
  id?: string;
  title?: string;
  imageUrl?: string;
  releaseDate?: string;
};

interface MoviesClientProps {
  initialMovies: Movie[];
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function MoviesClient({ initialMovies }: MoviesClientProps) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const { data: session } = useSession();
  const [createLoginModalOpen, setCreateLoginModalOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [sortField, setSortField] = useState<SortField>(() => {
    const field = urlSearchParams.get("sort");
    return (field as SortField) || "createdAt";
  });
  const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
    const order = urlSearchParams.get("order");
    return (order as SortOrder) || "DESC";
  });

  // Helper to update URL
  const updateUrlParams = (newSort: SortField, newOrder: SortOrder) => {
    const params = new URLSearchParams(window.location.search);
    if (newSort) params.set("sort", newSort);
    if (newOrder) params.set("order", newOrder);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  const [additionalMovies, setAdditionalMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const LIMIT = 4;

  const isInitialLoad =
    !debouncedSearch?.trim() &&
    sortField === "createdAt" &&
    sortOrder === "DESC";

  const { data, loading, fetchMore, previousData } = useQuery(GET_MOVIES, {
    variables: {
      filter: {
        limit: LIMIT,
        skip: 0,
        searchTerm: debouncedSearch?.trim() || undefined,
      },
      sort: {
        field: sortField as ListMoviesSortFields,
        order: sortOrder as GraphQLSortOrder,
      },
    },
    skip: isInitialLoad,
    fetchPolicy: "cache-and-network",
  });

  const initialMoviesData = isInitialLoad
    ? initialMovies.slice(0, LIMIT)
    : (data ?? previousData)?.movies?.data
        ?.filter((movie) => movie !== null)
        ?.map((movie) => ({
          id: movie.id || "",
          title: movie.title || "",
          imageUrl: movie.imageUrl || "",
          releaseDate: movie.releaseDate || "",
        })) || [];

  const allMovies = debouncedSearch?.trim()
    ? initialMoviesData
    : Array.from(
        new Map(
          [...initialMoviesData, ...additionalMovies].map((m) => [m.id, m])
        ).values()
      );

  const loadMoreMovies = useCallback(() => {
    if (!hasMoreMovies || isLoadingMore) return;

    setIsLoadingMore(true);
    const nextPage = currentPage + 1;

    fetchMore({
      variables: {
        filter: {
          limit: LIMIT,
          skip: nextPage * LIMIT,
          searchTerm: searchTerm?.trim() ? searchTerm.trim() : undefined,
        },
        sort: {
          field: sortField as ListMoviesSortFields,
          order: sortOrder as GraphQLSortOrder,
        },
      },
    })
      .then((result) => {
        const newMovies =
          result.data?.movies?.data
            ?.filter((movie) => movie !== null)
            ?.map((movie) => ({
              id: movie.id || "",
              title: movie.title || "",
              imageUrl: movie.imageUrl || "",
              releaseDate: movie.releaseDate || "",
            })) || [];

        setAdditionalMovies((prev) => [...prev, ...newMovies]);
        setCurrentPage(nextPage);

        if (newMovies.length < LIMIT) {
          setHasMoreMovies(false);
        }
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  }, [
    hasMoreMovies,
    isLoadingMore,
    currentPage,
    fetchMore,
    searchTerm,
    sortField,
    sortOrder,
  ]);

  // Infinite scroll logic
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (
          scrollPosition >= documentHeight - 400 &&
          !isLoadingMore &&
          hasMoreMovies
        ) {
          loadMoreMovies();
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [loadMoreMovies, isLoadingMore, hasMoreMovies]);

  const displayMovies = allMovies;

  useEffect(() => {
    if (initialMovies.length === 0) return;

    const editId = urlSearchParams.get("edit");
    const deleteId = urlSearchParams.get("delete");

    if (!editId && !deleteId) return;

    setTimeout(() => {
      if (editId) {
        setSelectedMovieId(editId);
        setEditModalOpen(true);
      } else if (deleteId) {
        const movie = initialMovies.find((m) => m.id === deleteId);
        setSelectedMovie({
          id: deleteId,
          title: movie?.title || "Untitled",
        });
        setDeleteModalOpen(true);
      }

      window.history.replaceState({}, "", ROUTES.MOVIES);
    }, 0);
  }, [initialMovies, urlSearchParams]);

  const handleDeleteClick = (id: string, title: string) => {
    if (!session) {
      const targetParams = new URLSearchParams();
      targetParams.set("delete", id);
      const targetPath = `${ROUTES.MOVIES}?${targetParams.toString()}`;
      const encodedCallback = encodeURIComponent(targetPath);
      router.push(`${ROUTES.LOGIN}?callbackUrl=${encodedCallback}`);
      return;
    }
    setSelectedMovie({ id, title });
    setDeleteModalOpen(true);
  };

  const handleEditClick = (id: string) => {
    if (!session) {
      const targetParams = new URLSearchParams();
      targetParams.set("edit", id);
      const targetPath = `${ROUTES.MOVIES}?${targetParams.toString()}`;
      const encodedCallback = encodeURIComponent(targetPath);
      router.push(`${ROUTES.LOGIN}?callbackUrl=${encodedCallback}`);
      return;
    }
    setSelectedMovieId(id);
    setEditModalOpen(true);
  };

  const onChangeSearch = (val: string) => {
    setSearchTerm(val);
  };

  const onSortChange = (field: SortField, order: SortOrder) => {
    setSortField(field);
    setSortOrder(order);
    updateUrlParams(field, order);
    setAdditionalMovies([]);
    setCurrentPage(0);
    setHasMoreMovies(true);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#01B4E4",
          colorBgContainer: "transparent",
          borderRadius: 12,
        },
      }}
    >
      <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#020617] to-[#0f172a] overflow-hidden">
        <div className="relative z-10">
          <div className="sticky top-0 z-50 flex justify-end p-6 mr-10 ">
            <div className="mr-200 mt-5">
              <Breadcrumbs />
            </div>
            <div className="mr-10">
              <SearchSortFilter
                value={searchTerm}
                onChangeSearch={onChangeSearch}
                sortField={sortField}
                sortOrder={sortOrder}
                onSortChange={onSortChange}
                onSearchSubmit={() => {}}
              />
            </div>
          </div>

          <div className="container mx-auto px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
              <div>
                <h1
                  className="
    text-[3.5rem] md:text-[4.25rem] 
    font-extrabold 
    tracking-tight 
    text-transparent bg-clip-text 
    bg-linear-to-r from-white via-white/90 to-white/60
    drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]
  "
                >
                  My Movie Collection
                </h1>
                <p
                  className="
    mt-5 
    text-lg md:text-xl 
    text-white/65 
    leading-relaxed 
    max-w-2xl
  "
                >
                  Browse, search, and manage your personal cinematic universe.
                </p>
              </div>
              <FeaturedCarousel />
            </div>
          </div>

          <div className="container mx-auto px-6 pb-20">
            {loading && displayMovies.length === 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 justify-center max-w-8xl mx-auto">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div
                      className="aspect-2/3 w-full bg-white/5 rounded-2xl animate-pulse"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                    <div className="h-6 w-3/4 bg-white/5 rounded-lg animate-pulse" />
                    <div className="h-4 w-1/2 bg-white/5 rounded-lg animate-pulse" />
                  </div>
                ))}
              </div>
            ) : displayMovies.length === 0 ? (
              <div className="text-center py-20">
                <Empty
                  description={
                    <span className="text-white/70 text-2xl">
                      No movies found
                    </span>
                  }
                  className="opacity-80"
                />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 justify-center max-w-8xl mx-auto">
                  {displayMovies.map((movie, index) => (
                    <MovieCard
                      key={movie.id}
                      movies={movie}
                      onDelete={() =>
                        handleDeleteClick(
                          movie.id || "",
                          movie.title || "Untitled"
                        )
                      }
                      onEdit={(id) => handleEditClick(id)}
                      priority={index < 12}
                    />
                  ))}
                </div>

                {!debouncedSearch?.trim() && (
                  <>
                    {isLoadingMore && (
                      <div className="text-center py-16">
                        <p className="text-2xl font-medium text-purple-300 animate-pulse">
                          Loading more movies...
                        </p>
                      </div>
                    )}

                    {!hasMoreMovies && displayMovies.length > 0 && (
                      <div className="text-center py-12">
                        <p className="text-xl text-white/60 font-medium">
                          You have reached the end of your collection ✨
                        </p>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
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
            onSuccess={() => {
              if (selectedMovie?.id) {
                setAdditionalMovies((prev) =>
                  prev.filter((movie) => movie.id !== selectedMovie.id)
                );
              }
            }}
          />
        )}

        {editModalOpen && selectedMovieId && (
          <EditMoviePage
            movieId={selectedMovieId}
            onClose={() => {
              setEditModalOpen(false);
              setSelectedMovieId(null);
              setAdditionalMovies([]);
              setCurrentPage(0);
              setHasMoreMovies(true);
            }}
          />
        )}

        <LoginModal
          isOpen={createLoginModalOpen}
          onClose={() => setCreateLoginModalOpen(false)}
          message="To create a movie, you need to login first."
          callbackUrl={ROUTES.CREATE_MOVIE}
        />
      </div>
    </ConfigProvider>
  );
}
