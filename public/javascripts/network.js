class Demand {
    constructor(from, to, demandValue) {
        this.from = from;
        this.to = to;
        this.demandValue = demandValue;
    }
}

var demands = [];

// create an array with nodes
var nodes = new vis.DataSet([
    {id: 0, label: 'v0'},
    {id: 1, label: 'v1'},
    {id: 2, label: 'v2'},
    {id: 3, label: 'v3'},
    {id: 4, label: 'v4'},
    {id: 5, label: 'v5'},
    {id: 6, label: 'v6'},
    {id: 7, label: 'v7'},
    {id: 8, label: 'v8'},
    {id: 9, label: 'v9'},
    //switches
    {id: 10, label: 's1', shape: "box", color: '#32cd32'},
    {id: 11, label: 's2', shape: "box", color: '#32cd32'},
    {id: 12, label: 's3', shape: "box", color: '#32cd32'},
    {id: 13, label: 's4', shape: "box", color: '#32cd32'},

]);

// create an array with edges
var edges = new vis.DataSet([
    {id: 1, from: 0, to: 8, label: '5'},
    {id: 2, from: 0, to: 1, label: '5'},
    {id: 3, from: 1, to: 2, label: '2'},
    {id: 4, from: 1, to: 5, label: '8'},
    {id: 5, from: 1, to: 6, label: '6'},
    {id: 6, from: 2, to: 4, label: '4'},
    {id: 7, from: 3, to: 6, label: '3'},
    {id: 8, from: 3, to: 4, label: '7'},
    {id: 9, from: 7, to: 8, label: '3'},
    {id: 10, from: 6, to: 9, label: '9'},
    {id: 11, from: 7, to: 9, label: '-'},
    //dynamic links
    //1
    {id: 12, from: 10, to: 0, dashes: true, label: 1},
    {id: 13, from: 10, to: 7, dashes: true, label: 1},
    {id: 14, from: 10, to: 4, dashes: true, label: 1},
    {id: 15, from: 10, to: 2, dashes: true, label: 1},
    //2
    {id: 16, from: 11, to: 0, dashes: true, label: 1},
    {id: 17, from: 11, to: 3, dashes: true, label: 1},
    {id: 18, from: 11, to: 6, dashes: true, label: 1},
    {id: 19, from: 11, to: 7, dashes: true, label: 1},
    //3
    {id: 20, from: 12, to: 1, dashes: true, label: 1},
    {id: 21, from: 12, to: 6, dashes: true, label: 1},
    {id: 22, from: 12, to: 8, dashes: true, label: 1},
    //3
    {id: 23, from: 13, to: 4, dashes: true, label: 1},
    {id: 24, from: 13, to: 5, dashes: true, label: 1},
    {id: 25, from: 13, to: 9, dashes: true, label: 1},
]);

demandMatrix = [
    ['-', null, 20, null, null, null, null, null, null, 9],
    [null, '-', null, null, null, null, null, null, null, null],
    [null, null, '-', null, null, null, null, null, null, null],
    [null, null, null, '-', null, null, null, null, null, null],
    [null, null, null, null, '-', null, null, null, null, null],
    [null, null, null, null, null, '-', null, null, null, null],
    [null, null, null, null, null, 10, '-', null, null, null],
    [null, null, 12, null, null, null, null, '-', null, 5],
    [null, null, null, null, null, null, null, null, '-', null],
    [null, null, null, null, null, null, null, null, null, '-']];
var g = [];

var container = document.getElementById('mynetwork');
var data = {
    nodes: nodes,
    edges: edges
};


var options = {};
var network = new vis.Network(container, data, options);

function changeSelectedEdgeColor(selected) {
    setUpGraph();

    var edge = edges.get(selected);
    edge.color = "#aa0000";
    edge.width = '3';
    edges.update(edge);
}

function setUpGraph(){

    for (var i = 0; i< nodes.length;++i){
        var node = new Node(nodes.get(i).label);
        g.push(node);
    };
}

function showAndCollectDemands() {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
    var roww = document.createElement('tr');

    let row = 0;
    demandMatrix.forEach(function (rowData) {
        let col = 0;
        rowData.forEach(function (cellData) {
            if (null !== cellData && '-' !== cellData)
                demands.push(new Demand(row, col, cellData));
            ++col;
        });
        ++row;
    });

    demands.sort(function (a, b) {
        return b.demandValue - a.demandValue;
    });

    for (var i = 0; i < demands.length; ++i) {
        var cell = document.createElement('td');
        cell.style = 'border: 1px solid; width: 80px;';
        cell.appendChild(document.createTextNode(demands[i].demandValue + ': ' + demands[i].from + ' -> ' + demands[i].to));
        roww.appendChild(cell);
    };

    tableBody.appendChild(roww);
    table.appendChild(tableBody);
    document.body.appendChild(table);
}



function createTable() {
    var table = document.createElement('table');
    table.style = 'border: 1px solid';
    table.className = 'column';
    let clearDiv = document.createElement('div');
    clearDiv.className = 'clear';
    var tableBody = document.createElement('tbody');
    var thead = document.createElement('tr');
    var cell = document.createElement('td');
    thead.appendChild(cell);
    for (var i = 0; i < 10; ++i) {
        var cell = document.createElement('td');
        cell.style = 'border: 1px solid; width: 30px;';
        cell.appendChild(document.createTextNode(i));
        thead.appendChild(cell);
    };

    tableBody.appendChild(thead);
    let counter = 0;
    demandMatrix.forEach(function (rowData) {
        var row = document.createElement('tr');
        var cell1 = document.createElement('td');
        cell1.style = 'border: 1px solid; width: 30px;';
        cell1.appendChild(document.createTextNode(counter++));
        row.appendChild(cell1);
        rowData.forEach(function (cellData) {
            var cell = document.createElement('td');
            cell.style = 'border: 1px solid; width: 30px;';
            cell.appendChild(document.createTextNode((null === cellData) ? '' : cellData));
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    document.getElementById('parent').appendChild(table);
    document.getElementById('parent').appendChild(clearDiv);
}

function dijkstra(graph, source, target) {
    let distances = new Map();
    let prev = new Map();
    let pq = new PriorityQueue(graph.length*graph.length);

    graph.forEach(node => {
        if (node !== source)
            distances.set(node,Infinity);
        else
            distances.set(node,0);

        pq.enqueue(node, distances.get(node));
        prev.set(node,null);
    });

    while (!pq.isEmpty()) {
        let currNode = pq.dequeue().data;
        if(currNode === target){
            break;
        }
        currNode.edges.forEach((weight,neighbor) => {
            let alt = distances.get(currNode) + weight;
            if(distances.get(currNode) === Infinity){
                alt = weight;
            }
            if (alt < distances.get(neighbor)) {
                distances.set(neighbor,alt);
                prev.set(neighbor,currNode);
                pq.enqueue(neighbor, distances.get(neighbor));
            }
        });
    }
    let reversePath = [];
    let tmpNode = target;
    if(prev.get(tmpNode) !== null || tmpNode === source){
        while(tmpNode !== null){
            reversePath.push(tmpNode);
            tmpNode = prev.get(tmpNode);
        }
    }

    return reversePath.reverse();
}






/*
var nodeA = new Node("A");
g.push(nodeA);
var nodeB = new Node("B");
g.push(nodeB);
var nodeC = new Node("C");
g.push(nodeC);
var nodeD = new Node("D");
g.push(nodeD);
var nodeE = new Node("E");
g.push(nodeE);
var nodeF = new Node("F");
g.push(nodeF);
var nodeG = new Node("G");
g.push(nodeG);




nodeA.addEdge(nodeC, 100);
nodeA.addEdge(nodeB, 3);
nodeA.addEdge(nodeD, 4);
nodeD.addEdge(nodeC, 3);
nodeD.addEdge(nodeE, 8);
nodeE.addEdge(nodeF, 10);
nodeB.addEdge(nodeG, 9);
nodeE.addEdge(nodeG, 50);
*/

//console.log(dijkstra(g, nodeA, nodeF));
