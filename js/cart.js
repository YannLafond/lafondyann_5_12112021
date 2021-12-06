// récupération du local storage
let itemInLocalStorage = JSON.parse(localStorage.getItem("itemStorage"));

console.log(itemInLocalStorage);

const cartItems = document.getElementById("cart__items");

let cartItemContent = [];

if(itemInLocalStorage === null){


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
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : ${itemInLocalStorage[i].choiceQuantityItem}<br>Couleur : ${itemInLocalStorage[i].choiceColorItem}</p>                                                        
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>    
    `};    
    
  if (i == itemInLocalStorage.length) {
    cartItems.innerHTML = cartItemContent;
  }    

  let buttonDelete = document.querySelectorAll(".deleteItem");

  for (let deleteItem = 0; deleteItem < buttonDelete.length; deleteItem++){
    buttonDelete[deleteItem].addEventListener("click",(Event) =>{
    Event.preventDefault();

    let idSelect = itemInLocalStorage[deleteItem].idItem;

        console.log(idSelect);
  })

  }

}