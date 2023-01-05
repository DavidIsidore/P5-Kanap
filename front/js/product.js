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

/*----------------------Ajout de la sélection d'articles au panier---------------*/

// on écoute sur le bouton
const targetButton = document.getElementById("addToCart");
targetButton.addEventListener('click', (event) => {
    event.preventDefault();
    //on assigne la couleur et la quantité choisies
    // à leurs variables respectives
    const productColor = document.getElementById("colors").value;
    const productQuantite = document.getElementById("quantity").value;

    //on définit le contenu du panier
    //  - en appelant le panier déjà existant
    //  - ou en créant un tableau vide
    let basket = JSON.parse(localStorage.getItem("panier")) || [];

    // on vérifie si une couleur ou une quantité n'ont pas été choisies
    if(!productColor || !productQuantite){
        //alors on demande à l'utilisateur de choisir couleur et quantité
        alert("Veuillez choisir une couleur ET une quantité");
    }else{
        //si la couleur et la quantité ont été sélectionnées
        // on regarde si  le panier est vide
        if(basket == null){
            // si c'est le cas, on ajoute l'article sélectionné
            const cart = {
                productid : id,
                color : productColor,
                quantite : Number(productQuantite), // définition de la quantité en tant qu'entier
            };

            //fonction d'ajout au panier
            addBasket(cart);

            // on envoie un message confirmant l'ajout
            window.confirm("Produit ajouté au panier");

        }else{
            // sinon, on regarde si 2 produits sont similaires
            const found = basket.find((element) =>
            // on compare la couleur et l'id sélectionnés avec ceux déjà présents dans le panier
            element.productid == id && element.color == productColor); 
            if(found != undefined){
                //si on trouve une correspondance, on ajoute la quantité précédente à celle sélectionnée
                let totalQuantity = parseInt(found.quantite) + parseInt(productQuantite);
                // on réattribue la nouvelle quantité à la quantité trouvée
                // pour les ajouts ultérieurs
                found.quantite = totalQuantity;
                
                // on enregistre le panier
                saveBasket(basket);

                // et on envoie un message de confirmation d'ajout à l'utilisateur
                window.confirm("Produit ajouté au panier");
            }else{
                // si le modèle et la couleur n'ont pas déjà été sélectionnés
                // on définit l'article à ajouter
                const cart = {
                    productid : id,
                    color : productColor,
                    quantite : Number(productQuantite),
                }
                // on ajoute le nouveau produit au panier
                addBasket(cart);

                // et on envoie un message de confirmation d'ajout à l'utilisateur
                window.confirm("Produit ajouté au panier");


            }
        }
    }
});

// fonction d'enregistrement du panier
function saveBasket(producInLocalStorage){
    localStorage.setItem("panier",JSON.stringify(producInLocalStorage));
}

// fonction de récupération du panier
function getBasket(){
    // on récupère les informations du panier
    let producInLocalStorage = localStorage.getItem("panier");
    if(producInLocalStorage == null){
        // si le panier était vide, on retourne un tableau vide
        return [];
    }else{
        // sinon, on retourne le contenu du localStorage
        return JSON.parse(producInLocalStorage);
    }
}

// fonction d'ajout au panier
function addBasket(cart){
    // on récupère les informations du panier
    let producInLocalStorage = getBasket();
    // on ajoute le nouvel article
    producInLocalStorage.push(cart);
    // on enregistre le panier
    saveBasket(producInLocalStorage);
}