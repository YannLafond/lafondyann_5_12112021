const params = new URL(document.location).searchParams;
const orderId = params.get("orderId");

document.getElementById("orderId").textContent = orderId;

console.log(document.location);