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
                1
        ));
        algorithmRepository.save(new Algorithm(
                "quicksort",
                "Quick Sort",
                1
        ));
        algorithmRepository.save(new Algorithm(
                "isprime",
                "Check Prime",
                1
        ));
        algorithmRepository.save(new Algorithm(
                "binarySearchTree",
                "Binary Search Tree - Sort",
                1
        ));
        algorithmRepository.save(new Algorithm(
                "binarySearchTreeFindNumber",
                "Binary Search Tree - Find number",
                2
        ));
        algorithmRepository.save(new Algorithm(
                "dijkstra",
                "Dijkstra",
                2
        ));
    }

    @QueryMapping
    public List<Algorithm> allAlgorithms() {
        if (algorithmRepository.count() == 0)
            addAlgorithmsToRepository();
        return (List<Algorithm>) algorithmRepository.findAll();
    }
}
