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
    boolean inputMultiple;

    public Algorithm(@Nonnull String name, @Nonnull String displayName, boolean inputMultiple) {
        this.name = name;
        this.displayName = displayName;
        this.inputMultiple = inputMultiple;
    }

    protected Algorithm() {
        this.name = "__invalid__: default constructor used.";
        this.displayName = "__invalid__: default constructor used.";
        this.inputMultiple = false;
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

    public boolean isInputMultiple() {
        return inputMultiple;
    }
}
