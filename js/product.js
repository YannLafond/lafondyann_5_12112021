// recuperation de l'id dans la barre d'adresse
const recoverUrlId = window.location.search;
console.log(recoverUrlId);

// extraction de l'id
const extractionId = new URLSearchParams (recoverUrlId);
console.log(extractionId);

const id = extractionId.get("id");
console.log(id);

let productData = [];

const fetchCanape = async ()=> {
    await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then ((promise) => {
        productData = promise;    
        console.log(productData);    
    });
};

const canapAffich =async ()=> {
    await fetchCanape();

}

canapAffich();