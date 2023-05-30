package de.algo_social;

import de.algosocial.backend.AppConfig;
import de.algosocial.backend.PostController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.GraphQlTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.test.context.ContextConfiguration;

@ContextConfiguration(classes = AppConfig.class)
@GraphQlTest(PostController.class)
public class PostTest {
    @Autowired
    private GraphQlTester graphQlTester;

    @Test
    void getAllTest() {
        this.graphQlTester.documentName("allPosts")
                .execute()
                .path("allPosts[*].title")
                .entityList(String.class)
                .hasSizeGreaterThan(0);
    }
}
