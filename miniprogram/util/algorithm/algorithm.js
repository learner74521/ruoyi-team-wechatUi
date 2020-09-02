/**
 * 创建排序二叉树的构造函数
 * @param valArr 排序二叉树中节点的值
 * @constructor
 */
function BinaryTree(valArr) {
  function Node(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
  var root = null;
  valArr.forEach(function (val) {
    var newNode = new Node(val);
    if (root === null) {
      root = newNode;
    } else {
     insetNode(root, newNode);
    }
  }, this);
  root = root;
}
// 向二叉树中插入节点
function insetNode (node, newNode) {

  if (newNode.value > node.value) {
    if (node.right === null) {
      node.right = newNode;
    } else {
      insetNode(node.right, newNode);
    }
  } else {
    if (node.left === null) {
      node.left = newNode;
    } else {
      insetNode(node.left, newNode);
    }
  }
}
// 中序遍历
BinaryTree.prototype.LFR = function () {
  const result = [];
  function computed(node) {
      if(node !== null ){
          computed(node.left);
          result.push(node.value);
          computed(node.right);
      }
  }
  computed(this.root);
  return result;
};
/**
 * 传地址排序
 * @param {*} uploadData 上传地址
 */
function sortLsit(uploadData){
  for(let i=0;i<uploadData.length;i++){
    for(let j=0;j<uploadData.length-i-1;j++){
        if(uploadData[j].index>uploadData[j+1].index){
             var temp=uploadData[j];
             uploadData[j]=uploadData[j+1];
             uploadData[j+1]=temp;
        }
    }
  }
  return uploadData;
}
module.exports = {
  BinaryTree,sortLsit
}