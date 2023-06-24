package de.algosocial.backend.algorithms;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;

public class AlgorithmFactory {

    // Add new algorithms here
    public static Map<String, Class<? extends AlgorithmSuperClass>> algorithmMapping = Map.of(
            IsPrime.properties.name(), IsPrime.class,
            BubbleSort.properties.name(), BubbleSort.class,
            QuickSort.properties.name(), QuickSort.class,
            BinarySearchTree.properties.name(), BinarySearchTree.class,
            Dijkstra.properties.name(), Dijkstra.class
    );

    public static AlgorithmSuperClass getClass(String name) {
        try {
            return algorithmMapping.get(name.toLowerCase()).getDeclaredConstructor().newInstance();
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

    public static List<AlgorithmProperties> getAllProperties() {
        return algorithmMapping.values().stream().map((alg) -> {
            try {
                return alg.getDeclaredConstructor().newInstance().getProperties();
            } catch (InstantiationException | IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
                throw new RuntimeException(e);
            }
        }).toList();
    }
}
