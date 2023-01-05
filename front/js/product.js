/*-------------Récupération des informations------------*/

//Récupération de l'id de la page
url = window.location.href;
Url = new URL(url);
var id = Url.searchParams.get("id");
console.log(id);