//Variables 
const URL_USER = 'https://fakestoreapi.com/users';
const registrar = document.querySelector("#registrar"); 
const iniciar = document.querySelector("#iniciar");
const mensaje = document.getElementById("mensaje");  

//Input registrar
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellidos"); 
let clave = document.getElementById("clave"); 
let telefono = document.getElementById("telefono"); 
let dni = document.getElementById("dni"); 
let edad = document.getElementById("edad"); 
let registrarBtn = document.getElementById("registrarBtn");
let valido = false; 

apellido.disabled = true; 
clave.disabled = true; 
telefono.disabled = true; 
dni.disabled = true; 
edad.disabled = true; 

let loginBtn = document.getElementById("loginBtn"); 
let loginNombre = document.getElementById("loginNombre"); 
let loginClave = document.getElementById("loginClave"); 


//Event Listener
//-----------------------------------

//Mostrar login y ocultar resgistrar 
document.querySelector("#showLoginBtn").addEventListener("click", () => {
    registrar.style.display = "none"; 
    iniciar.style.display = "flex"; 
}); 

//Mostrar registrar y ocultar login 
document.querySelector("#showRegisterBtn").addEventListener("click", () => {
    iniciar.style.display = "none"; 
    registrar.style.display = "flex"; 
})

//Validar nombre 
nombre.addEventListener("input", () => {

    if (nombre.value.length < 3 || nombre.value == "" ) {
        mensaje.innerHTML = "El nombre debe tener al menos 3 caracteres"; 
        nombre.setCustomValidity("El nombre debe tener al menos 3 caracteres"); 
        apellido.disabled = true; 
        clave.disabled = true; 
        telefono.disabled = true; 
        dni.disabled = true; 
        edad.disabled = true; 
    } else {
        mensaje.innerHTML = ""; 
        nombre.setCustomValidity(""); 
        apellido.disabled = false; 
    }
    
}); 

//Validar apellido
apellido.addEventListener("input", () => {

    if (apellido.value.length < 10 || apellido.value == "") {
        mensaje.innerHTML = "El apellido debe tener al menos 10 caracteres"; 
        apellido.setCustomValidity("El apellido debe tener al menos 10 caracteres"); 
        clave.disabled = true; 
        telefono.disabled = true; 
        dni.disabled = true; 
        edad.disabled = true; 
    } else {
        mensaje.innerHTML = ""; 
        apellido.setCustomValidity(""); 
        clave.disabled = false; 
    }
    
}); 

//Validar contraseña
clave.addEventListener("input", () => {
    let regexClave = /^(?=.*\d).{8,}$/; 

    if ( !regexClave.test(clave.value) || clave.value == "" ) {
        mensaje.innerHTML = "La clave debe contener un número y más de 8 caracteres"; 
        clave.setCustomValidity("La clave debe contener un número y más de 8 caracteres"); 
        telefono.disabled = true; 
        dni.disabled = true; 
        edad.disabled = true; 
    } else {
        mensaje.innerHTML = ""; 
        clave.setCustomValidity(""); 
        telefono.disabled = false; 
    }
    
}); 

//Validar teléfono
telefono.addEventListener("input", () => {
    let regexTel = /^\d{9}$/; 

    if ( !regexTel.test(telefono.value) || telefono.value == "" ) {
        mensaje.innerHTML = "Formato de teléfono no válido"; 
        telefono.setCustomValidity("Formato de teléfono no válido"); 
        dni.disabled = true; 
        edad.disabled = true; 

    } else {
        mensaje.innerHTML = ""; 
        telefono.setCustomValidity(""); 
        dni.disabled = false; 
    }
    
}); 

//Validar dni 
dni.addEventListener("input", () => {
    let regexDni = /^\d{8}[a-zA-Z]$/; 

    if ( !regexDni.test(dni.value) || dni.value == "" ) {
        mensaje.innerHTML = "DNI no válido"; 
        dni.setCustomValidity("DNI no válido"); 
        edad.disabled = true; 

    } else {
        mensaje.innerHTML = ""; 
        dni.setCustomValidity(""); 
        edad.disabled = false; 
    }
    
});

//Validar edad
edad.addEventListener("input", () => {

    if ( edad.value == "" ) {
        valido = false; 

    } else {
        mensaje.innerHTML = ""; 
        dni.setCustomValidity(""); 
        valido = true; 
    }
    
});


//Registrar datos 
registrarBtn.addEventListener("click", (event) => {

    event.preventDefault(); 

    if (valido) {
        let usuario = {
            nombre : nombre.value,
            apellido : apellido.value, 
            clave : clave.value,
            telefono : telefono.value, 
            dni : dni.value,
            edad : edad.value, 
            favoritos: [], 
            carrito: [],
        }; 

        //Guardar datos
        localStorage.setItem(nombre.value, JSON.stringify(usuario)); 
        alert("Usuario creado correctamente."); 
    }


}); 

//Iniciar sesión
loginBtn.addEventListener("click", async (event) => {
    event.preventDefault(); 

    if (checkLocalUser(loginNombre.value, loginClave.value) || await checkApiUsers(loginNombre.value, loginClave.value)) {
        alert("Sesión iniciada correctamente");
        let carrito = []; 
        let favoritos = []; 

        if (checkLocalUser(loginNombre.value, loginClave.value)){
            carrito = JSON.parse(localStorage.getItem(loginNombre.value)).carrito; 
            favoritos = JSON.parse(localStorage.getItem(loginNombre.value)).favoritos; 
        }

        let sesion = {
            nombre: loginNombre.value, 
            carrito: carrito,
            favoritos: favoritos,
        }

        localStorage.setItem("sesion", JSON.stringify(sesion)); 

        window.location.href = "../index.html"; 
    }else {
        alert("Error al iniciar sesión"); 
    }

})

//-----------------------------------

//Funciones
//-----------------------------------

async function checkApiUsers(nombre, clave) {
    try {
        const res = await fetch(URL_USER);
        const users = await res.json();
        return users.some(user => user.username === nombre && user.password === clave);
    } catch (error) {
        return false;
    } 
}

function checkLocalUser(nombre, clave) {
    let usuario = JSON.parse( localStorage.getItem(nombre) ); 

    if (usuario && usuario.clave == clave) {
        return true; 
    } else {
        return false; 
    }

}

//-----------------------------------


