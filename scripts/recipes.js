// Import(s)
// *********
import { setAttributes } from "../scripts/utils.js";

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

/********************************************************************
 * @description - Mise à jour du total des recettes
 * @function (updateTotRecipes)
 * @param {recipes} - recettes
 */
export function updateTotRecipes (recipes) {
    const divTotRecipes = document.querySelector("#tot-recipes");
    divTotRecipes.textContent = `${recipes.length} recettes`;
}

/***********************************************************
 * @description - Fonction de recherche des recettes depuis la recherche principale
 * @function (searchRecipes)
 * @param {query} - caractères encodés dans la barre de recherche principale 
 */
export function searchRecipes(query, recipes) {
    // Convertir la requête en minuscule pour une recherche insensible à la casse
    const queryLowerCase = query.toLowerCase();
    const recipesMainSearch = [];

    // Parcourir les recettes avec une boucle "for" classique
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];

        // Vérifier si le nom, la description contiennent la requête
        if (recipe.name.toLowerCase().includes(queryLowerCase) || recipe.description.toLowerCase().includes(queryLowerCase)) {
            recipesMainSearch.push(recipe);
        } else {
            // Vérifier si les ingrédients contiennent la requête
            for (let j = 0; j < recipe.ingredients.length; j++) {
                const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
                if (ingredient.includes(queryLowerCase)) {
                    recipesMainSearch.push(recipe);
                    break; // Arrêter la boucle si un ingrédient correspond
                }
            }
        }
    }
    return (recipesMainSearch);
}