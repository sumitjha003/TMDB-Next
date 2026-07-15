import { graphql } from "../gql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type {
  MovieTitleQuery,
  MovieTitleQueryVariables,
} from "../gql/graphql";
import serverClient from "../server";

const MOVIE_TITLE_QUERY = graphql(`
  query MovieTitle($movieId: ID!) {
    movie(id: $movieId) {
      data {
        title
      }
    }
  }
`) as TypedDocumentNode<MovieTitleQuery, MovieTitleQueryVariables>;

export async function getMovieTitle(
  movieId: string
): Promise<string | undefined> {
  try {
    const { data } = await serverClient.query<
      MovieTitleQuery,
      MovieTitleQueryVariables
    >({
      query: MOVIE_TITLE_QUERY,
      variables: { movieId },
      fetchPolicy: "no-cache",
    });

    return data?.movie?.data?.title ?? undefined;
  } catch (err) {
    console.warn("Failed to fetch movie title for metadata:", err);
    return undefined;
  }
}
