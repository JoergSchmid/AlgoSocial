package de.algosocial.backend;

import jakarta.persistence.*;

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int userId;
    private int taskId;
    private String title;
    private String message;

    public Post(int userId, String title, String message) {
        this.userId = userId;
        this.title = title;
        this.message = message;
    }

    public Post(int userId, String title, String message, int taskId) {
        this.userId = userId;
        this.title = title;
        this.message = message;
        this.taskId = taskId;
    }

    protected Post() {}

    public int getId() {
        return id;
    }

    public int getUserId() {
        return userId;
    }

    public int getTaskId() {
        return taskId;
    }

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}