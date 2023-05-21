package de.algosocial.backend;

import de.algosocial.backend.algorithms.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import java.util.List;

@Controller
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @QueryMapping
    public Task taskById(@Argument int id) {
        return taskRepository.findById(id);
    }

    @QueryMapping
    public List<Task> allTasks() {
        return (List<Task>) taskRepository.findAll();
    }

    @MutationMapping
    public Task addTask(@Argument String algorithm, @Argument List<Integer> input) throws InterruptedException {
        Task task = new Task(algorithm, input);
        taskRepository.save(task);
        taskService.startTask(task);
        return task;
    }

    @MutationMapping
    public int removeTask(@Argument int id) {
        taskRepository.delete(taskRepository.findById(id));
        return id;
    }

}
