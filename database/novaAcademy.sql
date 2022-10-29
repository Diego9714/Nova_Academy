DROP DATABASE IF EXISTS novaAcademy;
CREATE DATABASE IF NOT EXISTS novaAcademy;
USE novaAcademy;

DROP TABLE IF EXISTS registro;
CREATE TABLE IF NOT EXISTS registro(
    id INT UNSIGNED  AUTO_INCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    numero_telefono VARCHAR(30) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    clave VARCHAR(100) NOT NULL,
    confirmar_clave VARCHAR(100) NOT NULL,
    token VARCHAR(500),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Llaves
    PRIMARY KEY (id),
    CONSTRAINT UNIQUE (correo)
);


DROP TABLE IF EXISTS iniciarSesion;
CREATE TABLE iniciarSesion(
	id INT UNSIGNED AUTO_INCREMENT,
	correo VARCHAR(50) NOT NULL,
    token VARCHAR(500),
	fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
	PRIMARY KEY(id),
    FOREIGN KEY(correo) REFERENCES registro(correo)
);

DROP TABLE IF EXISTS cursos;
CREATE TABLE cursos(
	id INT UNSIGNED AUTO_INCREMENT,
	nombre VARCHAR(50) NOT NULL,
	descripcion VARCHAR(100),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
	PRIMARY KEY(id),
	CONSTRAINT UNIQUE(nombre)
);

DROP TABLE IF EXISTS estudiantes;
CREATE TABLE IF NOT EXISTS estudiantes(
    id INT UNSIGNED AUTO_INCREMENT,
    nombre TEXT NOT NULL,
    curso TEXT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS administrador;
CREATE TABLE IF NOT EXISTS administrador(
    id INT UNSIGNED  AUTO_INCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    numero_telefono VARCHAR(30) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    clave VARCHAR(100) NOT NULL,
    confirmar_clave VARCHAR(100) NOT NULL,
    token VARCHAR(500),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Llaves
    PRIMARY KEY (id),
    CONSTRAINT UNIQUE (correo)
);

DROP TABLE IF EXISTS mensaje;
CREATE TABLE IF NOT EXISTS mensaje(
    id INT UNSIGNED  AUTO_INCREMENT,
    nombre_completo TEXT NOT NULL,
    numero_telefono VARCHAR(30) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    asunto TEXT NOT NULL,
    mensaje VARCHAR(200) NOT NULL,
    fecha_mensaje TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Llaves
    PRIMARY KEY (id)

);

INSERT INTO administrador (nombre,apellido,numero_telefono,correo,clave,confirmar_clave, token) values ("Diego Alexander","Cabrera Mantilla","0424-7435491","diegoa.9714@gmail.com","$2b$10$QdSgLxWdRNtMBH5wVgmVkOUxwcbRohcD8JWqHYto3MqVFy8bK/Klm","diego9714","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJEaWVnbyBBbGV4YW5kZXIiLCJjb3JyZW8iOiJkaWVnb2EuOTcxNEBnbWFpbC5jb20iLCJjbGF2ZSI6ImRpZWdvOTcxNDExIiwiYWNjZXNvIjoiQWRtaW5pc3RyYWRvciIsImlhdCI6MTY2Njk1NDAzNCwiZXhwIjoxNjY3MDQwNDM0fQ.MWTVU7ICoqcKQ0GRZgPkuQPjup_LzsrYZuQHryF2zqs");

INSERT INTO cursos (nombre,descripcion) values ("Html","En este curso, aprenderas los conocimientos necesarios para dominar Html."),("Css","En este curso, aprenderas los conocimientos necesarios para dominar Css."),("Javascript","En este curso, aprenderas los conocimientos necesarios para dominar Javascript."),("NodeJs","En este curso, aprenderas los conocimientos necesarios para dominar NodeJs."),("Mysql","En este curso, aprenderas los conocimientos necesarios para dominar Mysql."),("PostgreSql","En este curso, aprenderas los conocimientos necesarios para dominar PostgreSql."),("React","En este curso, aprenderas los conocimientos necesarios para dominar React."),("Ruby","En este curso, aprenderas los conocimientos necesarios para dominar Ruby."),("Postman","En este curso, aprenderas los conocimientos necesarios para aprender a usar Postman."),("Vue.Js","En este curso, aprenderas los conocimientos necesarios para dominar Vue.Js ."),("Php","En este curso, aprenderas los conocimientos necesarios para dominar Php."),("Phyton","En este curso, aprenderas los conocimientos necesarios para dominar Phyton."),("Boostrap","En este curso, aprenderas los conocimientos necesarios para aprender a usar Boostrap."),("Wordpress","En este curso, aprenderas los conocimientos necesarios para dominar Wordpress."),("Desarrollo Web","En este curso, aprenderas los conocimientos necesarios para introducirte y dominar el mundo del desarrolo web.")