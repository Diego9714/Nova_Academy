let btnRegister=document.getElementById("btnRegister")
function register(){
    var correo=document.getElementById("emailReg").value
    var clave=document.getElementById("passReg").value

    if(!clave||!correo){
        alert("campos sin datos")
        return false
    }

    if(clave.length<8){
        alert("Contraseña muy corta, mayor a 8 digitos")
        return false
    }

    alert("Registro Completado, ya puedes inciar sesión")
    window.localStorage.setItem("cor",correo)
}
btnRegister.addEventListener("click",register); 
