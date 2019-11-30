class PriorityQueue {
    constructor(maxSize) {
        // Set default max size if not provided
        if (isNaN(maxSize)) {
            maxSize = 10;
        }
        this.maxSize = maxSize;
        // Init an array that'll contain the queue values.
        this.container = [];
    }

    // Helper function to display all values while developing
    display() { console.log(this.container); }

    // Checks if queue is empty
    isEmpty() { return this.container.length === 0; }

    // checks if queue is full
    isFull() { return this.container.length >= this.maxSize; }

    enqueue(data, priority) {
        // Check if Queue is full
        if (this.isFull()) {
            console.log("Queue Overflow!");
            return;
        }
        let currElem = new this.Element(data, priority);
        let addedFlag = false;
        // Since we want to add elements to end, we'll just push them.
        for (let i = 0; i < this.container.length; i++) {
            if (currElem.priority >= this.container[i].priority) {
                this.container.splice(i, 0, currElem);
                addedFlag = true; break;
            }
        }
        if (!addedFlag) {
            this.container.push(currElem);
        }
    }

    dequeue() {
        // Check if empty
        if (this.isEmpty()) {
            console.log("Queue Underflow!");
            return;
        }
        return this.container.pop();
    }

    peek() {
        if (isEmpty()) {
            console.log("Queue Underflow!");
            return;
        }
        return this.container[this.container.length - 1];
    }

    clear() { this.container = []; }
}

PriorityQueue.prototype.Element = class {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
    }
};

class Node {
    constructor(label){
        this.label = label;
        this.edges = new Map();
    }

    addNewEdge(node, weight, id){
        let edge = new Edge(id, weight);
        this.edges.set(node,edge);
        node.addExistingEdge(this, edge);
    }

    addExistingEdge(node, edge){
        this.edges.set(node, edge);
    }

    getEdge(node){
        return this.edges.get(node);
    }
}

class Edge {
    constructor(id, weight) {
        this.id = id;
        this.weight = weight;
    }
}

Node.prototype.toString = function(){
    return this.label;
};

