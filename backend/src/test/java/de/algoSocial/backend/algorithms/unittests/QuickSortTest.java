package de.algoSocial.backend.algorithms.unittests;
import de.algosocial.backend.AlgorithmController;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;

public class QuickSortTest {

    @Test
    void input_standard() {
        List<Integer> input = Arrays.asList(5,2,3,1,4);
        List<Integer> expected = Arrays.asList(1,2,3,4,5);
        List<Integer> result = AlgorithmController.quickSort(input);

        Assertions.assertEquals(expected, result);


        input = Arrays.asList(-1,2,3,-3,0,-7,4);
        expected = Arrays.asList(-7,-3,-1,0,2,3,4);
        result = AlgorithmController.quickSort(input);

        Assertions.assertEquals(expected, result);
    }

    @Test
    void input_multipleOfSameNumber() {
        List<Integer> input = Arrays.asList(0,3,0,3,3,0);
        List<Integer> expected = Arrays.asList(0,0,0,3,3,3);
        List<Integer> result = AlgorithmController.quickSort(input);

        Assertions.assertEquals(expected, result);
    }

    @Test
    void input_alreadySorted() {
        List<Integer> input = Arrays.asList(-1,0,1,2,3,4,5);
        List<Integer> expected = Arrays.asList(-1,0,1,2,3,4,5);
        List<Integer> result = AlgorithmController.quickSort(input);

        Assertions.assertEquals(expected, result);
    }

    @Test
    void input_singleNumber() {
        List<Integer> input = List.of(1);
        List<Integer> expected = List.of(1);
        List<Integer> result = AlgorithmController.quickSort(input);

        Assertions.assertEquals(expected, result);
    }

    @Test
    void input_emptyList() {
        List<Integer> input = List.of();
        List<Integer> expected = List.of();
        List<Integer> result = AlgorithmController.quickSort(input);

        Assertions.assertEquals(expected, result);
    }
}
