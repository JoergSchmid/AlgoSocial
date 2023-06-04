package de.algoSocial.backend;

import de.algosocial.backend.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.AutoConfigureGraphQl;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.test.context.ActiveProfiles;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
@AutoConfigureGraphQl
@AutoConfigureGraphQlTester
// This test needs to be executed in order, as it simulates a complete workflow.
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ActiveProfiles("test")
class TaskTest {
    @Autowired
    private GraphQlTester graphQlTester;
    @Autowired
    private PostController postController;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private TaskService taskService;

    private final List<Integer> testInputIsPrime = List.of(7);
    private final List<Integer> testInputList = Arrays.asList(1,3,-2,-1,2,0);

    private final Task testTask_BubbleSort = new Task("bubblesort", testInputList);
    private final Task testTask_IsPrime = new Task("isprime", testInputIsPrime);

    @Test
    @Order(1)
    void postControllerGetsLoaded() {
        Assertions.assertNotNull(postController);
        Assertions.assertNotNull(postRepository);
        Assertions.assertNotNull(taskService);
    }

    @Test
    @Order(2)
    void allPosts_zeroEntries() {
        this.graphQlTester.documentName("allPosts")
                .execute()
                .path("allPosts[*].title")
                .entityList(String.class)
                .hasSize(0);
    }

    @Test
    @Order(3)
    void addAlgorithmPost() {
        graphQlTester.documentName("addAlgorithmPost")
                .variable("userId", 0)
                .variable("title", testTask_BubbleSort.getAlgorithm())
                .variable("algorithm", testTask_BubbleSort.getAlgorithm())
                .variable("input", testTask_BubbleSort.getInput())
                .execute();
        graphQlTester.documentName("addAlgorithmPost")
                .variable("userId", 0)
                .variable("title", testTask_IsPrime.getAlgorithm())
                .variable("algorithm", testTask_IsPrime.getAlgorithm())
                .variable("input", testTask_IsPrime.getInput())
                .execute();
    }

    @Test
    @Order(4)
    void taskById() {
        Task resultTask_bubbleSort =
                graphQlTester.documentName("taskById")
                        .variable("id", 1)
                        .execute()
                        .path("taskById")
                        .entity(Task.class)
                        .get();
        Task resultTask_isPrime =
                graphQlTester.documentName("taskById")
                        .variable("id", 2)
                        .execute()
                        .path("taskById")
                        .entity(Task.class)
                        .get();

        Assertions.assertEquals(resultTask_bubbleSort.getUserId(), testTask_BubbleSort.getUserId());
        Assertions.assertEquals(resultTask_bubbleSort.getAlgorithm(), testTask_BubbleSort.getAlgorithm());

        Assertions.assertEquals(resultTask_isPrime.getUserId(), testTask_IsPrime.getUserId());
        Assertions.assertEquals(resultTask_isPrime.getAlgorithm(), testTask_IsPrime.getAlgorithm());
    }

    @Test
    @Order(5)
    void allTasks_twoEntries() {
        graphQlTester.documentName("allTasks")
                .execute()
                .path("allTasks[*].id")
                .entityList(Integer.class)
                .hasSize(2);
    }

    @Test
    @Order(6)
    void removeTask() {
        graphQlTester.documentName("removeTask")
                .variable("id", 1)
                .execute();
    }

    @Test
    @Order(7)
    void allTasks_oneEntryLeft() {
        graphQlTester.documentName("allTasks")
                .execute()
                .path("allTasks[*].id")
                .entityList(Integer.class)
                .hasSize(1);
    }

    @Test
    @Order(8)
    void removeAllTasks() {
        graphQlTester.documentName("removeAllTasks")
                .execute();
    }

    @Test
    @Order(9)
    void allPosts_checkIfEntriesGotRemoved() {
        graphQlTester.documentName("allTasks")
                .execute()
                .path("allTasks[*].id")
                .entityList(Integer.class)
                .hasSize(0);
    }

}
