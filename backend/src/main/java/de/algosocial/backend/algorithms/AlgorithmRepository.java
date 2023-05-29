package de.algosocial.backend.algorithms;

import de.algosocial.backend.Task;
import org.springframework.data.repository.CrudRepository;

public interface AlgorithmRepository extends CrudRepository<Algorithm, Integer> {
    Task findById(int id);
}