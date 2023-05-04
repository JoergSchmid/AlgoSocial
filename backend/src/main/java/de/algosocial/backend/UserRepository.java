package de.algosocial.backend;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByName(String name);
    User findById(int id);
}
