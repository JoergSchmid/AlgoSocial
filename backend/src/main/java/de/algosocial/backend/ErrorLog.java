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

    public ErrorLog(int userId, int taskId, List<String> input, String message) {
        this.userId = userId;
        this.taskId = taskId;
        this.input = input;
        this.message = message;
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
