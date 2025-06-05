-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-06-2025 a las 18:25:56
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `visitas_edificio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitas`
--

CREATE TABLE `visitas` (
  `ID` int(11) NOT NULL COMMENT 'Identificador unico',
  `Nombre` varchar(100) NOT NULL COMMENT 'Nombre del visitante',
  `Apellido` varchar(100) NOT NULL COMMENT 'Apelldio del visitante',
  `DNI` varchar(20) NOT NULL COMMENT 'DNI del visitante',
  `Motivo` varchar(255) NOT NULL COMMENT 'Motivo de la visita',
  `Persona_visitada` varchar(100) NOT NULL COMMENT 'Persona a la que visita',
  `fecha_ingreso` date NOT NULL COMMENT 'Fecha de ingreso',
  `hora_ingreso` time NOT NULL COMMENT 'Hora de ingreso',
  `fecha_salida` date DEFAULT NULL COMMENT 'Fecha de salida',
  `hora_salida` time DEFAULT NULL COMMENT 'Hora de salida'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `visitas`
--

INSERT INTO `visitas` (`ID`, `Nombre`, `Apellido`, `DNI`, `Motivo`, `Persona_visitada`, `fecha_ingreso`, `hora_ingreso`, `fecha_salida`, `hora_salida`) VALUES
(8, 'Sasha', 'Busto', '12345678', 'Cumpleaños', 'Karen', '2025-06-05', '13:20:00', '2025-06-05', '13:21:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `visitas`
--
ALTER TABLE `visitas`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `visitas`
--
ALTER TABLE `visitas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador unico', AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
