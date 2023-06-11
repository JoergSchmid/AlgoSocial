package de.algosocial.backend.algorithms;

import java.util.ArrayList;
import java.util.List;

public class DijkstraNode {
    private final List<DijkstraNode> connectedNodes;
    private final List<Integer> distances;
    private  Integer distanceToInitialNode;
    private final String name;
    private boolean visited;
    private  DijkstraNode previousNode;

    public DijkstraNode(String name) {
        this.connectedNodes = new ArrayList<DijkstraNode>();
        this.distances = new ArrayList<Integer>();
        this.name = name;
        this.visited = false;
        this.previousNode = null;
    }

    public void connectWith(DijkstraNode node, int distance) {
        connectedNodes.add(node);
        distances.add(distance);

        // Register this connection on targetNode
        node.connectBack(this, distance);
    }

    private void connectBack(DijkstraNode node, int distance) {
        connectedNodes.add(node);
        distances.add(distance);
    }

    public String getName() {
        return name;
    }

    public List<DijkstraNode> getConnectedNodes() {
        return connectedNodes;
    }
    public Integer getDistanceTo(DijkstraNode node) {
        return this.distances.get(this.connectedNodes.indexOf(node));
    }

    public String getPath() {
        if(previousNode == null)
            return name;
        return previousNode.getPath() + "," + name;
    }

    public Integer getDistanceToInitialNode() {
        return distanceToInitialNode;
    }

    public DijkstraNode getPreviousNode() {
        return previousNode;
    }

    public boolean getVisited() {
        return visited;
    }

    public void setVisited(boolean visited) {
        this.visited = visited;
    }

    public void setDistanceToInitialNode(Integer distanceToInitialNode) {
        this.distanceToInitialNode = distanceToInitialNode;
    }

    public void updateDistanceToInitialNode(DijkstraNode fromNode) {
        // Visited node don´t need to be checked again
        if (this.visited)
            return;

        int fromNodeDistance = fromNode.distanceToInitialNode == null ? 0: fromNode.distanceToInitialNode;

        if (this.distanceToInitialNode == null || fromNodeDistance + this.getDistanceTo(fromNode) < this.distanceToInitialNode) {

            this.distanceToInitialNode = fromNodeDistance + getDistanceTo(fromNode);
            this.previousNode = fromNode;
        }
    }

    public void resetNode() {
        visited = false;
        distanceToInitialNode = null;
    }
}
