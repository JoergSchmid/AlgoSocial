package de.algoSocial.backend.algorithms;
import de.algosocial.backend.algorithms.AlgorithmCalculations;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class BubbleSortTest {

    @Test
    void testBubbleSort_standard() {
        List<Integer> input = Arrays.asList(5,2,3,1,4);
        List<Integer> expected = Arrays.asList(1,2,3,4,5);
        List<Integer> result = AlgorithmCalculations.bubbleSort(input);

        Assertions.assertEquals(expected, result);


        input = Arrays.asList(-1,2,3,-3,0,-7,4);
        expected = Arrays.asList(-7,-3,-1,0,2,3,4);
        result = AlgorithmCalculations.bubbleSort(input);

        Assertions.assertEquals(expected, result);
    }

    @Test
    void testBubbleSort_multipleOfSameNumber() {
        List<Integer> input = Arrays.asList(0,3,0,3,3,0);
        List<Integer> expected = Arrays.asList(0,0,0,3,3,3);
        List<Integer> result = AlgorithmCalculations.bubbleSort(input);

        Assertions.assertEquals(expected, result);
    }

    @Test
    void testBubbleSort_sortedInput() {
        List<Integer> input = Arrays.asList(-1,0,1,2,3,4,5);
        List<Integer> expected = Arrays.asList(-1,0,1,2,3,4,5);
        List<Integer> result = AlgorithmCalculations.bubbleSort(input);

        Assertions.assertEquals(expected, result);
    }

    @Test
    void testBubbleSort_singleNumberInput() {
        List<Integer> input = List.of(1);
        List<Integer> expected = List.of(1);
        List<Integer> result = AlgorithmCalculations.bubbleSort(input);

        Assertions.assertEquals(expected, result);
    }

    @Test
    void testBubbleSort_emptyListInput() {
        List<Integer> input = List.of();
        List<Integer> expected = List.of();
        List<Integer> result = AlgorithmCalculations.bubbleSort(input);

        Assertions.assertEquals(expected, result);
    }
}
