import Tree from "./bst.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function randomNumbersArr(length) {
  let array = [];
  for (let i = 0; i < length; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
}

function printTree(method, methodName) {
  let arr = [];
  const callback = (node) => arr.push(node.data);
  method(callback);
  console.log(methodName + arr.join(" "));
}

let arr = randomNumbersArr(20);
let tree = new Tree(arr);

console.log(prettyPrint(tree.root));
console.log("Is tree balanced? " + tree.isBalanced());
printTree(tree.levelOrder.bind(tree), "Level Order: ");
printTree(tree.inOrder.bind(tree), "In order: ");
printTree(tree.preOrder.bind(tree), "Pre order: ");
printTree(tree.postOrder.bind(tree), "Post Order: ");
tree.insert(500);
tree.insert(302);
tree.insert(223);
tree.insert(148);
console.log("After adding 4 new nodes is tree balanced? " + tree.isBalanced());
tree.rebalance();
console.log("Tree should be rebalanced now. " + tree.isBalanced());
printTree(tree.levelOrder.bind(tree), "Level Order: ");
printTree(tree.inOrder.bind(tree), "In order: ");
printTree(tree.preOrder.bind(tree), "Pre order: ");
printTree(tree.postOrder.bind(tree), "Post Order: ");