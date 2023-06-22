package de.algosocial.backend.algorithms;

import java.util.Collections;
import java.util.List;

public class BubbleSort extends AlgorithmSuperClass {
    @Override
    public String getResult(List<String> input) {
        return bubbleSort(stringToIntegerList(input.get(0))).toString();
    }

    public static List<Integer> bubbleSort(List<Integer> numbers) {
        for(int i = numbers.size(); i > 1; i--) {
            for(int n = 0; n < i-1; n++) {
                if(numbers.get(n) > numbers.get(n + 1)) {
                    Collections.swap(numbers, n, n+1);
                }
            }
        }
        return numbers;
    }
}
