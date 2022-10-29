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

// WebSockets
const socket = require("socket.io")
const { rejects } = require("assert")

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


app.get(process.env.GUEST_PATH , (req,res)=>{
    res.render("inicioGuest.ejs")
})

app.get(process.env.HOME_PATH , (req,res)=>{
    res.render("inicio.ejs")
})

app.get(process.env.COURSES_PATH , (req,res)=>{
    res.render("cursos.ejs")
})

app.get(process.env.REG_CURSOS_PATH , (req,res)=>{
    res.render("regCursos.ejs")
})

app.get(process.env.PELICULAS_PATH , (req,res)=>{
    res.render("peliculas.ejs")
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

app.get(process.env.ERROR_PATH , (req,res)=>{
    res.render("error.ejs")
})

app.get(process.env.ERROR_ACCESS_PATH , (req,res)=>{
    res.render("errorAccess.ejs")
})

app.get(process.env.ERROR_CLAVE_CORTA_PATH , (req,res)=>{
    res.render("claveCorta.ejs")
})

app.get(process.env.ERROR_NO_COINCIDE_PATH , (req,res)=>{
    res.render("claveNoCoincide.ejs")
})


app.post("/registro" ,(req,res)=>{
    const {nombre,apellido,email,telefono,password,confirmPassword} = req.body
    if(password !== confirmPassword){
        res.redirect("/error/clave/corta")
    }
    if(password.length<10){
        res.redirect("/error/clave/no/coinciden")
    }
    else if(password == confirmPassword){

        const payload = {
            nombre : nombre,
            correo : email,
            clave  : password,
            acceso : "Usuario"
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
            const payload = {
                correo : email,
                acceso : "Usuario"
            }
            jwt.sign(payload, process.env.KEY , {algorithm:"HS256" , expiresIn : 86400} , (err,token)=>{
                if(err) throw err
    
                const ingresar = `INSERT INTO iniciarSesion (correo,token) values ("${email}","${token}");`
                    connection.query(ingresar,(err,data,fields)=>{
                        if(err)throw err   
                        res.redirect("/verify")                 
                })
            })
    }
})

app.get("/verify",(req,res)=>{
        const sql = `SELECT * FROM iniciarSesion;`
        connection.query(sql,(err,data,fields)=>{
            if(err){
                res.redirect("/error")
            }
            jwt.verify(data[0].token,process.env.KEY,(err,decoded)=>{
                if(decoded.acceso == "Usuario"){
                    res.redirect("/miCuenta")
                }
                if(decoded.acceso == "Administrador"){
                    res.redirect("/admin")
                }
            })
            })
})

app.post("/registro/curso" ,(req,res)=>{
    const {nombre,curso} = req.body
        const sql = `INSERT INTO estudiantes (nombre, curso) values ("${nombre}","${curso}");`
            connection.query(sql,(err,data,fields)=>{
                if(err)throw err
                    
                res.redirect("/inicio")
        })            

})

app.post("/contacto",async(req,res)=>{
    const {fullname,email,phone,asunto,message} = req.body
    const sql = `INSERT INTO mensaje (nombre_completo,numero_telefono,correo,asunto,mensaje) values ("${fullname}","${phone}","${email}","${asunto}","${message}");`
    connection.query(sql,(err,data,fields)=>{
        if(err)throw err
        
        res.redirect("/inicio")
    })
})


// Administrador

//Usuarios Registrados
app.get("/admin",async(req,res)=>{
    const sql = `SELECT * FROM registro;`
	var user = await new Promise((resolve, reject) => {
		connection.query(sql, (err,data,fields) => {
		if(err) return reject(err)
		return resolve(data)
		})
	})
	res.render('admin', {user})
})

// Usuarios Logueados
app.get("/adminLogin",async(req,res)=>{
    const sql = `SELECT * FROM iniciarSesion;`
    var login = await new Promise((resolve, reject) => {
		connection.query(sql, (err,data,fields) => {
		if(err) return reject(err)
		return resolve(data)
		})
	})
	res.render('admLogin', {login})
})

// Mensajes de usuarios
app.get("/adminMensaje",async(req,res)=>{
    const sql = `SELECT * FROM mensaje;`
    var mensaje = await new Promise((resolve, reject) => {
		connection.query(sql, (err,data,fields) => {
		if(err) return reject(err)
		return resolve(data)
		})
	})
	res.render('adminMsj', {mensaje})
})

// Estudiantes Registrados
app.get("/admin/estudiantes",async(req,res)=>{
    const sql = `SELECT * FROM estudiantes;`
    var estudiante = await new Promise((resolve, reject) => {
		connection.query(sql, (err,data,fields) => {
		if(err) return reject(err)
		return resolve(data)
		})
	})
	res.render('admEstudiante', {estudiante})
})

// Creando Nuevo Usuario 
app.get('/create', (req,res) => {	
	res.render('create')
})

// Creando Nuevo Usuario
app.post('/save', (req,res) => {
    const {nombre,apellido,email,telefono,password,confirmPassword} = req.body
    if(password !== confirmPassword){
        res.send("Las contraseñas no coinciden"+"<a href='/registro'>Regresar</a>")
    }
    if(password.length<10){
        res.send("La contraseña es muy corta, debe ser mayor a 10 digitos")
    }
    else if(password == confirmPassword){

        const payload = {
            nombre : nombre,
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
                    
                    res.redirect("/admin")
                }) 
                
            })
        })            
    }
})


app.get('/delete/:id', (req,res) => {
	const{ id } = req.params
	sql = `DELETE FROM registro WHERE id='${id}';`
	connection.query(sql, (err,data,fields) => {
		if (err) throw err
	  res.redirect('/admin')
	})
})
