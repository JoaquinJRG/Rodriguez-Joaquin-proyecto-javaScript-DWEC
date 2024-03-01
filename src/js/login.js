//Variables 
const registrar = document.querySelector("#registrar"); 
const iniciar = document.querySelector("#iniciar"); 

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

//-----------------------------------

//Funciones
//-----------------------------------


//-----------------------------------


