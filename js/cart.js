// const { response } = require("express");

//-----------------------------récupération du panier du localStorage-------------------------
let itemInLocalStorage = localStorage.getItem("itemStorage");
itemInLocalStorage = JSON.parse(itemInLocalStorage);

console.log(itemInLocalStorage);



//------------------------------La fonction qui gère tout le panier--------------------------------
let data = [];
//______________ Création du contenu de la page
async function pageElements(){
  let cartItems = document.getElementById("cart__items");
  for (let item of itemInLocalStorage) {
    await fetch (`http://localhost:3000/api/products/${item.id}`)
    .then((response) => response.json())
    .then((data) => (item.price = data.price));
    
  
  // Création des balises
  
  let cart__item = document.createElement("article");
  let cart__item__img = document.createElement("div");
  let img = document.createElement("img");
  let cart__item__content = document.createElement("div");
  let cart__item__description = document.createElement("div");
  let cart__item__description__name = document.createElement("h2");
  let cart__item__description__color = document.createElement("p");
  let cart__item__description__price = document.createElement("p");
  let cart__item__content__settings = document.createElement("div");
  let cart__item__content__settings__quantity = document.createElement("div");
  let cart__item__content__settings__quantity__qty = document.createElement("p");
  let itemQuantity = document.createElement("input");
  let cart__item__content__settings__delete = document.createElement("div");
  let deleteItem = document.createElement("p");

  // Ajout des balises 
  cartItems.appendChild(cart__item);
  cart__item.appendChild(cart__item__img);
  cart__item__img.appendChild(img);
  cart__item.appendChild(cart__item__content);
  cart__item__content.appendChild(cart__item__description);
  cart__item__description.append(cart__item__description__name, cart__item__description__color, cart__item__description__price);
  cart__item__content.appendChild(cart__item__content__settings);
  cart__item__content__settings.appendChild(cart__item__content__settings__quantity);
  cart__item__content__settings__quantity.appendChild(cart__item__content__settings__quantity__qty);
  cart__item__content__settings__quantity.appendChild(itemQuantity);
  cart__item__content__settings.appendChild(cart__item__content__settings__delete);
  cart__item__content__settings__delete.appendChild(deleteItem);

  // Ajout des classes et attributs
  cart__item.classList.add("cart__item");
  cart__item.setAttribute("data-id", item.id);
  cart__item.setAttribute("data-color", item.color);

  cart__item__img.classList.add("cart__item__img");
  img.src = item.image;
  img.alt.textContent ="image d'un canapé";
  
  cart__item__content.classList.add("cart__item__content");
  cart__item__description.classList.add("cart__item__description");

  cart__item__description__name.textContent = item.name;
  cart__item__description__color.textContent = item.color;
  cart__item__description__price.textContent = Intl.NumberFormat(
    "fr-FR",
    {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }
  ).format(item.price);

  cart__item__content__settings__quantity.classList.add("cart__item__content__settings__quantity");
  cart__item__content__settings__quantity__qty.textContent = "Qté : ";

  itemQuantity.classList.add("itemQuantity");
  itemQuantity.setAttribute("name", "itemQuantity");
  itemQuantity.setAttribute("type", "number");
  itemQuantity.setAttribute("min", "1");
  itemQuantity.setAttribute("max", "100");
  itemQuantity.setAttribute("value", item.quantity);

  cart__item__content__settings__delete.classList.add("cart__item__content__settings__delete");

  deleteItem.classList.add("deleteItem");
  deleteItem.setAttribute("data-id", item.id);
  deleteItem.setAttribute("data-color", item.color);
  deleteItem.textContent = "Supprimer";
};

// ______________Total des articles et du prix

  // Récupération du total des quantités
  let totalQtt = 0;

  for (let i = 0; i < itemInLocalStorage.length; ++i) {
      totalQtt += parseInt(itemInLocalStorage[i].quantity);
  }

  let affichTotalQuantity = document.getElementById('totalQuantity');
  affichTotalQuantity.innerHTML = totalQtt;  

  // Récupération du prix total
  let totalPrice = 0;

  for (let i = 0; i < itemInLocalStorage.length; ++i) {
      totalPrice += (itemInLocalStorage[i].quantity * itemInLocalStorage[i].price);
  }

  let affichTotalPrice = document.getElementById('totalPrice');
  affichTotalPrice.innerHTML = totalPrice;  

// ______________Mise à jour du nombre d'article
  
  let quantityChanging = document.querySelectorAll(".itemQuantity");
  

  for (let i = 0; i < quantityChanging.length; i++){
      quantityChanging[i].addEventListener("click" , (event) => {
          event.preventDefault();

          //Selection de l'element à modifier 
          let quantityModif =  itemInLocalStorage[i].quantity;
          let quantityChangingValue = quantityChanging[i].value;
          itemInLocalStorage[i].quantity = quantityChangingValue;
          
          localStorage.setItem("itemStorage", JSON.stringify(itemInLocalStorage));
          console.log(itemInLocalStorage);
          location.reload();    
      })
  };

// ______________Supression de l'article du panier

  let deleteButtons = document.querySelectorAll(".deleteItem");
  
  for (let i=0; i<deleteButtons.length; i++){
    deleteButtons[i].addEventListener("click", (event) => {
      event.preventDefault();
      
      let idDelete = deleteButtons[i].dataset.id ;
      let colorDelete = deleteButtons[i].dataset.color;
      
      let temp = itemInLocalStorage.filter (obj => obj.id  == idDelete && obj.color == colorDelete);    

      localStorage.setItem("itemStorage", JSON.stringify(temp))
      
      location.reload();

      alert ("Le produit a bien été supprimé");

      
  })  
  };
}

// condition Si le panier est vide
if(itemInLocalStorage === null){
    window.alert("Votre panier est vide");

// Sinon on affiche le panier 
} else {

    // for (i = 0; i < itemInLocalStorage.length; i++){
    //   cartItemContent  +=  `
    
    //         <article class="cart__item" data-id="${itemInLocalStorage[i].id}">
    //             <div class="cart__item__img">
    //             <img src="${itemInLocalStorage[i].image}" alt="image d'un canapé">
    //             </div>
    //             <div class="cart__item__content">
    //                 <div class="cart__item__content__titlePrice">
    //                     <h2>${itemInLocalStorage[i].name}</h2>
    //                     <p>${itemInLocalStorage[i].price} €</p>
    //                 </div>
    //                 <div class="cart__item__content__settings">
    //                     <div class="cart__item__content__settings__Price">
    //                         <p>Qté : ${itemInLocalStorage[i].quantity}</p>
    //                         <input data-id= "${itemInLocalStorage[i].id}" data-color= "${itemInLocalStorage[i].color}" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemInLocalStorage[i].quantity}">                                                        
    //                     </div>
    //                     <div class="cart__item__content__settings__delete">
    //                     <p data-id= "${itemInLocalStorage[i].id}" data-color= "${itemInLocalStorage[i].color}" class="deleteItem">Supprimer</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </article>                
    //     `
    // };
    pageElements();
  };

//------------------------------Le formulaire-----------------------------------

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

// Récupération des données utilisateur dans un tableau
  const contact = {
    firstName: inputFirstName.value,
    lastName: inputLastName.value,
    adress: inputAddress.value,
    city: inputCity.value,
    email: inputEmail.value,
  };

  
  console.log(data.value);
// Vérification que tout les champs soient remplis
  if (
  firstName.value === ""||
  lastName.value === "" ||
  address.value === "" ||
  city.value === "" ||
  email.value === ""   
  ) {
    window.confirm ("Veuillez remplir le formulaire pour passez votre commande.")

// Vérification que tout les champs soient correctement remplis
  } else if (
    regexName.test(firstName.value) == false ||
    regexName.test(lastName.value) == false ||
    regexAdress.test(address.value) == false ||
    regexName.test(city.value) == false ||
    regexEmail.test(email.value) == false
    ) {
    window.confirm ("Veuillez remplir correctement le formulaire pour passez votre commande.")   

// Après vérification que tout est bon 
  } else {
    let totalPrice = document.getElementById('totalPrice').innerText;

    let infoOrder =[];
    itemInLocalStorage.forEach((order) => {
    infoOrder.push(order.id, order.color, order.quantity);  
    });

    let sendOrder = {contact, infoOrder};
    console.log(sendOrder);

    fetch('http://localhost:3000/api/products/order',{
      method: 'POST',
      body: JSON.stringify(sendOrder),
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendOrder)
    })
      .then(response => response.json())
      .then(data => {
        sessionStorage.setItem('order', JSON.stringify(data));
        document.location.replace(`confirmation.html?&prix=${totalPrice}&orderId=65431343444684674`)
      }
);
    }
  })
