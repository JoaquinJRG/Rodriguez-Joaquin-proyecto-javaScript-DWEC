//Variables
//------------------------------------------
const URL_CATE = "https://fakestoreapi.com/products/categories";
let layout = "#table"; 
let searchParams = new URLSearchParams(window.location.search);
let likeCounter = 0; 
let dislikeCounter = 0; 
let sort = "asc"; 

//------------------------------------------

//Event Listener
//------------------------------------------

//Scroll infinito
window.addEventListener("scroll", () => {
    if (window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - 10) {
        loadProducts(); 
    }
}); 

//Cambiar vista tabla
document.querySelector("#tableBtn").addEventListener("click", () => {
    layout = "#table";
    deleteProd(); 
    loadProducts();
}); 

//Cambiar vista lista
document.querySelector("#listBtn").addEventListener("click", () => {
    layout = "#list"; 
    deleteProd(); 
    loadProducts();
}); 

//Order
document.querySelector("#sort").addEventListener("change", () => {
    sort = document.querySelector("#sort").value; 
    deleteProd(); 
    loadProducts();
}); 

//Like dislike y favorito
document.getElementById("products").addEventListener("click", (event) => {
    switch (event.target.id) {
        case "like": 

            break;
        case "dislike": 

            break; 
        case "favorite": 
            
            break;  
    }
}); 


//------------------------------------------

//Funciones
//------------------------------------------
function loadCategories() {
    fetch(URL_CATE)
        .then(res => res.json())
        .then(categories => {
            categories.forEach(cat => {

                let ul = document.querySelector("#categories");
                let li = document.createElement("li");

                li.innerHTML = `
                    <a href="index.html?cat=${cat}">${cat}</a>
                `;
                ul.appendChild(li);

            });
        });
}


function loadProducts() {
    
    let cat = searchParams.get("cat");

    if (cat == null) {
        fetch(`https://fakestoreapi.com/products?sort=${sort}`)
            .then(res => res.json())
            .then(products => {
                showProducts(products,layout); 
            });
    } else {
        fetch(`https://fakestoreapi.com/products/category/${cat}?sort=${sort}`)
            .then(res => res.json())
            .then(products => {
                showProducts(products); 
            });
    }
    
}


function showProducts(products) {
    let section = document.querySelector(layout);

    products.forEach(prod => {
        let div = document.createElement("div");

        div.classList.add("producto");

        div.innerHTML = `
                    <img src='${prod.image}'/>
                    <p>${prod.title}</p> 
                    <p>${prod.price} €</p>
                    <div>   
                        <i id='like' data-feather="thumbs-up"></i>
                        <i id='dislike' data-feather="thumbs-down"></i>
                        <i id='favorite' data-feather="heart"></i>
                    </div>
                    <button>Añadir al carrito</button>
                `;

        section.appendChild(div);
        
    });
    feather.replace();
}


function deleteProd() {
    document.querySelector("#table").innerHTML = ""; 
    document.querySelector("#list").innerHTML = ""; 
}


//------------------------------------------


//Cargar categoría header
loadCategories();
//Cargar productos
loadProducts(); 