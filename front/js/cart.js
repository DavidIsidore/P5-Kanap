/*--------------Récuparation de la liste des produits du panier-------------*/

let panier = JSON.parse(localStorage.getItem("panier"));

// on initialise la quantité totale d'articles
totalQuantite = 0;

// on initialise le prix total
totPrice = 0;

// Calcul de la quantité totale d'articles du panier
for(n=0;n<panier.length;n++){
    //on incrémente la quantité totale d'articles pour chaque élément présent dans le panier
    totalQuantite += Number(panier[n].length.quantite);
}

/*-------------------Récupération de la liste des produits du back-end-----------------*/
fetch("http://localhost:3000/api/products")
//réponse au format json
.then((response) => response.json())
// fonction callback d'affichage des produits du panier
.then((products) => {
    // on sélectionne l'ID de la balise dans laquelle on va insérer les informations
    const cart_items = document.getElementById("cart__items");
/*------------------Affichage des articles du panier------------------*/
    // pour chacun des articles du panier
    for(items of panier){

        //on regarde dans la liste des produits du back-end
        for(let product of products){
            // on initialise la variable qui compte le nombre d'articles
            let articles = 0;

            //si l'id d'un des articles du panier correspond à celle d'un des produits
            if(product._id == items.productid) {
                 // on créée la balise article
                 const article = document.createElement("article");
                 //on l'ajoute à la balise de classe cart__items
                 cart_items.appendChild(article);
                 //on ajoute la classe cart__item à la balise article
                 article.classList.add("cart__item");
                // on lui ajoute les attributs data-id et data-color
                article.setAttribute("data-id", `${items.productid}`);
                article.setAttribute("data-color",`${items.color}`);

     /*--------------------Affichage des produits à l'intérieur de chaque balise article------------*/
                const div_img = document.createElement("div");
                article.appendChild(div_img);
                div_img.classList.add("cart__item__img");

     /*-----------------Affichage de la photo---------------------*/           
                const img = document.createElement("img");
                div_img.appendChild(img);
                img.setAttribute("src", `${product.imageUrl}`);

     /*----------------Affichage du contenu---------------------*/
                const content = document.createElement("div");
                article.appendChild(content);
                content.classList.add("cart__item__content");
                
     /*---------------Affichage de la description--------------*/
                const descr = document.createElement("div");
                content.appendChild(descr);
                descr.classList.add("cart__item__content__description");
            /*-----Insertion des informations----*/
                descr.innerHTML += "<h2>" + `${product.name}` + "</h2>";
                descr.innerHTML += "<p>" + `${product.color}` + "</p>";
                descr.innerHTML += "<p>" + `${product.price}` + "€</p>";
               
     /*--------------Affichage de la quantité--------------------*/
                const settings = document.createElement("div");
                content.appendChild(settings);
                settings.classList.add("cart__item__content__settings");
                
                const quantite = document.createElement("div");
                settings.appendChild(quantite);
                quantite.classList.add("cart__item__content__settings__quantity");

                const qte = document.createElement("p");
                quantite.appendChild(qte);
                qte.innerHTML = "Qté : ";

         /*-------Affichage du champ de saisie----------*/       
                const input = document.createElement("input");
                quantite.appendChild(input);
                input.classList.add("itemQuantity");
                input.setAttribute("type","number");
                input.setAttribute("name", "itemQuantity");
                input.setAttribute("min","1");
                input.setAttribute("max","100");
                input.setAttribute("value", `${items.quantite}`);

                // on incrémente le nombre d'articles
                articles += `${items.quantite}`;

     /*--------------Affichage du bouton de suppression-----------------*/
                const del = document.createElement("div");
                settings.appendChild(del);
                del.classList.add("cart__item__content__settings__delete");

                const delItem = document.createElement("p");
                del.appendChild(delItem);
                delItem.classList.add("deleteItem");
                delItem.innerHTML = "Supprimer";

     /*----------Affichage de la quantité totale d'articles---------------*/
                const totQuant = document.getElementById("totalQuantity");
                totQuant.innerHTML = `${totalQuantite}`;
                
     /*-----------------Calcul du prix total------------------------*/
                // on multiplie le nombre de chaque article par son prix respectif
                totPricePerArticle = `${items.quantite}`* product.price;
                // on incrémente le prix total
                totalPrice += totPricePerArticle;
                totalPrice = document.getElementById("totalPrice");
                totalPrice.innerHTML = totPrice;
                                           
            }
        }
    }
})

//fonction de callback de supression d'article et de 
// modification du nombre d'articles
.then(function(){
    deleteItem();
    changeQty();
})

//fonction de suppression
function deleteItem() {
    //sélection de tous les paragraphes ayant la classe deleteItem 
    const delP = document.querySelectorAll("p.deleteItem");
    //pour chacun des produits du panier
    for (let i = 0; i < panier.length; i++) {
      //on ajoute un écouteur d'évènement sur le bouton Supprimer
      //et quand on clique dessus
      delP[i].addEventListener("click", (event) => {
        //on attribue aux variables l'id et la couleur de l'article sélectionné
        let idToDelete = panier[i].productid;
        let colorToDelete = panier[i].color;
        //on retire l'article et on garde les autres
        panier = panier.filter(
          (item) => item.productid != idToDelete || item.color != colorToDelete
        );
        //on enregistre le panier
        localStorage.setItem("panier", JSON.stringify(panier));
        //on avertit l'utilisateur qu'un produit a été supprimé
        alert("Produit supprimé du panier");
  
        //et on recharge la page
        window.location.reload();
      });
    }
  }

  //fonction de modification de quantité
function changeQty() {
    //sélection de toutes les classes itemQuantity
    const targetQty = document.querySelectorAll(".itemQuantity");
  //pour chacune d'entre elles
    for (let i = 0; i < targetQty.length; i++) {
      //on ajoute un écouteur d'évènement
      targetQty[i].addEventListener("input", function () {
        //qui cible l'élément sélectionné
        let changeQty = targetQty[i].value;
        //et modifie sa quantité
        panier[i].quantite = changeQty;
        //on enregistre le panier
        localStorage.setItem("panier", JSON.stringify(panier));
        //et on recharge la page
        window.location.reload();
      });
    }
  }

/*--------------------Contrôle des données envoyées par l'utilisateur---------------*/

// Définition des Regex
const txtRegex = /^[A-Za-z\s]{5,50}/;
//const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const emailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
const addressRegex = /^[A-Za-z0-9\s]{5,50}$/;

// Initialisation des informations à récupérer
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const addressInput = document.getElementById("address");
const cityInput = document.getElementById("city");
const emailInput = document.getElementById("email");

