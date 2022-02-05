-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2022 at 11:17 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medicalapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(32) NOT NULL,
  `user_id` int(32) NOT NULL,
  `doctor_id` int(32) NOT NULL,
  `mobile` int(32) NOT NULL,
  `date` varchar(32) DEFAULT NULL,
  `clock` varchar(32) NOT NULL,
  `status` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `user_id`, `doctor_id`, `mobile`, `date`, `clock`, `status`) VALUES
(28, 11, 3, 777685048, '2022-02-10', '8-8:30 am', 0),
(29, 11, 1, 777685048, '2022-02-10', '8-8:30 am', 0),
(32, 9, 2, 777685048, '2022-03-29', '3-3:30 pm', 1),
(33, 45, 3, 777685048, '2022-03-02', '12-12:30 pm', 0),
(34, 45, 1, 777685048, '2022-02-15', '12-12:30 pm', 1),
(35, 45, 3, 777685048, '2022-03-02', '12-12:30 pm', 0),
(36, 45, 1, 777685048, '2022-02-15', '12-12:30 pm', 0),
(37, 9, 2, 777685048, '2022-03-29', '3-3:30 pm', 0);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(32) NOT NULL,
  `username` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `username`, `email`, `password`, `role`) VALUES
(1, 'Dr.Alexa', 'alexa@gmail.com', '123456789', 1),
(2, 'Dr.John', 'john@gmail.com', '123456789', 1),
(3, 'Dr.Rebecca', 'rebecca@gmail.com', '123456789', 1),
(9, 'amro', 'amro@gmail.com', '123456789', 0),
(11, 'yaser', 'yaser@gmail.com', '123456789', 0),
(14, 'amro', 'beshiralkhadra@gmail.com', '123456789', 0),
(36, 'amro', 'amro123@gmail.com', '123456789', 0),
(43, 'beshir', 'beshii@gmail.com', '123456789', 0),
(44, 'beshir', 'beshicddi@gmail.com', '123456789', 0),
(45, 'mohd', 'mohd@gmail.com', '123456789', 0),
(46, 'mohd', 'mohd@gmail.com', '123456789', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointments_ibfk_1` (`user_id`),
  ADD KEY `appointments_ibfk_2` (`doctor_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
