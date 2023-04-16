package de.algosocial.backend;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class PostController {
    @QueryMapping
    public Post postById(@Argument int id) {
        return Post.getById(id);
    }

    @QueryMapping
    public User userById(@Argument int id) {
        return User.getById(id);
    }

    @SchemaMapping
    public Post post(User user) {
        return Post.getById(user.postId());
    }

    @SchemaMapping
    public Post[] posts(User user) {
        return Post.getAllById(user.postId());
    }
}