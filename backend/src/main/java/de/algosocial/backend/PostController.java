package de.algosocial.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import java.util.List;

@Controller
public class PostController {
    @Autowired
    PostRepository postRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private TaskRepository taskRepository;
    private final TaskService taskService;

    @Autowired
    public PostController(TaskService taskService) {
        this.taskService = taskService;
    }


    @QueryMapping
    public Post postById(@Argument int id) {
        return postRepository.findById(id);
    }

    @QueryMapping
    public List<Post> allPosts() {
        return (List<Post>) postRepository.findAll();
    }

    @QueryMapping
    public List<Post> postsByUserId(@Argument int id) {
        return (List<Post>) postRepository.findByUserId(id);
    }

    @MutationMapping
    public Post addPost(@Argument int userId, @Argument String title, @Argument String message) {
        Post post = new Post(userId, title, message);
        postRepository.save(post);
        return post;
    }

    @MutationMapping
    public Post addAlgorithmPost(@Argument int userId, @Argument String title, @Argument String algorithm,
                                 @Argument List<String> input) throws InterruptedException {
        Task task = new Task(algorithm, input);
        taskRepository.save(task);

        StringBuilder postMessage = new StringBuilder(input.get(0));
        for (int i = 1; i < input.size(); i++)
            postMessage.append(" & ").append(input.get(i));

        Post post = new Post(userId, title, postMessage.toString(), task.getId());
        postRepository.save(post);

        taskService.startTask(task);
        return post;
    }


    @MutationMapping
    public int removePost(@Argument int id) {
        Post post = postRepository.findById(id);
        if(post == null)
            return -1;
        Task task = taskRepository.findById(post.getTaskId());
        if(task != null)
            taskRepository.delete(task);
        postRepository.delete(post);
        return id;
    }

    @SchemaMapping
    public User user(Post post) {
        return userRepository.findById(post.getUserId());
    }

    @SchemaMapping
    public Task task(Post post) {
        return taskRepository.findById((post.getTaskId()));
    }
}