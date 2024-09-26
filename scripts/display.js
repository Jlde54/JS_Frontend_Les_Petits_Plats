
/********************************************************************
 * @description - Affichage de la section des Filtres
 * @function (displayFilters)
 */
export function displayFilters() {

    const sectionFilters = document.querySelector("#section-filters");
    sectionFilters.replaceChildren();

    const divSectionRow = document.createElement("div");
    setAttributes(divSectionRow, {"class": "row"});
    sectionFilters.appendChild(divSectionRow);

    // Nombre total de recettes
    const divTotRecipes = document.createElement("div");
    setAttributes(divTotRecipes, {"id": "tot-recipes", "class": "col-12 col-lg-3 order-1 order-lg-2 text-center mb-3 mb-lg-0 fw-bold fs-5 anton"});
    divTotRecipes.textContent = `${recipes.length} recettes`;
    divSectionRow.appendChild(divTotRecipes);

    // Dropdown menus + alertes
    const divDropdownAlerts = document.createElement("div");
    setAttributes(divDropdownAlerts, {"class": "col-12 col-lg-9 order-2 order-lg-1"});
    divSectionRow.appendChild(divDropdownAlerts);

    const divDropdownAlertsRow = document.createElement("div");
    setAttributes(divDropdownAlertsRow, {"class": "row"});
    divDropdownAlerts.appendChild(divDropdownAlertsRow);
    
    displayFilter("ingredients", "ingredient", "Ingrédients");
    displayFilter("appliance", "", "Appareils");
    displayFilter("ustensils", "", "Ustensils");

    /********************************************************************
     * @description - affichage des Filtres
     * @function (displayFilters)
     * @param {filterName} - nom de la propriété du filtre dans le fichier recipes.js
     * @param {fieldName} - nom du champ dans la propriété dans le fichier recipes.js
     * @param {titleName} - nom du titre à afficher dans le bouton du filtre
     */
    function displayFilter (filterName, fieldName, titleName) {
        // Remplissage du tableau "arrayFilter" avec les options correspondantes au filtre
        let arrayFilter = [];
        recipes.forEach(recipe => {
            if (filterName === "ingredients") {
                recipe[filterName].forEach(item => {
                    if (!arrayFilter.includes(item[fieldName])) {
                        arrayFilter.push(item[fieldName])
                    }
                })
            } else if (filterName === "appliance") {
                if (!arrayFilter.includes(recipe.appliance)) {
                    arrayFilter.push(recipe.appliance)
                }
            } else if (filterName === "ustensils") {
                recipe[filterName].forEach(item => {
                    if (!arrayFilter.includes(item)) {
                        arrayFilter.push(item)
                    }
                })
            }
        })

        // Tri du tableau arrayFilter par ordre alphabétique
        arrayFilter.sort((a, b) => {
            if(a < b) return -1;
            if(a > b) return 1;
            return 0;
        });
    
        // Création de la <div> contenant le menu filtre
        const divDropdownAlert = document.createElement("div");
        setAttributes(divDropdownAlert, {"class": "col-md-4 text-center"});
        divDropdownAlertsRow.appendChild(divDropdownAlert);

        const divDropdown = document.createElement("div");
        setAttributes(divDropdown, {"class": "dropdown mb-3"});
        divDropdownAlert.appendChild(divDropdown);

        // Bouton du dropdown menu
        const btnDropdown = document.createElement("button");
        setAttributes(btnDropdown, {"class": "btn bg-white btn-lg fs-6 w-100", "type": "button", "id": `dropdownMenuButton${filterName}`, "data-bs-toggle": "dropdown", "aria-expanded": "false"});
        // btnDropdown.textContent = titleName;
        btnDropdown.innerHTML = `${titleName}<i class="bi bi-chevron-down ms-5 hevron"></i>`;
        divDropdown.appendChild(btnDropdown);

        // Liste
        const ulDropdown = document.createElement("ul");
        setAttributes(ulDropdown, {"class": "dropdown-menu mx-2 menu-max-height", "aria-labelledby": `dropdownMenuButton${filterName}`});
        divDropdown.appendChild(ulDropdown);

        const liSearch = document.createElement("li");
        ulDropdown.appendChild(liSearch);

        const divSearch = document.createElement("div");
        setAttributes(divSearch, {"class": "search-container"});
        liSearch.appendChild(divSearch);

        // Champ de recherche dans le dropdown menu
        const inputSearch = document.createElement("input");
        setAttributes(inputSearch, {"class": "border search-input", "type": "text", "aria-label": "Recherche"});
        divSearch.appendChild(inputSearch);

        // Bouton de submit de la recherche dans le dropdown menu
        const btnSubmit = document.createElement("button");
        setAttributes(btnSubmit, {"class": "search-button"});
        btnSubmit.innerHTML = "<i class='bi bi-search'></i>";
        divSearch.appendChild(btnSubmit);
        // Listener sur le champ de recherche dans le dropdown menu pour filtrer les options
        btnSubmit.addEventListener("click", (event) => {
            const filter = inputSearch.value.toLowerCase();   // Champ de recherche en minuscules
            const dropdownMenu = btnDropdown.nextElementSibling;    // retourne l'élément immédiatement suivant
            const items = dropdownMenu.querySelectorAll('a.dropdown-item');
            items.forEach(item => {
                const text = item.textContent || item.innerText;
                if (text.toLowerCase().indexOf(filter) > -1) {
                    item.style.display = ""; // Afficher l'élément
                } else {
                    item.style.display = "none"; // Masquer l'élément
                }
            })
            event.stopPropagation();
        })
        
        // Affichage du contenu de la liste du dropdown menu
        arrayFilter.forEach(field => {
            const liField = document.createElement("li");
            setAttributes(liField, {"class": `${filterName}`});
            liField.innerHTML = `<a class="dropdown-item" href="#">${field}</a>`;
            ulDropdown.appendChild(liField);
            
            // Listener sur l'item sélectionné dans le dropdown menu
            liField.addEventListener("click", () => {
                const divSelected = document.querySelector(`#selected-item-${filterName}`);
                const spanSelected = document.querySelector(`#span-item-${filterName}`);
                spanSelected.innerHTML = `${field}`;
                divSelected.classList.remove("hide");
                divSelected.classList.add("show", "fade");
                // Filtre sur l'item sélectionné
                const results = [];
                for (let i = 0; i < recipes.length; i++) {
                    const recipe = recipes[i];
                    if (filterName === "ingredients") {
                        for (let j = 0; j < recipe.ingredients.length; j++) {
                            const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
                            if (ingredient === field.toLowerCase()) {
                                results.push(recipe);
                                break;
                            }
                        }
                    } else if (filterName === "appliance") {
                        const appliance = recipe.appliance.toLowerCase();
                        if (appliance === field.toLowerCase()) {
                            console.log("appliance : ", appliance)
                            results.push(recipe);
                        }
                    } else if (filterName === "ustensils") {
                        for (let j = 0; j < recipe.ustensils.length; j++) {
                            const ustensils = recipe.ustensils[j].toLowerCase();
                            if (ustensils === field.toLowerCase()) {
                                results.push(recipe);
                                break;
                            }
                        }
                    }
                }
                const divTotRecipes = document.querySelector("#tot-recipes");
                divTotRecipes.textContent = `${results.length} recettes`;

                displayRecipes (results);
            })
        })

        // Champ qui contiendra l'item selectionné dans le dropdown menu
        const divSelectedItem = document.createElement("div");
        setAttributes(divSelectedItem, {"id": `selected-item-${filterName}`, "class": "alert bg-color-yellow alert-dismissible p-3 fade hide d-flex", "role": "alert"});
        divDropdownAlert.appendChild(divSelectedItem);

        divSelectedItem.addEventListener("click", () => {   // Fermeture de la sélection
            divSelectedItem.classList.add('hide');
            divSelectedItem.classList.remove('show');
        })

        const spanSelectedItem = document.createElement("span");
        setAttributes(spanSelectedItem, {"id": `span-item-${filterName}`, "class": "fs-14"});
        divSelectedItem.appendChild(spanSelectedItem);

        const divSelectedBtn = document.createElement("button");
        setAttributes(divSelectedBtn, {"type": "button", "class": "btn-close", "aria-label": "Close"});
        divSelectedItem.appendChild(divSelectedBtn);
    }
}

/********************************************************************
 * @description - affichage des cartes recettes
 * @function (displayRecipes)
 */
export function displayRecipes (recipes) {

    const divRecipes = document.querySelector("#recipes");
    divRecipes.replaceChildren();  // Supprime tous les enfants de l'élément '#recipes'

    recipes.forEach(recipe => {
        const divCol = document.createElement("div");
        setAttributes(divCol, {"class": "col"});
        divRecipes.appendChild(divCol);

        // Card
        const divCard = document.createElement("div");
        setAttributes(divCard, {"class": "card border-0 shadow h-100"});
        divCol.appendChild(divCard);

        // Image
        const imgRecipe = document.createElement("img");
        setAttributes(imgRecipe, {"src": `assets/images/${recipe.image}`, "class": "img-fluid card-img-top position-relative", "alt": "Recette"});
        imgRecipe.style.height = "250px";
        imgRecipe.style.objectFit = "cover";
        imgRecipe.style.width = "100%";
        divCard.appendChild(imgRecipe);

        // Time
        const divTime = document.createElement("div");
        setAttributes(divTime, {"class": "position-absolute top-0 end-0 bg-warning mt-3 me-3 p-1 rounded-pill fs-12 fw-bold"});
        divTime.textContent = `${recipe.time}min`;
        divCard.appendChild(divTime);

        // Card-body
        const divcardBody = document.createElement("div");
        setAttributes(divcardBody, {"class": "card-body"});
        divCard.appendChild(divcardBody);

        // Titre
        const divCardtitle = document.createElement("h5");
        setAttributes(divCardtitle, {"class": "card-title my-4 fw-bold anton fs-18"});
        divCardtitle.textContent = `${recipe.name}`;
        divcardBody.appendChild(divCardtitle);

        // Titre "RECETTE"
        const divCardsubtitle1 = document.createElement("h6");
        setAttributes(divCardsubtitle1, {"class": "card-subtitle my-3 fw-bold text-secondary fs-12"});
        divCardsubtitle1.textContent = "RECETTE";
        divcardBody.appendChild(divCardsubtitle1);

        // Description
        const divCardtext = document.createElement("p");
        setAttributes(divCardtext, {"class": "card-text fs-14"});
        divCardtext.textContent = `${recipe.description}`;
        divcardBody.appendChild(divCardtext);

        // Titre "INGREDIENTS"
        const divCardsubtitle2 = document.createElement("h6");
        setAttributes(divCardsubtitle2, {"class": "card-subtitle my-3 fw-bold text-secondary fs-12"});
        divCardsubtitle2.textContent = "INGREDIENTS";
        divcardBody.appendChild(divCardsubtitle2);

        // Liste des ingrédients
        const divList = document.createElement("div");
        setAttributes(divList, {"class": "d-flex flex-wrap row-cols-2"});
        divcardBody.appendChild(divList);

        recipe.ingredients.forEach(ingredient => {
            const ulListgroup = document.createElement("ul");
            setAttributes(ulListgroup, {"class": "list-group ps-0 pe-4"});
            divList.appendChild(ulListgroup);

            const liListgroupitem1 = document.createElement("li");
            setAttributes(liListgroupitem1, {"class": "list-group-item fw-medium fs-14 border-0 px-0"});
            liListgroupitem1.textContent = `${ingredient.ingredient}`;
            ulListgroup.appendChild(liListgroupitem1);

            const liListgroupitem2 = document.createElement("li");
            setAttributes(liListgroupitem2, {"class": "list-group-item text-secondary fs-14 border-0 px-0"});
            liListgroupitem2.textContent = `
                ${ingredient.quantity ? `${ingredient.quantity}` : ''}
                ${ingredient.unit ? `${ingredient.unit}` : ''}
            `;
            ulListgroup.appendChild(liListgroupitem2);
        })
    });
}

/********************************************************************
 * @description - ajout des attributs aux éléments créés
 * @function (setAttributes)
 * @param {el} - élement sur lequel ajouter les attributs
 * @param {attrs} - attribut(s) à ajouter à l'élément
 */
function setAttributes(el, attrs) {
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value))
}