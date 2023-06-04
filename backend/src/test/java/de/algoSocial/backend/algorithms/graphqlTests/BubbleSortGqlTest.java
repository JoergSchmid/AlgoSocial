package de.algoSocial.backend.algorithms.graphqlTests;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.AutoConfigureGraphQl;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.GraphQlTester;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
@AutoConfigureGraphQl
@AutoConfigureGraphQlTester
public class BubbleSortGqlTest {
    @Autowired
    private GraphQlTester graphQlTester;

    @Test
    void input_standard() {
        List<Integer> input = Arrays.asList(5,2,3,1,4);
        List<Integer> expected = Arrays.asList(1,2,3,4,5);

        List<Integer> result = graphQlTester.documentName("bubbleSort")
                .variable("numbers", input)
                .execute()
                .path("bubbleSort")
                .entityList(Integer.class)
                .get();

        Assertions.assertEquals(expected, result);
    }

    @Test
    void input_multipleOfSameNumber() {
        List<Integer> input = Arrays.asList(0,3,0,3,3,0);
        List<Integer> expected = Arrays.asList(0,0,0,3,3,3);
        List<Integer> result = graphQlTester.documentName("bubbleSort")
                .variable("numbers", input)
                .execute()
                .path("bubbleSort")
                .entityList(Integer.class)
                .get();

        Assertions.assertEquals(expected, result);
    }

    @Test
    void input_alreadySorted() {
        List<Integer> input = Arrays.asList(-1,0,1,2,3,4,5);
        List<Integer> expected = Arrays.asList(-1,0,1,2,3,4,5);
        List<Integer> result = graphQlTester.documentName("bubbleSort")
                .variable("numbers", input)
                .execute()
                .path("bubbleSort")
                .entityList(Integer.class)
                .get();

        Assertions.assertEquals(expected, result);
    }

    @Test
    void input_singleNumber() {
        List<Integer> input = List.of(1);
        List<Integer> expected = List.of(1);
        List<Integer> result = graphQlTester.documentName("bubbleSort")
                .variable("numbers", input)
                .execute()
                .path("bubbleSort")
                .entityList(Integer.class)
                .get();

        Assertions.assertEquals(expected, result);
    }

    @Test
    void input_emptyList() {
        List<Integer> input = List.of();
        List<Integer> expected = List.of();
        List<Integer> result = graphQlTester.documentName("bubbleSort")
                .variable("numbers", input)
                .execute()
                .path("bubbleSort")
                .entityList(Integer.class)
                .get();

        Assertions.assertEquals(expected, result);
    }
}
