// Import(s)
// *********
import { setAttributes } from "../scripts/utils.js";

/********************************************************************
 * @description - filtrer les caractères pour empêcher l'injection de code HTML
 * @function (controlInput)
 * @param {string} - Chaîne de caractères
 * @return {string} - Chaîne de caractères filtrée
 */
function controlInput(string) {
    const invalidChars = /[<>"'/&=()]/g;  // Bloque les caractères essentiels aux injections HTML
    return string.replace(invalidChars, '');    // Supprime les caractères interdits et retourne la chaîne de caractères
}

/********************************************************************
 * @description - vérifier si un mot existe dans une chaîne
 * @function (containsTerm)
 * @param {string} - Chaîne de caractères
 * @param {substring} - mot recherché
 * @return {boolean} - true si le mot est trouvé
 */
function containsTerm(string, substring) {
    for (let i = 0; i <= string.length - substring.length; i++) {
        let match = true;
        for (let j = 0; j < substring.length; j++) {
            if (string[i + j] !== substring[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            return true;
        }
    }
    return false;
}

/********************************************************************
 * @description - Affichage du message si aucune recette n'est trouvée
 * @function (displayAlert)
 * @param {searchbarContent} - contenu de la recherche
 */
export function displayAlert (searchbarContent) {
    const alertContainer = document.querySelector("#alert-container");
    alertContainer.replaceChildren();
    const alert = document.createElement("div");
    alert.className = `alert alert-danger alert-dismissible fade show text-center`;
    alert.role = 'alert';
    alert.innerHTML = `Aucune recette ne contient «${searchbarContent}» <br>Vous pouvez chercher « tarte aux pommes », « poisson », etc.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
    
    alertContainer.appendChild(alert);
}

/********************************************************************
 * @description - Affichage des cartes recettes
 * @function (displayRecipes)
 * @param {recipes} - recettes à afficher
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
        setAttributes(divCardsubtitle1, {"class": "card-subtitle mb-3 mt-4 fw-bold text-secondary fs-12"});
        divCardsubtitle1.textContent = "RECETTE";
        divcardBody.appendChild(divCardsubtitle1);

        // Description
        const divCardtext = document.createElement("p");
        setAttributes(divCardtext, {"class": "card-text fs-14 mb-4"});
        divCardtext.textContent = `${recipe.description}`;
        divcardBody.appendChild(divCardtext);

        // Titre "INGREDIENTS"
        const divCardsubtitle2 = document.createElement("h6");
        setAttributes(divCardsubtitle2, {"class": "card-subtitle mb-2 mt-4 fw-bold text-secondary fs-12"});
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

            // Nom de l'ingrédient
            const liListgroupitem1 = document.createElement("li");
            setAttributes(liListgroupitem1, {"class": "list-group-item fw-medium fs-14 border-0 px-0 pb-0"});
            liListgroupitem1.textContent = `${ingredient.ingredient}`;
            ulListgroup.appendChild(liListgroupitem1);

            // Quantité et unité de mesure
            const liListgroupitem2 = document.createElement("li");
            setAttributes(liListgroupitem2, {"class": "list-group-item text-secondary fs-14 border-0 px-0 pt-0"});
            liListgroupitem2.textContent = `
                ${ingredient.quantity ? `${ingredient.quantity}` : ''}
                ${ingredient.unit ? `${ingredient.unit}` : ''}`;
            ulListgroup.appendChild(liListgroupitem2);
        })
    });
}

/***********************************************************
 * @description - Fonction de recherche des recettes depuis la recherche principale
 * @function (searchRecipes)
 * @param {query} - caractères encodés dans la barre de recherche principale 
 * @return {recipesMainSearch} - recettes sélectionnées
 */
export function searchRecipes(query, recipes) {
    const recipesMainSearch = [];

    let searchTerms = [];
    let term = "";

    // filtrer les caractères pour empêcher l'injection de code HTML
    const string = controlInput(query);

    // Extraire les mots du champ de recherche
    for (let i = 0; i < string.length; i++) {
        if (string[i] !== " ") {
            term += string[i].toLowerCase(); // convertir en minuscules
        } else {
            if (term.length > 0) {
                searchTerms.push(term); // mémoriser le mot
                term = "";
            }
        }
    }
    if (term.length > 0) {  // mémoriser le dernier mot
        searchTerms.push(term);
    }
    
    // Sélectionner les recettes contenant les mots
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        let recipeOK = true;
        // Parcourir les termes recherchés
        for (let j = 0; j < searchTerms.length; j++) {
            // Recherche du terme dans le nom de la recette
            if (!containsTerm(recipe.name.toLowerCase(), searchTerms[j])) {
                // Recherche du terme dans la description
                if (!containsTerm(recipe.description.toLowerCase(), searchTerms[j])) {
                    // Recherche du terme dans les ingrédients
                    let foundInIngredients = false;
                    for (let k = 0; k < recipe.ingredients.length; k++) {
                        if (containsTerm(recipe.ingredients[k].ingredient.toLowerCase(), searchTerms[j])) {
                            foundInIngredients = true;
                            break;
                        }
                    }
                    if (!foundInIngredients) {
                        recipeOK = false;
                    }
                }
            }
        }

        if (recipeOK) {
            recipesMainSearch.push(recipe);
        }
    }

    return (recipesMainSearch);
}

/********************************************************************
 * @description - Mise à jour du total des recettes et affichage d'un message si aucune recette n'est trouvée
 * @function (updateTotRecipes)
 * @param {recipes} - recettes
 * @param {origin} - origine de la recherche (main ou filter) : pour afficher le msg d'erreur si aucune recette n'est trouvée
 */
export function updateTotRecipes (recipes, origin) {
    const divTotRecipes = document.querySelector("#tot-recipes");
    divTotRecipes.textContent = `${recipes.length} recette(s)`;

    if (recipes.length === 0 && origin === "main") {
        const searchbarContent = document.querySelector("#searchbar").value;
        
        displayAlert(searchbarContent);
    }
}
