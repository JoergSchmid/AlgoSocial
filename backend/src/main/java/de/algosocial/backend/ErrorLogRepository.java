package de.algosocial.backend;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface ErrorLogRepository extends CrudRepository<ErrorLog, Integer> {
    ErrorLog findById(int id);
    ErrorLog findByTaskId(int taskId);
    List<ErrorLog> findByUserId(int userId);
}
