function mostrarMenu(){
  document.getElementById("checkbtn2").style.display="block";
  document.getElementById("checkbtn1").style.display="none";
  document.getElementById("login").style.display= "none";

}
function ocultarMenu(){
  document.getElementById("checkbtn1").style.display="block";
  document.getElementById("checkbtn2").style.display="none";
  document.getElementById("login").style.display= "block";
}

// Formulario Editar datos usuario
function mostrarForm(){
    document.getElementById("btnEditarDatos2").style.display="block";
    document.getElementById("btnEditarDatos1").style.display="none";
    document.getElementById("editarDatos").style.display= "block";
  }
  function ocultarForm(){
    document.getElementById("btnEditarDatos1").style.display="block";
    document.getElementById("btnEditarDatos2").style.display="none";
    document.getElementById("editarDatos").style.display= "none";
  }
