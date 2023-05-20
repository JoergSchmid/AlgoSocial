package de.algosocial.backend;

import de.algosocial.backend.algorithms.Algorithms;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;
import java.util.List;
import java.util.Objects;

@Controller
public class TaskController {
    @Autowired
    TaskRepository taskRepository;

    @QueryMapping
    public Task taskById(@Argument int id) {
        return taskRepository.findById(id);
    }

    @QueryMapping
    public List<Task> allTasks() {
        return (List<Task>) taskRepository.findAll();
    }

    @MutationMapping
    public Task addTask(@Argument String algorithm, @Argument List<Integer> input) {
        Task task = new Task(algorithm, input);
        taskRepository.save(task);
        startTask(task);
        return task;
    }

    @MutationMapping
    public int removeTask(@Argument int id) {
        taskRepository.delete(taskRepository.findById(id));
        return id;
    }

    @Async
    public void startTask(Task task) {
        if (Objects.equals(task.getAlgorithm(), "bubblesort")) {
            task.setResult(Algorithms.bubbleSort(task.getInput()));
            task.setStatus("Done");
            taskRepository.save(task);
        }
    }
}
