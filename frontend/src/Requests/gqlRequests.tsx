import { gql, useQuery } from "@apollo/client";
import { PostType } from "../Profile/Profile";
import { User } from "../App";

export const GET_ALL_POSTS = gql`
    query GetALLPosts {
        allPosts {
            id
            title
            message
        }
    }
`;

export const GET_ALL_POSTS_BY_USER_ID = gql`
    query postsByUserId($id: ID!) {
        postsByUserId(id: $id) {
            id
            title
            message
        }
    }
`;

export const POST_BY_ID = gql`
    query postById($id: ID!) {
        postById(id: $id)  {
            id
            title
            message
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

export const USER_BY_NAME = gql`
    query username($name: String!) {
        userByName(name: $name) {
            id
            name
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
    mutation addAlgorithmPost($userId: Int!, $title: String!, $algorithm: String!, $input: [Int!]) {
        addAlgorithmPost(userId: $userId, title: $title, algorithm: $algorithm, input: $input) {
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

export const GET_TASK_BY_ID = gql`
    query taskById($id: ID!) {
        taskById(id: $id) {
            status
            result
        }
    }
`;

export function FetchPosts(): PostType[] {
    const { loading, error, data } = useQuery(GET_ALL_POSTS, {
        fetchPolicy: 'no-cache',
        pollInterval: 10000
    });
    if (loading || error) return [];

    return data.allPosts;
}

export function GetPostById(id: number): PostType {
    const { loading, error, data } = useQuery(POST_BY_ID, { variables: { id: { id } } });
    if (loading || error) return { title: "", message: "", id };

    return data.postById;
}

export function GetUserByName(name: string): User {
    const { loading, error, data } = useQuery(USER_BY_NAME, { variables: { name: { name } } });
    if (loading || error) return { userId: 0, name, description: "loading...", pictureIndex: 0 };

    return data.postById;
}