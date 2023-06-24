package de.algosocial.backend.algorithms;

import java.util.List;

public class BinarySearchTree extends AlgorithmSuperClass {

    private BST_Node root;

    public static AlgorithmProperties properties = new AlgorithmProperties(
            "binarySearchTree",
            "Binary Search Tree",
            1,
            List.of("4,2,5,1,3"));

    @Override
    public AlgorithmProperties getProperties() {
        return properties;
    }

    @Override
    public String getResult(List<String> input) {
        List<Integer> numbers = stringToIntegerList(input.get(0));

        if (input.get(1) != null)
            return binarySearchTreeFindNumber(numbers, Integer.parseInt(input.get(1))) ? "true" : "false";

        return binarySearchTree(numbers);
    }

    public static String binarySearchTree(List<Integer> numbers) {
        BinarySearchTree bst = new BinarySearchTree();
        for(int i : numbers)
            bst.insert(i);
        return bst.toString();
    }

    public static boolean binarySearchTreeFindNumber(List<Integer> numbers, int findNumber) {
        BinarySearchTree bst = new BinarySearchTree();
        for(int i : numbers)
            bst.insert(i);
        return bst.findNumber(findNumber);
    }

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
