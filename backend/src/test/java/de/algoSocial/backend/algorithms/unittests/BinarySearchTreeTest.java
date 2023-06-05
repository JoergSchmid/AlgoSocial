package de.algoSocial.backend.algorithms.unittests;
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
}
