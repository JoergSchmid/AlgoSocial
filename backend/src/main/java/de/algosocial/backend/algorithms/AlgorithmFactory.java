package de.algosocial.backend.algorithms;

import java.util.List;

public class AlgorithmFactory {

    // ToDo: return Superclass object, not just result
    public String getResult(String name, List<String> input) {
        String alg = name.toLowerCase();
        return switch (alg) {
            case "isprime" -> new IsPrime().getResult(input);
            case "bubblesort" -> new BubbleSort().getResult(input);
            case "quicksort" -> new QuickSort().getResult(input);
            case "binarysearchtree", "bst" -> new BinarySearchTree().getResult(input);
            case "dijkstra" -> new Dijkstra().getResult(input);
            default -> null;
        };
    }
}
