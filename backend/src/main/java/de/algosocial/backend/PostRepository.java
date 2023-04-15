package de.algosocial.backend;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface PostRepository extends CrudRepository<Post, Long> {

    List<Post> findByTitle(String title);

    Post findById(long id);
}