package de.algoSocial.backend;

import de.algosocial.backend.Post;
import de.algosocial.backend.PostController;
import de.algosocial.backend.PostRepository;
import de.algosocial.backend.TaskService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.AutoConfigureGraphQl;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@AutoConfigureGraphQl
@AutoConfigureGraphQlTester
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ActiveProfiles("test")
class PostTest {
    @Autowired
    private GraphQlTester graphQlTester;
    @Autowired
    private PostController postController;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private TaskService taskService;

    private final Post testPost = new Post(0, "Test_Title", "Test_Message");

    @Test
    @Order(1)
    void postControllerGetsLoaded() {
        // When first starting to write a test, first check that the correct application context is loaded and some sample @AutoWired fields could be populated
        // This checks that the SpringBootApplication is initialized normally with all components we need.
        // This catches error like the test package being named differently, which was the case here, or only using @GraphQlTest instead of @SpringBootTest, which does not perform all spring magic like initializing JPA repositories
        Assertions.assertNotNull(postController);
        Assertions.assertNotNull(postRepository);
        Assertions.assertNotNull(taskService);
    }

    @Test
    @Order(2)
    void getAllPosts_zeroEntries() {
        graphQlTester.documentName("allPosts")
                .execute()
                .path("allPosts[*].title")
                .entityList(String.class)
                .hasSize(0);
    }

    @Test
    @Order(3)
    void addPost() {
        Post resultPost =
                graphQlTester.documentName("addPost")
                        .variable("userId", testPost.getUserId())
                        .variable("title", testPost.getTitle())
                        .variable("message", testPost.getMessage())
                        .execute()
                        .path("addPost")
                        .entity(Post.class)
                        .get();

        Assertions.assertEquals(resultPost.getUserId(), testPost.getUserId());
        Assertions.assertEquals(resultPost.getTitle(), testPost.getTitle());
        Assertions.assertEquals(resultPost.getMessage(), testPost.getMessage());
    }

    @Test
    @Order(4)
    void postById() {
        Post resultPost =
                graphQlTester.documentName("postById")
                        .variable("id", 1)
                        .execute()
                        .path("postById")
                        .entity(Post.class)
                        .get();

        Assertions.assertEquals(resultPost.getUserId(), testPost.getUserId());
        Assertions.assertEquals(resultPost.getTitle(), testPost.getTitle());
        Assertions.assertEquals(resultPost.getMessage(), testPost.getMessage());
    }

    @Test
    @Order(5)
    void getAllPosts_oneEntry() {
        graphQlTester.documentName("allPosts")
                .execute()
                .path("allPosts[*].title")
                .entityList(String.class)
                .hasSize(1);
    }

    @Test
    @Order(6)
    void removePost() {
        graphQlTester.documentName("removePost")
                .variable("id", "1")
                .execute();
    }

    @Test
    @Order(7)
    void getAllPosts_checkIfEntriesGotRemoved() {
        graphQlTester.documentName("allPosts")
                .execute()
                .path("allPosts[*].title")
                .entityList(String.class)
                .hasSize(0);
    }

}
