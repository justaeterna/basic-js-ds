const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    this._root = addData(this._root, data);

    function addData(node, data) {
      if (!node) return new Node(data);
      if (node.data === data) return node;
      if (data < node.data) node.left = addData(node.left, data);
      if (data > node.data) node.right = addData(node.right, data);
      return node;
    }
  }

  has(data) {
    return Boolean(this.find(data));
  }

  find(data) {
    let currentNode = this._root;

    while (true) {
      if (currentNode.data > data) {
        if (currentNode.left) {
          currentNode = currentNode.left;
        } else return null;
      } else if (currentNode.data < data) {
        if (currentNode.right) {
          currentNode = currentNode.right;
        } else return null;
      }
      if (currentNode.data === data) return currentNode;
    }
  }

  remove(data) {
    this._root = removeValue(this._root, data);

    function removeValue(node, data) {
      if (!node) return null;
      if (node.data > data) {
        node.left = removeValue(node.left, data);
        return node;
      }
      if (node.data < data) {
        node.right = removeValue(node.right, data);
        return node;
      }
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let minValue = node.right;
      while (minValue.left) {
        minValue = minValue.left;
      }

      node.data = minValue.data;
      node.right = removeValue(node.right, minValue.data);
      return node;
    }
  }

  min(node = this._root) {
    return node.left === null ? node.data : this.min(node.left);
  }

  max(node = this._root) {
    return node.right === null ? node.data : this.max(node.right);
  }
}

module.exports = {
  BinarySearchTree,
};
