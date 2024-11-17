-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 17, 2024 at 04:09 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_anime`
--

-- --------------------------------------------------------

--
-- Table structure for table `anime`
--

CREATE TABLE `anime` (
  `id_anime` int NOT NULL,
  `judul` varchar(100) DEFAULT NULL,
  `sub_judul` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `released` date DEFAULT NULL,
  `deskripsi` text,
  `thumbnail` text,
  `banner` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `anime_mempunyai_episode`
--

CREATE TABLE `anime_mempunyai_episode` (
  `id_anime` int DEFAULT NULL,
  `id_episode` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `anime_mengandung_genre`
--

CREATE TABLE `anime_mengandung_genre` (
  `id_genre` int DEFAULT NULL,
  `id_anime` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `episode`
--

CREATE TABLE `episode` (
  `id_episode` int NOT NULL,
  `label` varchar(100) DEFAULT NULL,
  `vidio` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `id_genre` int NOT NULL,
  `label` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `foto_profile` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_menandai_anime`
--

CREATE TABLE `user_menandai_anime` (
  `id_user` int DEFAULT NULL,
  `id_anime` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_mengomentari_episode`
--

CREATE TABLE `user_mengomentari_episode` (
  `id_user` int DEFAULT NULL,
  `id_episode` int DEFAULT NULL,
  `komentar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_menilai_anime`
--

CREATE TABLE `user_menilai_anime` (
  `id_user` int DEFAULT NULL,
  `id_anime` int DEFAULT NULL,
  `rating` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anime`
--
ALTER TABLE `anime`
  ADD PRIMARY KEY (`id_anime`);

--
-- Indexes for table `anime_mempunyai_episode`
--
ALTER TABLE `anime_mempunyai_episode`
  ADD KEY `id_anime` (`id_anime`),
  ADD KEY `id_episode` (`id_episode`);

--
-- Indexes for table `anime_mengandung_genre`
--
ALTER TABLE `anime_mengandung_genre`
  ADD KEY `id_genre` (`id_genre`),
  ADD KEY `id_anime` (`id_anime`);

--
-- Indexes for table `episode`
--
ALTER TABLE `episode`
  ADD PRIMARY KEY (`id_episode`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id_genre`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `user_menandai_anime`
--
ALTER TABLE `user_menandai_anime`
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_anime` (`id_anime`);

--
-- Indexes for table `user_mengomentari_episode`
--
ALTER TABLE `user_mengomentari_episode`
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_episode` (`id_episode`);

--
-- Indexes for table `user_menilai_anime`
--
ALTER TABLE `user_menilai_anime`
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_anime` (`id_anime`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `anime_mempunyai_episode`
--
ALTER TABLE `anime_mempunyai_episode`
  ADD CONSTRAINT `anime_mempunyai_episode_ibfk_1` FOREIGN KEY (`id_anime`) REFERENCES `anime` (`id_anime`),
  ADD CONSTRAINT `anime_mempunyai_episode_ibfk_2` FOREIGN KEY (`id_episode`) REFERENCES `episode` (`id_episode`);

--
-- Constraints for table `anime_mengandung_genre`
--
ALTER TABLE `anime_mengandung_genre`
  ADD CONSTRAINT `anime_mengandung_genre_ibfk_1` FOREIGN KEY (`id_genre`) REFERENCES `genre` (`id_genre`),
  ADD CONSTRAINT `anime_mengandung_genre_ibfk_2` FOREIGN KEY (`id_anime`) REFERENCES `anime` (`id_anime`);

--
-- Constraints for table `user_menandai_anime`
--
ALTER TABLE `user_menandai_anime`
  ADD CONSTRAINT `user_menandai_anime_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `user_menandai_anime_ibfk_2` FOREIGN KEY (`id_anime`) REFERENCES `anime` (`id_anime`);

--
-- Constraints for table `user_mengomentari_episode`
--
ALTER TABLE `user_mengomentari_episode`
  ADD CONSTRAINT `user_mengomentari_episode_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `user_mengomentari_episode_ibfk_2` FOREIGN KEY (`id_episode`) REFERENCES `episode` (`id_episode`);

--
-- Constraints for table `user_menilai_anime`
--
ALTER TABLE `user_menilai_anime`
  ADD CONSTRAINT `user_menilai_anime_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `user_menilai_anime_ibfk_2` FOREIGN KEY (`id_anime`) REFERENCES `anime` (`id_anime`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
