package de.algosocial.backend;

import de.algosocial.backend.algorithms.AlgorithmCalculations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Async
    public void startTask(Task task) throws InterruptedException {
        List<Integer> input = task.getInput();
        String result;
        if (Objects.equals(task.getAlgorithm(), "bubblesort")) {
            result = AlgorithmCalculations.bubbleSort(input).toString();
        } else if (Objects.equals(task.getAlgorithm(), "quicksort")) {
            result = AlgorithmCalculations.quickSort(input).toString();
        } else if (Objects.equals(task.getAlgorithm(), "isprime")) {
            result = AlgorithmCalculations.isPrime(input.get(0)) ? "prime" : "not prime";
        } else {
            task.setStatus(Task.Status.ERROR);
            taskRepository.save(task);
            return;
        }
        task.setStatus(Task.Status.DONE);
        task.setResult(result);
        taskRepository.save(task);
    }
}
