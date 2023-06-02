package de.algoSocial.backend;

import de.algosocial.backend.Post;
import de.algosocial.backend.PostController;
import de.algosocial.backend.PostRepository;
import de.algosocial.backend.TaskService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.AutoConfigureGraphQl;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.GraphQlTester;

@SpringBootTest
@AutoConfigureGraphQl
@AutoConfigureGraphQlTester
public class PostTest {
    @Autowired
    private GraphQlTester graphQlTester;
    @Autowired
    private PostController postController;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private TaskService taskService;

    private final int userId = 1;
    private final String postTitle = "Test_Title";
    private final String postMessage = "Test_Message";

    @Test
    void postControllerGetsLoaded() {
        // When first starting to write a test, first check that the correct application context is loaded and some sample @AutoWired fields could be populated
        // This checks that the SpringBootApplication is initialized normally with all components we need.
        // This catches error like the test package being named differently, which was the case here, or only using @GraphQlTest instead of @SpringBootTest, which does not perform all spring magic like initializing JPA repositories
        Assertions.assertNotNull(postController);
        Assertions.assertNotNull(postRepository);
        Assertions.assertNotNull(taskService);
    }

    @Test
    void addPost_removePost() {
        Post post =
                this.graphQlTester.documentName("addPost")
                        .variable("userId", userId)
                        .variable("title", postTitle)
                        .variable("message", postMessage)
                        .execute()
                        .path("addPost")
                        .entity(Post.class)
                        .get();

        int postId = post.getId();
        Assertions.assertEquals(post.getTitle(), postTitle);
        Assertions.assertEquals(post.getMessage(), postMessage);

        this.graphQlTester.documentName("removePost")
                .variable("id", postId)
                .execute();

        this.graphQlTester.documentName("postById")
                .variable("id", postId)
                .execute()
                .path("postById")
                .valueIsNull();
    }

    @Test
    void postById() {
        Post post =
                this.graphQlTester.documentName("postById")
                        .variable("id", 1)
                        .execute()
                        .path("postById")
                        .entity(Post.class)
                        .get();

        Assertions.assertNotNull(post.getTitle());
        Assertions.assertNotNull(post.getMessage());
    }

    @Test
    void getAllPosts() {
        this.graphQlTester.documentName("allPosts")
                .execute()
                .path("allPosts[*].title")
                .entityList(String.class)
                .hasSizeGreaterThan(0);
    }
}
