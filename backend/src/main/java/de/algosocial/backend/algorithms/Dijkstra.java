package de.algosocial.backend.algorithms;

import java.util.List;

public class Dijkstra {
    private final List<DijkstraNode> nodes;

    public Dijkstra(List<DijkstraNode> nodes) {
        this.nodes = nodes;
        calculatePaths();
    }

    public void calculatePaths() {
        // Set all nodes to unvisited and infinite (=null) distance.
        for(DijkstraNode node : nodes)
            node.resetNode();

        for(DijkstraNode currentNode : nodes) {

            // Calculate distances from current node
            for(DijkstraNode targetNode : currentNode.getConnectedNodes()) {
                targetNode.updateDistanceToInitialNode(currentNode);
            }

            // Current node is finished. Mark as visited.
            currentNode.setVisited(true);
        }

    }
}
