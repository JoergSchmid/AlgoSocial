package de.algosocial.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.List;

@Entity
public class ErrorLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int userId;
    private int taskId;
    private List<String> input;
    private String message;

    // ToDo: Just receive Task object
    public ErrorLog(Task task) {
        this.userId = task.getUserId();
        this.taskId = task.getId();
        this.input = task.getInput();
        this.message = task.getError();
    }

    protected ErrorLog() {}

    public int getId() {
        return id;
    }

    public int getTaskId() {
        return taskId;
    }

    public int getUserId() {
        return userId;
    }
}
