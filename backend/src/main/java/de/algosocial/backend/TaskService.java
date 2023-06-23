package de.algosocial.backend;

import de.algosocial.backend.algorithms.AlgorithmFactory;
import de.algosocial.backend.algorithms.AlgorithmSuperClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private  ErrorLogRepository errorLogRepository;

    @Async
    public void startTask(Task task) throws InterruptedException {
        if (task.getStatus() != Task.Status.CALCULATING) {
            handleError(task, "Error: Received task has wrong status: " + task.getStatus());
            return;
        }

        AlgorithmSuperClass algorithm = AlgorithmFactory.getClass(task.getAlgorithm());

        if (algorithm == null) {
            handleError(task, "Error: Requested algorithm not found.");
            return;
        }

        try {
            task.setResult(algorithm.getResult(task.getInput()));
        } catch (Exception e) {
            handleError(task, "Error: Invalid input.");
            return;
        }

        taskRepository.save(task);
    }

    private void handleError(Task task, String errorMessage) {
        task.setError(errorMessage);
        taskRepository.save(task);
        errorLogRepository.save(new ErrorLog(task));
    }
}
