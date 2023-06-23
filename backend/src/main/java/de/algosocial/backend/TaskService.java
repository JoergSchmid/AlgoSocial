package de.algosocial.backend;

import de.algosocial.backend.algorithms.AlgorithmController;
import de.algosocial.backend.algorithms.AlgorithmFactory;
import de.algosocial.backend.algorithms.AlgorithmSuperClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private  ErrorLogRepository errorLogRepository;

    @Async
    public void startTask(Task task) throws InterruptedException {
        AlgorithmSuperClass algorithm = AlgorithmFactory.getClass(task.getAlgorithm());

        // ToDo: Add catching wrong task status

        if (algorithm == null) {
            task.setError("Error: Requested algorithm not found.");
            taskRepository.save(task);
            errorLogRepository.save(new ErrorLog(task.getUserId(), task.getId(), task.getInput(), task.getError()));
            return;
        }

        String result;

        try {
            result = algorithm.getResult(task.getInput());
        } catch (Exception e) {
            task.setError("Error: Invalid input.");
            taskRepository.save(task);
            errorLogRepository.save(new ErrorLog(task.getUserId(), task.getId(), task.getInput(), task.getError()));
            return;
        }

        task.setStatus(Task.Status.DONE);
        task.setResult(result);
        taskRepository.save(task);
    }
}
