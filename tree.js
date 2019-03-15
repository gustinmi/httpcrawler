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
        this.html = [];
    }    

    toHtml(node){
        
        var children = node.getChildren();
        if (children && children.length > 0){
            this.html.push("<ul>");
            for(var i = 0; i < children.length; i++) {
                this.toHtml(children[i]);
            }
            this.html.push("</ul>");
        }else{
            this.html.push("<li>");
            this.html.push(node.value);
            this.html.push("</li>");
        }
        
    }

    getHtmlTree(){
        var res = [];
        res.push("<ul>");
        res.push(this.html.join(""));
        res.push("</ul>");
        return res.join("");
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