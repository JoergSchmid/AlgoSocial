package de.algosocial.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class ErrorLogController {
    @Autowired
    TaskRepository taskRepository;
    @Autowired
    UserRepository userRepository;

    @SchemaMapping
    public Task task(ErrorLog errorLog) {
        return taskRepository.findById(errorLog.getTaskId());
    }

    @SchemaMapping
    public User user(ErrorLog errorLog) {
        return userRepository.findById((errorLog.getUserId()));
    }
}
