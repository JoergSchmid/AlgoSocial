import { gql, useQuery } from "@apollo/client";

const GET_ALL_POSTS = gql`
    query GetALLPosts {
        allPosts {
            id
            title
            message
        }
    }
`;

export function fetchPosts() {
    const { loading, error, data } = useQuery(GET_ALL_POSTS, {
        fetchPolicy: 'no-cache'
    });

    if (loading || error) return null;

    return data.allPosts;
    // return data.allPosts.map((post: PostType) => {
    //     return (<Post post={post} />)
    // });
}