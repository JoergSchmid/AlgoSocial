package de.algosocial.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class UserController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PostRepository postRepository;

    @QueryMapping
    public User userById(@Argument int id) {
        return userRepository.findById(id);
    }

    @QueryMapping
    public User userByName(@Argument String name) {
        return userRepository.findByName(name);
    }

    @QueryMapping
    public List<User> allUsers() {
        return (List<User>) userRepository.findAll();
    }

    @SchemaMapping
    public List<Post> posts(User user) {
        return (List<Post>) postRepository.findByUserId(user.getId());
    }
}
