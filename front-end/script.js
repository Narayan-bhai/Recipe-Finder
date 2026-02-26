
const url = "http://localhost:5000";
function insertRow(){
    console.log("Inserting");
    fetch(url+"/insertInto")
    .then(response => response.json())
    .then(data => console.log(data))
    .then(error => console.log(error))
}

function getTables(){
    console.log("Getting tables");
    fetch(url+"/getTables")
    .then(response => response.json())
    .then(data => console.log(data))
    .then(error => console.log(error))
}

function getRecipes(recipeName){
    console.log("Getting recipes");
    return fetch(`http://localhost:5000/getRecipes?name=${encodeURIComponent(recipeName)}`)
        .then(response => response.json())
        .catch(error => console.log(error));
}


function showRecipes() {

    const recipeName = document.getElementById("recipeInput").value;
    const recipeCount = parseInt(document.getElementById("recipeCount").value) || 1;

    getRecipes(recipeName).then(data => {

        const recipesDiv = document.querySelector(".recipes");
        recipesDiv.innerHTML = "";

        if (!data.recipes || data.recipes.length === 0) {
            recipesDiv.innerHTML = "<p>No recipes found.</p>";
            return;
        }

        const recipesToShow = data.recipes.slice(0, recipeCount);

        recipesToShow.forEach(recipe => {

            const name = recipe[0];
            const instructions = recipe[1].split("|");
            const ingredients = recipe[2].split(",");

            const recipeHTML = `
                <div class="recipe-card">
                    <h2>${name}</h2>

                    <h3>Ingredients</h3>
                    <ul>
                        ${ingredients.map(i => `<li>${i.trim()}</li>`).join("")}
                    </ul>

                    <h3>Instructions</h3>
                    <ol>
                        ${instructions.map(step => `<li>${step.trim()}</li>`).join("")}
                    </ol>
                </div>
                <hr>
            `;

            recipesDiv.innerHTML += recipeHTML;
        });
    });
}
