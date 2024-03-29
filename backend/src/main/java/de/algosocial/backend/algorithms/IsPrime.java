package de.algosocial.backend.algorithms;

import java.util.List;

public class IsPrime extends Algorithm {
    public static AlgorithmProperties properties = new AlgorithmProperties(
            "isprime",
            "Check Prime",
            1,
            List.of("127"));

    @Override
    public AlgorithmProperties getProperties() {
        return properties;
    }

    @Override
    public String calculate(List<String> input) {
        return isPrime(Integer.parseInt(input.get(0))) ? "prime" : "not prime";
    }

    public static boolean isPrime(int number) {
        if(number == 2 || number == 3)
            return true;
        if(number < 2 || number % 2 == 0)
            return false;


        int sqrt = (int) Math.sqrt(number) + 1; // Only need to test up to the sqrt of the number

        for(int i = 3; i <= sqrt; i += 2)
            if(number % i == 0)
                return false;

        return true;
    }


}
