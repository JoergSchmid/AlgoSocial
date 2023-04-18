package de.algosocial.backend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class BackendApplication {
	@Autowired
	PostRepository postRepository;
	@Autowired
	UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@GetMapping("/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return String.format("Hello %s!", name);
	}

	@GetMapping("/createPost")
	public String create(@RequestParam(value = "userid", defaultValue = "1") String userId,
						 @RequestParam(value = "title", defaultValue = "title") String title,
						 @RequestParam(value = "message", defaultValue = "message") String message) {
		postRepository.save(new Post(Integer.parseInt(userId), title, message));
		return "Created new post!";
	}

	@GetMapping("/createUser")
	public String createUser(@RequestParam(value = "name", defaultValue = "joerg") String name) {
		userRepository.save(new User(name));
		return "Created new user!";
	}
}