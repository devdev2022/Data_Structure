import { BinaryTree } from "./binaryTree.mjs";

class BinarySearchTree {
  constructor(rootNode = null) {
    this.root = rootNode;
  }
  insert(data) {
    if (this.root === null || undefined) {
      this.root = new BinaryTree(data);
      return;
    }

    let currentNode = this.root;
    let parentNode = null;

    while (currentNode != null) {
      parentNode = currentNode;

      if (currentNode.getData() > data) {
        currentNode = currentNode.getLeftSubTree();
      } else if (currentNode.getData() < data) {
        currentNode = currentNode.getRightSubTree();
      } else {
        return;
      }
    }

    let newNode = new BinaryTree(data);

    if (parentNode.getData() > data) {
      parentNode.setLeftSubTree(newNode);
    }

    if (parentNode.getData() < data) {
      parentNode.setRightSubTree(newNode);
    }
  }

  search(targetData) {
    let currentNode = this.root;

    while (currentNode != null) {
      if (currentNode.getData() == targetData) {
        return currentNode;
      } else if (currentNode.getData() > targetData) {
        currentNode = currentNode.getLeftSubTree();
      } else {
        currentNode = currentNode.getRightSubTree();
      }
    }

    return null;
  }

  remove(targetData) {
    let fakeParentRootNode = new BinaryTree(0);
    let parentNode = fakeParentRootNode;
    let currentNode = this.root;
    let deletingNode = null;

    fakeParentRootNode.setRightSubTree(this.root);

    while (currentNode != null && currentNode.getData() != targetData) {
      parentNode = currentNode;

      if (currentNode.getData() > targetData) {
        currentNode = currentNode.getLeftSubTree();
      } else {
        currentNode = currentNode.getRightSubTree();
      }
    }

    if (currentNode == null) {
      return;
    }

    deletingNode = currentNode;

    if (
      deletingNode.getLeftSubTree() == null &&
      deletingNode.getRightSubTree() == null
    ) {
      if (parentNode.getLeftSubTree() == deletingNode) {
        parentNode.removeLeftSubTree();
      } else {
        parentNode.removeRightSubTree();
      }
    } else if (
      deletingNode.getLeftSubTree() == null ||
      deletingNode.getRightSubTree() == null
    ) {
      let deletingNodeChild;

      if (deletingNode.getLeftSubTree() != null) {
        deletingNodeChild = deletingNode.getLeftSubTree();
      } else {
        deletingNodeChild = deletingNode.getRightSubTree();
      }

      if (deletingNodeChild.getLeftSubTree() == deletingNode) {
        parentNode.setLeftSubTree(deletingNodeChild);
      } else {
        parentNode.setRightSubTree(deletingNodeChild);
      }
    } else {
      let replacingNode = deletingNode.getLeftSubTree();
      let replacingNodeParent = deletingNode;

      while (replacingNode.getRightSubTree() != null) {
        replacingNodeParent = replacingNode;
        replacingNode = replacingNode.getRightSubTree();
      }

      let deletingNodeData = deletingNode.getData();
      deletingNode.setData(replacingNode.getData());

      if (replacingNodeParent.getLeftSubTree() == replacingNode) {
        replacingNodeParent.setLeftSubTree(replacingNode.getLeftSubTree());
      } else {
        replacingNodeParent.setRightSubTree(replacingNode.getLeftSubTree());
      }

      deletingNode = replacingNode;
      deletingNode.setData(deletingNodeData);
    }

    if (fakeParentRootNode.getRightSubTree() != this.root) {
      this.root = fakeParentRootNode.getRightSubTree();
    }

    return deletingNode;
  }
}

let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(18);
binarySearchTree.insert(15);
binarySearchTree.insert(10);
binarySearchTree.insert(6);
binarySearchTree.insert(3);
binarySearchTree.insert(8);
binarySearchTree.insert(12);
binarySearchTree.insert(11);
binarySearchTree.insert(31);
binarySearchTree.insert(27);
binarySearchTree.insert(24);
binarySearchTree.insert(20);
binarySearchTree.insert(33);
binarySearchTree.insert(35);
binarySearchTree.insert(37);
binarySearchTree.root.inOrderTraversal(binarySearchTree.root);

console.log("===== Search 6 =====");
console.log(binarySearchTree.search(6));

console.log("===== Search 1 =====");
console.log(binarySearchTree.search(1));

binarySearchTree.remove(10);
binarySearchTree.root.inOrderTraversal(binarySearchTree.root);
