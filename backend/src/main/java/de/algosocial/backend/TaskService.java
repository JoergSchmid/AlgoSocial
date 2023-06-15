package de.algosocial.backend;

import de.algosocial.backend.algorithms.AlgorithmCalculations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Async
    public void startTask(Task task) throws InterruptedException {
        List<String> input = task.getInput();
        String result;

        if (Objects.equals(task.getAlgorithm(), "bubblesort")) {
            result = AlgorithmCalculations.bubbleSort(stringToIntList(input.get(0))).toString();
        } else if (Objects.equals(task.getAlgorithm(), "quicksort")) {
            result = AlgorithmCalculations.quickSort(stringToIntList(input.get(0))).toString();
        } else if (Objects.equals(task.getAlgorithm(), "isprime")) {
            result = AlgorithmCalculations.isPrime(Integer.parseInt(input.get(0))) ? "prime" : "not prime";
        } else if (Objects.equals(task.getAlgorithm(), "binarySearchTree")) {
            result = AlgorithmCalculations.binarySearchTree(stringToIntList(input.get(0))).toString();
        } else if (Objects.equals(task.getAlgorithm(), "binarySearchTreeFindNumber")) {
            result = String.valueOf(AlgorithmCalculations.binarySearchTreeFindNumber(stringToIntList(input.get(0)), Integer.parseInt(input.get(1))));
        } else if (Objects.equals(task.getAlgorithm(), "dijkstra")) {
            result = AlgorithmCalculations.dijkstra(input.get(0), input.get(1));
        } else {
            task.setError("Error: Requested algorithm not found.");
            taskRepository.save(task);
            return;
        }
        task.setStatus(Task.Status.DONE);
        task.setResult(result);
        taskRepository.save(task);
    }

    private List<Integer> stringToIntList(String string) {
        List<Integer> list = new ArrayList<>();
        String[] strings = string.split(",");
        for (String str : strings)
            list.add(Integer.parseInt(str));
        return list;
    }
}
