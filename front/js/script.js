//on interroge l'API pour récupérer la liste des produits
fetch("http://localhost:3000/api/products")
// réponse au format json
.then(response => response.json())
//fonction callback pour la récupération des produits
.then(datas => addProducts(datas))

//fonction de récupération
function addProducts(products){
    //pour chacun des produits de la liste
    for(let product of products){
        //création de la card cliquable
        const lien = document.createElement("a");
        lien.setAttribute("href","./product.html?id=" + `${product._id}`);
        let items = document.getElementById("items");
        items.appendChild(lien);
        var url = new URL(lien);
        var id = url.searchParams.get("id");

        //création de l'élément article
        const article = document.createElement("article");
        lien.appendChild(article);

        //création et ajout de l'élément image
        const img = document.createElement("img");
        img.setAttribute("src", `${product.imageUrl}`);
        img.setAttribute("alt", `${product.altTxt}`);
        article.appendChild(img);

        //création et ajout du titre
        const title = document.createElement("h3");
        title.classList.add("productName");
        title.innerHTML = `${product.name}`;
        article.appendChild(title);

        //création et ajout de la description
        const descr = document.createElement("p");
        descr.classList.add("productDescription");
        descr.innerHTML = `${product.description}`;
        article.appendChild(descr);
    }
}