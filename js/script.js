let productData = [];


const fetchSofa = async ()=> {
    await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then ((promise) => {
        productData = promise;        
    })
};

const sofaAffich =async ()=> {
    await fetchSofa();

document.getElementById("items").innerHTML = productData.map((sofa) => `

        
                                <a href="./product.html?id=${sofa._id}">
                                    <article>
                                        <img src="${sofa.imageUrl}" alt="${sofa.altTxt}"/>
                                        <h3 class="productName">${sofa.name}</h3>
                                        <p class="productDescription">${sofa.description}</p>
                                    </article>
                                </a>
`,    

).join("");

};
sofaAffich();







