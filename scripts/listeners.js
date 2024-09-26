import { displayRecipes } from "../scripts/display.js";
//***********************************************************
// Listener sur l'encodage dans la barre de recherche principale
document.querySelector("#searchbar").addEventListener("input", (event) => {
    const query = event.target.value;

    // Lancer la recherche si au moins 3 caractères sont entrés
    if (query.length >= 3) {
        searchRecipes(query);
    }

    if (query === "") {
        const divTotRecipes = document.querySelector("#tot-recipes");
        divTotRecipes.textContent = `${recipes.length} recettes`;
        displayRecipes (recipes);
    }
});
//***********************************************************
// Listener sur la loupe dans la barre de recherche
document.querySelector("#btn-searchbar").addEventListener("click", (event) => {
    const query = document.querySelector("#searchbar").value;
    searchRecipes(query);
});


/***********************************************************
 * @description - Fonction de recherche
 * @function (searchRecipes)
 * @param {*} query 
 */
function searchRecipes(query) {
    // Convertir la requête en minuscule pour une recherche insensible à la casse
    const searchQuery = query.toLowerCase();
    const results = [];

    // Parcourir les recettes avec une boucle for
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];

        // Vérifier si le nom, la description ou les ingrédients contiennent la requête
        if (
            recipe.name.toLowerCase().includes(searchQuery) ||
            recipe.description.toLowerCase().includes(searchQuery)
        ) {
            results.push(recipe);
        } else {
            // Parcourir les ingrédients
            for (let j = 0; j < recipe.ingredients.length; j++) {
                const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
                if (ingredient.includes(searchQuery)) {
                    results.push(recipe);
                    break; // Arrêter la boucle si un ingrédient correspond
                }
            }
        }
    }
    const divTotRecipes = document.querySelector("#tot-recipes");
    divTotRecipes.textContent = `${results.length} recettes`;

    displayRecipes (results);
}