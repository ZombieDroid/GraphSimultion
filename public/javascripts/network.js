class Demand {
    constructor(from, to, demandValue) {
        this.from = from;
        this.to = to;
        this.demandValue = demandValue;
    }
}

let demands = [];
let selectedDemand;
let walkedEdges = [];
// create an array with nodes
var nodes = new vis.DataSet([
    {id: 0, label: 'v0', color:'#4F7BCD'},
    {id: 1, label: 'v1', color:'#4F7BCD'},
    {id: 2, label: 'v2', color:'#4F7BCD'},
    {id: 3, label: 'v3', color:'#4F7BCD'},
    {id: 4, label: 'v4', color:'#4F7BCD'},
    {id: 5, label: 'v5', color:'#4F7BCD'},
    {id: 6, label: 'v6', color:'#4F7BCD'},
    {id: 7, label: 'v7', color:'#4F7BCD'},
    {id: 8, label: 'v8', color:'#4F7BCD'},
    {id: 9, label: 'v9', color:'#4F7BCD'},
    //switches
    {id: 10, label: 's1', shape: "box", color: '#32cd32'},
    {id: 11, label: 's2', shape: "box", color: '#32cd32'},
    {id: 12, label: 's3', shape: "box", color: '#32cd32'},
    {id: 13, label: 's4', shape: "box", color: '#32cd32'},

]);

function isSwitch(id){
    return id > 9;
}

// create an array with edges
var edges = new vis.DataSet([
    {id: 1, from: 0, to: 8, label: '5', color:'#4F7BCD', width: 2},
    {id: 2, from: 0, to: 1, label: '5', color:'#4F7BCD', width: 2},
    {id: 3, from: 1, to: 2, label: '2', color:'#4F7BCD', width: 2},
    {id: 4, from: 1, to: 5, label: '8', color:'#4F7BCD', width: 2},
    {id: 5, from: 1, to: 6, label: '6', color:'#4F7BCD', width: 2},
    {id: 6, from: 2, to: 4, label: '4', color:'#4F7BCD', width: 2},
    {id: 7, from: 3, to: 6, label: '3', color:'#4F7BCD', width: 2},
    {id: 8, from: 3, to: 4, label: '7', color:'#4F7BCD', width: 2},
    {id: 9, from: 7, to: 8, label: '3', color:'#4F7BCD', width: 2},
    {id: 10, from: 6, to: 9, label: '9', color:'#4F7BCD', width: 2},
    {id: 11, from: 7, to: 9, label: '2', color:'#4F7BCD', width: 2},
    //dynamic links
    //1
    {id: 12, from: 10, to: 0, dashes: true, label: 1, color: '#32cd32', width: 2},
    {id: 13, from: 10, to: 7, dashes: true, label: 1, color: '#32cd32', width: 2},
    {id: 14, from: 10, to: 4, dashes: true, label: 1, color: '#32cd32', width: 2},
    {id: 15, from: 10, to: 2, dashes: true, label: 1, color: '#32cd32', width: 2},
    //2
    {id: 16, from: 11, to: 0, dashes: true, label: 1, color: '#32cd32', width: 2},
    {id: 17, from: 11, to: 3, dashes: true, label: 1, color: '#32cd32', width: 2},
    {id: 18, from: 11, to: 6, dashes: true, label: 1, color: '#32cd32', width: 2},
    {id: 19, from: 11, to: 7, dashes: true, label: 1, color: '#32cd32', width: 2},
    //3
    {id: 20, from: 12, to: 1, dashes: true, label: 1, color: '#32cd32', width: 2},
    {id: 21, from: 12, to: 6, dashes: true, label: 1, color: '#32cd32', width: 2},
    {id: 22, from: 12, to: 8, dashes: true, label: 1, color: '#32cd32', width: 2},
    //4
    {id: 23, from: 13, to: 4, dashes: true, label: 1, color: '#32cd32', width: 2},
    {id: 24, from: 13, to: 5, dashes: true, label: 1, color: '#32cd32', width: 2},
    {id: 25, from: 13, to: 9, dashes: true, label: 1, color: '#32cd32', width: 2},
]);

demandMatrix = [
    ['-', null, 20, null, null, null, null, null, null, 9],
    [null, '-', null, null, null, null, null, null, null, null],
    [null, null, '-', null, null, null, null, null, null, null],
    [null, null, null, '-', null, null, 10, null, null, null],
    [null, null, null, null, '-', null, null, null, null, null],
    [null, null, null, null, null, '-', null, null, null, null],
    [null, null, null, null, null, 11, '-', null, null, null],
    [null, null, 12, null, null, null, null, '-', null, 5],
    [null, null, null, null, null, null, null, null, '-', null],
    [null, null, null, null, null, null, null, null, null, '-']];
var actualDemand = 0;
var started = false;
var container = document.getElementById('mynetwork');
var data = {
    nodes: nodes,
    edges: edges
};


var options = {};
var network = new vis.Network(container, data, options);



var staticEdges = [1,2,3,4,5,6,7,8,9,10,11];
var dynamicEdges = [12,13,14,15,16,17,18,19,20,21,22,23,24,25];
var usedDynamicEdges = [];
var unusedDynamicEdges = [];

function setUpGraph(){
    let g = [];

    for (var i = 0; i < nodes.length; ++i){
        var node = new Node(i);
        g.push(node);
    }

    staticEdges.forEach((edgeId)=>{
       let fromNode = g.find(value => {return value.label === edges.get(edgeId).from});
       let toNode = g.find(value => {return value.label === edges.get(edgeId).to});

       fromNode.addNewEdge(toNode, edges.get(edgeId).label, edgeId)
    });

    dynamicEdges.forEach((edgeId)=>{
        let fromNode = g.find(value => {return value.label === edges.get(edgeId).from});
        let toNode = g.find(value => {return value.label === edges.get(edgeId).to});

        fromNode.addNewEdge(toNode, edges.get(edgeId).label, edgeId)
    });

    usedDynamicEdges.forEach((edgeId)=>{
        let fromNode = g.find(value => {return value.label === edges.get(edgeId).from});
        let toNode = g.find(value => {return value.label === edges.get(edgeId).to});

        fromNode.addNewEdge(toNode, edges.get(edgeId).label, edgeId)
    });

    return g;
}

function isDone(){
    return dynamicEdges.length === 0 || demands.length === actualDemand;
}

function collectDynamicEdges(){
    for(let i= 1; i<= edges.length; ++i){
        if(edges.get(i).dashes){
           dynamicEdges.push(edges.get(i));
        }
    }
}

function next(){
    if(walkedEdges.length > 0)
        refreshGraphColor(walkedEdges);

    if(isDone()){
        alert('Finished');
        return;
    }

    if(!started){
        actualDemand = 0;
        started = true;
        var button = document.getElementById("coreButton");
        button.value = 'Next';
    } else {
        if(walkedEdges.length === 0){
            let demand = demands[actualDemand];
            runDemandFirst(demand);
            ++actualDemand;
        } else {
            walkedEdges = [];
        }
    }
}



function runDemandFirst (demand) {
    let graph = setUpGraph();

    walkedEdges = [];
    let fromNode = graph.find(value => value.label === demand.from);
    let targetNode = graph.find(value => value.label === demand.to);

    selectedDemand = document.getElementById('d-'+actualDemand);
    selectedDemand.style = 'border: 1px solid; width: 80px;background:grey';

    let path = dijkstra(graph, fromNode, targetNode);
    updateEdges(path);
    for(var i = 1; i<path.length-1; i++){
            let fromEdge = path[i].getEdge(path[i-1]);
            let toEdge = path[i].getEdge(path[i+1]);
            walkedEdges.push(fromEdge.id);
            walkedEdges.push(toEdge.id);
    }
    if(2 === path.length){
        let fromEdge = path[1].getEdge(path[0]);
        walkedEdges.push(fromEdge.id);
    }
    walkedEdges.sort();
    colorGraphForDijkstra(walkedEdges);
}

function updateEdges(path){
    // first and last nodes should not be switches!
    console.assert(!isSwitch(path[0].label) && !isSwitch(path[path.length-1].label));
    for(var i = 0; i<path.length; i++){
        if(isSwitch(path[i].label)){
            let fromEdge = path[i].getEdge(path[i-1]);
            let toEdge = path[i].getEdge(path[i+1]);
            path[i].edges.forEach((edge)=>{
                if(dynamicEdges.indexOf(edge.id) === -1){
                    return;
                }
                if(edge.id === fromEdge.id || edge.id === toEdge.id){
                    usedDynamicEdges.push(edge.id);
                }else{
                    unusedDynamicEdges.push(edge.id);
                }
               dynamicEdges.splice(dynamicEdges.indexOf(edge.id), 1);
            });
        }
    }
}

function colorGraphForDijkstra(walkedEdges) {

    let time = 0;
    for(let i= 0;i<=walkedEdges.length; ++i) {
        setTimeout(function () {
            let edge = edges.get(walkedEdges[i]);
            edge.color = "#aa0000";
            edge.width = '3';
            let node = nodes.get(edge.to);
            node.color = '#ECF50C';
            nodes.update(node);
            edges.update(edge);
        }, 1500 + (++time * 500));
    };
}

function refreshGraphColor(walkedEdges) {

    walkedEdges.forEach(function (data) {
        let edge = edges.get(data);
            if(edge.dashes){
                edge.color = "#aa0f2f";
            } else {
                edge.color= '#4F7BCD';
            }
            let node = nodes.get(edge.to);
            node.color = '#4F7BCD';
            nodes.update(node);
            edge.width = '2';
            edges.update(edge);
    });

    unusedDynamicEdges.forEach(data => {
        let edge = edges.get(data);
        if(edge.dashes){
            edge.color = "rgba(61,61,66,0.74)";
        }
        edge.width = '2';
        edges.update(edge);
    })
    selectedDemand.style = 'border: 1px solid; width: 80px;background:indianred';

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
        currNode.edges.forEach((edge,neighbor) => {
            let alt = distances.get(currNode) + edge.weight;
            if(distances.get(currNode) === Infinity){
                alt = edge.weight;
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



function showAndCollectDemands() {
    var createTableButton = document.getElementById('collect-demand');
    createTableButton.disabled=true;

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
        cell.id = 'd-' + i;
        cell.style = 'border: 1px solid; width: 80px;';
        cell.appendChild(document.createTextNode(demands[i].demandValue + ': ' + demands[i].from + ' -> ' + demands[i].to));
        roww.appendChild(cell);
    };

    tableBody.appendChild(roww);
    table.appendChild(tableBody);
    document.body.appendChild(table);
}

function createTable() {
    var createTableButton = document.getElementById('table-demand');
    createTableButton.disabled=true;
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

nodeA.addNewEdge(nodeC, 100, 0);
nodeA.addNewEdge(nodeB, 3, 1);
nodeA.addNewEdge(nodeD, 4, 2);
nodeD.addNewEdge(nodeC, 3, 3);
nodeD.addNewEdge(nodeE, 8, 4);
nodeE.addNewEdge(nodeF, 10, 5);
nodeB.addNewEdge(nodeG, 9, 6);
nodeE.addNewEdge(nodeG, 50, 7);


var nodes = dijkstra(g, nodeA, nodeF);
for(var i = 0; i<nodes.length-1; i++){
    console.log(nodes[i].label + "-" + nodes[i].getEdge(nodes[i+1]).id + "->" + nodes[i+1].label);
}*/

