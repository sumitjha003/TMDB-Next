import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

export async function getServerClient() {
  const session = await getServerSession(authOptions);
  // @ts-expect-error – accessToken is added in the session callback
  const token: string | undefined = session?.user?.accessToken;

  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.BACKEND_GRAPHQL_URL ?? "",
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    }),
    cache: new InMemoryCache(),
    ssrMode: true,
  });
}
