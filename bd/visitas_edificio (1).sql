-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-06-2025 a las 04:17:03
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
-- Estructura de tabla para la tabla `personal_autorizado`
--

CREATE TABLE `personal_autorizado` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `dni` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `personal_autorizado`
--

INSERT INTO `personal_autorizado` (`id`, `nombre`, `apellido`, `dni`) VALUES
(1, 'sasha', 'busto', '12345678'),
(2, 'karen', 'barturen', '12345678'),
(3, 'yoselin', 'vega', '12345678'),
(4, 'osvaldo', 'rizzo', '12345678'),
(5, 'arlene', 'chambilla', '12345678');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_sesiones`
--

CREATE TABLE `registro_sesiones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `dni` varchar(20) DEFAULT NULL,
  `fecha_hora` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `registro_sesiones`
--

INSERT INTO `registro_sesiones` (`id`, `nombre`, `apellido`, `dni`, `fecha_hora`) VALUES
(7, 'sasha', 'busto', '12345678', '2025-06-22 19:34:39'),
(8, 'sasha', 'busto', '12345678', '2025-06-23 22:54:45'),
(9, 'sasha', 'busto', '12345678', '2025-06-24 20:12:46'),
(10, 'sasha', 'busto', '12345678', '2025-06-24 22:46:25');

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
(8, 'Sasha', 'Busto', '12345678', 'Cumpleaños', 'Karen', '2025-06-05', '13:20:00', '2025-06-23', '14:20:00'),
(9, 'Karen', 'Barturen', '87654321', 'Reunion', 'Arlene', '2025-06-05', '13:32:00', NULL, NULL),
(10, 'Sasha', 'Busto', '12345678', 'Cumpleaños', 'Karen', '2025-06-05', '13:47:00', '2025-06-05', '13:48:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `personal_autorizado`
--
ALTER TABLE `personal_autorizado`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `registro_sesiones`
--
ALTER TABLE `registro_sesiones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `visitas`
--
ALTER TABLE `visitas`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `personal_autorizado`
--
ALTER TABLE `personal_autorizado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `registro_sesiones`
--
ALTER TABLE `registro_sesiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `visitas`
--
ALTER TABLE `visitas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador unico', AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
