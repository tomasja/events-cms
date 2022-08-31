-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: events-cms
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `date` datetime NOT NULL,
  `description` text,
  `location` varchar(45) DEFAULT NULL,
  `img` text,
  `limit` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'First Online Event','2022-08-28 20:00:00','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin mollis felis, a facilisis purus ultricies quis. Morbi ultrices vitae.','Online','https://picsum.photos/400',200),(2,'Baigiamasis VIGI17 egzaminas','2022-08-27 14:00:00','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin mollis felis, a facilisis purus ultricies quis. Morbi ultrices vitae.','Online','https://picsum.photos/400?blure',12),(3,'Event: Test 3','2022-08-27 18:00:00','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin mollis felis, a facilisis purus ultricies quis. Morbi ultrices vitae.','Kaunas','https://picsum.photos/400?grayscale&blur=2',20),(4,'Event: Test 4','2022-08-28 14:00:00','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin mollis felis, a facilisis purus ultricies quis. Morbi ultrices vitae.','London','https://picsum.photos/400?grayscale',20),(5,'Event: Test 5','2022-08-28 18:30:00','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin mollis felis, a facilisis purus ultricies quis. Morbi ultrices vitae.','Vilnius','https://picsum.photos/400?blur=2',20),(6,'Summer End Party','2022-08-31 21:30:00','	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis enim tellus. Vestibulum convallis orci quis ligula fermentum elementum. Fusce.','Vilnius','https://picsum.photos/400?blure',12),(7,'Welcome Autum Party','2022-09-02 21:00:00','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dolor est, accumsan sit amet sodales id, fringilla dignissim libero. Nunc.','Vilnius','https://picsum.photos/400?random=1?grayscale',200),(8,'Painting with JS','2022-12-10 18:30:00','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor lectus quam, ut luctus nunc ullamcorper porta. Curabitur nec urna.','Online','https://picsum.photos/400?random=2?blure',99),(9,'September MeetUP','2022-09-30 17:00:00','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum eros at eros accumsan lobortis. Integer congue nisi ut gravida.','Vilnius','https://picsum.photos/400?random=3?grayscale',25),(10,'October MeetUP','2022-10-25 18:00:00','Donec luctus tortor quis ex tempor rutrum. Donec dapibus lacinia gravida. Curabitur pharetra diam libero, eget gravida dolor blandit vitae.','Vilnius','https://picsum.photos/400?random=2',25),(11,'November MeetUP','2022-11-25 18:00:00','Suspendisse tincidunt ligula ut nulla ullamcorper vestibulum. Curabitur in urna neque. Donec semper nisi leo, ac semper turpis tempor sit.','Vilnius','https://picsum.photos/400?random=3',25);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events_has_guests`
--

DROP TABLE IF EXISTS `events_has_guests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events_has_guests` (
  `ehg_id` int NOT NULL AUTO_INCREMENT,
  `events_id` int NOT NULL,
  `guests_id` int NOT NULL,
  PRIMARY KEY (`ehg_id`),
  KEY `fk_events_has_guests_guests1_idx` (`guests_id`),
  KEY `fk_events_has_guests_events_idx` (`events_id`),
  CONSTRAINT `fk_events_has_guests_events` FOREIGN KEY (`events_id`) REFERENCES `events` (`id`),
  CONSTRAINT `fk_events_has_guests_guests1` FOREIGN KEY (`guests_id`) REFERENCES `guests` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_has_guests`
--

LOCK TABLES `events_has_guests` WRITE;
/*!40000 ALTER TABLE `events_has_guests` DISABLE KEYS */;
INSERT INTO `events_has_guests` VALUES (16,1,1),(17,3,3),(18,4,4),(19,5,5),(20,6,6),(21,7,7),(22,8,8),(23,8,9),(24,7,10),(25,6,11),(26,5,12),(27,4,13),(29,2,15),(33,1,15),(37,6,15),(38,9,16),(39,8,2),(41,9,3),(42,9,5),(43,6,2),(44,6,1),(45,6,9),(46,8,5),(47,8,12),(48,10,7),(49,10,12),(50,10,12),(51,10,17),(52,11,5);
/*!40000 ALTER TABLE `events_has_guests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guests`
--

DROP TABLE IF EXISTS `guests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guests`
--

LOCK TABLES `guests` WRITE;
/*!40000 ALTER TABLE `guests` DISABLE KEYS */;
INSERT INTO `guests` VALUES (1,'Toma Stasiūnaitė','paulauskas.baltazaras@kristina.com','1977-02-11'),(2,'Giedrius Butkus','qbaranauskas@yahoo.com','1980-12-02'),(3,'Eleonora Butkutė','girmantas29@yahoo.com','1997-06-07'),(4,'Vida Jankauskaitė','abaranauskas@hotmail.com','2002-12-09'),(5,'Aidas Vyšniauskas','vika94@hotmail.com','2004-02-08'),(6,'Martyna Vanickaitė','ula46@ervinas.lt','1984-01-14'),(7,'Asta Žukė','baranauskas.rufas@hotmail.com','1973-02-17'),(8,'Faustas Poskevičius','darja22@gelme.com','1978-07-22'),(9,'Domas Linkevičius','jolantas12@ipolitas.com','1981-04-14'),(10,'Rolandas Tumelis','dkazlaukas@mildas.org','1988-05-20'),(11,'Matas  Vaškys','severija01@vergilijus.net','1974-08-16'),(12,'Andra Pučkoriūtė','butkute.darija@gmail.com','1992-12-22'),(13,'Orinta Budrevičienė','kazlaukas.vygintas@yahoo.com','1995-02-23'),(14,'Inesa Paulauskienė','kazlaukas.vygintas@yahoo.com','1965-03-01'),(15,'Faustas Vyšniauskas','petrauskaite.laisvune@gmail.com','1998-10-31'),(16,'Vakaris Vaškys','nstankeviciute@mikalojus.lt','1973-05-17'),(17,'Dainius Griškevičius','vidimanta53@kuprijanas.lt','1961-01-10');
/*!40000 ALTER TABLE `guests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(45) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `reg_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Tomas Jakaitis','tomas@jakaitis.eu','$2b$10$wq5hXjGKnmFmImkCT2MLl.diiZqf4c.2M4lnGTSFIYWgIlnQbG8gO','2022-08-24 09:25:37'),(2,'Kateiva Gytis','kateiva.gytis@valdas.lt','$2b$10$zNOiRT/pncF/Yf47ZPpnUO.oXZvdS.xB8EfRBxm3cceAKcOT116bq','2022-08-30 18:24:56'),(3,'Gerta Kazlauskienė','kazlauskiene.gerta@jegoras.lt','$2b$10$cCCLENwJr4Zd/7G3Kh0yUOQVYwhUSNQg2WedNEWuUCZK3LDi0Ve5q','2022-08-30 18:35:49');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-31 17:29:15
