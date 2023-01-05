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

// Récupération des valeurs des champs de saisie
const firstName = firstNameInput.value;
const lastName = lastNameInput.value;
const address = addressInput.value;
const city = cityInput.value;
const email = emailInput.value;

// Initialisation des messages d'erreur
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMSg");
const emailErrorMsg = document.getElementById("emailErrorMSg");

/*-----------------Tests de validité des entrées de  l'utilisateur--------------*/
// Tous les test sont construits de la même façon
// les commentaires du premier sont à adapter aux suivants

// Test de validité du prénom
function validateFirstName(){
    // si le prénom ne correspond pas au format souhaité
    if(txtRegex.test(firstName) == true) {
        // on affiche le message d'erreur
        firstNameErrorMsg.innerHTML = "Veuillez saisir un format de prénom valide (uniquement des lettres)";
        return false;
    }else{
        return true;
    }
}

function validateLastName(){
    if(txtRegex.test(lastName) == true) {
        lastNameErrorMsg.innerHTML = "Veuillez saisir un format de nom valide (uniquement des lettres)";
    }
}

function validateAddress() {
    if(addressRegex.test(address) == true) {
        addressErrorMsg.innerHTML = "Veuillez saisir un format d'adresse valide (lettres et chiffres, pas de symbole spécial)";
    }
}

function validateCity() {
    if(txtRegex.test(city) == true) {
        cityErrorMsg.innerHTML = "Veuillez saisir un format de nom de ville valide (uniquement des lettres)";
    }
}

function validateEmail() {
    if(emailRegex.test(email) == true) {
        emailErrorMsg.innerHTML = "Veuillez saisir un format d'adresse mail valide ( exemple@fournisseur.fr)"
    }
}

/*----------Vérification des données entrées par l'utilisateur------*/

// On place un écouteur d'évènements pour soumettre la validation
// des données utilisateur au clic sur le bouton
const order = document.getElementById("order");
order.addEventListener('click', event => {
    // on empêche le navigateur de changer de page
    event.preventDefault();
    // on passe l'indicateur d'erreur à FAUX
    let setError = false;

    //Validation du prénom
    //si le format de prénom n'est pas validé
    if(!validateFirstName()){
        // on passe l'indicateur d'erreur à VRAI
        setError = true;
    }

    //Validation du nom
    if(!validateLastName()){
        setError = true;
    }

    // Validation de l'adresse
    if(!validateAddress()) {
        setError = true;
    }

    // Validation de la ville
    if(!validateCity()) {
        setError = true;
    }

    // Validation de l'adresse email
    if(!validateEmail()) {
        setError = true;
    }

    // Si une erreur est détectée
    if(setError){
        event.preventDefault();
        // on envoie un message d'erreur en demandant à remplir tous les champs
        alert("Veuillez remplir tous les champs");
        return (false);
    }


    /*--------Préparation du message à envoyer au back-end---------*/

    // on initialise un tableau vide
    //pour y entrer nes id de commande
    let idCommande = [];
    // pour chaque article du panier
    for(i=0;i<panier<length;i++) {
        // on ajoute l'id de l'article au tableau
        idCommande.push(panier[i].productid);
    }

    // on construit le corps de la requête
    const body = {
        contact: {
            firstName : firstNameInput.value,
            lastName : lastNameInput.value,
            address : addressInput.value,
            city : cityInput.value,
            email : emailInput.value
        },
        products : idCOmmande
    }

    // on prépare les paramètres du fetch
    let settingsFetch = {
        method: 'POST',
        headers: {
            Accept : "application/json",
            "Content-type" : "application/json"
        },
        body : JSON.stringify(body)
    }
    

})



