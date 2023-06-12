package de.algosocial.backend.algorithms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class AlgorithmController {
    @Autowired
    private AlgorithmRepository algorithmRepository;

    private void addAlgorithmsToRepository() {
        algorithmRepository.save(new Algorithm(
                "bubblesort",
                "Bubble Sort",
                Algorithm.InputType.NUMBER_ARRAY
        ));
        algorithmRepository.save(new Algorithm(
                "quicksort",
                "Quick Sort",
                Algorithm.InputType.NUMBER_ARRAY
        ));
        algorithmRepository.save(new Algorithm(
                "isprime",
                "Check Prime",
                Algorithm.InputType.SINGLE_NUMBER
        ));
        algorithmRepository.save(new Algorithm(
                "binarySearchTree",
                "Binary Search Tree - Sort",
                Algorithm.InputType.NUMBER_ARRAY
        ));
        algorithmRepository.save(new Algorithm(
                "binarySearchTreeFindNumber",
                "Binary Search Tree - Find number",
                Algorithm.InputType.TWO_STRINGS
        ));
        algorithmRepository.save(new Algorithm(
                "dijkstra",
                "Dijkstra",
                Algorithm.InputType.TWO_STRINGS
        ));
    }

    @QueryMapping
    public List<Algorithm> allAlgorithms() {
        if (algorithmRepository.count() == 0)
            addAlgorithmsToRepository();
        return (List<Algorithm>) algorithmRepository.findAll();
    }
}
