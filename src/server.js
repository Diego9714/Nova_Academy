require("dotenv").config()
require("./controllers/connect.js")()
const connection = conn()

// Dependencias
const express   = require("express")
const app       = express()
const port      = process.env.PORT
const url       = process.env.URL
const ejs       = require("ejs")
const path      = require("path")
const parser    = require("body-parser")
const bcrypt    = require("bcrypt")
const fetch     = require("node-fetch")
const jwt       = require("jsonwebtoken")

//Middlewares
app.set("views",path.join(__dirname,"../views"))
app.engine("ejs",ejs.__express)
app.set("view engine","ejs")
app.use(express.static("views"))
app.use(parser.urlencoded({extended:true}))

app.listen(port,()=>{
    connection.connect(()=>{
        console.log(`Server runnig on ${url + port}`)
    })
})

app.get(process.env.HOME_PATH , (req,res)=>{
    res.render("inicio.ejs")
})

app.get(process.env.COURSES_PATH , (req,res)=>{
    res.render("cursos.ejs")
})

app.get(process.env.CONTACT_PATH , (req,res)=>{
    res.render("contacto.ejs")
})

app.get(process.env.ACCOUNT_PATH , (req,res)=>{
    res.render("miCuenta.ejs")
})

app.get(process.env.REGISTER_PATH , (req,res)=>{
    res.render("registro.ejs")
})

app.get(process.env.LOGIN_PATH , (req,res)=>{
    res.render("login.ejs")
})

app.post("/registro" ,(req,res)=>{
    const {nombre,apellido,email,telefono,password,confirmPassword} = req.body
    if(password !== confirmPassword){
        res.send("Las contraseñas no coinciden"+"<a href='/registro'>Regresar</a>")
    }else if(password == confirmPassword){
        bcrypt.hash(password,10,(err,hash)=>{
            const sql = `INSERT INTO registro (nombre,apellido,numero_teléfono,correo,contraseña,confirmar_contraseña) values ("${nombre}","${apellido}","${telefono}","${email}","${hash}","${confirmPassword}");`
            connection.query(sql,(err,data,fields)=>{
                if(err)throw err
                res.redirect("/login")
            })  
        })
    }
    
})

app.post("/login",(req,res)=>{
    const {email,password} = req.body
    const sql = `SELECT * FROM registro WHERE correo = "${email}";`

    connection.query(sql,(err,data,fields)=>{
        if(err)throw err
        console.log(data)
    })

    // const user = await new Promise((resolve,reject)=>{
    //     connection.query(sql,(err,data,fields)=>{
    //         bcrypt.compare(password,data[0].password,(err,comp)=>{
    //             if(err) reject(err)
    //             resolve(comp)
    //         })
    //     })
    // })

    // if(user){
    //     const payload = {
    //         correo : email,
    //         clave  : password,
    //         niv_acc : "Usuario"
    //     }
    //     jwt.sign(payload, process.env.KEY , {algorithm:"HS256" , expiresIn : 86400} , (err,token)=>{
    //         if(err) throw err

    //         const sql = `INSERT INTO login (correo,token) values ("${email}","${token}");`

    //         connection.query(sql,(err)=>{
    //             if(err)throw err
    //             res.send("Token registrado en la base de datos")
    //         })
    //     })
    // }else{
    //     res.send("Hay un problema")
    // }
})