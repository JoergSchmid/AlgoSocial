package de.algosocial.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ErrorLogController {
    @Autowired
    ErrorLogRepository errorLogRepository;
    @Autowired
    TaskRepository taskRepository;
    @Autowired
    UserRepository userRepository;

    @QueryMapping
    public List<ErrorLog> allErrors() {
        return (List<ErrorLog>) errorLogRepository.findAll();
    }

    @QueryMapping
    public List<ErrorLog> allErrorsByUser(@Argument int userId) {
        return errorLogRepository.findByUserId(userId);
    }

    @MutationMapping
    public int removeError(@Argument int id) {
        errorLogRepository.delete(errorLogRepository.findById(id));
        return id;
    }

    @MutationMapping
    public boolean removeAllErrors() {
        errorLogRepository.deleteAll();
        return true;
    }

    @SchemaMapping
    public Task task(ErrorLog errorLog) {
        return taskRepository.findById(errorLog.getTaskId());
    }

    @SchemaMapping
    public User user(ErrorLog errorLog) {
        return userRepository.findById((errorLog.getUserId()));
    }
}
