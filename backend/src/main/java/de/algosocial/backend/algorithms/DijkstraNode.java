package de.algosocial.backend.algorithms;

import java.util.ArrayList;
import java.util.List;

public class DijkstraNode {
    private final List<DijkstraNode> connectedNodes;
    private final List<Double> distances;
    private  Double distanceToInitialNode;
    private final String name;
    private boolean visited;
    private  DijkstraNode previousNode;

    public DijkstraNode(String name) {
        this.connectedNodes = new ArrayList<DijkstraNode>();
        this.distances = new ArrayList<Double>();
        this.name = name;
        this.visited = false;
        this.previousNode = null;
    }

    public void connectWith(DijkstraNode node, double distance) {
        connectedNodes.add(node);
        distances.add(distance);

        // Register this connection on targetNode
        node.connectBack(this, distance);
    }

    private void connectBack(DijkstraNode node, double distance) {
        connectedNodes.add(node);
        distances.add(distance);
    }

    public List<DijkstraNode> getConnectedNodes() {
        return connectedNodes;
    }

    public Double getDistanceTo(DijkstraNode node) {
        return this.distances.get(this.connectedNodes.indexOf(node));
    }

    public String getPath() {
        if(previousNode == null) {
            if (visited)
                return name;
            return null;
        }
        return previousNode.getPath() + "," + name;
    }

    public Double getDistanceToInitialNode() {
        return distanceToInitialNode;
    }


    public boolean getVisited() {
        return visited;
    }

    public void setVisited(boolean visited) {
        this.visited = visited;
    }

    public void setDistanceToInitialNode(Double distanceToInitialNode) {
        this.distanceToInitialNode = distanceToInitialNode;
    }

    public void updateDistanceToInitialNode(DijkstraNode fromNode) {
        // Visited node don´t need to be checked again
        if (this.visited)
            return;

        double fromNodeDistance = fromNode.distanceToInitialNode == Double.POSITIVE_INFINITY ? 0: fromNode.distanceToInitialNode;

        if (this.distanceToInitialNode == Double.POSITIVE_INFINITY || fromNodeDistance + this.getDistanceTo(fromNode) < this.distanceToInitialNode) {

            this.distanceToInitialNode = fromNodeDistance + getDistanceTo(fromNode);
            this.previousNode = fromNode;
        }
    }

    public void resetNode() {
        visited = false;
        distanceToInitialNode = Double.POSITIVE_INFINITY;
    }
}
