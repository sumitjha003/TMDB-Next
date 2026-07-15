import { GET_MOVIE_BY_ID } from "@/app/graphql/queries";

import { notFound, redirect } from "next/navigation";
import ViewMoviePage from "./ViewMovie";
import type { MovieQuery } from "@/app/gql/graphql";
import { getServerClient } from "@/app/server";
import { Metadata } from "next";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params;

  try {
    const serverClient = await getServerClient();
    const { data } = await serverClient.query<MovieQuery>({
      query: GET_MOVIE_BY_ID,
      variables: { movieId: id },
      fetchPolicy: "no-cache",
    });

    const movie = data?.movie?.data;
    console.log(movie);
    if (!movie) notFound();

    return <ViewMoviePage initialMovie={movie} />;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message.toLowerCase() : "";
    if (msg.includes("login")) redirect("/login");
    throw error;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id: movieId } = await params;

  try {
    const serverClient = await getServerClient();
    const { data } = await serverClient.query<MovieQuery>({
      query: GET_MOVIE_BY_ID,
      variables: { movieId },
      fetchPolicy: "no-cache",
    });

    const movie = data?.movie?.data;
    const metadataTitle = movie?.title;

    return {
      title: metadataTitle,
      description: metadataTitle
        ? `Details, cast, and information about ${metadataTitle} on TMDB.`
        : undefined,
    };
  } catch {
    return { title: "Movie | TMDB" };
  }
}
