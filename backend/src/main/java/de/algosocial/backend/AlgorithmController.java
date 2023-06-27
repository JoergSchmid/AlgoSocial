package de.algosocial.backend;

import de.algosocial.backend.algorithms.*;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import java.util.List;

@Controller
public class AlgorithmController {

    @QueryMapping
    public List<AlgorithmProperties> allAlgorithms() {
        return AlgorithmFactory.getAllProperties();
    }

    @MutationMapping
    public static boolean isPrime(@Argument int number) {
        return IsPrime.isPrime(number);
    }

    @MutationMapping
    public static List<Integer> bubbleSort(@Argument List<Integer> numbers) {
        return BubbleSort.bubbleSort(numbers);
    }

    @MutationMapping
    public static List<Integer> quickSort(@Argument List<Integer> numbers) {
        return QuickSort.quickSort(numbers);
    }

    @MutationMapping
    public static String binarySearchTree(@Argument List<Integer> numbers) {
        return BinarySearchTree.binarySearchTree(numbers);
    }

    @MutationMapping
    public static boolean binarySearchTreeFindNumber(
            @Argument List<Integer> numbers, @Argument int findNumber) {
        return BinarySearchTree.binarySearchTreeFindNumber(numbers, findNumber);
    }

    @MutationMapping
    public static String dijkstra(@Argument String nodes, @Argument String edges) {
        return Dijkstra.dijkstra(nodes, edges);
    }
}
