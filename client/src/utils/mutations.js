import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!, $username: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
      email
      
      }
      
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook($authors: [String!], $description: String!, $bookId: String!, $image: String! $title: String!) {
  saveBook(authors: $authors, title: $title, description: $description, bookId: $bookId, image: $image) {
    username
    email
    savedBooks {
      authors
      description
      bookId
      image
      title
    }
  }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
  removeBook(bookId: $bookId) {
    username
    email
    savedBooks {
      authors
      description
      bookId
      image
      title
    }
  }
}
`;