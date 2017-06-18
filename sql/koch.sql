-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-06-2017 a las 11:07:17
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `koch`
--
CREATE DATABASE IF NOT EXISTS `koch` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `koch`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `desarrolladoras`
--

DROP TABLE IF EXISTS `desarrolladoras`;
CREATE TABLE `desarrolladoras` (
  `idDesarrolladoras` int(11) NOT NULL,
  `Nombre` varchar(45) DEFAULT NULL,
  `Pais` varchar(45) DEFAULT NULL,
  `Direccion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `desarrolladoras`
--

INSERT INTO `desarrolladoras` (`idDesarrolladoras`, `Nombre`, `Pais`, `Direccion`) VALUES
(1, 'Koch Media', 'España', 'Avenida de Sevilla'),
(2, 'Devolver', 'Estados Unidos', 'Avenida Kansas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `existencias`
--

DROP TABLE IF EXISTS `existencias`;
CREATE TABLE `existencias` (
  `idExistencias` int(11) NOT NULL,
  `idTiendaFK` int(11) DEFAULT NULL,
  `idVideojuegoFK` int(11) DEFAULT NULL,
  `Stock` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `existencias`
--

INSERT INTO `existencias` (`idExistencias`, `idTiendaFK`, `idVideojuegoFK`, `Stock`) VALUES
(2, 4, 10, 12),
(3, 4, 12, 10),
(4, 4, 11, 10),
(5, 4, 13, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operaciones`
--

DROP TABLE IF EXISTS `operaciones`;
CREATE TABLE `operaciones` (
  `idOperacion` int(11) NOT NULL,
  `idTiendaFK` int(11) NOT NULL,
  `idVideojuegoFK` int(11) NOT NULL,
  `Unidades` int(11) NOT NULL,
  `Tipo` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `operaciones`
--

INSERT INTO `operaciones` (`idOperacion`, `idTiendaFK`, `idVideojuegoFK`, `Unidades`, `Tipo`) VALUES
(2, 4, 10, 1, 'V'),
(3, 4, 10, 5, 'V'),
(4, 4, 10, 3, 'C'),
(5, 4, 11, 2, 'C'),
(6, 4, 10, 2, 'V'),
(7, 4, 10, 5, 'C');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plataformas`
--

DROP TABLE IF EXISTS `plataformas`;
CREATE TABLE `plataformas` (
  `plataforma` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `plataformas`
--

INSERT INTO `plataformas` (`plataforma`) VALUES
('PS4'),
('ONE'),
('Switch'),
('3DS'),
('PC'),
('WiiU');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiendas`
--

DROP TABLE IF EXISTS `tiendas`;
CREATE TABLE `tiendas` (
  `idTiendas` int(11) NOT NULL,
  `Nombre` varchar(45) DEFAULT NULL,
  `Pais` varchar(45) DEFAULT NULL,
  `Provincia` varchar(45) DEFAULT NULL,
  `Direccion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tiendas`
--

INSERT INTO `tiendas` (`idTiendas`, `Nombre`, `Pais`, `Provincia`, `Direccion`) VALUES
(4, 'Game', 'España', 'Granada', 'Avenida Mallorca'),
(7, 'Centro Mail', 'España', 'Sevilla', 'Avenida Canonigo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `videojuegos`
--

DROP TABLE IF EXISTS `videojuegos`;
CREATE TABLE `videojuegos` (
  `idVideojuegos` int(11) NOT NULL,
  `idDesarrolladoraFK` int(11) DEFAULT NULL,
  `Titulo` varchar(45) DEFAULT NULL,
  `Plataforma` varchar(45) DEFAULT NULL,
  `FechaSalida` date DEFAULT NULL,
  `Precio` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `videojuegos`
--

INSERT INTO `videojuegos` (`idVideojuegos`, `idDesarrolladoraFK`, `Titulo`, `Plataforma`, `FechaSalida`, `Precio`) VALUES
(10, 1, 'Kingdom Hearts 3', 'PS4', '2018-06-21', 60),
(11, 1, 'Xenoblade Chronicles 2', 'Switch', '2018-04-12', 55),
(12, 1, 'Mario Odyssei', 'Switch', '2017-10-19', 60),
(13, 1, 'Halo 6', 'ONE', '2017-12-14', 55);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `desarrolladoras`
--
ALTER TABLE `desarrolladoras`
  ADD PRIMARY KEY (`idDesarrolladoras`);

--
-- Indices de la tabla `existencias`
--
ALTER TABLE `existencias`
  ADD PRIMARY KEY (`idExistencias`),
  ADD KEY `idVideojuegoFK_idx` (`idVideojuegoFK`),
  ADD KEY `idTiendaFK_idx` (`idTiendaFK`);

--
-- Indices de la tabla `operaciones`
--
ALTER TABLE `operaciones`
  ADD PRIMARY KEY (`idOperacion`);

--
-- Indices de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  ADD PRIMARY KEY (`idTiendas`);

--
-- Indices de la tabla `videojuegos`
--
ALTER TABLE `videojuegos`
  ADD PRIMARY KEY (`idVideojuegos`),
  ADD KEY `idDesarrolladoraFK_idx` (`idDesarrolladoraFK`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `desarrolladoras`
--
ALTER TABLE `desarrolladoras`
  MODIFY `idDesarrolladoras` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `existencias`
--
ALTER TABLE `existencias`
  MODIFY `idExistencias` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `operaciones`
--
ALTER TABLE `operaciones`
  MODIFY `idOperacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  MODIFY `idTiendas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `videojuegos`
--
ALTER TABLE `videojuegos`
  MODIFY `idVideojuegos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `existencias`
--
ALTER TABLE `existencias`
  ADD CONSTRAINT `idTiendaFK` FOREIGN KEY (`idTiendaFK`) REFERENCES `tiendas` (`idTiendas`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idVideojuegoFK` FOREIGN KEY (`idVideojuegoFK`) REFERENCES `videojuegos` (`idVideojuegos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `videojuegos`
--
ALTER TABLE `videojuegos`
  ADD CONSTRAINT `idDesarrolladoraFK` FOREIGN KEY (`IdDesarrolladoraFK`) REFERENCES `desarrolladoras` (`idDesarrolladoras`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
