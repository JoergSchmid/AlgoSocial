package de.algoSocial.backend.algorithms.graphqlTests;

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
public class DijkstraGqlTest {
    @Autowired
    private GraphQlTester graphQlTester;

    @Test
    void createSimpleTree() {
        String nodes = "a,c,b";
        String edges = "(a,b,5),(a,c,1),(b,c,2)";
        String expected = "a,c,b,3.0";

        String result = graphQlTester.documentName("dijkstra")
                .variable("nodes", nodes)
                .variable("edges", edges)
                .execute()
                .path("dijkstra")
                .entity(String.class)
                .get();

        Assertions.assertEquals(expected, result);
    }
}
