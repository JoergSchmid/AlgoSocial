package de.algosocial.backend.algorithms;

import java.util.ArrayList;
import java.util.List;

public class Dijkstra {
    private final List<DijkstraNode> nodes;
    private final List<DijkstraPath> activePaths;
    private final DijkstraNode lastNode;
    private DijkstraPath winningPath;

    public Dijkstra(List<DijkstraNode> nodes) {
        this.nodes = nodes;
        activePaths = new ArrayList<DijkstraPath>();
        activePaths.add(new DijkstraPath(nodes.get(0)));
        lastNode = nodes.get(nodes.size()-1);
    }

    public Integer start() {
        if (nodes == null)
            return null;

        while (activePaths.size() > 0){
            expandPath(getLowestWeightPath());
            deletePathsWithTooMuchWeight();
        }

        if (winningPath == null)
            return null;

        return winningPath.weight;
    }

    private DijkstraPath getLowestWeightPath() {
        DijkstraPath lowest = activePaths.get(0);
        for(int i = 1; i < activePaths.size(); i++)
            if (activePaths.get(i).weight < lowest.weight)
                lowest = activePaths.get(i);
        return lowest;
    }

    private void expandPath(DijkstraPath path) {
        DijkstraNode currentNode = path.nodes.get(path.nodes.size()-1);
        List<DijkstraNode> connectedNodes = new ArrayList<DijkstraNode>();

        // Find connected nodes and add them to copies of path, if they are not in path yet
        for(int i = 0; i < currentNode.connectedNodes.size(); i++) {
            DijkstraNode node = currentNode.connectedNodes.get(i);
            if (!path.isNodeInPath(node)) {
                DijkstraPath p = new DijkstraPath(path);
                p.addNode(node, currentNode.getWeightToNode(node));

                if (node == lastNode) {
                    if (winningPath == null || p.weight < winningPath.weight) {
                        winningPath = p;
                    }
                } else {
                    activePaths.add(p);
                }
            }
        }

        // Now that all copies of given path are saved in paths, we can delete this path
        activePaths.remove(path);
    }

    private void deletePathsWithTooMuchWeight() {
        if (winningPath == null)
            return;

        activePaths.removeIf(p -> p.weight >= winningPath.weight);
    }
}
