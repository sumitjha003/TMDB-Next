import type { Metadata } from "next";
import { GET_MOVIES } from "@/app/graphql/queries";
import MoviesClient from "./MoviesClient";
import { getServerClient } from "@/app/server";
import { redirect } from "next/navigation";

export const revalidate = 300;

/* ---------------- TYPES ---------------- */

type Movie = {
  id?: string;
  title?: string;
  imageUrl?: string;
  releaseDate?: string;
};

type MoviesData = {
  movies?: {
    data?: (Movie | null)[];
  };
};

/* ---------------- METADATA ---------------- */

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Movies | TMDB",
    description:
      "Browse the latest movies, explore details, release dates, and more on TMDB.",

    openGraph: {
      title: "Movies | TMDB",
      description:
        "Browse the latest movies, explore details, release dates, and more on TMDB.",
    },
  };
}

/* ---------------- SERVER FETCH ---------------- */

async function getMovies(): Promise<Movie[]> {
  const searchTerm = "";
  const sortField = "createdAt";
  const sortOrder = "DESC";

  try {
    const serverClient = await getServerClient();
    const { data } = await serverClient.query<MoviesData>({
      query: GET_MOVIES,
      variables: {
        filter: {
          limit: 20,
          skip: 0,
          searchTerm: searchTerm.trim() || undefined,
        },
        sort: {
          field: sortField,
          order: sortOrder,
        },
      },
      fetchPolicy: "no-cache",
    });

    return (
      data?.movies?.data?.filter((movie): movie is Movie => movie !== null) ??
      []
    );
  } catch (error: unknown) {
    const err = error as { message?: string; graphQLErrors?: { message: string }[] };
    const isAuthError =
      err?.message?.toLowerCase().includes("login") ||
      err?.graphQLErrors?.some((e) => e?.message?.toLowerCase().includes("login"));
    if (isAuthError) redirect("/login");
    console.error("Error fetching movies:", error);
    return [];
  }
}

/* ---------------- PAGE ---------------- */

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const initialMovies = await getMovies();

  return (
    <MoviesClient initialMovies={initialMovies} searchParams={searchParams} />
  );
}
