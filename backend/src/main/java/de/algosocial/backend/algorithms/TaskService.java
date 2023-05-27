package de.algosocial.backend.algorithms;

import de.algosocial.backend.Post;
import de.algosocial.backend.PostRepository;
import de.algosocial.backend.Task;
import de.algosocial.backend.TaskRepository;
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
            result = Algorithms.bubbleSort(input).toString();
        } else if (Objects.equals(task.getAlgorithm(), "quicksort")) {
            result = Algorithms.quickSort(input).toString();
        } else if (Objects.equals(task.getAlgorithm(), "isprime")) {
            result = Algorithms.isPrime(input.get(0)) ? "prime" : "not prime";
        } else {
            task.setStatus("error: method not found.");
            taskRepository.save(task);
            return;
        }
        task.setStatus("done");
        task.setResult(result);
        taskRepository.save(task);
    }
}
