package de.algosocial.backend.algorithms;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Dijkstra extends AlgorithmSuperClass {
    public static AlgorithmProperties properties = new AlgorithmProperties(
            "dijkstra",
            "Dijkstra",
            2,
            Arrays.asList("a,b,c", "(a,b,3),(a,c,6),(b,c,2)"));

    @Override
    public AlgorithmProperties getProperties() {
        return properties;
    }

    @Override
    public String getResult(List<String> input) {
        return dijkstra(input.get(0), input.get(1));
    }

    public static String dijkstra(String nodes, String edges) {
        List<DijkstraNode> nodeList = new ArrayList<DijkstraNode>();

        String[] names = nodes.split(",");
        for (String name : names)
            nodeList.add(new DijkstraNode(name));

        // Edges is in format "(a,b,1),(b,c,2), ..."
        String paths = edges.substring(1, edges.length() - 1); // Leading parentheses not needed.
        String[] connectionGroups = paths.split("\\),\\(");

        // Each group is now like "a,b,2"
        for (String group : connectionGroups) {
            String[] elements = group.split(",");

            // Create the edges (=connecting the nodes)
            dijkstra_getNodeWithName(nodeList, names, elements[0])
                    .connectWith(dijkstra_getNodeWithName(nodeList, names, elements[1]),
                            Integer.parseInt(elements[2]));
        }

        // Start calculating
        calculate(nodeList);

        // Get last node, which we want to get the path to
        DijkstraNode node = dijkstra_getNodeWithName(nodeList, names, names[names.length-1]);

        // Return the path and the distance from first to last node
        return node.getPath() + "," + node.getDistanceToInitialNode().toString();
    }

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

    private static DijkstraNode dijkstra_getNodeWithName(
            List<DijkstraNode> nodes, String[] names, String name) {
        int index = -1;
        for (int i = 0; i < names.length; i++) {
            if (names[i].equals(name)) {
                index = i;
                break;
            }
        }
        return nodes.get(index);
    }
}
