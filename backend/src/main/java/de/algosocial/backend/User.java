package de.algosocial.backend;
import java.util.Arrays;
import java.util.List;

public record User(int id, String name, int postId) {

    private static List<User> users = Arrays.asList(
            new User(1, "Joerg", 1),
            new User(2, "Mady", 2),
            new User(3, "Felix", 3)
    );

    public static User getById(int id) {
        return users.stream()
                .filter(user -> user.id() == id)
                .findFirst()
                .orElse(null);
    }
}