const jwt = require("jsonwebtoken")

let btnIniciar=document.getElementById("btnIniciar")
function login(){
    var correo=document.getElementById("emailLogin").value
    var clave=document.getElementById("passLogin").value

    if(!clave||!correo){
        alert("campos sin datos")
        return false
    }

    if(clave.length<8){
        alert("Contraseña muy corta, mayor a 8 digitos")
        return false
    }

    const payload = {
        correo : correo,
        clave  : clave
    }
        jwt.sign(payload, process.env.KEY , {algorithm:"HS256" , expiresIn : 34000} ,(err,token)=>{
            if(err) throw err
            window.localStorage.setItem("token",token)
        })

}
btnIniciar.addEventListener("click",login); 
