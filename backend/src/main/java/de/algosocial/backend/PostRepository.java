package de.algosocial.backend;

import org.springframework.data.repository.CrudRepository;
import java.util.List;


public interface PostRepository extends CrudRepository<Post, Integer> {

    List<Post> findByTitle(String title);

    Post findById(int id);

    Post findByTaskId(int id);

    List<Post> findByUserId(int userId);
}