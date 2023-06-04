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
public class IsPrimeGqlTest {
    @Autowired
    private GraphQlTester graphQlTester;

    @Test
    void input_standard() {
        int[] inputPrime = {2, 3, 5, 7, 11, 13, 17, 19};
        int[] inputNotPrime = {-5, 0, 1, 4, 6, 9, 10, 15};

        for (int i : inputPrime)
            Assertions.assertTrue(
                    graphQlTester.documentName("isPrime")
                            .variable("number", i)
                            .execute()
                            .path("isPrime")
                            .entity(Boolean.class)
                            .get()
            );

        for (int i : inputNotPrime)
            Assertions.assertFalse(
                    graphQlTester.documentName("isPrime")
                            .variable("number", i)
                            .execute()
                            .path("isPrime")
                            .entity(Boolean.class)
                            .get()
            );
    }
}
