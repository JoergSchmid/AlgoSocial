package de.algosocial.backend;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByName(String name);
    User findById(int id);
}
