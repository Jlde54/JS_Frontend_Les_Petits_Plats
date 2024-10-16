// Import(s)
// *********
import { setAttributes } from "../scripts/utils.js";
import { listenInputSearch, listenSelectedOption, listenBtnFilters } from "../scripts/listeners.js";

/********************************************************************
 * @description - Création des éléments de la section Filtres et nbre total de recettes
 * @function (displayFilters)
 */
export function displayFilters(recipes) {

    const sectionFilters = document.querySelector("#section-filters");
    sectionFilters.replaceChildren();

    // div contenant les filtres et le nbre total de recettes
    const divSectionRow = document.createElement("div");
    setAttributes(divSectionRow, {"class": "row"});
    sectionFilters.appendChild(divSectionRow);

    // div contenant le nombre total de recettes
    const divTotRecipes = document.createElement("div");
    setAttributes(divTotRecipes, {"id": "tot-recipes", "class": "col-12 col-lg-5 order-1 order-lg-2 text-center text-lg-end pt-1 mb-3 mb-lg-0 fw-bold fs-5 anton"});
    divSectionRow.appendChild(divTotRecipes);

    // div contenant les Dropdown menus + les options sélectionnées
    const divDropdownAlerts = document.createElement("div");
    setAttributes(divDropdownAlerts, {"class": "col-12 col-lg-7 order-2 order-lg-1"});
    divSectionRow.appendChild(divDropdownAlerts);

    // div contenant les 3 dropdown menus
    const divDropdownAlertsRow = document.createElement("div");
    setAttributes(divDropdownAlertsRow, {"class": "row"});
    divDropdownAlerts.appendChild(divDropdownAlertsRow);

    // Appel de diplayFilter pour la création du contenu des 3 filtres
    displayFilter("ingredients", "ingredient", "Ingrédients", recipes);
    displayFilter("appliance", "", "Appareils", recipes);
    displayFilter("ustensils", "", "Ustensils", recipes);

    /********************************************************************
     * @description - affichage des Filtres
     * @function (displayFilter)
     * @param {filterName} - nom de la propriété du filtre dans le fichier recipes.js
     * @param {fieldName} - nom du champ dans la propriété dans le fichier recipes.js
     * @param {titleName} - nom du titre à afficher dans le bouton du filtre
     */
    function displayFilter (filterName, fieldName, titleName, recipes) {
        // Création de la <div> contenant le dropdown menu
        const divDropdownAlert = document.createElement("div");
        setAttributes(divDropdownAlert, {"id": `dropdown-${filterName}`, "class": "col-md-4 text-center"});
        divDropdownAlertsRow.appendChild(divDropdownAlert);

        const divDropdown = document.createElement("div");
        setAttributes(divDropdown, {"class": "dropdown mb-3"});
        divDropdownAlert.appendChild(divDropdown);

        // Bouton d'ouverture du dropdown menu
        const btnDropdown = document.createElement("button");
        setAttributes(btnDropdown, {"class": "btn bg-white btn-lg fs-6 w-100 d-flex justify-content-between align-items-center", "type": "button", "id": `btn-filter-${filterName}`, "data-bs-toggle": "dropdown", "aria-expanded": "false"});
        btnDropdown.innerHTML = `<span>${titleName}</span><i class="bi bi-chevron-down ms-auto chevron"></i>`;
        divDropdown.appendChild(btnDropdown);

        // Listener sur les boutons d'ouverture de chaque filtre pour gérer le sens de l'icône chevron
        listenBtnFilters(`${filterName}`);

        // Liste contenant le champ de recherche et les options du Dropdown menu
        const ulDropdown = document.createElement("ul");
        setAttributes(ulDropdown, {"id": `dropdown-menu-${filterName}`, "class": "dropdown-menu mx-2 menu-max-height", "aria-labelledby": `btn-filter-${filterName}`});
        divDropdown.appendChild(ulDropdown);

        // Champ de recherche dans le dropdown menu
        const liSearch = document.createElement("li");
        ulDropdown.appendChild(liSearch);

        const divSearch = document.createElement("div");
        setAttributes(divSearch, {"class": "search-container border m-3"});
        liSearch.appendChild(divSearch);

        const inputSearch = document.createElement("input");
        setAttributes(inputSearch, {"id": `search-input-${filterName}`, "class": "search-input", "type": "search", "aria-label": "Recherche"});
        divSearch.appendChild(inputSearch);

        // Listener sur le champ de recherche dans le dropdown menu pour filtrer les options
        inputSearch.addEventListener("input", (event) => {
            listenInputSearch(event, inputSearch, btnDropdown);
        })

        // Bouton de submit de la recherche dans le dropdown menu (loupe)
        const btnSubmit = document.createElement("button");
        setAttributes(btnSubmit, {"id": `search-btn-${filterName}`, "class": "search-button"});
        btnSubmit.innerHTML = "<i class='bi bi-search'></i>";
        divSearch.appendChild(btnSubmit);
        
        // Listener pour filtrer les options via le bouton loupe
        btnSubmit.addEventListener("click", (event) => {
            listenInputSearch(event, inputSearch, btnDropdown);
        })

        // div contenant la liste des options
        const divOptions = document.createElement("div");
        setAttributes(divOptions, {"id": `div-options-${filterName}`});
        ulDropdown.appendChild(divOptions);

        // Affichage des options pour chaque filtre
        displayOptions(filterName, fieldName, recipes);
        
        // Liste qui contiendra les options selectionnée dans le dropdown menu
        const selectedList = document.querySelector(`#selected-list-${filterName}`);
        if (!selectedList) {
            const selectedList = document.createElement("ul");
            setAttributes(selectedList, {"id": `selected-list-${filterName}`, "class": "list-group mt-3"});
            divDropdown.appendChild(selectedList);
        }
    }
}

/********************************************************************
 * @description - génère et affiche les options dans chaque Filtre
 * @function (displayOptions)
 * @param {filterName} - nom de la propriété du filtre dans le fichier recipes.js
 * @param {fieldName} - nom du champ dans la propriété dans le fichier recipes.js
 * @param {recipes} - nom du titre à afficher dans le bouton du filtre
 */
export function displayOptions (filterName, fieldName, recipes) {
    // Remplissage du tableau "arrayFilter" avec les options correspondantes au filtre en paramètre
    let arrayFilter = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
    
        if (filterName === "ingredients") {
            for (let j = 0; j < recipe[filterName].length; j++) {
                const item = recipe[filterName][j];
                if (!arrayFilter.includes(item[fieldName])) {
                    arrayFilter.push(item[fieldName]);
                }
            }
        } else if (filterName === "appliance") {
            if (!arrayFilter.includes(recipe.appliance)) {
                arrayFilter.push(recipe.appliance);
            }
        } else if (filterName === "ustensils") {
            for (let k = 0; k < recipe[filterName].length; k++) {
                const item = recipe[filterName][k];
                if (!arrayFilter.includes(item)) {
                    arrayFilter.push(item);
                }
            }
        }
    }

    // Tri du tableau arrayFilter par ordre alphabétique
    arrayFilter.sort((a, b) => {
        if(a < b) return -1;
        if(a > b) return 1;
        return 0;
    });

    const divOptions = document.querySelector(`#div-options-${filterName}`);
    divOptions.replaceChildren();
    
    // Affichage du contenu de la liste du dropdown menu
    // arrayFilter.forEach(field => {
    //     const liField = document.createElement("li");
    //     setAttributes(liField, {"class": `${filterName}`});
    //     liField.innerHTML = `<a class="dropdown-item" href="#">${field}</a>`;
    //     divOptions.appendChild(liField);
        
    //     // Listener sur l'option sélectionnée dans le dropdown menu
    //     liField.addEventListener("click", (event) => {
    //         event.preventDefault();
    //         listenSelectedOption(field, filterName);
    //     })
    // })
    for (let i = 0; i < arrayFilter.length; i++) {
        const field = arrayFilter[i];
        const liField = document.createElement("li");
        setAttributes(liField, {"class": `${filterName}`});
        liField.innerHTML = `<a class="dropdown-item" href="#">${field}</a>`;
        divOptions.appendChild(liField);
        
        // Listener sur l'option sélectionnée dans le dropdown menu
        liField.addEventListener("click", (event) => {
            event.preventDefault();
            listenSelectedOption(field, filterName);
        });
    }
}
