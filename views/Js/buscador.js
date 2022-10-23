var buscador = document.getElementById("buscador").addEventListener("click", mostrar)
var search = document.getElementById("contentSearch").addEventListener("click", ocultar)
var boxSearch = document.getElementById("box-search")

function mostrar(){
    boxSearch.style.display = "block"
}

function ocultar(){
    boxSearch.style.display = "none"
}

function buscadorInterno(){
    filter = buscador
}