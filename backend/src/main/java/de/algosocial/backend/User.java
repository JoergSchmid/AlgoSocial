package de.algosocial.backend;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import org.jetbrains.annotations.NotNull;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Nonnull
    @Column(unique=true)
    private final String name;

    public User(@NotNull String name) {
        this.name = name;
    }

    protected User() {
        this.name = "__Invalid_name__";
    }

    public int getId() {
        return id;
    }

    @Nonnull
    public String getName() {
        return name;
    }


}