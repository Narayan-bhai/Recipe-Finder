
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
        .then(async response => {
            data = await response.json()
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
// function findRecipes() {
//     const recipeName = document.getElementById("recipeInput").value;
//     const recipeCount =10;

//     searchRecipes(recipeName)
//     .then(data => {
//         const recipesDiv = document.querySelector(".recipes");
//         recipesDiv.innerHTML = "";
//         if (!data.recipes || data.recipes.length === 0) {
//             recipesDiv.innerHTML = "<p>No recipes found.</p>";
//             return;
//         }

//         const recipesToShow = data.recipes.slice(0, recipeCount);
//         recipesToShow.forEach(recipe => {
//             const id = recipe[0];
//             const name = recipe[1];
//             const avg = recipe[2] ?? 0;
//             const count = recipe[3] ?? 0;

//             const card = `
//                 <div class="recipe-card"
//                     onclick="loadRecipe(${id})">

//                     <h3>${name}</h3>

//                     <p class="rating">
//                         ⭐ ${avg} (${count} ratings)
//                     </p>

//                 </div>
//             `;
//             recipesDiv.innerHTML += card;
//         });
//     })
//     .catch(error => console.log("Error while find recipe",error.message));
// }

// function loadRecipe(recipeId) {
//     getRecipeById(recipeId)
//     .then(data => {
//         const recipe = data.recipe;
//         const detailDiv = document.querySelector(".recipe-detail");

//         detailDiv.innerHTML = `
//             <h1>${recipe.name}</h1>
//             <h3>Ingredients</h3>
//             <ul>
//                 ${recipe.ingredients.map(i => `
//                     <li>
//                         ${i.name} 
//                         ${i.quantity ? i.quantity : ""} 
//                         ${i.unit ? i.unit : ""} 
//                         ${i.size ? "(" + i.size + ")" : ""} 
//                         ${i.notes ? "- " + i.notes : ""}
//                     </li>
//                 `).join("")}
//             </ul>

//             <h3>Instructions</h3>
//             <ol>
//                 ${recipe.instructions.map(step => `<li>${step.trim()}</li>`).join("")}
//             </ol>
//         `;
//     })
//     .catch(error => console.log("Error while geting recipe by id",error.message));
// }



let lastSearchResults = []; // Store last search

function findRecipes() {
    const recipeName = document.getElementById("recipeInput").value;
    const recipeCount = 10;

    searchRecipes(recipeName)
    .then(data => {
        const recipesDiv = document.querySelector(".recipes");
        const detailDiv = document.querySelector(".recipe-detail");
        const backButton = document.getElementById("backButton");

        detailDiv.innerHTML = ""; // Clear detail
        backButton.style.display = "none"; // Hide back initially

        recipesDiv.innerHTML = "";

        if (!data.recipes || data.recipes.length === 0) {
            recipesDiv.innerHTML = "<p>No recipes found.</p>";
            return;
        }

        const recipesToShow = data.recipes.slice(0, recipeCount);
        lastSearchResults = recipesToShow; // Store for back button

        recipesToShow.forEach(recipe => {
            const id = recipe[0];
            const name = recipe[1];
            const owner = recipe[4] ?? "Unknown"; // assuming 5th field is owner
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