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
    niv_acceso ENUM('0','1','2') DEFAULT '1',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Llaves
    PRIMARY KEY (id),
    CONSTRAINT UNIQUE (correo)
);


DROP TABLE IF EXISTS iniciarSesion;
CREATE TABLE iniciarSesion(
	id INT UNSIGNED AUTO_INCREMENT,
	correo VARCHAR(50) NOT NULL,
	clave VARCHAR(100) NOT NULL,
	fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
	PRIMARY KEY(id),
	CONSTRAINT UNIQUE(correo),
	FOREIGN KEY(correo) REFERENCES registro(correo)
);

DROP TABLE IF EXISTS cursos;
CREATE TABLE cursos(
	id INT UNSIGNED AUTO_INCREMENT,
	nombre VARCHAR(50) NOT NULL,
	descripcion VARCHAR(100),
    fecha_lanzamiento DATE,
	PRIMARY KEY(id),
	CONSTRAINT UNIQUE(nombre)
);

DROP TABLE IF EXISTS estudiantes;
CREATE TABLE IF NOT EXISTS estudiantes(
    id INT UNSIGNED NOT NULL,
    nombre TEXT NOT NULL,
    curso TEXT NOT NULL,

    FOREIGN KEY(id) REFERENCES registro(id)
);

DROP TABLE IF EXISTS profesores;
CREATE TABLE IF NOT EXISTS profesores(
    -- id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre TEXT NOT NULL,
    curso TEXT NOT NULL
);


-- DROP TABLE IF EXISTS compraCurso;
-- CREATE TABLE IF NOT EXISTS compraCurso(
--     id INT UNSIGNED NOT NULL ,
--     nombre TEXT NOT NULL,
--     apellido TEXT NOT NULL,
--     cedula VARCHAR (18) NOT NULL,

--     FOREIGN KEY(id) REFERENCES registro(id)
--     CONSTRAINT UNIQUE(cedula)
-- );