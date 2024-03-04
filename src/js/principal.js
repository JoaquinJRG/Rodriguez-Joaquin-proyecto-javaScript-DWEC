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

//Like dislike y añadir al carrito
document.getElementById("products").addEventListener("click", (event) => {

    switch (event.target.getAttribute("name")) {
        case "like":

            if (event.target.classList.contains("liked")) {
                likeCounter--;
                document.getElementById("likeCounter").innerHTML = likeCounter;
                event.target.classList.toggle("liked");
            } else {
                likeCounter++;
                document.getElementById("likeCounter").innerHTML = likeCounter;
                event.target.classList.toggle("liked");
            }

            break;
        case "dislike":
            if (event.target.classList.contains("disliked")) {
                dislikeCounter--;
                document.getElementById("dislikeCounter").innerHTML = dislikeCounter;
                event.target.classList.toggle("disliked");
            } else {
                dislikeCounter++;
                document.getElementById("dislikeCounter").innerHTML = dislikeCounter;
                event.target.classList.toggle("disliked");
            }
            break;
        case "addCart":

            if (checkSesion()) {
                let sesion = JSON.parse(localStorage.getItem("sesion"));

                if (!sesion.carrito.includes(event.target.id)) {
                    event.target.classList.add("added");
                    sesion.carrito.push(event.target.id);
                    localStorage.setItem("sesion", JSON.stringify(sesion));
                    startAnimation();
                }

            } else {
                alert("Tienes que iniciar sesión");
            }

            break;

    }
});

//Cerrar sesión
document.getElementById("logoutBtn").addEventListener("click", () => {
    let sesion = JSON.parse(localStorage.getItem("sesion"));
    let usuario = JSON.parse(localStorage.getItem(sesion.nombre));

    //Guardar datos carrito
    if (usuario) {
        usuario.carrito = [...sesion.carrito]; 

        localStorage.setItem(sesion.nombre, JSON.stringify(usuario)); 
    }

    //Eliminar sesión
    localStorage.removeItem("sesion");
    checkSesion();

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
                showProducts(products, layout);
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
                        <i name='like' data-feather="thumbs-up"></i>
                        <i name='dislike' data-feather="thumbs-down"></i>
                        <i id='${prod.id}' name='addCart' data-feather="shopping-cart"></i>
                    </div>
                    <div>
                        <a class="detallesBtn" href="html/detalles.html?prod=${prod.id}">Más detalles</a>
                    </div>
                `;

        section.appendChild(div);

    });
    feather.replace();
}


function deleteProd() {
    document.querySelector("#table").innerHTML = "";
    document.querySelector("#list").innerHTML = "";
}

function checkSesion() {
    if (localStorage.getItem("sesion")) {
        document.getElementById("logoutBtn").style.display = "block";
        document.getElementById("loginBtn").style.display = "none";
        return true;
    } else {
        document.getElementById("logoutBtn").style.display = "none";
        document.getElementById("loginBtn").style.display = "block";
        return false;
    }
}

function startAnimation() {
    let carrito = document.getElementById("carritoBtn");
    carrito.classList.add("animation");

    // Eliminar la clase después de que termine la animación
    carrito.addEventListener("transitionend", () => {
        carrito.classList.remove("animation");  
    });

}

//------------------------------------------

//Comprobar inicio de sesión
checkSesion();
//Cargar categoría header
loadCategories();
//Cargar productos
loadProducts();

