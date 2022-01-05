// récupération du panier dans le local storage
let itemInLocalStorage = JSON.parse(localStorage.getItem("itemStorage"));

console.log(itemInLocalStorage);

const cartItems = document.getElementById("cart__items");
let cartItemContent = [];

// condition Si le panier est vide
if(itemInLocalStorage === null){
    window.alert("Votre panier est vide");

// Sinon boucle sur le panier 
} else {

    for (i = 0; i < itemInLocalStorage.length; i++){
       cartItemContent  +=  `
    
            <article class="cart__item" data-id= ${itemInLocalStorage[i].id}>
                <div class="cart__item__img">
                <img src="${itemInLocalStorage[i].image}" alt="image d'un canapé">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${itemInLocalStorage[i].name}</h2>
                        <p>${itemInLocalStorage[i].price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__Price">
                            <p>Qté : ${itemInLocalStorage[i].quantity}</p>
                            <input data-id= ${itemInLocalStorage[i].id} data-color= ${itemInLocalStorage[i].color} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${itemInLocalStorage[i].quantity}>                                                        
                        </div>
                        <div class="cart__item__content__settings__delete">
                        <p data-id= ${itemInLocalStorage[i].id} data-color= ${itemInLocalStorage[i].color} class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>                
        `
    };    


        
// l'injecte dans le code html
  if (i == itemInLocalStorage.length) {
    cartItems.innerHTML = cartItemContent;
    
    
// ______________Total des articles et du prix
function getTotals(){

  // Récupération du total des quantités
  var itemsQuantity = document.getElementsByClassName('itemQuantity');
  var myLength = itemsQuantity.length,
  totalQtt = 0;

  for (var i = 0; i < myLength; ++i) {
      totalQtt += itemsQuantity[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById('totalQuantity');
  productTotalQuantity.innerHTML = totalQtt;
  

  // Récupération du prix total
  totalPrice = 0;

  for (var i = 0; i < myLength; ++i) {
      totalPrice += (itemsQuantity[i].valueAsNumber * itemInLocalStorage[i].price);
  }

  let productTotalPrice = document.getElementById('totalPrice');
  productTotalPrice.innerHTML = totalPrice;
  
}
getTotals();



  }

// ______________Mise à jour du nombre d'article

function changeQuantity() {
  let quantityChanging = document.querySelectorAll(".itemQuantity");

  for (let i = 0; i < quantityChanging.length; i++){
      quantityChanging[i].addEventListener("change" , (event) => {
          event.preventDefault();

          //Selection de l'element à modifier en fonction de son id ET sa couleur
          let quantityModif = itemInLocalStorage[i].quantity;
          let quantityChangingValue = quantityChanging[i].value;
          
          const resultFind = itemInLocalStorage.find((element) => element.quantityChangingValue !== quantityModif);

          resultFind.quantity = quantityChangingValue;
          itemInLocalStorage[i].quantity = resultFind.quantity;

          localStorage.setItem("itemStorage", JSON.stringify(itemInLocalStorage));
      
          // refresh rapide
          location.reload();
      })
  }
}
changeQuantity();




// ______________supression de l'article du panier

function deleteItem() {
  const deleteButtons = document.querySelectorAll(".deleteItem");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const idDelete = event.target.getAttribute("data-id");
      const colorDelete = event.target.getAttribute("data-color");
      itemInLocalStorage = itemInLocalStorage.filter ((element) => element.id == idDelete && element.color == colorDelete);
    });
  });
    localStorage.setItem("cartItems", JSON.stringify(itemInLocalStorage));
    location.reload();
    alert ("Le produit a bien été supprimé");
       
    };
    
  }
  
console.log(data-id);










//___________________________Le formulaire______________________


 const inputFirstName = document.getElementById("firstName");
 const inputLastName = document.getElementById("lastName");
 const inputAddress = document.getElementById("address");
 const inputCity = document.getElementById("city");
 const inputEmail = document.getElementById("email");

let regexName = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
let regexAdress =  /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
let regexEmail = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;


// Validation du prénom
inputFirstName.addEventListener("input", (event) => {
  event.preventDefault();
  if (regexName.test(inputFirstName.value) == false || inputFirstName.value == "") {
    document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez indiquer votre prénom";
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
  }
});

// Validation du nom
inputLastName.addEventListener("input", (event) => {
  event.preventDefault();
  if (regexName.test(inputLastName.value) == false || inputLastName.value == "") {
    document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez indiquer votre nom";
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
  }
});

// Validation de l'adresse
inputAddress.addEventListener("input", (event) => {
  event.preventDefault();
  if (regexAdress.test(inputAddress.value) == false || inputAddress.value == "") {
    document.getElementById("addressErrorMsg").innerHTML = "Veuillez indiquer votre adresse";
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
  }
});

// Validation de la ville
inputCity.addEventListener("input", (event) => {
  event.preventDefault();
  if (regexName.test(inputCity.value) == false || inputCity.value == "") {
    document.getElementById("cityErrorMsg").innerHTML = "Veuillez indiquer votre ville";
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
  }
});

// Validation de l'email
inputEmail.addEventListener("input", (event) => {
  event.preventDefault();
  if (regexEmail.test(inputEmail.value) == false || inputEmail.value == "") {
    document.getElementById("emailErrorMsg").innerHTML = "Veuillez indiquer votre email";
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
  }
});

// Ecoute du bouton commander

let order = document.getElementById("order");
order.addEventListener("click", (event) => {
  event.preventDefault();

  // Récupération des données utilisateur
  let contact = {
    firstName: inputFirstName.value,
    lastName: inputLastName.value,
    adress: inputAddress.value,
    city: inputCity.value,
    email: inputEmail.value,
  };

  if (
   firstName.value === ""||
   lastName.value === "" ||
   address.value === "" ||
   city.value === "" ||
   email.value === ""   
   ) {
    window.confirm ("Veuillez remplir le formulaire pour passez votre commande.")

   } else if (
     regexName.test(firstName.value) == false ||
     regexName.test(lastName.value) == false ||
     regexAdress.test(address.value) == false ||
     regexName.test(city.value) == false ||
     regexEmail.test(email.value) == false
   ) {
     window.confirm ("Veuillez remplir correctement le formulaire pour passez votre commande.")     
   } else {
     let products = [];
     itemInLocalStorage.forEach(order => {
       products.push(order.id);       
     });

     let productsOrder = { contact, products };

     fetch("http://localhost:3000/api/products/order", {
       method: "POST",
       body: JSON.stringify(order),
       headers: {
         "Accept": "application/json",
         "content-type": "application/json",
       },
       
     })
     .then((res) => { return res.json();
     })
     .then((confirm) => {
       window.location.href = "../html/confirmation.html?orderId=" + confirm.orderId;
       localStorage.clear();
     })
     .catch ((error) => {
       console.log("Il y a une erreur");
     });

   }
   
});

