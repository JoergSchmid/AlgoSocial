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
    private String status;

    @Column
    private String result;

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

    public String getResult() {
        return result;
    }

    public int getUserId() {
        return userId;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setResult(String result) {
        this.result = result;
    }

}