package de.algosocial.backend;

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
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private TaskService taskService;

    @QueryMapping
    public Task taskById(@Argument int id) {
        return taskRepository.findById(id);
    }

    @QueryMapping
    public List<Task> allTasks() {
        return (List<Task>) taskRepository.findAll();
    }

    @MutationMapping
    public Task addTask(@Argument String algorithm, @Argument List<Integer> numberListInput, @Argument List<String> stringListInput) throws InterruptedException {
        Task task = new Task(algorithm, numberListInput, stringListInput);
        taskRepository.save(task);
        taskService.startTask(task);
        return task;
    }

    @MutationMapping
    public int removeTask(@Argument int id) {
        taskRepository.delete(taskRepository.findById(id));
        return id;
    }

    @MutationMapping
    public boolean removeAllTasks() {
        taskRepository.deleteAll();
        return true;
    }
}
