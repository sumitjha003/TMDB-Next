import { LIST_PERSON } from "@/app/graphql/queries";
import PersonClient from "./PersonClient";
import { ListPersonsQuery } from "@/app/gql/graphql";
import { getServerClient } from "@/app/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 60;

type Person = NonNullable<
  NonNullable<ListPersonsQuery["listPersons"]>["data"]
>[number];

type PersonsData = ListPersonsQuery;

async function getPersons() {
  try {
    const serverClient = await getServerClient();
    const { data } = await serverClient.query<PersonsData>({
      query: LIST_PERSON,
      variables: {
        filter: {
          limit: 5,
          skip: 0,
        },
        sort: {
          field: "createdAt",
          order: "ASC",
        },
      },
      fetchPolicy: "no-cache",
    });

    return {
      persons:
        data?.listPersons?.data?.filter(
          (person: Person | null): person is Person => person !== null
        ) ?? [],
      totalCount: data?.listPersons?.count ?? 0,
    };
  } catch (error: unknown) {
    const err = error as { message?: string; graphQLErrors?: { message: string }[] };
    const isAuthError =
      err?.message?.toLowerCase().includes("login") ||
      err?.graphQLErrors?.some((e) => e?.message?.toLowerCase().includes("login"));
    if (isAuthError) redirect("/login");
    console.error("Error fetching persons:", error);
    return { persons: [], totalCount: 0 };
  }
}

export default async function PersonPage() {
  const { persons: initialPersons, totalCount } = await getPersons();

  return (
    <PersonClient
      initialPersons={initialPersons}
      initialTotalCount={totalCount}
    />
  );
}
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Persons | TMDB",
    description:
      "Browse the latest movies, explore details, release dates, and more on TMDB.",

    openGraph: {
      title: "Persons | TMDB",
      description:
        "Browse the latest movies, explore details, release dates, and more on TMDB.",
    },
  };
}
