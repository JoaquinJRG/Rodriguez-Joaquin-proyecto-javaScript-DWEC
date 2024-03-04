let productosDiv = document.getElementById("productos-carrito"); 
let sesion = JSON.parse( localStorage.getItem("sesion") );

//Mostrar productos carrito
function mostrarCarrito() {
    
    productosDiv.innerHTML = ""; 

    if (sesion == null || sesion.carrito.length == 0) {
        productosDiv.innerHTML = "Carrito vacío"; 
        document.getElementById("comprar").style.display = "none"; 
        return; 
    } else {
        document.getElementById("comprar").style.display = "block"; 
    }

    let carrito = sesion.carrito; 

    carrito.forEach(id => {
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(data => {
    
            let div = document.createElement("div"); 
            let button = document.createElement("button"); 
    
            button.innerHTML= "Eliminar"; 
            button.classList.add("eliminar"); 
            button.onclick = function() {
                eliminarProd(data.id); 
            }; 
            div.classList.add("producto"); 
    
            div.innerHTML = `
                <img src="${data.image}" />
                <div>
                    <p>${data.title}</p>
                    <p>${data.price} €</p>
                </div>
            `;
    
            div.appendChild(button); 
    
    
            productosDiv.appendChild(div); 
        }); 
    });
}

//Eliminar producto
function eliminarProd(id) {
    let sesion = JSON.parse( localStorage.getItem("sesion") );

    sesion.carrito = sesion.carrito.filter(i => i != id); 

    localStorage.setItem("sesion", JSON.stringify(sesion)); 

    location.reload(); 
}


//Realizar compra
document.getElementById("comprar").addEventListener("click", (event) => {
    let sesion = JSON.parse( localStorage.getItem("sesion") );
    sesion.carrito = []; 

    localStorage.setItem("sesion", JSON.stringify(sesion)); 

    alert("Pedido realizado"); 
    location.reload(); 

}); 

mostrarCarrito(); 