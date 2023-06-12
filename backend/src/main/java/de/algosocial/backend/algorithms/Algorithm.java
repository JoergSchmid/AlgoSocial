package de.algosocial.backend.algorithms;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

@Entity
public class Algorithm {
    public enum InputType {
        SINGLE_NUMBER,
        NUMBER_ARRAY,
        TWO_STRINGS
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Nonnull
    private final String name;
    @Nonnull
    private final String displayName;
    @Nonnull
    private InputType inputType;

    public Algorithm(@Nonnull String name, @Nonnull String displayName, @Nonnull InputType inputType) {
        this.name = name;
        this.displayName = displayName;
        this.inputType = inputType;
    }

    protected Algorithm() {
        this.name = "__invalid__: default constructor used.";
        this.displayName = "__invalid__: default constructor used.";
        this.inputType = InputType.SINGLE_NUMBER;
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

    public InputType getInputType() {
        return inputType;
    }
}
