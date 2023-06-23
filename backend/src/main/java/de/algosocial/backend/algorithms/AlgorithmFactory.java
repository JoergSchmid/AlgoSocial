package de.algosocial.backend.algorithms;

public class AlgorithmFactory {

    public static AlgorithmSuperClass getClass(String name) {
        String alg = name.toLowerCase();
        return switch (alg) {
            case "isprime" -> new IsPrime();
            case "bubblesort" -> new BubbleSort();
            case "quicksort" -> new QuickSort();
            case "binarysearchtree", "bst" -> new BinarySearchTree();
            case "dijkstra" -> new Dijkstra();
            default -> null;
        };
    }
}
