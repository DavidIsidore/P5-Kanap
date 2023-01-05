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
    
})