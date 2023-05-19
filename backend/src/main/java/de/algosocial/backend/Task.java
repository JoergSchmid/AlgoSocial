package de.algosocial.backend;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import org.jetbrains.annotations.NotNull;

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
    private String status;

    @Column
    private String result;

    public Task(@NotNull String algorithm) {
        this.algorithm = algorithm;
        this.status = "calculating";
    }

    protected Task() {
        this.algorithm = "__invalid__: default constructor used.";
        this.status = "__invalid__";
    }

    public int getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public String getResult() {
        return result;
    }
}
