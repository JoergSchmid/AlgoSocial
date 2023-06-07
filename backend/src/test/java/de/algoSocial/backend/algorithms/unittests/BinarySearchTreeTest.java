package de.algoSocial.backend.algorithms.unittests;
import de.algosocial.backend.algorithms.BinarySearchTree;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;

public class BinarySearchTreeTest {

    @Test
    void createSearchTree() {
        List<Integer> input = Arrays.asList(6,5,2,9,1,4,0,8,3,7);
        List<Integer> expected = Arrays.asList(0,1,2,3,4,5,6,7,8,9);

        BinarySearchTree binarySearchTree = new BinarySearchTree();

        for (int i : input)
            binarySearchTree.insert(i);

        List<Integer> result = binarySearchTree.getAll();

        Assertions.assertEquals(expected, result);
    }

    @Test
    void noDuplicateEntriesInTree() {
        // If the same number gets inserted multiple times, we expect only one number remaining in the tree.
        List<Integer> input = Arrays.asList(2,4,3,3,1,5,3);
        List<Integer> expected = Arrays.asList(1,2,3,4,5);

        BinarySearchTree binarySearchTree = new BinarySearchTree();
        for (int i : input)
            binarySearchTree.insert(i);

        List<Integer> result = binarySearchTree.getAll();

        Assertions.assertEquals(expected, result);
    }

    @Test
    void findMaximum() {
        List<Integer> input = Arrays.asList(1,-3,2,-1,-2,3,0);
        int expected_maximum = 3;

        BinarySearchTree binarySearchTree = new BinarySearchTree();
        for (int i : input)
            binarySearchTree.insert(i);

        int result = binarySearchTree.getMax();

        Assertions.assertEquals(expected_maximum, result);
    }

    @Test
    void findMinimum() {
        List<Integer> input = Arrays.asList(5,1,3,2,4);
        int expected_minimum = 1;

        BinarySearchTree binarySearchTree = new BinarySearchTree();
        for (int i : input)
            binarySearchTree.insert(i);

        int result = binarySearchTree.getMin();

        Assertions.assertEquals(expected_minimum, result);
    }
}