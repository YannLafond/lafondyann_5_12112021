const numberOrder = document.getElementById("orderId");

numberOrder.innerText = JSON.parse(localStorage.getItem("orderId"));
console.log();



localStorage.clear();
