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





