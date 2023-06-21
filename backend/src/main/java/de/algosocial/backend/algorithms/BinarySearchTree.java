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

    @Override
    public String toString() {
        StringBuilder result = new StringBuilder();
        return String.valueOf(getTreeFromNode(root));
    }

    private StringBuilder getTreeFromNode(BST_Node node) {
        StringBuilder result = new StringBuilder();

        if (node == null)
            return result;

        return result
                .append("(")
                .append(getTreeFromNode(node.left))
                .append(",").append(node.data).append(",")
                .append(getTreeFromNode(node.right))
                .append(")");
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

    public boolean findNumber(int number) {
        return findNumberFromNode(root, number);
    }

    private boolean findNumberFromNode(BST_Node node, int number) {
        if (node == null)
            return false;
        if (node.data == number)
            return true;
        return findNumberFromNode(number < node.data ? node.left : node.right, number);
    }
}
