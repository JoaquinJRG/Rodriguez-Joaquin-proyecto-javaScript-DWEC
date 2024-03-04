//Variables
let searchParams = new URLSearchParams(window.location.search);
let idProd = searchParams.get("prod");


fetch(`https://fakestoreapi.com/products/${idProd}`)
    .then(res => res.json())
    .then(data => {
        document.getElementById("titulo").innerHTML = data.title;
        document.getElementById("precio").innerHTML = data.price;
        document.getElementById("descripcion").innerHTML = data.description;
        let img = document.createElement("img");
        img.src = data.image;

        document.getElementById("divImagen").append(img);
    });


document.getElementById("addChart").addEventListener("click", () => {
    if (checkSesion()) {
        let sesion = JSON.parse( localStorage.getItem("sesion") ); 

        if (!sesion.carrito.includes(idProd)) {
            sesion.carrito.push(idProd); 
            localStorage.setItem("sesion", JSON.stringify(sesion)); 
        }

    } else {
        alert("Tienes que iniciar sesión"); 
    }
});



function checkSesion() {
    if (localStorage.getItem("sesion")) {
        return true;
    } 

    return false; 
}
