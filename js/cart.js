// récupération du panier dans le local storage
let itemInLocalStorage = JSON.parse(localStorage.getItem("itemStorage"));

console.log(itemInLocalStorage);

const cartItems = document.getElementById("cart__items");

let cartItemContent = [];

// condition Si le panier est vide
if(itemInLocalStorage === null){
    window.alert("Votre panier est vide");

// Sinon boucle sur le panier 
} else{
    

    for (i = 0; i < itemInLocalStorage.length; i++){
        cartItemContent = cartItemContent +  `
    
            <article class="cart__item" data-id= ${itemInLocalStorage[i].idItem}>
                <div class="cart__item__img">
                <img src="${itemInLocalStorage[i].imageItem}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${itemInLocalStorage[i].nameItem}</h2>
                        <p>${itemInLocalStorage[i].priceItem} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__Price">
                            <p>Qté : ${itemInLocalStorage[i].choiceQuantityItem}</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemInLocalStorage[i].choiceQuantityItem}">                                                        
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>                
    `};    
    
// l'injecte dans le code html
  if (i == itemInLocalStorage.length) {
    cartItems.innerHTML = cartItemContent;
  }    
// ______________Mise à jour du nombre d'article

// Ajout d'un article





// supression de l'article du panier


// Total des articles dans le panier et total du prix



}

//___________________________Le formulaire______________________

/*const inputFirstName = document.getElementById("firstName");
const firstNameErrorMessage = document.getElementById("firstNameErrorMsg");
const inputLastName = document.getElementById("lastName");
const lastNameErrorMessage = document.getElementById("lastNameErrorMsg");
const inputAdress = document.getElementById("adress");
const adressErrorMessage = document.getElementById("addressErrorMsg");
const inputCity = document.getElementById("city");
const cityErrorMessage = document.getElementById("cityErrorMsg");
const inputEmail = document.getElementById("email");
const amailErrorMessage = document.getElementById("emailErrorMsg")*/