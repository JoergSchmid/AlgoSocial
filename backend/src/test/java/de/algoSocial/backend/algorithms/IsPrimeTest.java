package de.algoSocial.backend.algorithms;

import de.algosocial.backend.algorithms.AlgorithmCalculations;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class IsPrimeTest {

    @Test
    void testIsPrime_standard() {
        int[] inputPrime = {2, 3, 5, 7, 11, 13, 17, 19};
        int[] inputNotPrime = {-5, 0, 1, 4, 6, 9, 10, 15};

        for (int i : inputPrime)
            Assertions.assertTrue(AlgorithmCalculations.isPrime(i));

        for (int i : inputNotPrime)
            Assertions.assertFalse(AlgorithmCalculations.isPrime(i));
    }
}
