package de.algosocial.backend.algorithms;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

import java.util.Arrays;
import java.util.List;

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
    @Nonnull
    private final List<String> exampleInputs;

    public Algorithm(@Nonnull String name, @Nonnull String displayName, int numberOfInputs, @Nonnull List<String> exampleInputs) {
        this.name = name;
        this.displayName = displayName;
        this.numberOfInputs = numberOfInputs;
        this.exampleInputs = exampleInputs;
    }

    protected Algorithm() {
        this.name = "__invalid__: default constructor used.";
        this.displayName = "__invalid__: default constructor used.";
        this.numberOfInputs = 0;
        this.exampleInputs = List.of("__invalid__: default constructor used.");
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
