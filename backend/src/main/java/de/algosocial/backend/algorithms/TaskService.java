package de.algosocial.backend.algorithms;

import de.algosocial.backend.Task;
import de.algosocial.backend.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

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
        if (Objects.equals(task.getAlgorithm(), "bubblesort")) {
            task.setResult(Algorithms.bubbleSort(task.getInput()).toString());
        } else if (Objects.equals(task.getAlgorithm(), "quicksort")) {
            task.setResult(Algorithms.quickSort(task.getInput()).toString());
        } else if (Objects.equals(task.getAlgorithm(), "isprime")) {
            boolean result = Algorithms.isPrime(task.getInput().get(0));
            task.setResult(result ? "prime" : "not prime");
        } else {
            task.setStatus("error: method not found.");
            taskRepository.save(task);
            return;
        }
        task.setStatus("done");
        taskRepository.save(task);
    }
}
