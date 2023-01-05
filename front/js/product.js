/*-------------Récupération des informations------------*/

//Récupération de l'id de la page
url = window.location.href;
Url = new URL(url);
var id = Url.searchParams.get("id");
//console.log(id);


//Récupération des produits
//on ajoute l'id à l'API
fetch("http://localhost:3000/api/products/" + id)
//réponse au format json
.then((response) => response.json())
//fonction callback pour la récupération des produits
.then((datas) => addContent(datas))

function addContent(products) {
    addImage(products);
    addTitle(products);
    addPrice(products);
    addDescription(products);
    addColors(products);
  }
  
  //ajout de la photo du produit
  function addImage(products) {
    const item_img = document.querySelector("div.item__img");
    let img = document.createElement("img");
    img.setAttribute("src", `${products.imageUrl}`);
    img.setAttribute("alt", `${products.altTxt}`);
    item_img.appendChild(img);
  }
  
  //ajout du titre
  function addTitle(products) {
    title = document.getElementById("title");
    title.innerHTML = `${products.name}`;
  }
  
  //ajout du prix
  function addPrice(products) {
    price = document.getElementById("price");
    price.innerHTML = `${products.price}`;
  }
  
  //ajout de la description
  function addDescription(products) {
    description = document.getElementById("description");
    description.innerHTML = `${products.description}`;
  }
  
  //ajout de la sélection de couleurs
  function addColors(products) {
    colors = [`${products.colors}`];
    color = document.getElementById("colors");
  
    for (colors of products.colors) {
      color.innerHTML += "<option value=" + colors + ">" + colors + "</option>";
    }
  }