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
}
