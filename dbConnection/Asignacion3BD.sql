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
('Rep�blica Dominicana', 'Dominicano', 'Santo Domingo', 'Activo'),
('M�xico', 'Mexicano', 'Ciudad de M�xico', 'Activo'),
('Argentina', 'Argentino', 'Buenos Aires', 'Activo'),
('Espa�a', 'Espa�ol', 'Madrid', 'Activo'),
('Colombia', 'Colombiano', 'Bogot�', 'Activo');

INSERT INTO Usuario (Nombre, Correo, Clave, Estatus) VALUES
('Juan P�rez', 'juan.perez@example.com', 'ClaveSegura123', 'Activo'),
('Mar�a L�pez', 'maria.lopez@example.com', 'Contrase�aFuerte456', 'Activo'),
('Carlos Fern�ndez', 'carlos.fernandez@example.com', 'Password123!', 'Inactivo'),
('Ana G�mez', 'ana.gomez@example.com', 'MiClaveSecreta789', 'Activo'),
('Luis Mart�nez', 'luis.martinez@example.com', 'ClaveSuperSegura321', 'Activo');


SELECT * FROM Usuario;