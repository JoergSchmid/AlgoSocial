package de.algoSocial.backend.algorithms.unittests;
import de.algosocial.backend.algorithms.BinarySearchTree;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;

public class BinarySearchTreeTest {

    @Test
    void simpleTreeCheckFormat() {
        List<Integer> input = Arrays.asList(2,1,3);
        String expected = "((,1,),2,(,3,))";

        BinarySearchTree binarySearchTree = new BinarySearchTree();

        for (int i : input)
            binarySearchTree.insert(i);

        String result = binarySearchTree.toString();

        Assertions.assertEquals(expected, result);
    }

    @Test
    void presortedSearchTreeCheckFormat() {
        List<Integer> input = Arrays.asList(4,3,2,1);
        String expected = "((((,1,),2,),3,),4,)";

        BinarySearchTree binarySearchTree = new BinarySearchTree();

        for (int i : input)
            binarySearchTree.insert(i);

        String result = binarySearchTree.toString();

        Assertions.assertEquals(expected, result);
    }

    @Test
    void biggerTreeCheckFormat() {
        List<Integer> input = Arrays.asList(6,5,2,9,1,4,0,8,3,7);
        String expected = "(((((,0,),1,),2,((,3,),4,)),5,),6,(((,7,),8,),9,))";

        BinarySearchTree binarySearchTree = new BinarySearchTree();

        for (int i : input)
            binarySearchTree.insert(i);

        String result = binarySearchTree.toString();

        Assertions.assertEquals(expected, result);
    }

    @Test
    void noDuplicateEntriesInTree() {
        // If the same number gets inserted multiple times, we expect only one number remaining in the tree.
        List<Integer> input = Arrays.asList(2,1,3,1);
        String expected = "((,1,),2,(,3,))";

        BinarySearchTree binarySearchTree = new BinarySearchTree();
        for (int i : input)
            binarySearchTree.insert(i);

        String result = binarySearchTree.toString();

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

    @Test
    void findNumber() {
        List<Integer> input = Arrays.asList(5,7,1,3,9,8,0,2,4);

        BinarySearchTree binarySearchTree = new BinarySearchTree();
        for (int i : input)
            binarySearchTree.insert(i);

        int result = binarySearchTree.getMin();

        Assertions.assertTrue(binarySearchTree.findNumber(7));
        Assertions.assertFalse(binarySearchTree.findNumber(12));
    }
}
