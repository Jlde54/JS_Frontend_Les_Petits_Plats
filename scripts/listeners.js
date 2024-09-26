import { displayRecipes } from "../scripts/display.js";

// Listener sur lencodage dans la barre de recherche
document.querySelector("#searchBar").addEventListener("input", (event) => {
    const query = event.target.value;

    // Lancer la recherche si au moins 3 caractères sont entrés
    if (query.length >= 3) {
        searchRecipes(query);
    } else {
        // Vider les résultats si moins de 3 caractères
    }
});

// Fonction de recherche
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