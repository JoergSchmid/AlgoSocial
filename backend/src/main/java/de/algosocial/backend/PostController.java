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
                                 @Argument List<Integer> numberListInput, @Argument List<String> stringListInput) throws InterruptedException {
        Task task = new Task(algorithm, numberListInput, stringListInput);
        taskRepository.save(task);

        // For the post, we must now detect which kind of input was chosen.
        String input = numberListInput != null ? numberListInput.toString() : stringListInput.get(0);
        // Currently StringListInput is meant to be a list of up to 2 Strings (i.e. for dijkstra)
        //if (stringListInput != null && stringListInput.get(1) != null)
        //    input += " | " + stringListInput.get(1);

        Post post = new Post(userId, title, input, task.getId());
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