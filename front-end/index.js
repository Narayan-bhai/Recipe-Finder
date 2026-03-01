
const url = "http://localhost:5000";

window.onload = function() {
    console.log("cookie",this.document.cookie)
};

function goToLogin(){
    window.location.href = "login.html";
}
function goToRegister(){
    window.location.href="register.html";
}
function showLoginCard(){
    const card = document.querySelector(".card");
    card.style.display = "block";
}
async function searchRecipes(recipeName) {
    return fetch(
            url+`/searchRecipes?name=${recipeName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
        .then(async response => {
            data = await response.json()
            if(response.status == 401){
                showLoginCard();
            }
            if(!response.ok) throw new Error(data.message)
            return data
        });
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
        .then(async response => {
            data = await response.json()
            if(!response.ok) throw new Error(data.message)
            return data
        });
}



let lastSearchResults = [];

function findRecipes() {
    const recipeName = document.getElementById("recipeInput").value;
    const recipeCount = 10;

    searchRecipes(recipeName)
    .then(data => {
        const recipesDiv = document.querySelector(".recipes");
        const detailDiv = document.querySelector(".recipe-detail");
        const backButton = document.getElementById("backButton");

        detailDiv.innerHTML = ""; 
        backButton.style.display = "none"; 

        recipesDiv.innerHTML = "";

        if (!data.recipes || data.recipes.length === 0) {
            recipesDiv.innerHTML = "<p>No recipes found.</p>";
            return;
        }

        const recipesToShow = data.recipes.slice(0, recipeCount);
        lastSearchResults = recipesToShow; 

        recipesToShow.forEach(recipe => {
            console.log(recipe)
            const id = recipe[0];
            const name = recipe[1];
            const owner = recipe[4] ?? "Unknown"; 
            const avg = recipe[2] ?? 0;
            const count = recipe[3] ?? 0;

            const card = document.createElement("div");
            card.classList.add("recipe-card");
            card.onclick = () => loadRecipe(id);

            card.innerHTML = `
                <h3>${name}</h3>
                <p class="owner">Owner: ${owner}</p>
                <p class="rating">⭐ ${avg} (${count} ratings)</p>
            `;

            recipesDiv.appendChild(card);
        });
    })
    .catch(error => console.log("Error while finding recipe", error.message));
}

function loadRecipe(recipeId) {
    getRecipeById(recipeId)
    .then(data => {
        const recipe = data.recipe;
        const recipesDiv = document.querySelector(".recipes");
        const detailDiv = document.querySelector(".recipe-detail");
        const backButton = document.getElementById("backButton");

        // Hide the recipe list
        recipesDiv.style.display = "none";

        detailDiv.innerHTML = `
            <h1>${recipe.name}</h1>
            <h3>Ingredients</h3>
            <ul>
                ${recipe.ingredients.map(i => `
                    <li>
                        ${i.quantity ? i.quantity : ""} 
                        ${i.unit ? i.unit : ""} 
                        ${i.size ? "(" + i.size + ")" : ""} 
                        ${i.name} 
                        ${i.notes ? "- " + i.notes : ""} 
                    </li>
                `).join("")}
            </ul>
            <h3>Instructions</h3>
            <ol>
                ${recipe.instructions.map(step => `<li>${step.trim()}</li>`).join("")}
            </ol>
        `;

        backButton.style.display = "inline-block"; // show back button
    })
    .catch(error => console.log("Error while getting recipe by id", error.message));
}

function showRecipeList() {
    const recipesDiv = document.querySelector(".recipes");
    const detailDiv = document.querySelector(".recipe-detail");
    const backButton = document.getElementById("backButton");

    detailDiv.innerHTML = ""; // clear detail
    recipesDiv.style.display = "flex"; // show list
    backButton.style.display = "none"; // hide back
}