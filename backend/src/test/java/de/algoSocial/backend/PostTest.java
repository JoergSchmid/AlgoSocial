package de.algoSocial.backend;

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
    void getAll() {
        this.graphQlTester.documentName("allPosts")
                .execute()
                .path("allPosts[*].title")
                .entityList(String.class)
                .hasSizeGreaterThan(0);
    }
}
