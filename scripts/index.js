// Import(s)
// *********
import { displayFilters } from "../scripts/display.js";
import { displayRecipes } from "../scripts/display.js";
import { displayTotRecipes } from "../scripts/display.js";
import { displaySelectedItems } from "../scripts/display.js";

/********************************************************************
 * @description - initialisation de la page d'accueil (index.html)
 * @function (init)
 */
function init() {
    displayRecipes();
    displayFilters ();
    // displayTotRecipes ();
    displaySelectedItems ();
}

document.addEventListener('DOMContentLoaded', () => {
    init ();
})