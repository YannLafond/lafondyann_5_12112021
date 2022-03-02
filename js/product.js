// recuperation de l'id dans la barre d'adresse
const recoverUrlId = window.location.search;
console.log(recoverUrlId);

// extraction de l'id
const extractionId = new URLSearchParams (recoverUrlId);
console.log(extractionId);

const id = extractionId.get("id");
console.log(id);

let productData = [];
console.log(productData);


const fetchSofa = async ()=> {
    await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then ((promise) => {
        productData = promise;    
        
    });
};


const sofaAffich =async ()=> {
    await fetchSofa();


document.querySelector("title").innerText = productData.name;

// injection de l'image et de son alt du produit
document.querySelector(".item__img").innerHTML = `
        <img src="${productData.imageUrl}" alt="${productData.altTxt}"> `;

//injection de l'intitulé du produit
document.getElementById("title").innerHTML = productData.name;

//injection du prix du produit avec un espace entre le prix et signe euro
document.getElementById("price").innerHTML = productData.price + " ";

//injection de la description du produit
document.getElementById("description").innerHTML = productData.description;

// creation et injection du choix des couleurs associé au produit
let colorOption = document.getElementById("colors");
    productData.colors.forEach((color) => {    

    let displayColor = document.createElement("option");

    displayColor.value = color;
    displayColor.innerHTML = color;

    colorOption.appendChild(displayColor);
});

let quantityItem = document.getElementById("quantity");
let buttonAddToCart = document.getElementById("addToCart");



//ecoute du bouton ajouter au panier
buttonAddToCart.addEventListener("click", (event) => {

let itemInLocalStorage = JSON.parse(localStorage.getItem("itemStorage"));
    
//les informations sélectionne à envoyer  vers le panier
let informationItem = {
    id : id,
    image : productData.imageUrl,
    name : productData.name,
    price : productData.price,
    color : colorOption.value,
    quantity : parseInt(quantityItem.value),
    
}

const popupConfirmation =() =>{
    if(window.confirm(`Votre article a bien été ajoutée au panier. Pour le consulter , cliquez sur OK`)){
        window.location.href ="cart.html";
    }
}
// les informations selectionné vers le local storage
 //Si le panier comporte déjà au moins 1 article
if (itemInLocalStorage) {
    const resultFind = itemInLocalStorage.find(
        (element) => element.id === informationItem.id && element.color === informationItem.color);

        //Si le produit commandé est déjà dans le panier
        if (resultFind) {
            let newQuantity =
            parseInt(informationItem.quantity) + parseInt(resultFind.quantity);
            resultFind.quantity = newQuantity;
            localStorage.setItem("itemStorage", JSON.stringify(itemInLocalStorage));
            console.table(itemInLocalStorage);
            popupConfirmation();

        //Si le produit commandé n'est pas dans le panier
        } else {
            itemInLocalStorage.push(informationItem);
            localStorage.setItem("itemStorage", JSON.stringify(itemInLocalStorage));
            console.table(itemInLocalStorage);
            popupConfirmation();
        }
    //Si le panier est vide
    } else {
        itemInLocalStorage =[];
        itemInLocalStorage.push(informationItem);
        localStorage.setItem("itemStorage", JSON.stringify(itemInLocalStorage));
        console.table(itemInLocalStorage);
        popupConfirmation();
    }

});

};

sofaAffich();