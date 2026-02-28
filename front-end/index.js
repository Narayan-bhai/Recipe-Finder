
const url = "http://localhost:5000";

async function searchRecipes(recipeName) {
    return fetch(
            url+`/searchRecipes?name=${recipeName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
        .then(response => {
            if(response.status!=200) throw new Error(data.message)
            return response
        })
        .then(response => response.json());
}
async function getRecipeById(id) {
    return fetch(
        url+`/getRecipe/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
        .then(response => {
            if(response.status!=200) throw new Error(data.message)
            return response
        })
        .then(response => response.json());
}
function findRecipes() {
    const recipeName = document.getElementById("recipeInput").value;
    const recipeCount =10;

    searchRecipes(recipeName)
    .then(data => {
        const recipesDiv = document.querySelector(".recipes");
        recipesDiv.innerHTML = "";
        if (!data.recipes || data.recipes.length === 0) {
            recipesDiv.innerHTML = "<p>No recipes found.</p>";
            return;
        }

        const recipesToShow = data.recipes.slice(0, recipeCount);
        recipesToShow.forEach(recipe => {
            const id = recipe[0];
            const name = recipe[1];
            const avg = recipe[2] ?? 0;
            const count = recipe[3] ?? 0;

            const card = `
                <div class="recipe-card"
                    onclick="loadRecipe(${id})">

                    <h3>${name}</h3>

                    <p class="rating">
                        ⭐ ${avg} (${count} ratings)
                    </p>

                </div>
            `;
            recipesDiv.innerHTML += card;
        });
    })
    .catch(error => console.log("Error while find recipe",error.message));
}

function loadRecipe(recipeId) {
    getRecipeById(recipeId)
    .then(data => {
        const recipe = data.recipe;
        const detailDiv = document.querySelector(".recipe-detail");

        detailDiv.innerHTML = `
            <h1>${recipe.name}</h1>
            <h3>Ingredients</h3>
            <ul>
                ${recipe.ingredients.map(i => `
                    <li>
                        ${i.name} 
                        ${i.quantity ? i.quantity : ""} 
                        ${i.unit ? i.unit : ""} 
                        ${i.size ? "(" + i.size + ")" : ""} 
                        ${i.notes ? "- " + i.notes : ""}
                    </li>
                `).join("")}
            </ul>

            <h3>Instructions</h3>
            <ol>
                ${recipe.instructions.map(step => `<li>${step.trim()}</li>`).join("")}
            </ol>
        `;
    });
}