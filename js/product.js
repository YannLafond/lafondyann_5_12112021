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



document.querySelector(".item__img").innerHTML = `
        <img src="${productData.imageUrl}" alt="${productData.altTxt}"> `;

document.getElementById("title").innerHTML = productData.name;

document.getElementById("price").innerHTML = productData.price;

document.getElementById("description").innerHTML = productData.description;

let colorOption = document.getElementById("colors");
productData.colors.forEach((color) => {
    document.createElement("option");
    
    let displayColor = document.createElement("option");

    displayColor.value = color;
    displayColor.innerHTML = color;

    colorOption.appendChild(displayColor);
   
});



};






sofaAffich();