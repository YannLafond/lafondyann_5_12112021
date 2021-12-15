// recuperation de l'id dans la barre d'adresse
const recoverUrlId = window.location.search;
console.log(recoverUrlId);

// extraction de l'id
const extractionId = new URLSearchParams (recoverUrlId);
console.log(extractionId);

const id = extractionId.get("id");
console.log(id);

let productData = [];



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
<<<<<<< HEAD
});

let quantityItem = document.getElementById("quantity");
let buttonAddToCart = document.getElementById("addToCart");

//ecoute du bouton ajouter au panier
buttonAddToCart.addEventListener("click", (event) => {


//ajout du choix de la couleur dans une variable
const choiceColor = colorOption.value;

//ajout de la quantité desire dans une variable
const choiceQuantity = quantityItem.value;
    
//les informations sélectionne à envoyer  vers le panier
let informationItem = {
    idItem : id,
    imageItem : productData.imageUrl,
    nameItem : productData.name,
    priceItem : productData.price,
    choiceColorItem : colorOption.value,
    choiceQuantityItem : quantityItem.value
}
// les informations selectionné vers le local strorage
let itemInLocalStorage = JSON.parse(localStorage.getItem("itemStorage"));

if(itemInLocalStorage){
    itemInLocalStorage.push(informationItem);
    localStorage.setItem("itemStorage", JSON.stringify(itemInLocalStorage));

}else{
    itemInLocalStorage = [];
    itemInLocalStorage.push(informationItem);
    localStorage.setItem("itemStorage", JSON.stringify(itemInLocalStorage));
}


console.log(itemInLocalStorage);

=======
>>>>>>> basket
});

let quantityItem = document.getElementById("quantity");
let buttonAddToCart = document.getElementById("addToCart");



<<<<<<< HEAD
};
=======
//ecoute du bouton ajouter au panier
buttonAddToCart.addEventListener("click", (event) => {

>>>>>>> basket


    
//les informations sélectionne à envoyer  vers le panier
let informationItem = {
    idItem : id,
    imageItem : productData.imageUrl,
    nameItem : productData.name,
    priceItem : productData.price,
    choiceColorItem : colorOption.value,
    choiceQuantityItem : parseInt(quantityItem.value),
    
}
// les informations selectionné vers le local storage
let itemInLocalStorage = JSON.parse(localStorage.getItem("itemStorage"));

if(itemInLocalStorage){
    const storage = itemInLocalStorage.find(
        (element) => element.idItem == informationItem.idItem && element.choiceColorItem == informationItem.choiceColorItem);

    if (storage) {
        storage.choiceQuantityItem += informationItem.choiceQuantityItem;
    
    localStorage.setItem("itemStorage", JSON.stringify(itemInLocalStorage));
    return;
    
    itemInLocalStorage.push(informationItem);
    localStorage.setItem("itemStorage", JSON.stringify(itemInLocalStorage));
    }
}else{
    const cart = [];
    cart.push(informationItem);
    localStorage.setItem("itemStorage", JSON.stringify(cart));
}


console.log(localStorage);
});

};

sofaAffich();