package de.algoSocial.backend.algorithms.unittests;

import de.algosocial.backend.AlgorithmController;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class IsPrimeTest {

    @Test
    void input_standard() {
        int[] inputPrime = {2, 3, 5, 7, 11, 13, 17, 19};
        int[] inputNotPrime = {-5, 0, 1, 4, 6, 9, 10, 15};

        for (int i : inputPrime)
            Assertions.assertTrue(AlgorithmController.isPrime(i));

        for (int i : inputNotPrime)
            Assertions.assertFalse(AlgorithmController.isPrime(i));
    }
}
