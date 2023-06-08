package de.algoSocial.backend.algorithms.unittests;

import de.algosocial.backend.algorithms.Dijkstra;
import de.algosocial.backend.algorithms.DijkstraNode;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;


public class DijkstraTest {

    @Test
    void createSimpleDijkstraTree() {
        List<DijkstraNode> nodes = new ArrayList<DijkstraNode>();

        // Create 4 nodes
        DijkstraNode a = new DijkstraNode();
        DijkstraNode b = new DijkstraNode();
        DijkstraNode c = new DijkstraNode();
        DijkstraNode d = new DijkstraNode();

        // Establish connections
        /*
            a 5 b
            2   3
            c 4 d
         */
        a.connectWith(b, 5);
        a.connectWith(c, 2);
        b.connectWith(d, 3);
        c.connectWith(d, 4);

        // Move nodes into list
        nodes.add(a);
        nodes.add(b);
        nodes.add(c);
        nodes.add(d);

        // Establish tree
        Dijkstra dijkstra = new Dijkstra(nodes);

        // Shortest path from a to d (first to last element in list) is a-c-d = 6
        Assertions.assertEquals(dijkstra.start(), 6);
    }
}
