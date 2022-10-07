DROP DATABASE IF EXISTS novaAcademy;
CREATE DATABASE IF NOT EXISTS novaAcademy;
USE novaAcademy;

DROP TABLE IF EXISTS registro;
CREATE TABLE IF NOT EXISTS registro(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    numero_teléfono VARCHAR(30) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    contraseña VARCHAR(30) NOT NULL,
    confirmar_contraseña VARCHAR(100) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Llaves
    PRIMARY KEY (id),
    CONSTRAINT UNIQUE(correo)
);

DROP TABLE IF EXISTS iniciarSesion;
CREATE TABLE IF NOT EXISTS iniciarSesion(
    id INT UNSIGNED NOT NULL,
    correo VARCHAR(100) NOT NULL,
    contraseña VARCHAR(100) NOT NULL,
    fecha_inicioSesión TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(id) REFERENCES registro(id)
);

DROP TABLE IF EXISTS cursos;
CREATE TABLE IF NOT EXISTS cursos(
    nombre TEXT NOT NULL,
    duracion VARCHAR(10) NOT NULL,
    nro_temas INT NOT NULL
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


DROP TABLE IF EXISTS compraCurso;
CREATE TABLE IF NOT EXISTS compraCurso(
    id INT UNSIGNED NOT NULL ,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    cedula VARCHAR (18) NOT NULL,

    FOREIGN KEY(id) REFERENCES registro(id)
    CONSTRAINT UNIQUE(cedula)
);