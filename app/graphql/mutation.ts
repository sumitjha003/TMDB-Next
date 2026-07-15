 import { graphql } from "../gql";

// export const EMAIL_PASSWORD_LOGIN = graphql(`
//   mutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {
//     emailPasswordLogIn(data: $data) {
//       data {
//         token
//         refreshToken
//       }
//     }
//   }
// `);


export const DELETE_MOVIE = graphql(`mutation DeleteMovie($deleteMovieId: ID!) {
  deleteMovie(id: $deleteMovieId) {
    data {
      movie {
        id
        title
      }
    }
  }
}
`);

export const CREATE_MOVIE = graphql(`mutation Mutation($data: MovieInput) {
  createMovie(data: $data) {
    data {
      movie {
        title
        releaseDate
      }
    }
  }
}
`);

export const UPDATE_MOVIE = graphql (`
  mutation UpdateMovie($updateMovieId: ID!, $data: UpdateMovieInput) {
    updateMovie(id: $updateMovieId, data: $data) {
      message
    }
  }
`);


export const DELETE_PERSON = graphql(`
  mutation DeletePerson($deletePersonId: ID!) {
    deletePerson(id: $deletePersonId) {
      message
    }
  }
`);

export const UPDATE_PERSON = graphql(`
mutation UpdatePerson($updatePersonId: ID!, $data: UpdatePersonInput!) {
  updatePerson(id: $updatePersonId, data: $data) {
    data {
      id
      alsoKnownAs
      biography
      gender
      birthday
      name
      placeOfBirth
      popularity
      knownForDepartment
      adult
    }
  }
}`)

export const CREATE_PERSON = graphql(`
  mutation CreatePerson($data: PersonInput!) {
    createPerson(data: $data) {
      data {
        adult
        birthday
        gender
        name
        placeOfBirth
        popularity
      }
    }
  }
`);

export const LOGIN_MUTATION = graphql(`
  mutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {
    emailPasswordLogIn(data: $data) {
      data {
        token
        refreshToken
        user {
          id
          email
          name
        }
      }
    }
  }
`);