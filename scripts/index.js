// Import(s)
// *********
import { displayFilters } from "../scripts/display.js";
import { displayRecipes } from "../scripts/display.js";
/********************************************************************
 * @description - initialisation de la page d'accueil (index.html)
 * @function (init)
 */
function init() {
    displayRecipes(recipes);
    displayFilters (recipes);
}

document.addEventListener('DOMContentLoaded', () => {
    init ();
})