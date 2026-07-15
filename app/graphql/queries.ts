import { graphql } from "../gql";


export const GET_MOVIES = graphql (`
  query Movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {
    movies(filter: $filter, sort: $sort) {
      data {
        id
        title
        imageUrl
        releaseDate
      }
    }
  }
`);

export const GET_MOVIE_BY_ID = graphql(`
  query Movie($movieId: ID!) {
    movie(id: $movieId) {
      data {
        title
        imageUrl
        revenue
        releaseDate
        adult
        budget
        originalTitle
        runtime
        status
        tagline
        originalLanguage
        overview
        genres {
          id
          name
        }
      }
    }
  }
`);

export const GET_LANGUAGES = graphql(`
  query Languages($filter: LanguagesFilter) {
    languages(filter: $filter) {
      data {
        id
        englishName
        languageCode
      }
    }
  }
`);

export const LIST_PERSON = graphql (`
  query ListPersons($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {
  listPersons(filter: $filter, sort: $sort) {
    data {
      id
      name
      gender
      adult
      birthday
      popularity
      placeOfBirth
      alsoKnownAs
      biography
      knownForDepartment
      profilePath
    }
    count 
  }
}
`)


export const GET_PERSON_DETAILS = graphql(`
  query GetPersonList($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {
    listPersons(filter: $filter, sort: $sort) {
      data {
        id
        name
        gender
        adult
        birthday
        popularity
        placeOfBirth
        alsoKnownAs
        biography
        knownForDepartment
      }
    }
  }
`);

export const GET_PERSON_BY_ID = graphql(`
 query GetPerson($personId: ID!) {
  person(id: $personId) {
    data {
      id
      name
      placeOfBirth
      popularity
      adult
      biography
      birthday
      gender
      knownForDepartment
      alsoKnownAs
    }
  }
}
`);