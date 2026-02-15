
const url = "http://localhost:5000";
function insertRow(){
    console.log("Inserting");
    fetch("http://localhost:5000/insertInto")
    .then(response => response.json())
    .then(data => console.log(data))
    .then(error => console.log(error))
}

function getTables(){
    console.log("Getting tables");
    fetch("http://localhost:5000/getTables")
    .then(response => response.json())
    .then(data => console.log(data))
    .then(error => console.log(error))
}