
//Mostrar login y ocultar resgistrar 
document.querySelector("#showLoginBtn").addEventListener("click", () => {
    document.querySelector("#registrar").style.display = "none"; 
    document.querySelector("#iniciar").style.display = "flex"; 
}); 

//Mostrar resgistrar y ocultar login 
document.querySelector("#showRegisterBtn").addEventListener("click", () => {
    document.querySelector("#iniciar").style.display = "none"; 
    document.querySelector("#registrar").style.display = "flex"; 
})