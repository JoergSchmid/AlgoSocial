package de.algosocial.backend.algorithms;

import java.util.ArrayList;
import java.util.List;

public class DijkstraPath {
    List<DijkstraNode> nodes;
    int weight;

    public DijkstraPath(DijkstraNode startNode) {
        this.nodes = new ArrayList<DijkstraNode>();
        nodes.add(startNode);
        this.weight = 0;
    }

    public DijkstraPath(DijkstraPath existingPath) {
        this.nodes = new ArrayList<DijkstraNode>();
        nodes.addAll(existingPath.nodes);
        this.weight = existingPath.weight;
    }

    public void addNode(DijkstraNode node, int weight) {
        nodes.add(node);
        this.weight += weight;
    }

    public boolean isNodeInPath(DijkstraNode node) {
        for (DijkstraNode dijkstraNode : nodes)
            if (node == dijkstraNode)
                return true;
        return false;
    }
}
