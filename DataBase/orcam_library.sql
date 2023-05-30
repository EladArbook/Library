-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2023 at 11:16 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `orcam_library`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `book_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `category` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `language` varchar(20) NOT NULL,
  `pages` int(10) NOT NULL,
  `devPages` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `qaPages` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_id`, `name`, `category`, `status`, `language`, `pages`, `devPages`, `qaPages`) VALUES
(47, 'BBC', 3, 0, 'Russian', 12, '30-60, 12, 30-60, 12, 30-60, 12, 450', '12, 12, 12, 12, 450'),
(49, 'holy bible', 1, 1, 'English', 1000, '12', '11,22,33,44-55'),
(51, 'Tarzan', 1, 1, 'English', 480, '13', '12, 13'),
(53, 'Cylinderella', 2, 0, 'English', 120, '12', '12'),
(54, 'Boring Facts', 1, 1, 'Hebrew', 60, '14', '0'),
(64, 'Maor`s Life', 1, 1, 'Hebrew', 200, '0', '0');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`) VALUES
(1, 'book'),
(2, 'magazine'),
(3, 'newspaper');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `operation_id` int(11) NOT NULL,
  `user` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `book_name` varchar(30) NOT NULL,
  `operation` int(11) NOT NULL,
  `borrower` varchar(20) NOT NULL,
  `devPages` text NOT NULL,
  `qaPages` text NOT NULL,
  `bookId_not_key` int(11) NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`operation_id`, `user`, `date`, `book_name`, `operation`, `borrower`, `devPages`, `qaPages`, `bookId_not_key`, `time`) VALUES
(89, 'employeeId', '2023-03-08', '', 2, 'elad', '0', '0', 47, '10:09:03'),
(90, 'employeeId', '2023-03-08', '', 3, 'yagel', '0', '0', 0, '10:11:07'),
(91, 'employeeId', '2023-03-08', '', 2, 'michael', '0', '0', 47, '10:11:14'),
(92, 'employeeId', '2023-03-08', '', 3, 'michael', '0', '0', 0, '10:11:19'),
(93, 'employeeId', '2023-03-08', '', 2, '123', '0', '0', 47, '10:11:40'),
(94, 'employeeId', '2023-03-08', '', 2, '123', '0', '0', 51, '10:11:42'),
(95, 'employeeId', '2023-03-08', '', 2, '123', '0', '0', 49, '10:11:45'),
(96, 'employeeId', '2023-03-08', '', 2, '123', '0', '0', 53, '10:11:47'),
(97, 'employeeId', '2023-03-08', '', 2, '123', '0', '0', 52, '10:11:49'),
(98, 'employeeId', '2023-03-08', '', 3, '123', '0', '0', 0, '10:11:54'),
(99, 'employeeId', '2023-03-08', '', 3, '123', '0', '0', 0, '10:11:57'),
(100, 'employeeId', '2023-03-08', '', 3, '123', '0', '0', 0, '10:12:00'),
(101, 'employeeId', '2023-03-08', '', 3, 'dwdw', '0', '0', 0, '10:29:09'),
(102, 'employeeId', '2023-03-08', '', 3, ' ', '0', '0', 0, '10:29:18'),
(103, 'employeeId', '2023-03-08', '', 2, ' ', '0', '0', 51, '10:32:27'),
(104, 'employeeId', '2023-03-08', '', 2, ' ', '0', '0', 49, '10:32:57'),
(105, 'employeeId', '2023-03-08', '', 2, ' ', '0', '0', 52, '10:33:24'),
(106, 'employeeId', '2023-03-08', '', 3, ' ', '0', '0', 0, '10:33:32'),
(107, 'employeeId', '2023-03-08', '', 3, ' ', '0', '0', 0, '10:33:42'),
(108, 'employeeId', '2023-03-08', '', 3, ' ', '0', '0', 0, '10:33:48'),
(109, 'employeeId', '2023-03-08', '', 2, ' ', '0', '0', 49, '10:34:29'),
(110, 'employeeId', '2023-03-08', '', 3, ' ', '0', '0', 0, '10:34:34'),
(111, 'employeeId', '2023-03-08', '', 2, ' ', '0', '0', 47, '10:41:08'),
(112, 'employeeId', '2023-03-08', '', 2, ' ', '0', '0', 51, '10:41:14'),
(113, 'employeeId', '2023-03-08', '', 2, ' ', '0', '0', 52, '10:41:16'),
(114, 'employeeId', '2023-03-08', '', 2, ' ', '0', '0', 53, '10:41:17'),
(115, 'employeeId', '2023-03-08', '', 2, ' ', '0', '0', 64, '10:41:21'),
(116, 'employeeId', '2023-03-08', '', 2, ' ', '0', '0', 54, '10:42:05'),
(117, 'employeeId', '2023-03-08', '', 3, ' ', '0', '0', 0, '10:42:14'),
(118, 'employeeId', '2023-03-08', '', 3, 'eladdddd', '', '', 0, '10:49:37'),
(119, 'employeeId', '2023-03-08', '', 3, 'eeee', '', '', 0, '10:52:31'),
(120, 'employeeId', '2023-03-08', '', 2, '12412421', '', '', 68, '10:53:10'),
(121, 'employeeId', '2023-03-08', '', 3, '123', '', '', 0, '10:53:18'),
(122, 'employeeId', '2023-03-08', '', 3, ' ', '', '', 0, '10:53:50'),
(123, 'employeeId', '2023-03-08', '', 2, 'me', '', '', 47, '10:54:22'),
(124, 'employeeId', '2023-03-08', '', 3, 'me again', '', '', 0, '10:54:44'),
(125, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 47, '11:03:32'),
(126, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 49, '11:03:35'),
(127, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 54, '11:03:36'),
(128, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 53, '11:03:37'),
(129, 'employeeId', '2023-03-08', '', 3, ' ', '12, ', '12-34', 0, '11:03:45'),
(130, 'employeeId', '2023-03-08', '', 3, '111', '', '50', 0, '11:03:51'),
(131, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 47, '11:05:05'),
(132, 'employeeId', '2023-03-08', '', 3, ' ', '12, ', '12', 0, '11:05:13'),
(133, 'employeeId', '2023-03-08', '', 2, '1', '', '', 47, '11:06:06'),
(134, 'employeeId', '2023-03-08', '', 3, '1', '12, 40', '30', 0, '11:06:12'),
(135, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 47, '11:08:49'),
(136, 'employeeId', '2023-03-08', '', 3, ' ', '12, 60-62', '40-50', 0, '11:09:01'),
(137, 'employeeId', '2023-03-08', '', 3, '  ', '12, 12, 60-62', '40-50', 0, '11:09:36'),
(138, 'employeeId', '2023-03-08', '', 3, '  ', '12, 60-62', '40-50', 0, '11:10:22'),
(139, 'employeeId', '2023-03-08', '', 3, '  ', '12, 12, 60-62', '40-50', 0, '11:10:22'),
(140, 'employeeId', '2023-03-08', '', 3, '  ', '12, 60-62', '40-50', 0, '11:11:16'),
(141, 'employeeId', '2023-03-08', '', 3, ' ', '12', '44', 0, '11:15:24'),
(142, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 47, '11:15:45'),
(143, 'employeeId', '2023-03-08', '', 3, ' ', '12, ', '44, 1', 0, '11:15:51'),
(144, 'employeeId', '2023-03-08', '', 3, ' ', '12, 12, ', '44, 44, 1', 0, '11:16:17'),
(145, 'employeeId', '2023-03-08', '', 3, '1', '12, ', '44,12,3, 48', 0, '11:20:11'),
(146, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 47, '11:20:27'),
(147, 'employeeId', '2023-03-08', '', 3, ' ', '12, , ', '44,12,3, 48, 20-30', 0, '11:20:42'),
(148, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 47, '11:22:32'),
(149, 'employeeId', '2023-03-08', '', 3, 'eee', '12 , ', '44,12,3, 48, 20-30, ', 0, '11:23:10'),
(150, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 47, '11:24:04'),
(151, 'employeeId', '2023-03-08', '', 3, ' ', '12 , 12', '44,12,3, 48, 20-30, ', 0, '11:24:09'),
(152, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 47, '11:25:10'),
(153, 'employeeId', '2023-03-08', '', 3, ' ', '12 , 12, ', '44,12,3, 48, 20-30 , ', 0, '11:25:16'),
(154, 'employeeId', '2023-03-08', '', 2, '1', '', '', 47, '11:26:24'),
(155, 'employeeId', '2023-03-08', '', 3, ' ', '', '', 0, '11:26:28'),
(156, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 47, '11:28:31'),
(157, 'employeeId', '2023-03-08', '', 3, ' ', '10-11', '12,13', 0, '11:28:43'),
(158, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 47, '11:28:54'),
(159, 'employeeId', '2023-03-08', '', 3, ' ', '10-11', '12,13, 1', 0, '11:29:01'),
(160, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 47, '11:29:07'),
(161, 'employeeId', '2023-03-08', '', 3, ' ', '10-11, 2', '12,13, 1', 0, '11:29:11'),
(162, 'employeeId', '2023-03-08', '', 2, '1', '', '', 47, '11:29:19'),
(163, 'employeeId', '2023-03-08', '', 3, '  ', '10-11, 2', '12,13, 1', 0, '11:29:24'),
(164, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 47, '11:29:28'),
(165, 'employeeId', '2023-03-08', '', 3, ' ', '10-11, 2, 124-130, 132', '12,13, 1, 123', 0, '11:29:40'),
(166, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 47, '11:29:49'),
(167, 'employeeId', '2023-03-08', '', 3, ' ', '10-11, 2, 124-130, 132', '12,13, 1, 123', 0, '11:29:54'),
(168, 'employeeId', '2023-03-08', '', 3, ' ', '', '', 0, '11:31:06'),
(169, 'employeeId', '2023-03-08', '', 3, ' ', '', '', 0, '11:31:08'),
(170, 'employeeId', '2023-03-08', '', 3, ' ', '', '', 0, '11:31:10'),
(171, 'employeeId', '2023-03-08', '', 3, ' ', '', '', 0, '11:31:11'),
(172, 'employeeId', '2023-03-08', '', 3, ' ', '', '', 0, '11:31:14'),
(173, 'employeeId', '2023-03-08', '', 3, ' ', '', '', 0, '11:31:16'),
(174, 'employeeId', '2023-03-08', '', 3, ' ', '', '', 0, '11:31:18'),
(175, 'employeeId', '2023-03-08', '', 3, ' ', '', '', 0, '11:31:27'),
(176, 'employeeId', '2023-03-08', '', 3, ' ', '', '', 0, '11:31:47'),
(177, 'employeeId', '2023-03-08', '', 3, ' ', '0', '1', 0, '11:33:18'),
(178, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 51, '11:33:53'),
(179, 'employeeId', '2023-03-08', '', 3, ' ', '', '', 0, '11:33:58'),
(180, 'employeeId', '2023-03-08', '', 3, ' ', '', '', 0, '11:36:03'),
(181, 'employeeId', '2023-03-08', '', 3, '1', '13', '12', 0, '11:36:36'),
(182, 'employeeId', '2023-03-08', '', 3, '1', '', '', 0, '11:37:33'),
(183, 'employeeId', '2023-03-08', '', 3, ' ', '', '', 0, '11:38:38'),
(184, 'employeeId', '2023-03-08', '', 3, ' ', '', '', 0, '11:39:02'),
(185, 'employeeId', '2023-03-08', '', 3, ' ', '', '', 0, '11:39:04'),
(186, 'employeeId', '2023-03-08', '', 2, 'e', '', '', 47, '11:39:29'),
(187, 'employeeId', '2023-03-08', '', 3, '1', '30-60', '12', 0, '11:39:38'),
(188, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 47, '11:39:42'),
(189, 'employeeId', '2023-03-08', '', 3, '2', '30-60, 12', '12', 0, '11:39:49'),
(190, 'employeeId', '2023-03-08', '', 3, ' ', '', '', 0, '13:02:20'),
(191, 'employeeId', '2023-03-08', '', 3, ' ', '', '', 0, '13:02:21'),
(192, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 49, '13:41:26'),
(193, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 47, '13:56:45'),
(194, 'employeeId', '2023-03-08', '', 3, ' ', '30-60, 12', '12', 0, '14:01:30'),
(195, 'employeeId', '2023-03-08', '', 3, 'maor', '0', '11,22,33,44-55', 0, '14:08:48'),
(196, 'employeeId', '2023-03-08', '', 2, ' ', '', '', 47, '15:18:06'),
(197, 'employeeId', '2023-03-08', '', 2, 'shahar', '', '', 51, '15:28:22'),
(198, 'employeeId', '2023-03-09', '', 2, '123', '', '', 49, '09:35:38'),
(199, 'employeeId', '2023-03-09', '', 2, '123', '', '', 54, '09:36:41'),
(200, 'elad arbook', '2023-03-09', '', 2, 'eeee', '', '', 64, '09:38:15'),
(201, 'elad arbook', '2023-03-09', 'asdasd', 2, 'asdasd', '', '', 53, '09:39:49'),
(202, 'employeeId', '2023-03-09', '', 3, '123', '30-60, 12', '12', 0, '09:40:47'),
(203, 'elad arbook', '2023-03-09', 'BBC', 2, 'memyselfandeye', '', '', 47, '09:41:00'),
(204, 'employeeId', '2023-03-09', '', 3, '123', '30-60, 12', '12', 0, '09:45:02'),
(205, 'employeeId', '2023-03-09', '', 3, '123', '30-60, 12, 30-60, 12', '12, 12', 0, '09:45:15'),
(206, 'employeeId', '2023-03-09', '', 3, '123', '30-60, 12, 30-60, 12, 30-60, 12', '12, 12, 12', 0, '09:46:51'),
(207, 'book.user', '2023-03-09', 'Tarzan', 3, '12', '', '', 0, '09:50:33'),
(208, 'book.user', '2023-03-09', 'holy bible', 3, '12', '12', '11,22,33,44-55', 0, '09:50:37'),
(209, 'book.user', '2023-03-09', 'Cylinderella', 3, '12', '12', '12', 0, '09:50:41'),
(210, 'book.user', '2023-03-09', 'Boring Facts', 3, '12', '', '', 0, '09:50:44'),
(211, 'elad arbook', '2023-03-09', 'BBC', 2, '1', '', '', 47, '09:53:58'),
(212, 'elad arbook', '2023-03-09', 'Tarzan', 2, '2', '', '', 51, '09:54:01'),
(213, 'elad arbook', '2023-03-09', 'Cylinderella', 2, '3', '', '', 53, '09:54:04'),
(214, 'elad arbook', '2023-03-09', 'Boring Facts', 2, '4', '', '', 54, '09:54:09'),
(215, 'elad arbook', '2023-03-09', 'BBC', 3, '12', '30-60, 12, 30-60, 12, 30-60, 12', '12, 12, 12, 12', 0, '09:54:16'),
(216, 'elad arbook', '2023-03-09', 'Tarzan', 3, '13', '13', '12, 13', 0, '09:54:22'),
(217, 'elad arbook', '2023-03-09', 'Boring Facts', 3, '14', '', '', 0, '09:54:26'),
(218, 'elad arbook', '2023-03-09', 'Maor`s Life', 3, '15', '', '', 0, '09:54:29'),
(219, 'elad arbook', '2023-03-09', 'BBC', 2, 'llad', '', '', 47, '09:58:09'),
(220, 'elad arbook', '2023-03-09', 'BBC', 3, 'llad', '30-60, 12, 30-60, 12, 30-60, 12, 450', '12, 12, 12, 12, 450', 0, '09:58:19'),
(221, 'elad arbook', '2023-03-09', 'BBC', 2, 'elad', '', '', 47, '12:04:42');

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `language_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`language_id`, `name`) VALUES
(10, 'English'),
(11, 'Hebrew'),
(16, 'Russian'),
(29, 'Spanish');

-- --------------------------------------------------------

--
-- Table structure for table `operations`
--

CREATE TABLE `operations` (
  `operation_id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `operations`
--

INSERT INTO `operations` (`operation_id`, `name`) VALUES
(1, 'new'),
(2, 'borrow'),
(3, 'return'),
(4, 'delete');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(0, 'taken'),
(1, 'available');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `employee_ID` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `password` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `employee_ID`, `first_name`, `last_name`, `password`) VALUES
(4, 8741, 'elad', 'arbook', '8741');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`),
  ADD KEY `category` (`category`),
  ADD KEY `status` (`status`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`operation_id`),
  ADD KEY `operation` (`operation`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`language_id`);

--
-- Indexes for table `operations`
--
ALTER TABLE `operations`
  ADD PRIMARY KEY (`operation_id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `operation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=222;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `language_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `operations`
--
ALTER TABLE `operations`
  MODIFY `operation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`category`) REFERENCES `categories` (`category_id`),
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`status`) REFERENCES `status` (`id`);

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`operation`) REFERENCES `operations` (`operation_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
