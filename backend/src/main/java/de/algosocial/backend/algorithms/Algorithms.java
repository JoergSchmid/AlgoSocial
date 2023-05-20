package de.algosocial.backend.algorithms;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Controller
public class Algorithms {
    @MutationMapping
    public boolean isPrime(@Argument int number) {
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

    @MutationMapping
    public static List<Integer> bubbleSort(@Argument List<Integer> numbers) {
        for(int i = numbers.size(); i > 1; i--) {
            for(int n = 0; n < i-1; n++) {
                if(numbers.get(n) > numbers.get(n + 1)) {
                    Collections.swap(numbers, n, n+1);
                }
            }
        }
        return numbers;
    }

    @MutationMapping
    public List<Integer> quickSort(@Argument List<Integer> numbers) {
        if (numbers.size() <= 1) {
            return numbers;
        }

        int pivot = numbers.get(0);
        List<Integer> less = new ArrayList<>();
        List<Integer> equal = new ArrayList<>();
        List<Integer> greater = new ArrayList<>();

        for (int num : numbers) {
            if (num < pivot) {
                less.add(num);
            } else if (num == pivot) {
                equal.add(num);
            } else {
                greater.add(num);
            }
        }

        List<Integer> sorted = new ArrayList<>();
        sorted.addAll(quickSort(less));
        sorted.addAll(equal);
        sorted.addAll(quickSort(greater));

        return sorted;
    }
}
