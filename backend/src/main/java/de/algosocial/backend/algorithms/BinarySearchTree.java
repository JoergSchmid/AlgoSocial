package de.algosocial.backend.algorithms;

import java.util.ArrayList;
import java.util.List;

public class BinarySearchTree {

    private BST_Node root;

    public void insert(int n) {
        root = insertNode(root, n);
    }

    private BST_Node insertNode(BST_Node root, int n) {
        if (root == null)
            root = new BST_Node(n);
        else if (n < root.data)
            root.left = insertNode(root.left, n);
        else if (n > root.data) // If equal, tree remains unchanged.
            root.right = insertNode(root.right, n);
        return root;
    }

    public List<Integer> getAll() {
        return getAllFromNode(root, new ArrayList<>());
    }

    private List<Integer> getAllFromNode(BST_Node node, List<Integer> list) {
        if (node == null)
            return list;
        list = getAllFromNode(node.left, list);
        list.add(node.data);
        list = getAllFromNode(node.right, list);
        return list;
    }

    public Integer getMax() {
        if (root == null)
            return null;
        return getMaxFromNode(root);
    }

    private Integer getMaxFromNode(BST_Node node) {
        if(node.right == null)
            return node.data;
        return getMaxFromNode(node.right);
    }

    public Integer getMin() {
        if (root == null)
            return null;
        return getMinFromNode(root);
    }

    private Integer getMinFromNode(BST_Node node) {
        if(node.left == null)
            return node.data;
        return getMinFromNode(node.left);
    }
}
