const numberOrder = document.getElementById("orderId");

const order = JSON.parse(localStorage.getItem("order"));

numberOrder.innerHTML = `${order}`; 
console.log(numberOrder);



localStorage.clear();
