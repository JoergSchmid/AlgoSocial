package de.algosocial.backend;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
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

    @Column
    private int userId;

    @Nonnull
    @Column
    private String algorithm;

    @Nonnull
    @Column
    private List<Integer> input;

    @Nonnull
    @Column
    private Status status;

    @Column
    private String result;

    public Task(@Nonnull String algorithm, @Nonnull List<Integer> input) {
        this.algorithm = algorithm;
        this.input = input;
        this.status = Status.CALCULATING;
    }

    protected Task() {
        this.algorithm = "__invalid__: default constructor used.";
        this.status = Status.ERROR;
    }

    public int getId() {
        return id;
    }

    public String getAlgorithm() {
        return algorithm;
    }

    public List<Integer> getInput() {
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

    public void setStatus(Status status) {
        this.status = status;
    }

    public void setResult(String result) {
        this.result = result;
    }

}
