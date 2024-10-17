import { displayRecipes, searchRecipes, updateTotRecipes } from "../scripts/recipes.js";
import { displayFilters, displayOptions } from "../scripts/filters.js";

// Variable(s) globale(s)
// **********************
const arrayFilters = {
    ingredients: [],
    appliance: [],
    ustensils: []
};
let recipesMainSearch = [...recipes]; // Copie des recettes

// ***********************************************************
// Listener pour la recherche dans la barre principale
document.querySelector("#searchbar").addEventListener("input", handleSearchBarInput);   // encodage de mots
document.querySelector("#btn-searchbar").addEventListener("click", handleSearchButtonClick);    // clic sur la loupe

/********************************************************************
 * @description - créer un nouvel élément <li> dans la liste sélectionnée
 * @function (addSelectedOption)
 * @param {field} - option sélectionnée dans le dropdown menu
 * @param {selectedList} - liste des options sélectionnées dans le filtre
 * @param {filterName} - nom du filtre
 */
function addSelectedOption(selectedList, field, filterName) {
    const newLi = document.createElement("li");
    newLi.classList.add("list-group-item", "bg-color-yellow", "d-flex", "justify-content-between", "align-items-center", "mb-1", "text-start");
    newLi.textContent = field;
    arrayFilters[filterName].push(field);

    // Créer le bouton de suppression (croix)
    const deleteBtn = createDeleteButton(newLi, field, filterName);
    newLi.appendChild(deleteBtn);
    selectedList.appendChild(newLi);
}

/********************************************************************
 * @description - // Vérification des ustensiles dans les recettes
 * @function (checkAppliance)
 * @param {recipe} - recette
 * @param {selectedAppliance} - tableau des appareils sélectionnés
 * @return {boolean} -  True si l'appareil est présent dans la recette
 */
function checkAppliance(recipe, selectedAppliance) {
    if (!selectedAppliance.length) return true;
    return selectedAppliance[0].toLowerCase().includes(recipe.appliance.toLowerCase());
}

/********************************************************************
 * @description - // Vérification des ingredients dans les recettes
 * @function (checkIngredients)
 * @param {recipe} - recette
 * @param {selectedIngredients} - tableau des ingredients sélectionnés
 * @return {boolean} -  True si les ingredients sont présents dans la recette
 */
function checkIngredients(recipe, selectedIngredients) {
    if (!selectedIngredients.length) return true;
    return selectedIngredients.every(filterIng => 
        recipe.ingredients.some(ing => ing.ingredient.toLowerCase() === filterIng.toLowerCase())
    );
}

/********************************************************************
 * @description - // Vérification des ustensiles sont présents dans la recette
 * @function (checkUstensils)
 * @param {recipe} - recette
 * @param {selectedUstensils} - tableau des ustensils sélectionnés
 * @return {boolean} -  True si tous les ustensiles correspondent
 */
function checkUstensils(recipe, selectedUstensils) {
    if (!selectedUstensils.length) return true;
    return selectedUstensils.every(filterUst => 
        recipe.ustensils.some(ust => ust.toLowerCase() === filterUst.toLowerCase())
    );
}

/********************************************************************
 * @description - Créer le bouton de suppression (croix)
 * @function (createDeleteButton)
 * @param {field} - option sélectionnée dans le dropdown menu
 * @param {listItem} - élément sur lequel ajouter la croix
 * @return {deleteBtn} - élément bouton créé
 */
function createDeleteButton(listItem, field, filterName) {
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-sm");
    deleteBtn.textContent = "✕";
    deleteBtn.addEventListener("click", () => removeSelectedOption(listItem, field, filterName));
    return deleteBtn;
}

/********************************************************************
 * @description - Suppression des options sélectionnées dans le dropdown
 * @function (deleteSelectedOptions)
 * @param {filterName} - nom du filtre
 */
function deleteSelectedOptions(filterName) {
    const divOptions = document.querySelector(`#div-options-${filterName}`);
    const items = divOptions.querySelectorAll("a.dropdown-item");

    arrayFilters[filterName].forEach(field => {
        items.forEach(item => {
            if (item.textContent.toLowerCase() === field.toLowerCase()) {
                item.style.display = "none";
            }
        });
    });
}

/********************************************************************
 * @description - Filtrage des recettes selon les options sélectionnées
 * @function (filterRecipes)
 * @param {recipes} - recettes
 * @param {filters} - tableau des options sélectionnés
 * @return {filteredRecipes} -  recettes sélectionnées
 */
export function filterRecipes(recipes, filters) {
    return recipes.filter(recipe => {
        return checkIngredients(recipe, filters.ingredients) &&
               checkAppliance(recipe, filters.appliance) &&
               checkUstensils(recipe, filters.ustensils);
    });
}

/********************************************************************
 * @description - rechercher et màj des recettes si au moins 3 caractères sont encodés + fermeture de la recherche principale au clic sur la croix (x)
 * @function (handleSearchBarInput)
 * @param {event} - événement déclencheur : encodage dans la barre de recherche principale
 */
function handleSearchBarInput(event) {
    const query = event.target.value;
    if (query.length >= 3) {
        updateRecipes(searchRecipes(query, recipes));
    } else if (query === "") {
        resetRecipes();
    }
}

/********************************************************************
 * @description - rechercher et màj des recettes au clic sur la loupe dans la barre de recherche principale
 * @function (handleSearchButtonClick)
 */
function handleSearchButtonClick() {
    const query = document.querySelector("#searchbar").value;
    if (query) {
        updateRecipes(searchRecipes(query, recipes));
    }
}

/********************************************************************
 * @description - Vérifier si l'option sélectionnée est déjà affichée
 * @function (isOptionSelected)
 * @param {field} - option sélectionnée dans le dropdown menu
 * @param {selectedList} - liste des options sélectionnées dans le filtre
 * @return {boolean} - true si l'option a déjà été sélectionnée
 */
function isOptionSelected(selectedList, field) {
    return Array.from(selectedList.querySelectorAll("li")).some(
        li => li.textContent.trim().toLowerCase() === field.trim().toLowerCase()
    );
}

/********************************************************************
 * @description - Listener pour gérer le sens de l'icône chevron
 * @function (listenBtnFilters)
 * @param {filterName} - nom du filtre
 */
export function listenBtnFilters(filterName) {
    const btnDropdown = document.querySelector(`#btn-filter-${filterName}`);
    const chevron = btnDropdown.querySelector(".chevron");

    btnDropdown.addEventListener("show.bs.dropdown", () => toggleChevron(chevron, "up"));
    btnDropdown.addEventListener("hide.bs.dropdown", () => toggleChevron(chevron, "down"));
}

/********************************************************************
 * @description - Listener sur le champ de recherche ou la loupe dans le dropdown menu pour filtrer les options
 * @function (listenInputSearch)
 * @param {event} - événement ayant déclenché le listener
 * @param {inputSearch} - Champ de recherche dans le dropdown menu
 * @param {btnDropdown} - Bouton d'ouverture du dropdown menu
 */
export function listenInputSearch(event, inputSearch, btnDropdown) {
    const filter = inputSearch.value.toLowerCase();
    const dropdownMenu = btnDropdown.nextElementSibling;
    const items = dropdownMenu.querySelectorAll("a.dropdown-item");

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
export function listenSelectedOption(field, filterName) {
    const selectedList = document.querySelector(`#selected-list-${filterName}`);
    
    if (!isOptionSelected(selectedList, field)) {
        addSelectedOption(selectedList, field, filterName);
    }

    updateFiltersAndRecipes(filterName);
}

/********************************************************************
 * @description - suppression de l'option sélectionnée
 * @function (removeSelectedOption)
 * @param {field} - option sélectionnée dans le dropdown menu
 * @param {listItem} - élément sur lequel ajouter la croix
 * @param {filterName} - nom du filtre
 */
function removeSelectedOption(listItem, field, filterName) {
    listItem.remove();

    arrayFilters[filterName] = arrayFilters[filterName].filter(item => item !== field);

    updateFiltersAndRecipes(filterName);
}

/********************************************************************
 * @description - fermeture de la recherche principale au clic sur la croix (x)
 * @function (resetRecipes)
 */
function resetRecipes() {
    updateRecipes([...recipes]);    // appel de updateRecipes avec une copie de recipes
}

/********************************************************************
 * @description - Listener pour gérer le sens de l'icône chevron
 * @function (toggleChevron)
 * @param {chevron} - élément "chevron"
 * @param {direction} - "up" ou "down"
 */
function toggleChevron(chevron, direction) {
    const upClass = "bi-chevron-up";
    const downClass = "bi-chevron-down";
    chevron.classList.toggle(upClass, direction === "up");
    chevron.classList.toggle(downClass, direction === "down");
}

/********************************************************************
 * @description - màj des options dans le filtre
 * @function (updateAllFilterOptions)
 * @param {results} - recettes sélectionnées
 */
function updateAllFilterOptions(results) {
    displayOptions("ingredients", "ingredient", results);
    displayOptions("appliance", "", results);
    displayOptions("ustensils", "", results);
    
    // supprimer les éléments sélectionnés dans les listes d'options
    Object.keys(arrayFilters).forEach(key => {
        deleteSelectedOptions (key);
    })
}

/********************************************************************
 * @description - màj des filtres et des recettes
 * @function (updateFiltersAndRecipes)
 * @param {filterName} - nom du filtre
 */
function updateFiltersAndRecipes(filterName) {
    const results = filterRecipes(recipesMainSearch, arrayFilters);
    displayRecipes(results);
    updateAllFilterOptions(results);
    updateTotRecipes(results, "filter");
    listenBtnFilters(filterName);
}

/********************************************************************
 * @description - Affichage des recettes sélectionnées, des filtres et du nombre total de recettes correspondants
 * @function (updateRecipes)
 * @param {filteredRecipes} - recettes sélectionnées par la recherche principale
 */
function updateRecipes(filteredRecipes) {
    recipesMainSearch = filteredRecipes;
    displayRecipes(recipesMainSearch);
    displayFilters(recipesMainSearch);
    updateTotRecipes(recipesMainSearch, "main");
}
