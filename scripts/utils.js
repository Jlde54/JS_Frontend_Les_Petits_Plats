/********************************************************************
 * @description - ajout des attributs aux éléments créés
 * @function (setAttributes)
 * @param {el} - élement sur lequel ajouter les attributs
 * @param {attrs} - attribut(s) à ajouter à l'élément
 */
export function setAttributes(el, attrs) {
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value))
}
