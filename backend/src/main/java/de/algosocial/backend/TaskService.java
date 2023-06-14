package de.algosocial.backend;

import de.algosocial.backend.algorithms.AlgorithmCalculations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Async
    public void startTask(Task task) throws InterruptedException {
        List<Integer> numberInput = task.getNumberInput();
        List<String> stringInput = task.getStringInput();
        String result;

        if (Objects.equals(task.getAlgorithm(), "bubblesort")) {
            result = AlgorithmCalculations.bubbleSort(numberInput).toString();
        } else if (Objects.equals(task.getAlgorithm(), "quicksort")) {
            result = AlgorithmCalculations.quickSort(numberInput).toString();
        } else if (Objects.equals(task.getAlgorithm(), "isprime")) {
            result = AlgorithmCalculations.isPrime(numberInput.get(0)) ? "prime" : "not prime";
        } else if (Objects.equals(task.getAlgorithm(), "binarySearchTree")) {
            result = AlgorithmCalculations.binarySearchTree(numberInput).toString();
        } else if (Objects.equals(task.getAlgorithm(), "binarySearchTreeFindNumber")) {
            result = String.valueOf(AlgorithmCalculations.binarySearchTreeFindNumber(numberInput, Integer.parseInt(stringInput.get(0))));
        } else if (Objects.equals(task.getAlgorithm(), "dijkstra")) {
            result = AlgorithmCalculations.dijkstra(stringInput.get(0), stringInput.get(1));
        } else {
            task.setError("Error: Requested algorithm not found.");
            taskRepository.save(task);
            return;
        }
        task.setStatus(Task.Status.DONE);
        task.setResult(result);
        taskRepository.save(task);
    }
}
