'use strict';

class Node {

    constructor(id, value){
        this.id = id;
        this.value = value;
        this.children = [];
        this.parent = null;
    }

    setParentNode (node) {
        this.parent = node;
    }

    getParentNode () {
        return this.parent;
    }

    addChild (node) {
        node.setParentNode(this);
        this.children[this.children.length] = node;

        //console.log( "PARENT " + this.id +  this.value + " ELT " + node.id + ' - ' + node.value);                                   
    }

    getChildren () {
        return this.children;
    }

    removeChildren () {
        this.children = [];
    }

    isRoot () {
        return this.parent = null;
    }
}

class Tree {

    constructor(value){
        this.root = value;
    }    

    traverse(exp){
        this.traverseTree(this.root, exp);
    }

    traverseTree(node, exp){
        var children = node.getChildren();
        if (children && children.length > 0){
            for(var i = 0; i < children.length; i++) {
                this.traverseTree(children[i], exp);
            }
        }else{
            //console.log( node.getParentNode().value + ", " + node.value + ", " + node.id);
            exp(node);
        }
    }

}

module.exports = {
    Tree, Node
}