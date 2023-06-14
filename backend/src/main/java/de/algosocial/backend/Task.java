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


    private final List<Integer> numberInput;
    private final List<String> stringInput;

    @Nonnull
    private Status status;

    private String result;

    private String error;

    public Task(@Nonnull String algorithm, @Nonnull List<Integer> numberInput) {
        this.algorithm = algorithm;
        this.numberInput = numberInput;
        this.stringInput = null;
        this.status = Status.CALCULATING;
    }

    public Task(@Nonnull String algorithm, List<Integer> numberInput, List<String> stringInput) {
        this.algorithm = algorithm;
        this.numberInput = numberInput;
        this.stringInput = stringInput;
        this.status = Status.CALCULATING;
    }

    protected Task() {
        this.algorithm = "__invalid__: default constructor used.";
        this.status = Status.ERROR;
        numberInput = new ArrayList<Integer>();
        stringInput = new ArrayList<String>();
    }

    public int getId() {
        return id;
    }

    public String getAlgorithm() {
        return algorithm;
    }

    public List<Integer> getNumberInput() {
        return numberInput;
    }

    public List<String> getStringInput() {
        return stringInput;
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

    public void setStatus(@Nonnull Status status) {
        this.status = status;
    }

    public void setResult(String result) {
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
