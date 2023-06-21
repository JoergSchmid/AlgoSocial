package de.algosocial.backend;

import de.algosocial.backend.algorithms.AlgorithmController;
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
    @Autowired
    private  ErrorLogRepository errorLogRepository;

    @Async
    public void startTask(Task task) throws InterruptedException {
        List<String> input = task.getInput();
        String result;

        try {
            if (Objects.equals(task.getAlgorithm(), "bubblesort")) {
                result = AlgorithmController.bubbleSort(stringToIntList(input.get(0))).toString();
            } else if (Objects.equals(task.getAlgorithm(), "quicksort")) {
                result = AlgorithmController.quickSort(stringToIntList(input.get(0))).toString();
            } else if (Objects.equals(task.getAlgorithm(), "isprime")) {
                result = AlgorithmController.isPrime(Integer.parseInt(input.get(0))) ? "prime" : "not prime";
            } else if (Objects.equals(task.getAlgorithm(), "binarySearchTree")) {
                result = AlgorithmController.binarySearchTree(stringToIntList(input.get(0))).toString();
            } else if (Objects.equals(task.getAlgorithm(), "binarySearchTreeFindNumber")) {
                result = String.valueOf(AlgorithmController.binarySearchTreeFindNumber(stringToIntList(input.get(0)), Integer.parseInt(input.get(1))));
            } else if (Objects.equals(task.getAlgorithm(), "dijkstra")) {
                result = AlgorithmController.dijkstra(input.get(0), input.get(1));
            } else {
                task.setError("Error: Requested algorithm not found.");
                taskRepository.save(task);
                return;
            }
            task.setStatus(Task.Status.DONE);
            task.setResult(result);
            taskRepository.save(task);
        } catch (Exception e) {
            task.setError("Error: Invalid input");
            taskRepository.save(task);
            errorLogRepository.save(new ErrorLog(task.getUserId(), task.getId(), task.getInput(), task.getError()));
        }

    }

    private List<Integer> stringToIntList(String string) {
        List<Integer> list = new ArrayList<>();
        String[] strings = string.split(",");
        for (String str : strings)
            list.add(Integer.parseInt(str));
        return list;
    }
}
