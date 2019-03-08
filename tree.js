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

        console.log( "PARENT " + this.id +  this.value + " ELT " + node.id + ' - ' + node.value);                                   
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

    traverse(){
        this.traverseTree(this.root);
    }

    traverseTree(node){
        var children = node.getChildren();
        if (children && children.length > 0){
            for(var i = 0; i < children.length; i++) {
                this.traverseTree(children[i]);
            }
        }else{
            console.log( node.getParentNode().value + ", " + node.value + ", " + node.id);
        }
    }

    addChildren(){

    }

}

module.exports = {
    Tree, Node
}