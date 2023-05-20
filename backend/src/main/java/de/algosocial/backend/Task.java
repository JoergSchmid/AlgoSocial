package de.algosocial.backend;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import org.jetbrains.annotations.NotNull;

import java.util.List;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Nonnull
    @Column
    private String algorithm;

    @Nonnull
    @Column
    private List<Integer> input;

    @Nonnull
    @Column
    private String status;

    @Column
    private List<Integer> result;

    public Task(@NotNull String algorithm, @NotNull List<Integer> input) {
        this.algorithm = algorithm;
        this.input = input;
        this.status = "calculating";
    }

    protected Task() {
        this.algorithm = "__invalid__: default constructor used.";
        this.status = "__invalid__";
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

    public String getStatus() {
        return status;
    }

    public List<Integer> getResult() {
        return result;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setResult(List<Integer> result) {
        this.result = result;
    }
}
