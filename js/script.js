let productData = [];


const fetchCanape = async ()=> {
    await fetch("http://localhost:3000/api/products").then((res) => res.json())
    .then ((promise) => {
        productData = promise;
        
    })

};


const canapAffich =async ()=> {
    await fetchCanape();



document.getElementById("items").innerHTML = productData.map((router) =>`

                                <a href="./product.html?id=${router._id}">
                                    <article>
                                        <img src="${router.imageUrl}" alt="${router.altTxt}"/>
                                        <h3 class="productName">${router.name}</h3>
                                        <p class="productDescription">${router.description}</p>
                                    </article>
                                </a>

`)
.join("")

};

canapAffich();







