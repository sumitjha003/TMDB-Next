/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation DeleteMovie($deleteMovieId: ID!) {\n  deleteMovie(id: $deleteMovieId) {\n    data {\n      movie {\n        id\n        title\n      }\n    }\n  }\n}\n": typeof types.DeleteMovieDocument,
    "mutation Mutation($data: MovieInput) {\n  createMovie(data: $data) {\n    data {\n      movie {\n        title\n        releaseDate\n      }\n    }\n  }\n}\n": typeof types.MutationDocument,
    "\n  mutation UpdateMovie($updateMovieId: ID!, $data: UpdateMovieInput) {\n    updateMovie(id: $updateMovieId, data: $data) {\n      message\n    }\n  }\n": typeof types.UpdateMovieDocument,
    "\n  mutation DeletePerson($deletePersonId: ID!) {\n    deletePerson(id: $deletePersonId) {\n      message\n    }\n  }\n": typeof types.DeletePersonDocument,
    "\nmutation UpdatePerson($updatePersonId: ID!, $data: UpdatePersonInput!) {\n  updatePerson(id: $updatePersonId, data: $data) {\n    data {\n      id\n      alsoKnownAs\n      biography\n      gender\n      birthday\n      name\n      placeOfBirth\n      popularity\n      knownForDepartment\n      adult\n    }\n  }\n}": typeof types.UpdatePersonDocument,
    "\n  mutation CreatePerson($data: PersonInput!) {\n    createPerson(data: $data) {\n      data {\n        adult\n        birthday\n        gender\n        name\n        placeOfBirth\n        popularity\n      }\n    }\n  }\n": typeof types.CreatePersonDocument,
    "\n  mutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {\n    emailPasswordLogIn(data: $data) {\n      data {\n        token\n        refreshToken\n        user {\n          id\n          email\n          name\n        }\n      }\n    }\n  }\n": typeof types.EmailPasswordLogInDocument,
    "\n  query Movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {\n    movies(filter: $filter, sort: $sort) {\n      data {\n        id\n        title\n        imageUrl\n        releaseDate\n      }\n    }\n  }\n": typeof types.MoviesDocument,
    "\n  query Movie($movieId: ID!) {\n    movie(id: $movieId) {\n      data {\n        title\n        imageUrl\n        revenue\n        releaseDate\n        adult\n        budget\n        originalTitle\n        runtime\n        status\n        tagline\n        originalLanguage\n        overview\n        genres {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.MovieDocument,
    "\n  query Languages($filter: LanguagesFilter) {\n    languages(filter: $filter) {\n      data {\n        id\n        englishName\n        languageCode\n      }\n    }\n  }\n": typeof types.LanguagesDocument,
    "\n  query ListPersons($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {\n  listPersons(filter: $filter, sort: $sort) {\n    data {\n      id\n      name\n      gender\n      adult\n      birthday\n      popularity\n      placeOfBirth\n      alsoKnownAs\n      biography\n      knownForDepartment\n      profilePath\n    }\n    count \n  }\n}\n": typeof types.ListPersonsDocument,
    "\n  query GetPersonList($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {\n    listPersons(filter: $filter, sort: $sort) {\n      data {\n        id\n        name\n        gender\n        adult\n        birthday\n        popularity\n        placeOfBirth\n        alsoKnownAs\n        biography\n        knownForDepartment\n      }\n    }\n  }\n": typeof types.GetPersonListDocument,
    "\n query GetPerson($personId: ID!) {\n  person(id: $personId) {\n    data {\n      id\n      name\n      placeOfBirth\n      popularity\n      adult\n      biography\n      birthday\n      gender\n      knownForDepartment\n      alsoKnownAs\n    }\n  }\n}\n": typeof types.GetPersonDocument,
    "\n  query MovieTitle($movieId: ID!) {\n    movie(id: $movieId) {\n      data {\n        title\n      }\n    }\n  }\n": typeof types.MovieTitleDocument,
};
const documents: Documents = {
    "mutation DeleteMovie($deleteMovieId: ID!) {\n  deleteMovie(id: $deleteMovieId) {\n    data {\n      movie {\n        id\n        title\n      }\n    }\n  }\n}\n": types.DeleteMovieDocument,
    "mutation Mutation($data: MovieInput) {\n  createMovie(data: $data) {\n    data {\n      movie {\n        title\n        releaseDate\n      }\n    }\n  }\n}\n": types.MutationDocument,
    "\n  mutation UpdateMovie($updateMovieId: ID!, $data: UpdateMovieInput) {\n    updateMovie(id: $updateMovieId, data: $data) {\n      message\n    }\n  }\n": types.UpdateMovieDocument,
    "\n  mutation DeletePerson($deletePersonId: ID!) {\n    deletePerson(id: $deletePersonId) {\n      message\n    }\n  }\n": types.DeletePersonDocument,
    "\nmutation UpdatePerson($updatePersonId: ID!, $data: UpdatePersonInput!) {\n  updatePerson(id: $updatePersonId, data: $data) {\n    data {\n      id\n      alsoKnownAs\n      biography\n      gender\n      birthday\n      name\n      placeOfBirth\n      popularity\n      knownForDepartment\n      adult\n    }\n  }\n}": types.UpdatePersonDocument,
    "\n  mutation CreatePerson($data: PersonInput!) {\n    createPerson(data: $data) {\n      data {\n        adult\n        birthday\n        gender\n        name\n        placeOfBirth\n        popularity\n      }\n    }\n  }\n": types.CreatePersonDocument,
    "\n  mutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {\n    emailPasswordLogIn(data: $data) {\n      data {\n        token\n        refreshToken\n        user {\n          id\n          email\n          name\n        }\n      }\n    }\n  }\n": types.EmailPasswordLogInDocument,
    "\n  query Movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {\n    movies(filter: $filter, sort: $sort) {\n      data {\n        id\n        title\n        imageUrl\n        releaseDate\n      }\n    }\n  }\n": types.MoviesDocument,
    "\n  query Movie($movieId: ID!) {\n    movie(id: $movieId) {\n      data {\n        title\n        imageUrl\n        revenue\n        releaseDate\n        adult\n        budget\n        originalTitle\n        runtime\n        status\n        tagline\n        originalLanguage\n        overview\n        genres {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.MovieDocument,
    "\n  query Languages($filter: LanguagesFilter) {\n    languages(filter: $filter) {\n      data {\n        id\n        englishName\n        languageCode\n      }\n    }\n  }\n": types.LanguagesDocument,
    "\n  query ListPersons($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {\n  listPersons(filter: $filter, sort: $sort) {\n    data {\n      id\n      name\n      gender\n      adult\n      birthday\n      popularity\n      placeOfBirth\n      alsoKnownAs\n      biography\n      knownForDepartment\n      profilePath\n    }\n    count \n  }\n}\n": types.ListPersonsDocument,
    "\n  query GetPersonList($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {\n    listPersons(filter: $filter, sort: $sort) {\n      data {\n        id\n        name\n        gender\n        adult\n        birthday\n        popularity\n        placeOfBirth\n        alsoKnownAs\n        biography\n        knownForDepartment\n      }\n    }\n  }\n": types.GetPersonListDocument,
    "\n query GetPerson($personId: ID!) {\n  person(id: $personId) {\n    data {\n      id\n      name\n      placeOfBirth\n      popularity\n      adult\n      biography\n      birthday\n      gender\n      knownForDepartment\n      alsoKnownAs\n    }\n  }\n}\n": types.GetPersonDocument,
    "\n  query MovieTitle($movieId: ID!) {\n    movie(id: $movieId) {\n      data {\n        title\n      }\n    }\n  }\n": types.MovieTitleDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteMovie($deleteMovieId: ID!) {\n  deleteMovie(id: $deleteMovieId) {\n    data {\n      movie {\n        id\n        title\n      }\n    }\n  }\n}\n"): (typeof documents)["mutation DeleteMovie($deleteMovieId: ID!) {\n  deleteMovie(id: $deleteMovieId) {\n    data {\n      movie {\n        id\n        title\n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Mutation($data: MovieInput) {\n  createMovie(data: $data) {\n    data {\n      movie {\n        title\n        releaseDate\n      }\n    }\n  }\n}\n"): (typeof documents)["mutation Mutation($data: MovieInput) {\n  createMovie(data: $data) {\n    data {\n      movie {\n        title\n        releaseDate\n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateMovie($updateMovieId: ID!, $data: UpdateMovieInput) {\n    updateMovie(id: $updateMovieId, data: $data) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateMovie($updateMovieId: ID!, $data: UpdateMovieInput) {\n    updateMovie(id: $updateMovieId, data: $data) {\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePerson($deletePersonId: ID!) {\n    deletePerson(id: $deletePersonId) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePerson($deletePersonId: ID!) {\n    deletePerson(id: $deletePersonId) {\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdatePerson($updatePersonId: ID!, $data: UpdatePersonInput!) {\n  updatePerson(id: $updatePersonId, data: $data) {\n    data {\n      id\n      alsoKnownAs\n      biography\n      gender\n      birthday\n      name\n      placeOfBirth\n      popularity\n      knownForDepartment\n      adult\n    }\n  }\n}"): (typeof documents)["\nmutation UpdatePerson($updatePersonId: ID!, $data: UpdatePersonInput!) {\n  updatePerson(id: $updatePersonId, data: $data) {\n    data {\n      id\n      alsoKnownAs\n      biography\n      gender\n      birthday\n      name\n      placeOfBirth\n      popularity\n      knownForDepartment\n      adult\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePerson($data: PersonInput!) {\n    createPerson(data: $data) {\n      data {\n        adult\n        birthday\n        gender\n        name\n        placeOfBirth\n        popularity\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePerson($data: PersonInput!) {\n    createPerson(data: $data) {\n      data {\n        adult\n        birthday\n        gender\n        name\n        placeOfBirth\n        popularity\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {\n    emailPasswordLogIn(data: $data) {\n      data {\n        token\n        refreshToken\n        user {\n          id\n          email\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {\n    emailPasswordLogIn(data: $data) {\n      data {\n        token\n        refreshToken\n        user {\n          id\n          email\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {\n    movies(filter: $filter, sort: $sort) {\n      data {\n        id\n        title\n        imageUrl\n        releaseDate\n      }\n    }\n  }\n"): (typeof documents)["\n  query Movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {\n    movies(filter: $filter, sort: $sort) {\n      data {\n        id\n        title\n        imageUrl\n        releaseDate\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Movie($movieId: ID!) {\n    movie(id: $movieId) {\n      data {\n        title\n        imageUrl\n        revenue\n        releaseDate\n        adult\n        budget\n        originalTitle\n        runtime\n        status\n        tagline\n        originalLanguage\n        overview\n        genres {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Movie($movieId: ID!) {\n    movie(id: $movieId) {\n      data {\n        title\n        imageUrl\n        revenue\n        releaseDate\n        adult\n        budget\n        originalTitle\n        runtime\n        status\n        tagline\n        originalLanguage\n        overview\n        genres {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Languages($filter: LanguagesFilter) {\n    languages(filter: $filter) {\n      data {\n        id\n        englishName\n        languageCode\n      }\n    }\n  }\n"): (typeof documents)["\n  query Languages($filter: LanguagesFilter) {\n    languages(filter: $filter) {\n      data {\n        id\n        englishName\n        languageCode\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ListPersons($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {\n  listPersons(filter: $filter, sort: $sort) {\n    data {\n      id\n      name\n      gender\n      adult\n      birthday\n      popularity\n      placeOfBirth\n      alsoKnownAs\n      biography\n      knownForDepartment\n      profilePath\n    }\n    count \n  }\n}\n"): (typeof documents)["\n  query ListPersons($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {\n  listPersons(filter: $filter, sort: $sort) {\n    data {\n      id\n      name\n      gender\n      adult\n      birthday\n      popularity\n      placeOfBirth\n      alsoKnownAs\n      biography\n      knownForDepartment\n      profilePath\n    }\n    count \n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPersonList($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {\n    listPersons(filter: $filter, sort: $sort) {\n      data {\n        id\n        name\n        gender\n        adult\n        birthday\n        popularity\n        placeOfBirth\n        alsoKnownAs\n        biography\n        knownForDepartment\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPersonList($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {\n    listPersons(filter: $filter, sort: $sort) {\n      data {\n        id\n        name\n        gender\n        adult\n        birthday\n        popularity\n        placeOfBirth\n        alsoKnownAs\n        biography\n        knownForDepartment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n query GetPerson($personId: ID!) {\n  person(id: $personId) {\n    data {\n      id\n      name\n      placeOfBirth\n      popularity\n      adult\n      biography\n      birthday\n      gender\n      knownForDepartment\n      alsoKnownAs\n    }\n  }\n}\n"): (typeof documents)["\n query GetPerson($personId: ID!) {\n  person(id: $personId) {\n    data {\n      id\n      name\n      placeOfBirth\n      popularity\n      adult\n      biography\n      birthday\n      gender\n      knownForDepartment\n      alsoKnownAs\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MovieTitle($movieId: ID!) {\n    movie(id: $movieId) {\n      data {\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query MovieTitle($movieId: ID!) {\n    movie(id: $movieId) {\n      data {\n        title\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;