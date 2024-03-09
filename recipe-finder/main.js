//DOM Elements
const recipesContainer = document.getElementById('recipesContainer');
const search = document.getElementById('search');
const recipesList = [];

getData();

search.addEventListener('input', (e) => filterData(e.target.value));

async function getData() {
    const res = await fetch('https://api.edamam.com/api/recipes/v2?type=public&app_id=f4b7c009&app_key=fbbf900ef6f43f594759fd8fa1ad495d&health=vegan');
    const results = await res.json();
    const recipes = results.hits;

    recipes.forEach(recipe => {
        let recipeItem = recipe.recipe;

        let newRecipe = document.createElement('a');
        newRecipe.setAttribute('href', recipeItem.url)
        newRecipe.classList.add('recipe');
        newRecipe.innerHTML = `
            <h3 class="recipe-title">${recipeItem.label}</h3>
            <div class="recipe-info">
                <small><span>${recipeItem.ingredients.length}</span> INGREDIENTS</small>
                <small class="user">${recipeItem.source}</small>
            </div>
            <div class="recipe-img-container">
                <img class="recipe-img" src="${recipeItem.image}">
            </div>
        `

        recipesList.push(newRecipe);
        recipesContainer.appendChild(newRecipe);
    });

}

function filterData(searchTerm) {
    recipesList.forEach(recipe => {
        if (recipe.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            recipe.classList.remove('hide');
        } else {
            recipe.classList.add('hide');
        }
    })
}