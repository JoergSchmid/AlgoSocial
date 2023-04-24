import { gql, useQuery } from "@apollo/client";
import { PostType } from "../Profile";

export const GET_ALL_POSTS = gql`
    query GetALLPosts {
        allPosts {
            id
            title
            message
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

export function FetchPosts(): PostType[] {
    const { loading, error, data } = useQuery(GET_ALL_POSTS, {
        fetchPolicy: 'no-cache',
        pollInterval: 10000
    });
    if (loading || error) return [];

    return data.allPosts;
}