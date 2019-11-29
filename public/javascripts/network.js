class Demand {
    constructor(from, to, weight) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }
}

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
    {id:11, label: 's1', shape: "box", color:'#32cd32'},
    {id:12, label: 's2', shape: "box", color:'#32cd32'},
    {id:13, label: 's3', shape: "box", color:'#32cd32'},
    {id:14, label: 's4', shape: "box", color:'#32cd32'},

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
    {id: 12, from: 11, to:0,dashes: true, label:1},
    {id: 13, from: 11, to:7,dashes: true, label:1},
    {id: 14, from: 11, to:4,dashes: true, label:1},
    {id: 15, from: 11, to:2,dashes: true, label:1},
    //2
    {id: 16, from: 12, to:0,dashes: true, label:1},
    {id: 17, from: 12, to:3,dashes: true, label:1},
    {id: 18, from: 12, to:6,dashes: true, label:1},
    {id: 19, from: 12, to:7,dashes: true, label:1},
    //3
    {id: 20, from: 13, to:1,dashes: true, label:1},
    {id: 21, from: 13, to:6,dashes: true, label:1},
    {id: 22, from: 13, to:8,dashes: true, label:1},
    //3
    {id: 23, from: 14, to:4,dashes: true, label:1},
    {id: 24, from: 14, to:5,dashes: true, label:1},
    {id: 25, from: 14, to:9,dashes: true, label:1},
]);

demandMatrix = [
    ['-', '', 20, '', '', '', '', '', '', 9],
    ['', '-','' , '', '', '', '', '', '', ''],
    ['', '','-' , '', '', '', '', '', '', ''],
    ['', '','' , '-', '', '', '', '', '', ''],
    ['', '','' , '', '-', '', '', '', '', ''],
    ['', '','' , '', '', '-', '', '', '', ''],
    ['', '','' , '', '', 10, '-', '', '', ''],
    ['', '',12 , '', '', '', '', '-', '', 5],
    ['-', '', '', '', '', '', '', '', '-', ''],
    ['-', '', '', '', '', '', '', '', '', '-']];


var container = document.getElementById('mynetwork');
var data = {
    nodes: nodes,
    edges: edges
};


var options = {};
var network = new vis.Network(container, data, options);

function changeSelectedEdgeColor(selected){
    var edge = edges.get(selected);
    edge.color = "#aa0000";
    edge.width = '3';
    edges.update(edge);
    console.log('pushed');
}

function createTable() {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');

    table.style= 'border: 1px solid';
    demandMatrix.forEach(function(rowData) {
        var row = document.createElement('tr');

        rowData.forEach(function(cellData) {
            var cell = document.createElement('td');
            cell.style= 'border: 1px solid; width: 30px;';
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
    table.appendChild(tableBody);
    document.body.appendChild(table);
}

