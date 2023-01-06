// on récupère l'adresse courante
url = window.location.href;
Url = new URL(url);
// on extrait la valeur du nuéro de commande
var orderId = Url.searchParams.get("orderId");

// on ajoute un écouteur d'évènement au chargement de la page
window.addEventListener("load", (event) => {
    // on sélectionne l'emplacement d'insertion 
    const order = document.getElementById("orderId");
    // on insère le numéro de comande
    order.innerHTML = `${orderId}`;
})