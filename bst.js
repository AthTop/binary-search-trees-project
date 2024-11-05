class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
  root;
  constructor(array) {
    let sortedArray = this.#sortArray(array);
    this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
  }
  buildTree(array, start, end) {
    if (start > end) return null; //Base case to exit reccursion
    // Find middle of array
    let mid = start + Math.floor((end - start) / 2);

    // Create root node
    let root = new Node(array[mid]);
    // Left sub-tree
    root.left = this.buildTree(array, start, mid - 1);
    // Right sub-tree
    root.right = this.buildTree(array, mid + 1, end);

    return root; // Retrn root to pass to Tree constructor
  }
  // Sorts and filters unique numbers in the array
  #sortArray(array) {
    if (array.length === 0) throw Error("Array can't be empty");
    array = array.sort((a, b) => a - b);
    let uniqueArray = [array[0]]; // Initialize new array with first element of sorted array
    for (let i = 1; i < array.length; i++) {
      if (array[i - 1] !== array[i]) {
        // Check array for duplicates. Since it's sorted we can loop through it
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray; // return the new sorted and unique array
  }

  // Inserts value in BST
  insert(data, root = this.root) {
    // Base case to exit recursion
    if (data === root.data) return;
    // Check if new data is smaller, then check if the left is empty and append it,
    // else recursively call insert until leaf node is found
    if (data < root.data) {
      if (root.left === null) {
        root.left = new Node(data);
      } else {
        this.insert(data, root.left);
      }
      // Similarilly, check if data is bigger and check the right side as above
    } else {
      if (root.right > root.data) {
        if (root.right === null) {
          root.right = new Node(data);
        } else {
          this.insert(data, root.right);
        }
      }
    }
  }
  deleteItem(data, root = this.root) {
    // Base case
    if (root === null) return root;
    //Check if we need to go to left or right of root
    if (data < root.data) {
      root.left = this.deleteItem(data, root.left);
    } else if (data > root.data) {
      root.right = this.deleteItem(data, root.right);
    }
    // If root matches our data
    else {
      // Check if no left child or only right
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }
      // Case with 2 children
      let successor = this.#getSuccessor(root);
      root.data = successor.data;
      root.right = this.deleteItem(successor.data, root.right);
    }
    return root;
  }
  // Helper function to get the left-most node to the right of a node
  #getSuccessor(root) {
    root = root.right;
    while (root !== null && root.left !== null) {
      root = root.left;
    }
    return root;
  }
  find(data, root = this.root) {
    // Base case
    if (root === null || root.data === data) return root;
    if (data < root.data) {
      return this.find(data, root.left);
    }
    if (data > root.data) {
      return this.find(data, root.right);
    }
  }
  levelOrder(callback, queue = [this.root]) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }
    if (root === null) return;
    if (queue.length === 0) return;
    let node = queue.shift();
    callback(node);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
    this.levelOrder(callback, queue);
  }
}
