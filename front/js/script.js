//on interroge l'API pour récupérer la liste des produits
fetch("http://localhost:3000/api/products")
  // réponse au format json
  .then((response) => response.json())
  //fonction callback pour la récupération des produits
  .then((datas) => addProducts(datas));

//fonction de récupération
function addProducts(products) {
  //pour chacun des produits de la liste
  for (let product of products) {
    /*---------création de la card cliquable-----------*/

    //construction du lien
    const lien = document.createElement("a");
    //ajout de l'attribut avec récupération de l'id
    lien.setAttribute("href", "./product.html?id=" + `${product._id}`);
    //sélection des balises avec l' ID items
    let items = document.getElementById("items");
    //rattachement du lien
    items.appendChild(lien);
    var url = new URL(lien);
    //récupération de l'id
    var id = url.searchParams.get("id");

    /*----------création de l'élément article----------*/
    //création de la balise article
    const article = document.createElement("article");
    //rattachement au lien
    lien.appendChild(article);

    /*-------------création et ajout de l'élément image------------*/
    //création de la balise image
    const img = document.createElement("img");
    //ajout des attributs src et alt
    img.setAttribute("src", `${product.imageUrl}`);
    img.setAttribute("alt", `${product.altTxt}`);
    //rattachement à l'article
    article.appendChild(img);

    /*------------création et ajout du titre--------------*/
    //création de la balise titre
    const title = document.createElement("h3");
    //ajout de la classe
    title.classList.add("productName");
    //insertion du nom du produit
    title.innerHTML = `${product.name}`;
    //rattachement à l'article
    article.appendChild(title);

    /*--------------création et ajout de la description-----------*/
    //création de la balise paragraphe
    const descr = document.createElement("p");
    //ajout de la classe
    descr.classList.add("productDescription");
    //insertion du texte descriptif du produit
    descr.innerHTML = `${product.description}`;
    //rattachement à l'article
    article.appendChild(descr);
  }
}
