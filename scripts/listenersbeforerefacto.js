import { displayRecipes, searchRecipes, updateTotRecipes } from "../scripts/recipes.js";
import { displayFilters, displayOptions } from "../scripts/filters.js";

// Variable(s) globale(s)
// **********************
let arrayFilters = {
    ingredients: [],
    appliance: [],
    ustensils: []
};
let recipesMainSearch = Array.from(recipes);

//***********************************************************
// Listener sur l'encodage dans la barre de recherche principale
document.querySelector("#searchbar").addEventListener("input", (event) => {
    const query = event.target.value;
    // Lancer la recherche si au moins 3 caractères sont encodés
    if (query.length >= 3) {
        // Lancer la recherche correspondante aux caractères encodés
        recipesMainSearch = searchRecipes(query, recipes);
        // Affichage des recettes sélectionnées
        displayRecipes (recipesMainSearch);
        // Création des éléments du DOM pour les Filtres et le total des recettes
        displayFilters (recipesMainSearch);
        // Mise à jour du nombre total de recettes
        updateTotRecipes(recipesMainSearch, "main");
    }
    // Fermer la recherche principale au clic sur la croix (x) et afficher toutes les recettes
    if (query === "") {
        // Affichage des recettes sélectionnées
        displayRecipes (recipes);
        // Création des éléments du DOM pour les Filtres et le total des recettes
        displayFilters (recipes);
        // Mise à jour du nombre total de recettes
        updateTotRecipes(recipes, "main");
        recipesMainSearch = Array.from(recipes);
        
    }
});

//***********************************************************
// Listener sur la loupe dans la barre de recherche principale
document.querySelector("#btn-searchbar").addEventListener("click", () => {
    const query = document.querySelector("#searchbar").value;
    if (query !== "") {
        // Lancer la recherche correspondante aux caractères encodés
        recipesMainSearch = searchRecipes(query, recipes);
        // Affichage des recettes sélectionnées
        displayRecipes (recipesMainSearch);
        displayFilters (recipesMainSearch);
        // Mise à jour du nombre total de recettes
        updateTotRecipes(recipesMainSearch, "main");
    }
});

/********************************************************************
 * @description - supprimer les éléments sélectionnés dans les listes d'options
 * @function (deleteSelectedOptions)
 * @param {filterName} - nom du filtre
 */
function deleteSelectedOptions (filterName){
    // Sélectionner les options de div-options-ingredients
    const divOptions = document.querySelector(`#div-options-${filterName}`);
    const items = divOptions.querySelectorAll("a.dropdown-item"); // Sélection des options

    // Lire les éléments de arrayFilters[filterName]
    arrayFilters[filterName].forEach(field => {
        items.forEach(item => {
            const text = item.textContent.toLowerCase() || item.innerText.toLowerCase();
            if (text.toLowerCase() === (field.toLowerCase())) {
                item.style.display = "none"; // masquer l'élément
            }
        })
    })
}

/********************************************************************
 * @description - Filtrer les recettes sur les options sélectionnées dans tous les filtres
 * @function (filterRecipes)
 * @param {recipes} - recettes
 * @param {arrayFilters} - tableau des options sélectionnées
 */
function filterRecipes (recipes, arrayFilters) {
    const results = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        
        // Vérification du filtre ingredients
        let ingredientsOK = (arrayFilters.ingredients.length === 0);
        if (!ingredientsOK) {
            ingredientsOK = true;
            for (let j = 0; j < arrayFilters.ingredients.length; j++) {
                let foundIngredient = false;
                for (let k = 0; k < recipe.ingredients.length; k++) {
                    if (recipe.ingredients[k].ingredient.toLowerCase() === arrayFilters.ingredients[j].toLowerCase()) {
                        foundIngredient = true;
                        break;
                    }
                }
                if (!foundIngredient) {
                    ingredientsOK = false;
                    break;
                }
            }
        }
        
        // Vérification du filtre appliance
        let appliancesOK = (arrayFilters.appliance.length === 0);
        if (!appliancesOK) {
            for (let j = 0; j < arrayFilters.appliance.length; j++) {
                if (recipe.appliance.toLowerCase() === arrayFilters.appliance[j].toLowerCase()) {
                    appliancesOK = true;
                    break;
                }
            }
        }
        
        // Vérification du filtre ustensils
        let ustensilsOK = (arrayFilters.ustensils.length === 0);
        if (!ustensilsOK) {
            ustensilsOK = true;
            for (let j = 0; j < arrayFilters.ustensils.length; j++) {
                let filterUstensil = arrayFilters.ustensils[j].toLowerCase();
                let foundUstensil = false;
                for (let k = 0; k < recipe.ustensils.length; k++) {
                    if (recipe.ustensils[k].toLowerCase() === filterUstensil) {
                        foundUstensil = true;
                        break;
                    }
                }
                if (!foundUstensil) {
                    ustensilsOK = false;
                    break;
                }
            }
        }

        if (ingredientsOK && appliancesOK && ustensilsOK) {
            results.push(recipe);
        }
    }
    return results;
}

/********************************************************************
 * @description - Listener pour gérer le sens de l'icône chevron
 * @function (listenBtnFilters)
 * @param {filterName} - 
 */
export function listenBtnFilters(filterName) {
        const btnDropdown = document.querySelector(`#btn-filter-${filterName}`);
        const chevron = btnDropdown.querySelector(".chevron");
    
        // Événement déclenché lorsque le dropdown s'ouvre
        btnDropdown.addEventListener("show.bs.dropdown", () => {
            chevron.classList.remove("bi-chevron-down");
            chevron.classList.add("bi-chevron-up");
        });
    
        // Événement déclenché lorsque le dropdown se ferme
        btnDropdown.addEventListener("hide.bs.dropdown", () => {
            chevron.classList.remove("bi-chevron-up");
            chevron.classList.add("bi-chevron-down");
        });
}

/********************************************************************
 * @description - Listener sur le champ de recherche ou la loupe dans le dropdown menu pour filtrer les options
 * @function (listenInputSearch)
 * @param {event} - événement ayant déclenché le listener
 * @param {inputSearch} - Champ de recherche dans le dropdown menu
 * @param {btnDropdown} - Bouton d'ouverture du dropdown menu
 */
export function listenInputSearch(event, inputSearch, btnDropdown) {
    const filter = inputSearch.value.toLowerCase();   // Champ de recherche en minuscules
    const dropdownMenu = btnDropdown.nextElementSibling;    // retourne l'élément immédiatement suivant
    const items = dropdownMenu.querySelectorAll("a.dropdown-item"); // Sélection des options
    items.forEach(item => {
        const text = item.textContent || item.innerText;
        if (text.toLowerCase().indexOf(filter) > -1) {
            item.style.display = ""; // Afficher l'élément
        } else {
            item.style.display = "none"; // Masquer l'élément
        }
    })
    event.stopPropagation();
}

/********************************************************************
 * @description - Listener sur l'option sélectionnée dans le dropdown menu
 * @function (listenSelectedOption)
 * @param {field} - option sélectionnée dans le dropdown menu
 * @param {filterName} - nom du filtre
 */
export function listenSelectedOption (field, filterName) {
    // Mise à jour de l'affichage des options sélectionnées
    const selectedList = document.querySelector(`#selected-list-${filterName}`);
    const listItems = selectedList.querySelectorAll("li");
    const listItemsArray = Array.from(listItems);

    // Vérifier si l'option sélectionnée est déjà affichée
    let exists = false;
    exists = listItemsArray.some(li => li.textContent.trim().toLowerCase() === field.trim().toLowerCase());

    // Si non, créer un nouvel élément <li> dans la liste sélectionnée
    if (!exists) {
        const newLi = document.createElement("li");
        newLi.classList.add("list-group-item", "bg-color-yellow", "d-flex", "justify-content-between", "align-items-center", "mb-1");

        // Ajouter le texte du filtre dans l'affichage
        newLi.textContent = field;

        // Ajouter le texte du filtre dans le tableau correspondant
        arrayFilters[`${filterName}`].push(field);

        // Créer le bouton de suppression (croix)
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn", "btn-sm");
        deleteBtn.textContent = "✕";

        // Ajouter le bouton à l'élément <li>
        newLi.appendChild(deleteBtn);

        // Ajouter le nouvel élément <li> à la liste sélectionnée
        selectedList.appendChild(newLi);

        // Listener sur le bouton de suppression de l'option sélectionnée
        deleteBtn.addEventListener("click", () => {
            // suppression de l'option dans la liste affichée
            selectedList.removeChild(newLi);
            // suppression de l'option dans le tableau correspondant
            let index = arrayFilters[`${filterName}`].findIndex(item => item === field);
            if (index !== -1) {
                arrayFilters[`${filterName}`].splice(index, 1);
            }
            // Màj des recettes, filtres et total des recettes
            const results = filterRecipes (recipesMainSearch, arrayFilters);
            displayRecipes (results);
            displayOptions ("ingredients", "ingredient", results);
            displayOptions ("appliance", "", results);
            displayOptions ("ustensils", "", results);
            updateTotRecipes (results, "filter");

            // supprimer les éléments sélectionnés dans les listes d'options
            Object.keys(arrayFilters).forEach(key => {
                deleteSelectedOptions (key);
            })
        });
    }
    // Màj des recettes, filtres et total des recettes
    const results = filterRecipes (recipesMainSearch, arrayFilters);
    displayRecipes (results);
    displayOptions ("ingredients", "ingredient", results);
    displayOptions ("appliance", "", results);
    displayOptions ("ustensils", "", results);
    updateTotRecipes (results, "filter");
    listenBtnFilters(filterName);

    // supprimer les éléments sélectionnés dans les listes d'options
    Object.keys(arrayFilters).forEach(key => {
        deleteSelectedOptions (key);
    })
}
