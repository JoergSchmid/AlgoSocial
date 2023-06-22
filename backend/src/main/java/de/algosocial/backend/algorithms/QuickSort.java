package de.algosocial.backend.algorithms;

import java.util.ArrayList;
import java.util.List;

public class QuickSort extends AlgorithmSuperClass {
    @Override
    public String getResult(List<String> input) {
        return quickSort(stringToIntegerList(input.get(0))).toString();
    }

    public static List<Integer> quickSort(List<Integer> numbers) {
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
