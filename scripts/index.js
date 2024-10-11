// Import(s)
// *********
import { displayFilters } from "../scripts/filters.js";
import { displayRecipes } from "../scripts/recipes.js";
import { updateTotRecipes } from "../scripts/recipes.js";

// Variable(s) globale(s)
// **********************
// export let recipesMainSearch = Array.from(recipes);

/********************************************************************
 * @description - initialisation de la page d'accueil (index.html)
 * @function (init)
 */
function init() {
    displayRecipes (recipes);   // Affichage des cartes recettes
    displayFilters (recipes);   // Affichage des filtres et du total des recettes
    updateTotRecipes (recipes); // Mise à jour du nombre total des recettes
}

document.addEventListener('DOMContentLoaded', () => {   // attente que la structure HTML soit chargée
    init ();
})