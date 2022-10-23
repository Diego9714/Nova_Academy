require("dotenv").config()
require("./controllers/connect.js")()
const connection = conn()

// Dependencias
const express       = require("express")
const app           = express()
const port          = process.env.PORT
const url           = process.env.URL
const ejs           = require("ejs")
const path          = require("path")
const parser        = require("body-parser")
const bcrypt        = require("bcrypt")
const fetch         = require("node-fetch")
const jwt           = require("jsonwebtoken")
const session       = require("express-session")

// Sesion
app.use(session({
    secret:"123456",
    resave:true,
    saveUninitialized:true
}))

// WebSockets
const socket = require("socket.io")

//Middlewares
app.set("views",path.join(__dirname,"../views"))
app.engine("ejs",ejs.__express)
app.set("view engine","ejs")
app.use(express.static("views"))
app.use(parser.urlencoded({extended:true}))


const server = app.listen(port,()=>{
    connection.connect(()=>{
        console.log(`Server runnig on ${url + port}`)
    })
})

// WebSockets
const io = socket(server)
io.on('connection',(socket)=>{
    console.log('New Conection', socket.id)
})


app.get(process.env.HOME_PATH , (req,res)=>{
    res.render("inicio.ejs")

    req.session.usuario = "Diego Cabrera"
    req.session.rol     = "Admin"
    req.session.visitas = req.session.visitas ? ++req.session.visitas : 1

    console.log(req.session)
    console.log(`El usuario ${req.session.usuario}  con el rol ${req.session.rol}  ha visitado esta página ${req.session.visitas}  veces`)
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

app.post("/registro" , async(req,res)=>{
    const {nombre,apellido,email,telefono,password,confirmPassword} = req.body
    if(password !== confirmPassword){
        res.send("Las contraseñas no coinciden"+"<a href='/registro'>Regresar</a>")
    }
    if(password.length<10){
        res.send("La contraseña es muy corta, debe ser mayor a 10 digitos")
    }
    else if(password == confirmPassword){

        const payload = {
            correo : email,
            clave  : password,
            niv_acc : "Usuario"
        }
        jwt.sign(payload, process.env.KEY , {algorithm:"HS256" , expiresIn : 86400} , (err,token)=>{
            if(err) throw err

            bcrypt.hash(password,10,(err,hash)=>{
                const sql = `INSERT INTO registro (nombre,apellido,numero_telefono,correo,clave,confirmar_clave, token) values ("${nombre}","${apellido}","${telefono}","${email}","${hash}","${confirmPassword}","${token}");`
                connection.query(sql,(err,data,fields)=>{
                    if(err)throw err
                    
                    res.redirect("/login")
                }) 
                
            })
        })            
    }
})

app.post("/login",async(req,res)=>{
    const {email,password} = req.body
    const sql = `SELECT * FROM registro WHERE correo = "${email}";`

    const user = await new Promise((resolve,reject)=>{
        connection.query(sql,(err,data,fields)=>{
            bcrypt.compare(password,data[0].clave ,(err,comp)=>{
                if(err) reject(err)
                resolve(comp)
            })
        })
    })

    if(user){
        connection.query(sql,(err,data,fields)=>{
            jwt.verify(data[0].token, process.env.KEY , (err,decoded)=>{
                if(err)throw err
                res.send(decoded)
            })    
        })
        
    }else{
        res.send("Hay un problema")
    }
})

app.get("/miCuenta",(req,res)=>{
    const sql = "SELECT id "
})