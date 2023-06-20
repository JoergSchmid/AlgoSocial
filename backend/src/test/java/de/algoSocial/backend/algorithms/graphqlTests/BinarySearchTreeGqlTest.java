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
public class BinarySearchTreeGqlTest {
    @Autowired
    private GraphQlTester graphQlTester;

    @Test
    void input_standard() {
        List<Integer> input = Arrays.asList(6,5,2,9,1,4,0,8,3,7);
        String expected = "(((((,0,),1,),2,((,3,),4,)),5,),6,(((,7,),8,),9,))";

        String result = graphQlTester.documentName("binarySearchTree")
                .variable("numbers", input)
                .execute()
                .path("binarySearchTree")
                .entity(String.class)
                .get();

        Assertions.assertEquals(expected, result);
    }

    @Test
    void findNumber() {
        List<Integer> input = Arrays.asList(6,5,2,9,1,4,0,3,7);

        boolean result = graphQlTester.documentName("binarySearchTreeFindNumber")
                .variable("numbers", input)
                .variable("findNumber", 4)
                .execute()
                .path("binarySearchTreeFindNumber")
                .entity(Boolean.class)
                .get();

        Assertions.assertTrue(result);

        result = graphQlTester.documentName("binarySearchTreeFindNumber")
                .variable("numbers", input)
                .variable("findNumber", 8)
                .execute()
                .path("binarySearchTreeFindNumber")
                .entity(Boolean.class)
                .get();

        Assertions.assertFalse(result);
    }
}
