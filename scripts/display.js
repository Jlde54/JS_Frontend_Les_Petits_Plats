
/********************************************************************
 * @description - Appel de l'affichage des Filtres
 * @function (displayFilters)
 */
export function displayFilters() {

    const sectionFilters = document.querySelector("#section-filters");
    sectionFilters.replaceChildren();

    const divFiltersTotRecipes = document.createElement("div");
    setAttributes(divFiltersTotRecipes, {"id":"filters-totRecipes", "class": "row d-flex flex-column flex-md-row align-items-center"});
    sectionFilters.appendChild(divFiltersTotRecipes);
    
    const divFilters = document.createElement("div");
    setAttributes(divFilters, {"id":"filters", "class": "col-md-9 d-flex justify-content-between align-items-center"});
    divFiltersTotRecipes.appendChild(divFilters);
    
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

        // Création de la <div> contenant le nombre total de recettes
        const divFiltersTotRecipes = document.querySelector("#filters-totRecipes");
    
        const divTotRecipes = document.createElement("div");
        setAttributes(divTotRecipes, {"id":"totRecipes", "class": "col-md-3 text-end fw-bold fs-5 anton pb-3 pb-md-0 order-first order-md-2"});
        divTotRecipes.textContent = `${recipes.length} recettes`;
        divFiltersTotRecipes.appendChild(divTotRecipes);

        // Création de la <div> contenant le menu filtre
        const divDropdown = document.createElement("div");
        setAttributes(divDropdown, {"class": "dropdown-center col-3"});
        divFilters.appendChild(divDropdown);

        // Bouton du dropdown menu
        const btnDropdown = document.createElement("button");
        setAttributes(btnDropdown, {"class": "btn bg-white btn-lg dropdown-toggle fs-6", "type": "button", "id": `dropdownMenuButton${filterName}`, "data-bs-toggle": "dropdown", "aria-expanded": "false"});
        btnDropdown.textContent = titleName;
        divDropdown.appendChild(btnDropdown);

        // Liste
        const ulDropdown = document.createElement("ul");
        setAttributes(ulDropdown, {"class": "dropdown-menu mx-2 menu-max-height", "aria-labelledby": `dropdownMenuButton${filterName}`});
        divDropdown.appendChild(ulDropdown);

        const liDropdown = document.createElement("li");
        ulDropdown.appendChild(liDropdown);

        const divForm = document.createElement("div");
        setAttributes(divForm, {"class": "container"});
        liDropdown.appendChild(divForm);

        const formInputgroup = document.createElement("form");
        setAttributes(formInputgroup, {"class": "input-group border rounded", "action": ""});
        divForm.appendChild(formInputgroup);

        // Champ de recherche dans le dropdown menu
        const inputSearch = document.createElement("input");
        setAttributes(inputSearch, {"class": "form-control border-0", "type": "search", "aria-label": "Recherche"});
        formInputgroup.appendChild(inputSearch);

        // Bouton de submit de la recherche dans le dropdown menu
        const btnSubmit = document.createElement("button");
        setAttributes(btnSubmit, {"class": "btn", "type": "submit"});
        btnSubmit.innerHTML = "<i class='bi bi-search'></i>";
        formInputgroup.appendChild(btnSubmit);
        
        // Affichage du contenu de la liste du dropdown menu
        arrayFilter.forEach(field => {
            const liField = document.createElement("li");
            setAttributes(liField, {"class": `${filterName}`});
            liField.innerHTML = `<a class="dropdown-item" href="#">${field}</a>`;
            ulDropdown.appendChild(liField);

            liField.addEventListener("click", () => {
                switch (filterName) {
                    case "ingredients":
                        const selectedItem1 = document.querySelector("#selected-item1");
                        selectedItem1.innerHTML = `${field}`;
                        selectedItem1.classList.add("show");
                        selectedItem1.classList.remove("fade");
                        // document.querySelector("#selected-item1").innerHTML = `${field} <a>x</a>`;
                        // document.querySelector("#selected-item1").className += "visibility-visible bg-color-yellow rounded-pill d-flex justify-content-between";
                        break;
                    case "appliance":
                        document.querySelector("#selected-item2").innerHTML = `${field} <span><a>x</a></span>`;
                        document.querySelector("#selected-item2").className += "visibility-visible bg-color-yellow rounded-pill d-flex justify-content-between";
                        break;
                    case "ustensils":
                        document.querySelector("#selected-item3").innerHTML = `${field} <span><a>x</a></span>`;
                        document.querySelector("#selected-item3").className += "visibility-visible bg-color-yellow rounded-pill d-flex justify-content-between";
                        break;
                    default:
                        break;
                }
            })
        })
    }
}

/********************************************************************
 * @description - affichage des cartes recettes
 * @function (displayRecipes)
 */
export function displayRecipes () {
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
 * @description - affichage des champs sélectionnés
 * @function (displaySelectedItems)
 */
export function displaySelectedItems (){
    const sectionFilters = document.querySelector("#section-filters");

    const divSelectedFields = document.createElement("div");
    setAttributes(divSelectedFields, {"id": "selectFields"});
    sectionFilters.appendChild(divSelectedFields);

    const divSelectedRow = document.createElement("div");
    setAttributes(divSelectedRow, {"class": "mt-5 col-md-9 d-flex justify-content-between align-items-center"});
    divSelectedFields.appendChild(divSelectedRow);

    // Champs contenant l'item selectionné dans la liste

    const divSelectedItem1 = document.createElement("div");
    setAttributes(divSelectedItem1, {"id": "selected-item1", "class": "alert alert-dismissible p-3 col-3 fade", "role": "alert"});
    divSelectedRow.appendChild(divSelectedItem1);

    const spanSelectedItem1 = document.createElement("span");
    setAttributes(spanSelectedItem1, {"id": "span-item1"});
    divSelectedItem1.appendChild(spanSelectedItem1);

    const divSelectedBtn1 = document.createElement("button");
    setAttributes(divSelectedBtn1, {"class": "btn-close", "data-bs-dismiss": "alert", "aria-label": "Close"});
    divSelectedItem1.appendChild(divSelectedBtn1);

    const divSelectedItem2 = document.createElement("div");
    setAttributes(divSelectedItem2, {"id": "selected-item2", "class": "p-3 col-3 visibility-hidden"});
    divSelectedRow.appendChild(divSelectedItem2);

    const divSelectedItem3 = document.createElement("div");
    setAttributes(divSelectedItem3, {"id": "selected-item3", "class": "p-3 col-3 visibility-hidden"});
    divSelectedRow.appendChild(divSelectedItem3);
}

/********************************************************************
 * @description - affichage du total de recettes
 * @function (displayTotRecipes)
 */
export function displayTotRecipes () {
    const divFiltersTotRecipes = document.querySelector("#filters-totRecipes");
    
    const divTotRecipes = document.createElement("div");
    setAttributes(divTotRecipes, {"id":"totRecipes", "class": "col-md-3 text-end fw-bold fs-5 anton pb-3 pb-md-0 order-first order-md-2"});
    divTotRecipes.textContent = `${recipes.length} recettes`;
    divFiltersTotRecipes.appendChild(divTotRecipes);
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