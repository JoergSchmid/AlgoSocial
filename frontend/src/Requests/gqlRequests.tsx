import { gql } from "@apollo/client";

export const GET_ALL_ALGORITHMS = gql`
    query allAlgorithms {
        allAlgorithms {
            id
            name
            displayName
            inputMultiple
        }
    }
`;

export const GET_ALL_POSTS_BY_USER_ID = gql`
    query postsByUserId($id: ID!) {
        postsByUserId(id: $id) {
            id
            title
            message
            task {
                id
                algorithm
                status
                input
                result
            }
        }
    }
`;

export const USER_BY_ID = gql`
    query userById($id: ID!) {
        userById(id: $id) {
            id
            title
            message
        }
    }
`;

export const GET_TASK_BY_ID = gql`
    query taskById($id: ID!) {
        taskById(id: $id) {
            status
            result
        }
    }
`;

export const ADD_POST = gql`
    mutation addPost($userId: Int!, $title: String!, $message: String!) {
    addPost(userId: $userId, title: $title, message: $message) {
        id
        title
        message
    }
  }
`;

export const ADD_ALGORITHM_POST = gql`
    mutation addAlgorithmPost($userId: Int!, $title: String!, $algorithm: String!, $input: [Int!]!, $error: String) {
        addAlgorithmPost(userId: $userId, title: $title, algorithm: $algorithm, input: $input, error: $error) {
            id
            title
            message
        }
    }
`;

export const REMOVE_POST = gql`
    mutation removePost($id: ID!) {
        removePost(id: $id)
    }
`;


export const ADD_TASK = gql`
    mutation addTask($algorithm: String!, $input: [Int!]!) {
        addTask(algorithm: $algorithm, input: $input) {
            id
            status
        }
    }
`;