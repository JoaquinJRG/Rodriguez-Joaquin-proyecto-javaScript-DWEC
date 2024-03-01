//Variables
//------------------------------------------
const URL_CATE = "https://fakestoreapi.com/products/categories"; 
let searchParams = new URLSearchParams(window.location.search);

//------------------------------------------

//Event Listener
//------------------------------------------



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
        fetch(`https://fakestoreapi.com/products`)
        .then(res => res.json())
        .then(products => {
            console.log(products); 
        });
    } else {
        fetch(`https://fakestoreapi.com/products/category/${cat}`)
        .then(res => res.json())
        .then(products => {
            console.log(products); 
        });
    }
}
//------------------------------------------


//Cargar iconos
feather.replace();
//Cargar categoría header
loadCategories(); 
//Cargar productos
loadProducts(); 