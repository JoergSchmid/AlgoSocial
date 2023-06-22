package de.algosocial.backend.algorithms;

import java.util.ArrayList;
import java.util.List;

public abstract class AlgorithmSuperClass {
    abstract String getResult(List<String> input);

    List<Integer> stringToIntegerList(String string) {
        List<Integer> list = new ArrayList<>();
        String[] strings = string.split(",");
        for (String str : strings)
            list.add(Integer.parseInt(str));
        return list;
    }
}
