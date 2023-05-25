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
    private final PostRepository postRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, PostRepository postRepository) {
        this.taskRepository = taskRepository;
        this.postRepository = postRepository;
    }

    @Async
    public void startTask(Task task) throws InterruptedException {
        String input = task.getInput().toString();
        String result;
        if (Objects.equals(task.getAlgorithm(), "bubblesort")) {
            result = Algorithms.bubbleSort(task.getInput()).toString();
        } else if (Objects.equals(task.getAlgorithm(), "quicksort")) {
            result = Algorithms.quickSort(task.getInput()).toString();
        } else if (Objects.equals(task.getAlgorithm(), "isprime")) {
            result = Algorithms.isPrime(task.getInput().get(0)) ? "prime" : "not prime";
        } else {
            task.setStatus("error: method not found.");
            taskRepository.save(task);
            return;
        }
        task.setStatus("done");
        task.setResult(result);
        taskRepository.save(task);

        String postMessage = input + "<br>" + result;
        Post post = postRepository.findByTaskId(task.getId());
        post.setMessage(postMessage);
        postRepository.save(post);
    }
}
