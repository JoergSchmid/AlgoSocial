package de.algosocial.backend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.event.EventListener;
import java.util.Arrays;

@SpringBootApplication
@RestController
public class BackendApplication {
	@Autowired
	private PostRepository postRepository;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@EventListener(ContextRefreshedEvent.class)
	public void dataInit() {
		Post[] posts = {
				new Post("First post", "Hello World, this is my first post"),
				new Post("Not the first, but still good", "Great text"),
				new Post("Lorem ipsum", "Dolor sit amet")
		};
		Arrays.stream(posts).forEach(post -> postRepository.save(post));
	}

	@RequestMapping(value = "/posts")
	public String posts() {
		return postRepository.findAll().toString();
	}

	@GetMapping("/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return String.format("Hello %s!", name);
	}
}