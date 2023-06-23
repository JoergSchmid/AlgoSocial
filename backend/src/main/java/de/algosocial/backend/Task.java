package de.algosocial.backend;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Task {
    public enum Status {
        DONE,
        CALCULATING,
        ERROR
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private int userId;

    @Nonnull
    private final String algorithm;


    private final List<String> input;

    @Nonnull
    private Status status;

    private String result;

    private String error;

    public Task(@Nonnull String algorithm, @Nonnull List<String> input) {
        this.algorithm = algorithm;
        this.input = input;
        this.status = Status.CALCULATING;
    }

    protected Task() {
        this.algorithm = "__invalid__: default constructor used.";
        this.status = Status.ERROR;
        input = new ArrayList<String>();
    }

    public int getId() {
        return id;
    }

    public String getAlgorithm() {
        return algorithm;
    }

    public List<String> getInput() {
        return input;
    }

    public Status getStatus() {
        return status;
    }

    public String getResult() {
        return result;
    }

    public int getUserId() {
        return userId;
    }

    public String getError() {
        return error;
    }

    public void setStatus(@Nonnull Status status) {
        this.status = status;
    }

    public void setResult(String result) {
        this.status = Status.DONE;
        this.result = result;
    }

    public void setError(String error) {
        this.error = error;
        if(error != null) {
            this.status = Status.ERROR;
            this.result = error;
        }
    }
}
