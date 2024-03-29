import React, { useEffect, useState } from 'react';
import PostInput from "./Post/PostInput";
import PostTimeline from "./Post/PostTimeline";
import LoadIcon from "./Post/LoadIcon";
import { User } from "../App";
import Grid from "@mui/material/Unstable_Grid2";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ADD_ALGORITHM_POST, ADD_POST, GET_ALL_ALGORITHMS, GET_ALL_POSTS_BY_USER_ID, REMOVE_POST } from "../Requests/gqlRequests";
import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";

export enum Status {
    // GraphQL sends enums as strings
    DONE = "DONE",
    CALCULATING = "CALCULATING",
    ERROR = "ERROR"
}

export type AlgorithmType = {
    name: string,
    displayName: string,
    numberOfInputs: number,
    exampleInputs: string[]
}

export type PostType = {
    title: string,
    message: string,
    id: number,
    task?: TaskType,
}

export type TaskType = {
    id: number,
    algorithm: string,
    input: number[] | string,
    input2?: number | string,
    status: Status,
    result: string
}

export const defaultAlgorithm: AlgorithmType[] = [{
    name: "bubblesort",
    displayName: "Bubble Sort",
    numberOfInputs: 1,
    exampleInputs: ["4,2,5,1,3"]
}]

export default function Profile({ user, avatar, changeUser }: {
    user: User,
    avatar: string,
    changeUser: (id?: number) => void
}) {
    const [availableAlgorithms, setAvailableAlgorithms] = useState<AlgorithmType[]>(defaultAlgorithm)
    const [posts, setPosts] = useState<PostType[]>([]);
    const [showPostInput, setShowPostInput] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [algorithm, setAlgorithm] = useState<AlgorithmType>(defaultAlgorithm[0]);

    const [requestAddPost, {
        error: addPostError
    }] = useMutation(ADD_POST, {
        onCompleted: (): Promise<ApolloQueryResult<any>> => refetch()
    });

    const [requestNewTask, {
        error: requestNewTaskError
    }] = useMutation(ADD_ALGORITHM_POST);

    const [requestDeletePost, { error: deletePostError }] = useMutation(REMOVE_POST, {
        onCompleted: (): Promise<ApolloQueryResult<any>> => refetch()
    });

    const { data: fetchedAlgorithms, error: fetchedAlgorithmsError } = useQuery(GET_ALL_ALGORITHMS);

    const { data: fetchedPosts, error: fetchedPostsError, refetch } = useQuery(GET_ALL_POSTS_BY_USER_ID, {
        variables: { id: user.userId },
        fetchPolicy: 'no-cache',
        pollInterval: 10000
    });

    useEffect(() => {
        if (fetchedAlgorithms) {
            setAvailableAlgorithms(fetchedAlgorithms.allAlgorithms);
        }
    }, [fetchedAlgorithms])

    useEffect(() => {
        if (fetchedPosts) {
            setPosts(fetchedPosts.postsByUserId);
            setIsLoading(false);
        }
    }, [fetchedPosts])

    function submitPost({ title, message }: PostType): void {
        setPosts(posts => [...posts, { title, message, id: -posts.length }]);
        setShowPostInput(false);
        requestAddPost({
            variables: {
                userId: user.userId,
                title,
                message
            }
        });
    }
    function submitTask({ title, message }: PostType, secondInput: string): void {

        setPosts(posts => [...posts, {
            title, message, id: -posts.length, task: {
                id: -1,
                algorithm: algorithm.name,
                input: message,
                result: "",
                status: Status.CALCULATING
            }
        }]);
        setShowPostInput(false);

        const input = [message];
        if (secondInput !== "") {
            input.push(secondInput);
        }

        requestNewTask({
            variables: {
                userId: user.userId,
                title: title,
                algorithm: algorithm.name,
                input: input
            }
        });
    }

    function deletePost(id: number): void {
        setIsLoading(true);
        requestDeletePost({
            variables: { id }
        });
    }

    //Logging errors
    if (fetchedPostsError) { console.log(fetchedPostsError); }
    if (fetchedAlgorithmsError) { console.log(fetchedAlgorithmsError); }
    if (addPostError) { console.log(addPostError); }
    if (deletePostError) { console.log(deletePostError); }
    if (requestNewTaskError) { console.log(requestNewTaskError); }

    return (
        <>
            {isLoading && <LoadIcon />}
            <Grid container spacing={2} sx={{ m: 2 }}>
                <Grid>
                    <img
                        data-testid="profilePicture"
                        src={avatar}
                        alt="Profile"
                        width="100px"
                        height="100px"
                        style={{ borderRadius: "8px" }}
                        onClick={() => { changeUser(); setShowPostInput(false); }}
                    />
                </Grid>
                <Grid>
                    <h1>{user.name}</h1>
                    <h5>{user.description}</h5>
                </Grid>
                <Grid>
                    <div style={{ margin: 10 }}>
                        <Fab data-testid="btn_TogglePostInput" color="primary" style={{ margin: 10 }} onClick={() => setShowPostInput(!showPostInput)}>
                            {showPostInput ? <RemoveIcon data-testid="removeIcon" /> : <AddIcon data-testid="addIcon" />}
                        </Fab>
                    </div>
                </Grid>
                <Grid>
                    {showPostInput && <><PostInput
                        availableAlgorithms={availableAlgorithms}
                        algorithm={algorithm}
                        setAlgorithm={setAlgorithm}
                        submitPost={submitPost}
                        submitTask={submitTask}
                    /><br /></>}
                </Grid>
                <Grid>
                    {fetchedPostsError && <><p className='error'>Error Fetching posts: {fetchedPostsError.name}</p><br /></>}
                    {fetchedAlgorithmsError && <><p className='error'>Error Fetching posts: {fetchedAlgorithmsError.name}</p><br /></>}
                    {addPostError && <><p className='error'>Error sending post to server: {addPostError.name}</p><br /></>}
                    {deletePostError && <p className='error'>Error occured when trying to delete post: {deletePostError.name}</p>}
                    {requestNewTaskError && <p className='error'> Error occured sending an algorithmic post: {requestNewTaskError.name}</p>}
                </Grid>
            </Grid>
            <PostTimeline availableAlgorithms={availableAlgorithms} posts={posts} deletePost={deletePost} />
        </>
    );
}