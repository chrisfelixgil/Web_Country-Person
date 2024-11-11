CREATE DATABASE Asignacion3;

USE Asignacion3;

CREATE TABLE Pais (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(100),
    Gentilicio VARCHAR(100),
    Capital VARCHAR(50),
    Estatus VARCHAR(50)
);

CREATE TABLE Usuario (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	Nombre VARCHAR(100),
	Correo VARCHAR(100),
	Clave VARCHAR(75),
	Estatus VARCHAR(50)
);


INSERT INTO Pais (Nombre, Gentilicio, Capital, Estatus) VALUES
('República Dominicana', 'Dominicano', 'Santo Domingo', 'Activo'),
('México', 'Mexicano', 'Ciudad de México', 'Activo'),
('Argentina', 'Argentino', 'Buenos Aires', 'Activo'),
('España', 'Español', 'Madrid', 'Activo'),
('Colombia', 'Colombiano', 'Bogotá', 'Activo');

INSERT INTO Usuario (Nombre, Correo, Clave, Estatus) VALUES
('Juan Pérez', 'juan.perez@example.com', 'ClaveSegura123', 'Activo'),
('María López', 'maria.lopez@example.com', 'ContraseñaFuerte456', 'Activo'),
('Carlos Fernández', 'carlos.fernandez@example.com', 'Password123!', 'Inactivo'),
('Ana Gómez', 'ana.gomez@example.com', 'MiClaveSecreta789', 'Activo'),
('Luis Martínez', 'luis.martinez@example.com', 'ClaveSuperSegura321', 'Activo');


SELECT * FROM Usuario;