package de.algosocial.backend.algorithms;

import java.util.List;

public class Dijkstra {

    public static void calculate(List<DijkstraNode> nodes) {
        // Set all nodes to unvisited and infinite (=null) distance.
        for(DijkstraNode node : nodes)
            node.resetNode();

        DijkstraNode currentNode = nodes.get(0);
        currentNode.setDistanceToInitialNode(0d);

        while(currentNode != null) {

            // Calculate distances from current node
            for(DijkstraNode targetNode : currentNode.getConnectedNodes()) {
                targetNode.updateDistanceToInitialNode(currentNode);
            }

            // Current node is finished. Mark as visited.
            currentNode.setVisited(true);

            // Change currentNode
            Integer index = getLowestUnvisitedNodeIndex(nodes);
            currentNode = index == null ? null : nodes.get(index);
        }
    }

    private static Integer getLowestUnvisitedNodeIndex(List<DijkstraNode> nodes) {
        Integer index = null;
        for(DijkstraNode node : nodes) {
            if (!node.getVisited() && node.getDistanceToInitialNode() != Double.POSITIVE_INFINITY) {
                if(index == null || node.getDistanceToInitialNode() < nodes.get(index).getDistanceToInitialNode())
                    index = nodes.indexOf(node);
            }
        }
        return index;
    }
}
