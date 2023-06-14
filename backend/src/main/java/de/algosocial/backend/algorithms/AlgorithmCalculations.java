package de.algosocial.backend.algorithms;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Controller
public class AlgorithmCalculations {
    @MutationMapping
    public static boolean isPrime(@Argument int number) {
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
    public static List<Integer> quickSort(@Argument List<Integer> numbers) {
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

    @MutationMapping
    public static List<Integer> binarySearchTree(@Argument List<Integer> numbers) {
        BinarySearchTree bst = new BinarySearchTree();
        for (int i : numbers)
            bst.insert(i);
        return bst.getAll();
    }

    @MutationMapping
    public static boolean binarySearchTreeFindNumber(
            @Argument List<Integer> numbers, @Argument int findNumber) {
        BinarySearchTree bst = new BinarySearchTree();
        for (int i : numbers)
            bst.insert(i);
        return bst.findNumber(findNumber);
    }

    @MutationMapping
    public static String dijkstra(@Argument String nodes, @Argument String edges) {

        List<DijkstraNode> nodeList = new ArrayList<DijkstraNode>();

        String[] names = nodes.split(",");
        for (String name : names)
            nodeList.add(new DijkstraNode(name));

        // Edges is in format "(a,b,1),(b,c,2), ..."
        String paths = edges.substring(1, edges.length() - 1); // Leading parentheses not needed.
        String[] connectionGroups = paths.split("\\),\\(");

        // Each group is now like "a,b,2"
        for (String group : connectionGroups) {
            String[] elements = group.split(",");

            // Create the edges (=connecting the nodes)
            dijkstra_getNodeWithName(nodeList, names, elements[0])
                    .connectWith(dijkstra_getNodeWithName(nodeList, names, elements[1]),
                            Integer.parseInt(elements[2]));
        }

        // Start calculating
        Dijkstra.calculate(nodeList);

        // Get last node, which we want to get the path to
        DijkstraNode node = dijkstra_getNodeWithName(nodeList, names, names[names.length-1]);

        // Return the path and the distance from first to last node
        return node.getPath() + "," + node.getDistanceToInitialNode().toString();
    }

    private static DijkstraNode dijkstra_getNodeWithName(
            List<DijkstraNode> nodes, String[] names, String name) {
        int index = -1;
        for (int i = 0; i < names.length; i++) {
            if (names[i].equals(name)) {
                index = i;
                break;
            }
        }
        return nodes.get(index);
    }
}
