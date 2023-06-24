package de.algosocial.backend.algorithms;

import java.util.List;

public record AlgorithmProperties(
        String name,
        String displayName,
        int numberOfInputs,
        List<String> exampleInputs
) {}
