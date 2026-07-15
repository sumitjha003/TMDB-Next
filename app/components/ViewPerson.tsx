import { useQuery } from "@apollo/client/react";
import { GET_PERSON_BY_ID } from "@/app/graphql/queries";
import ViewPersonClient from "./ViewPersonClient";

type Person = {
  id?: string | null;
  name?: string | null;
  gender?: string | null;
  adult?: boolean | null;
  birthday?: string | null;
  popularity?: number | null;
  placeOfBirth?: string | null;
  knownForDepartment?: string | null;
};

export default function ViewPerson({ person }: { person: Person | null }) {
  const { data } = useQuery(GET_PERSON_BY_ID, {
    variables: { personId: person?.id || "" },
    skip: !person?.id,
    fetchPolicy: "network-only", 
  });

  const displayPerson = data?.person?.data || person;

  return <ViewPersonClient person={displayPerson} />;
}
