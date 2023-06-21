package de.algoSocial.backend.algorithms.unittests;

import de.algosocial.backend.algorithms.Dijkstra;
import de.algosocial.backend.algorithms.DijkstraNode;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;


public class DijkstraTest {

    @Test
    void createSimpleDijkstraGraph() {
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

        // Calculate the distances and paths
        Dijkstra.calculate(nodes);

        // Test distances
        Assertions.assertEquals(5, b.getDistanceToInitialNode());
        Assertions.assertEquals(2, c.getDistanceToInitialNode());
        Assertions.assertEquals(6, d.getDistanceToInitialNode());

        // Test path
        Assertions.assertEquals("a,c,d", d.getPath());
    }

    @Test
    void createComplexGraph() {
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

        Dijkstra.calculate(nodes);

        // Test distances
        // Shortest path a to j is a -3- c -2- f -7- d -1- g -4- j = 17
        Assertions.assertEquals(17, j.getDistanceToInitialNode());
        Assertions.assertEquals(13, g.getDistanceToInitialNode()); // w/o last node
        Assertions.assertEquals(14, e.getDistanceToInitialNode());
        Assertions.assertEquals(1, h.getDistanceToInitialNode());

        // Test paths
        Assertions.assertEquals("a,c,f,d,g,j", j.getPath());
        Assertions.assertEquals("a,c,f,d,g", g.getPath());
        Assertions.assertEquals("a,i,e", e.getPath());
        Assertions.assertEquals("a,h", h.getPath());
    }

    @Test
    void createGraphWithOneNode() {
        List<DijkstraNode> nodes = new ArrayList<DijkstraNode>();
        DijkstraNode node = new DijkstraNode("a");
        nodes.add(node);

        Dijkstra.calculate(nodes);

        Assertions.assertEquals(0, node.getDistanceToInitialNode());
        Assertions.assertEquals("a", node.getPath());
    }

    @Test
    void createGraphWithIncompleteConnections() {
        List<DijkstraNode> nodes = new ArrayList<DijkstraNode>();
        DijkstraNode a = new DijkstraNode("a");
        DijkstraNode b = new DijkstraNode("b");
        DijkstraNode c = new DijkstraNode("c");

        // Connect a and b, but not c.
        a.connectWith(b, 1);

        nodes.add(a);
        nodes.add(b);
        nodes.add(c);

        Dijkstra.calculate(nodes);

        // Test distances
        Assertions.assertEquals(1, b.getDistanceToInitialNode());
        Assertions.assertEquals(Double.POSITIVE_INFINITY, c.getDistanceToInitialNode());

        // Test paths
        Assertions.assertEquals("a,b", b.getPath());
        Assertions.assertNull(c.getPath());
    }
}
