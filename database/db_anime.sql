-- Table structure for table `anime`
CREATE TABLE `anime` (
  `id_anime` int NOT NULL AUTO_INCREMENT,
  `judul` varchar(100) DEFAULT NULL,
  `sub_judul` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `released` year DEFAULT NULL,
  `deskripsi` text,
  `thumbnail` longtext,
  `banner` longtext,
  PRIMARY KEY (`id_anime`)
);

-- Table structure for table `episode`
CREATE TABLE `episode` (
  `id_episode` int NOT NULL AUTO_INCREMENT,
  `label` varchar(100) DEFAULT NULL,
  `vidio` text,
  PRIMARY KEY (`id_episode`)
);

-- Table structure for table `anime_mempunyai_episode`
CREATE TABLE `anime_mempunyai_episode` (
  `id_anime` int DEFAULT NULL,
  `id_episode` int DEFAULT NULL,
  KEY `id_anime` (`id_anime`),
  KEY `id_episode` (`id_episode`),
  CONSTRAINT `anime_mempunyai_episode_ibfk_1` FOREIGN KEY (`id_anime`) REFERENCES `anime` (`id_anime`),
  CONSTRAINT `anime_mempunyai_episode_ibfk_2` FOREIGN KEY (`id_episode`) REFERENCES `episode` (`id_episode`)
);

-- Table structure for table `genre`
CREATE TABLE `genre` (
  `id_genre` int NOT NULL AUTO_INCREMENT,
  `label` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_genre`)
);

-- Table structure for table `anime_mengandung_genre`
CREATE TABLE `anime_mengandung_genre` (
  `id_genre` int DEFAULT NULL,
  `id_anime` int DEFAULT NULL,
  KEY `id_genre` (`id_genre`),
  KEY `id_anime` (`id_anime`),
  CONSTRAINT `anime_mengandung_genre_ibfk_1` FOREIGN KEY (`id_genre`) REFERENCES `genre` (`id_genre`),
  CONSTRAINT `anime_mengandung_genre_ibfk_2` FOREIGN KEY (`id_anime`) REFERENCES `anime` (`id_anime`)
);

-- Table structure for table `user`
CREATE TABLE `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `foto_profile` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_user`)
);

-- Table structure for table `user_menandai_anime`
CREATE TABLE `user_menandai_anime` (
  `id_user` int DEFAULT NULL,
  `id_anime` int DEFAULT NULL,
  KEY `id_user` (`id_user`),
  KEY `id_anime` (`id_anime`),
  CONSTRAINT `user_menandai_anime_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  CONSTRAINT `user_menandai_anime_ibfk_2` FOREIGN KEY (`id_anime`) REFERENCES `anime` (`id_anime`)
);

-- Table structure for table `user_mengomentari_episode`
CREATE TABLE `user_mengomentari_episode` (
  `id_user` int DEFAULT NULL,
  `id_episode` int DEFAULT NULL,
  `komentar` varchar(255) DEFAULT NULL,
  KEY `id_user` (`id_user`),
  KEY `id_episode` (`id_episode`),
  CONSTRAINT `user_mengomentari_episode_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  CONSTRAINT `user_mengomentari_episode_ibfk_2` FOREIGN KEY (`id_episode`) REFERENCES `episode` (`id_episode`)
);

-- Table structure for table `user_menilai_anime`
CREATE TABLE `user_menilai_anime` (
  `id_user` int DEFAULT NULL,
  `id_anime` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  KEY `id_user` (`id_user`),
  KEY `id_anime` (`id_anime`),
  CONSTRAINT `user_menilai_anime_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  CONSTRAINT `user_menilai_anime_ibfk_2` FOREIGN KEY (`id_anime`) REFERENCES `anime` (`id_anime`)
);
