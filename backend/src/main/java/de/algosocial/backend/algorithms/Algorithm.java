package de.algosocial.backend.algorithms;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

@Entity
public class Algorithm {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Nonnull
    private final String name;
    @Nonnull
    private final String displayName;
    private final int numberOfInputs;

    public Algorithm(@Nonnull String name, @Nonnull String displayName, int numberOfInputs) {
        this.name = name;
        this.displayName = displayName;
        this.numberOfInputs = numberOfInputs;
    }

    protected Algorithm() {
        this.name = "__invalid__: default constructor used.";
        this.displayName = "__invalid__: default constructor used.";
        this.numberOfInputs = 0;
    }

    public int getId() {
        return id;
    }

    @Nonnull
    public String getName() {
        return name;
    }

    @Nonnull
    public String getDisplayName() {
        return displayName;
    }

    public int getNumberOfInputs() {
        return numberOfInputs;
    }
}
