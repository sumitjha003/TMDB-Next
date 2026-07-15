"use client";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

export default function ApolloWrapper({ children }: { children: ReactNode }) {
  const { data } = useSession();
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "",
  });

  const debugLink = new ApolloLink((operation, forward) => {
    console.log("Headers:", operation.getContext().headers);
    return forward(operation);
  });

  const authLink = new ApolloLink((operation, forward) => {
    let token = "";
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      token = data?.user?.accessToken;
    }

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }));

    return forward(operation);
  });

  const client = new ApolloClient({
    link: authLink.concat(debugLink).concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
