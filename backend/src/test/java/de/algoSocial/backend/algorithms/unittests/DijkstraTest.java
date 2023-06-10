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
        DijkstraNode a = new DijkstraNode("a");
        DijkstraNode b = new DijkstraNode("b");
        DijkstraNode c = new DijkstraNode("c");
        DijkstraNode d = new DijkstraNode("d");

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

        // Establish tree. First element is initial node.
        Dijkstra dijkstra = new Dijkstra(nodes);

        // Test distances
        Assertions.assertEquals(5, b.getDistanceToInitialNode());
        Assertions.assertEquals(2, c.getDistanceToInitialNode());
        Assertions.assertEquals(6, d.getDistanceToInitialNode());

        // Test path
        Assertions.assertEquals(d.getPath(), "a,c,d");
    }

    @Test
    void createComplexTree() {
        List<DijkstraNode> nodes = new ArrayList<DijkstraNode>();

        DijkstraNode a = new DijkstraNode("a");
        DijkstraNode b = new DijkstraNode("b");
        DijkstraNode c = new DijkstraNode("c");
        DijkstraNode d = new DijkstraNode("d");
        DijkstraNode e = new DijkstraNode("e");
        DijkstraNode f = new DijkstraNode("f");
        DijkstraNode g = new DijkstraNode("g");
        DijkstraNode h = new DijkstraNode("h");
        DijkstraNode i = new DijkstraNode("i");
        DijkstraNode j = new DijkstraNode("j");

        a.connectWith(b, 5);
        a.connectWith(c, 3);
        a.connectWith(f, 9);
        a.connectWith(h, 1);
        a.connectWith(i, 6);

        b.connectWith(d, 13);
        b.connectWith(i, 3);
        b.connectWith(j, 19);

        c.connectWith(f, 2);
        c.connectWith(h, 3);

        d.connectWith(f, 7);
        d.connectWith(g, 1);
        d.connectWith(h, 15);
        d.connectWith(j, 6);

        e.connectWith(g, 11);
        e.connectWith(i, 8);

        g.connectWith(j, 4);

        // Move nodes into list
        nodes.add(a);
        nodes.add(b);
        nodes.add(c);
        nodes.add(d);
        nodes.add(e);
        nodes.add(f);
        nodes.add(g);
        nodes.add(h);
        nodes.add(i);
        nodes.add(j);

        // Establish tree
        Dijkstra dijkstra = new Dijkstra(nodes);

        // Test distances
        // Shortest path a to j is a -3- c -2- f -7- d -1- g -4- j = 17
        Assertions.assertEquals(17, j.getDistanceToInitialNode());
        Assertions.assertEquals(13, g.getDistanceToInitialNode()); // w/o last node

        // Test paths
        Assertions.assertEquals(j.getPath(), "a,c,f,d,g,j");
        Assertions.assertEquals(g.getPath(), "a,c,f,d,g");
    }
}
