package de.algosocial.backend;

import de.algosocial.backend.algorithms.TaskService;
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
    public Post addAlgorithmPost(@Argument int userId, @Argument String title,
                                  @Argument String algorithm, @Argument List<Integer> input) throws InterruptedException {
        System.out.println("Mapping: " + algorithm);
        Task task = new Task(algorithm, input);
        taskRepository.save(task);

        Post post = new Post(userId, title, task.getStatus(), task.getId());
        postRepository.save(post);

        taskService.startTask(task);
        return post;
    }


    @MutationMapping
    public int removePost(@Argument int id) {
        postRepository.delete(postRepository.findById(id));
        return id;
    }

    @SchemaMapping
    public User user(Post post) {
        return userRepository.findById(post.getUserId());
    }
}