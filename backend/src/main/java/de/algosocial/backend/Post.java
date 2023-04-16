package de.algosocial.backend;

import java.util.Arrays;
import java.util.List;

public record Post(int id, int userID, String title, String message) {

    private static List<Post> posts = Arrays.asList(
            new Post(1, 1, "Hello World", "My first post!"),
            new Post(2, 1, "Second Title", "And second post."),
            new Post(3, 2, "Number 3!", "Third time´s the charm!")
    );

    public static Post getById(int id) {
        return posts.stream()
                .filter(post -> post.id() == id)
                .findFirst()
                .orElse(null);
    }

    public static Post[] getAllById(int id) {
        return posts.stream()
                .filter(post -> post.userID() == id)
                .toArray(Post[]::new);
    }
}