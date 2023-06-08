package de.algosocial.backend.algorithms;

import java.util.ArrayList;
import java.util.List;

public class DijkstraNode {
    List<DijkstraNode> connectedNodes;
    List<Integer> pathWeights;

    public DijkstraNode() {
        this.connectedNodes = new ArrayList<DijkstraNode>();
        this.pathWeights = new ArrayList<Integer>();
    }

    public int getWeightToNode(DijkstraNode node) {
        return pathWeights.get(connectedNodes.indexOf(node));
    }

    public void connectWith(DijkstraNode node, int pathWeight) {
        connectedNodes.add(node);
        pathWeights.add(pathWeight);

        // Register this connection on targetNode
        node.connectBack(node, pathWeight);
    }

    private void connectBack(DijkstraNode node, int pathWeight) {
        connectedNodes.add(node);
        pathWeights.add(pathWeight);
    }
}
