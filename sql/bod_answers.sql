CREATE DATABASE  IF NOT EXISTS `bod` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bod`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: bod
-- ------------------------------------------------------
-- Server version	5.6.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answers` (
  `id_answers` int(11) NOT NULL AUTO_INCREMENT,
  `kjonn` varchar(45) DEFAULT NULL,
  `sivilstatus` varchar(45) DEFAULT NULL,
  `utdannelse` varchar(45) DEFAULT NULL,
  `programmeringsstil` varchar(45) DEFAULT NULL,
  `personlighet` varchar(45) DEFAULT NULL,
  `hypepreferanse` varchar(45) DEFAULT NULL,
  `musikk` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `favorittgode` varchar(45) DEFAULT NULL,
  `planerforkvelden` varchar(45) DEFAULT NULL,
  `processed` tinyint(1) DEFAULT '0',
  `locked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_answers`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (1,'kvinne','skilt','bachelor','batenblirtil','introvert','internetofthings','rave','hipster','frikantine','endresivilstatus',0,0),(2,'kvinne','singel','bachelor','batenblirtil','ekstrovertpluss','laerkidsakoding','klassisk','youngster','kurskonferanse','smiskemedsjefen',0,0),(3,'kvinne','gift/samboer','selvstudertrover','quickanddirty','ekstrovertpluss','microservices','rock','gammelringrev','kurskonferanse','endresivilstatus',0,0),(4,'mann','singel','master','batenblirtil','introvert','microservices','alternativ','gammelringrev','pensjon','nytelivet',0,0),(5,'mann','singel','bachelor','ordenungmusssein','ekstrovert','microservices','rave','hipster','gadgetkonto','kode',0,0);
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-08-01 11:24:04
