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

        DijkstraNode currentNode = nodes.get(0);
        while(currentNode != null) {

            // Calculate distances from current node
            for(DijkstraNode targetNode : currentNode.getConnectedNodes()) {
                targetNode.updateDistanceToInitialNode(currentNode);
            }

            // Current node is finished. Mark as visited.
            currentNode.setVisited(true);

            // Change currentNode
            Integer index = getLowestUnvisitedNodeIndex();
            currentNode = index == null ? null : nodes.get(index);
        }
    }

    private Integer getLowestUnvisitedNodeIndex() {
        Integer index = null;
        for(DijkstraNode node : nodes) {
            if (!node.getVisited() && node.getDistanceToInitialNode() != null) {
                if(index == null || node.getDistanceToInitialNode() < nodes.get(index).getDistanceToInitialNode())
                    index = nodes.indexOf(node);
            }
        }
        return index;
    }
}
