import { GET_MOVIES } from "@/app/graphql/queries";
import type { MoviesQuery, Movie } from "@/app/gql/graphql";
import { getServerClient } from "@/app/server";
import DashboardClient from "./DashboardClient";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let initialMovies: Movie[] = [];

  try {
    const serverClient = await getServerClient();

    const { data } = await serverClient.query<MoviesQuery>({
      query: GET_MOVIES,
      variables: {
        filter: {
          limit: 5,
        },
        sort: {
          field: "createdAt",
          order: "DESC",
        },
      },
      fetchPolicy: "no-cache",
    });

    initialMovies =
      data?.movies?.data?.filter((m): m is Movie => m !== null) ?? [];
  } catch (error: unknown) {
    const err = error as { message?: string; graphQLErrors?: { message?: string }[] };
    const isAuthError =
      err?.message?.toLowerCase().includes("login") ||
      err?.graphQLErrors?.some((e) =>
        e?.message?.toLowerCase().includes("login")
      );

    if (isAuthError) {
      redirect("/login");
    }
    // For other errors, fall through and render with empty list
    console.error("[DashboardPage] Failed to fetch movies:", err?.message);
  }

  return <DashboardClient initialMovies={initialMovies} />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dashboard | TMDB",
    description:
      "Browse the latest movies, explore details, release dates, and more on TMDB.",

    openGraph: {
      title: "Dashboard | TMDB",
      description:
        "Browse the latest movies, explore details, release dates, and more on TMDB.",
    },
  };
}
