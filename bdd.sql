-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : mer. 07 jan. 2026 à 09:43
-- Version du serveur : 11.5.2-MariaDB
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `crm`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id`, `email`, `name`, `password`) VALUES
(1, 'admin1@crm.com', 'Admin One', 'password123'),
(2, 'admin2@crm.com', 'Admin Two', 'password456');

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `source` text NOT NULL,
  `note` text NOT NULL,
  `id_status` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_status` (`id_status`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contact`
--

INSERT INTO `contact` (`id`, `email`, `name`, `phone`, `source`, `note`, `id_status`) VALUES
(21, 'alice.martin@gmail.com', 'Alice Martin', '0601020304', 'LinkedIn', 'Premier contact, intéressée par une démo', 1),
(22, 'bob.durand@gmail.com', 'Bob Durand', '0602030405', 'Cold email', 'Relance à prévoir', 1),
(23, 'charlie.lemoine@gmail.com', 'Charlie Lemoine', '0603040506', 'Site web', 'Formulaire rempli', 1),
(24, 'diane.bernard@gmail.com', 'Diane Bernard', '0604050607', 'Recommandation', 'Très bon fit', 2),
(25, 'eric.dupont@gmail.com', 'Eric Dupont', '0605060708', 'LinkedIn', 'Budget validé', 2),
(26, 'fatima.khan@gmail.com', 'Fatima Khan', '0606070809', 'Cold call', 'Pas disponible avant février', 1),
(27, 'gabriel.moreau@gmail.com', 'Gabriel Moreau', '0607080910', 'Site web', 'Demande de devis', 1),
(28, 'helene.robert@gmail.com', 'Helene Robert', '0608091011', 'Email', 'Réponse positive', 2),
(29, 'ivan.petrov@gmail.com', 'Ivan Petrov', '0609101112', 'LinkedIn', 'Besoin à clarifier', 1),
(30, 'julie.laurent@gmail.com', 'Julie Laurent', '0610111213', 'Salon pro', 'Rencontrée sur un stand', 1),
(31, 'kevin.blanchet@gmail.com', 'Kevin Blanchet', '0611121314', 'Recommandation', 'Contact chaud', 2),
(32, 'laura.meyer@gmail.com', 'Laura Meyer', '0612131415', 'Site web', 'Comparaison avec concurrents', 1),
(33, 'mehdi.benali@gmail.com', 'Mehdi Benali', '0613141516', 'Cold email', 'Pas intéressé pour le moment', 1),
(34, 'nina.roux@gmail.com', 'Nina Roux', '0614151617', 'LinkedIn', 'Très réactive', 2),
(35, 'olivier.petit@gmail.com', 'Olivier Petit', '0615161718', 'Email', 'Besoin précis identifié', 1),
(36, 'pauline.girard@gmail.com', 'Pauline Girard', '0616171819', 'Site web', 'Demande de rappel', 1),
(37, 'quentin.morel@gmail.com', 'Quentin Morel', '0617181920', 'Cold call', 'Relance semaine prochaine', 1),
(38, 'romain.fischer@gmail.com', 'Romain Fischer', '0618192021', 'Salon pro', 'Client potentiel sérieux', 2),
(39, 'sarah.nguyen@gmail.com', 'Sarah Nguyen', '0619202122', 'LinkedIn', 'Décideuse', 2),
(40, 'thomas.lefevre@gmail.com', 'Thomas Lefevre', '0620212223', 'Recommandation', 'Très bon retour', 2);

-- --------------------------------------------------------

--
-- Structure de la table `rdv`
--

DROP TABLE IF EXISTS `rdv`;
CREATE TABLE IF NOT EXISTS `rdv` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `place` text NOT NULL,
  `schedule` text NOT NULL,
  `id_contact` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_contact` (`id_contact`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rdv`
--

INSERT INTO `rdv` (`id`, `place`, `schedule`, `id_contact`) VALUES
(11, 'Visioconférence', '2026-01-08 10:00', 21),
(12, 'Bureau client', '2026-01-09 14:30', 22),
(13, 'Visioconférence', '2026-01-10 09:00', 24),
(14, 'Café centre-ville', '2026-01-11 11:15', 27),
(15, 'Visioconférence', '2026-01-12 16:00', 30),
(16, 'Bureau client', '2026-01-13 15:00', 31),
(17, 'Visioconférence', '2026-01-14 10:30', 34),
(18, 'Café centre-ville', '2026-01-15 09:45', 38);

-- --------------------------------------------------------

--
-- Structure de la table `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(1, 'prospect'),
(2, 'client');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`id_status`) REFERENCES `status` (`id`);

--
-- Contraintes pour la table `rdv`
--
ALTER TABLE `rdv`
  ADD CONSTRAINT `rdv_ibfk_1` FOREIGN KEY (`id_contact`) REFERENCES `contact` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
