// recuperation de l'id dans la barre d'adresse
const recoverUrlId = window.location.search;

// extraction de l'id
const extractionId = new URLSearchParams (recoverUrlId);
const orderId = extractionId.get("orderId");
console.log(orderId);

// Injection du numéro de commande
document.getElementById("orderId").innerText = orderId; 


localStorage.clear();
