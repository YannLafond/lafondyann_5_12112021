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
        console.log(productData);    
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



};






sofaAffich();