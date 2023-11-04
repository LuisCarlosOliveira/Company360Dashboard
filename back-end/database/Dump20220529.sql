-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: sio
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(255) NOT NULL,
  `postal_code` varchar(256) NOT NULL,
  `address_detail` varchar(256) NOT NULL,
  `country` varchar(256) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=229 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (214,'Alcanena','2384-909','Apartado 10','PT','2022-05-28 18:59:08','2022-05-28 18:59:08'),(215,'Vila Moreira','2380-639','Rua 24 de Junho, 1399','PT','2022-05-28 18:59:08','2022-05-28 18:59:08'),(216,'Arzignano VI','Desconhecido','Quarta Strada, 7, 36071 Arzignano VI','IT','2022-05-28 18:59:08','2022-05-28 18:59:08'),(217,'Felgueiras','2380-154','Rua do Norte, 178','PT','2022-05-28 18:59:08','2022-05-28 18:59:08'),(218,'Alcanena','2380-184','Estrada do Alviela, 835, S. Pedro','PT','2022-05-28 18:59:08','2022-05-28 18:59:08'),(219,'Alcanena','2380-088','Rua de Sacadura Cabral 3','PT','2022-05-28 18:59:08','2022-05-28 18:59:08'),(220,'Alcanena','2380-159','Rua da Cova','PT','2022-05-28 18:59:08','2022-05-28 18:59:08'),(221,'Murcia','Desconhecido','RM-711, 168, 30814 Lorca','ES','2022-05-28 18:59:08','2022-05-28 18:59:08'),(222,'Alcanena','2384-909','Apartado 10','PT','2022-05-28 18:59:08','2022-05-28 18:59:08'),(223,'Vila Moreira','2380-639','Rua 24 de Junho, 1399','PT','2022-05-28 18:59:08','2022-05-28 18:59:08'),(224,'Arzignano VI','Desconhecido','Quarta Strada, 7, 36071 Arzignano VI','IT','2022-05-28 18:59:08','2022-05-28 18:59:08'),(225,'Felgueiras','2380-154','Rua do Norte, 178','PT','2022-05-28 18:59:08','2022-05-28 18:59:08'),(226,'Alcanena','2380-184','Estrada do Alviela, 835, S. Pedro','PT','2022-05-28 18:59:08','2022-05-28 18:59:08'),(227,'Alcanena','2380-088','Rua de Sacadura Cabral 3','PT','2022-05-28 18:59:08','2022-05-28 18:59:08'),(228,'Alcanena','2380-159','Rua da Cova','PT','2022-05-28 18:59:08','2022-05-28 18:59:08');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` varchar(255) NOT NULL,
  `customer_tax_id` varchar(256) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `self_billing_indicator` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES ('PT500054711_C','500054711','Marina Calçados, S.A.','0','2022-05-28 22:50:01','2022-05-28 22:50:01'),('PT500201455_C','500201455','Netos Fábrica De Calçado, Lda.','0','2022-05-28 22:50:01','2022-05-28 22:50:01'),('PT501773576_C','501773576','Jonil - Calçados, Lda.','0','2022-05-28 22:50:01','2022-05-28 22:50:01'),('PT505047748_C','505047748','Kyaia - Fortunato O. Frederico & Cª Lda.','0','2022-05-28 22:50:01','2022-05-28 22:50:01'),('PT517303850_C','517303850','Martiape, Calçado, S.A.','0','2022-05-28 22:50:01','2022-05-28 22:50:01'),('PT549620109_C','549620109','Perfect Eject S.A.','0','2022-05-28 22:50:01','2022-05-28 22:50:01');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoicelines`
--

DROP TABLE IF EXISTS `invoicelines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoicelines` (
  `line_id` int NOT NULL AUTO_INCREMENT,
  `line_number` int NOT NULL,
  `invoice_id` varchar(300) NOT NULL,
  `invoice_date` datetime NOT NULL,
  `quantity` int NOT NULL,
  `unit_price` float NOT NULL,
  `credit_amount` float NOT NULL,
  `unit_of_measure` varchar(255) NOT NULL,
  `tax_type` varchar(255) NOT NULL,
  `tax_percentage` float NOT NULL,
  `product_code` varchar(300) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`line_id`),
  KEY `invoice_id` (`invoice_id`),
  KEY `product_code` (`product_code`),
  CONSTRAINT `invoicelines_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`invoice_id`),
  CONSTRAINT `invoicelines_ibfk_2` FOREIGN KEY (`product_code`) REFERENCES `products` (`product_code`)
) ENGINE=InnoDB AUTO_INCREMENT=2879 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoicelines`
--

LOCK TABLES `invoicelines` WRITE;
/*!40000 ALTER TABLE `invoicelines` DISABLE KEYS */;
INSERT INTO `invoicelines` VALUES (2856,1,'FA A/1','2022-01-31 00:00:00',100,1.8,180,'PE2','IVA',23,'PCR.0001','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2857,2,'FA A/1','2022-01-31 00:00:00',100,2.4,240,'PE2','IVA',23,'PNB.0001','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2858,3,'FA A/1','2022-01-31 00:00:00',50,2.65,132.5,'PE2','IVA',23,'PVZ.0001','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2859,4,'FA A/1','2022-01-31 00:00:00',75,1.35,101.25,'PE2','IVA',23,'PCM.0001','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2860,2,'FA A/2','2022-06-13 00:00:00',1,2.4,2.4,'PE2','IVA',23,'PNB.0001','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2861,3,'FA A/2','2022-06-13 00:00:00',1,2.65,2.65,'PE2','IVA',23,'PVZ.0001','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2862,4,'FA A/2','2022-06-13 00:00:00',1,1.35,1.35,'PE2','IVA',23,'PCM.0001','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2863,1,'FA A/2','2022-06-13 00:00:00',1,1.8,1.8,'PE2','IVA',23,'PCR.0001','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2864,1,'FA A/3','2022-07-18 00:00:00',900,1.25,1125,'PE2','IVA',23,'PAF.0002','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2865,2,'FA A/3','2022-07-18 00:00:00',950,2.65,2517.5,'PE2','IVA',23,'PVZ.0002','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2866,1,'FA A/4','2022-08-18 00:00:00',1,0.8,0.8,'PE2','IVA',23,'FCR.0001','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2867,2,'FA A/4','2022-08-18 00:00:00',1,1.8,1.8,'PE2','IVA',23,'PCR.0003','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2868,3,'FA A/4','2022-08-18 00:00:00',1,2.65,2.65,'PE2','IVA',23,'PVZ.0001','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2869,1,'FA A/5','2022-09-19 00:00:00',1000,1.15,1150,'PE2','IVA',23,'FAN.0001','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2870,2,'FA A/5','2022-09-19 00:00:00',900,2.6,2340,'PE2','IVA',23,'PNB.0001','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2871,3,'FA A/5','2022-09-19 00:00:00',950,2.6,2470,'PE2','IVA',23,'PNB.0002','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2872,1,'FA A/6','2022-10-03 00:00:00',1000,1.55,1550,'PE2','IVA',23,'PCM.0001','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2873,2,'FA A/6','2022-10-03 00:00:00',2000,2,4000,'PE2','IVA',23,'PCR.0003','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2874,3,'FA A/6','2022-10-03 00:00:00',1000,2.6,2600,'PE2','IVA',23,'PNB.0001','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2875,4,'FA A/6','2022-10-03 00:00:00',1000,2.6,2600,'PE2','IVA',23,'PNB.0002','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2876,1,'FA A/7','2022-11-16 00:00:00',900,2,1800,'PE2','IVA',23,'PCR.0003','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2877,2,'FA A/7','2022-11-16 00:00:00',980,2,1960,'PE2','IVA',23,'PCR.0001','2022-05-28 22:50:01','2022-05-28 22:50:01'),(2878,3,'FA A/7','2022-11-16 00:00:00',800,2.85,2280,'PE2','IVA',23,'PVZ.0002','2022-05-28 22:50:01','2022-05-28 22:50:01');
/*!40000 ALTER TABLE `invoicelines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `invoice_id` varchar(255) NOT NULL,
  `invoice_date` datetime NOT NULL,
  `tax_payable` float NOT NULL,
  `net_total` float NOT NULL,
  `gross_total` float NOT NULL,
  `fiscal_year` int NOT NULL,
  `customer_id` varchar(255) NOT NULL,
  `address_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`invoice_id`),
  KEY `customer_id` (`customer_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES ('FA A/1','2022-01-31 00:00:00',150.36,653.75,804.11,2022,'PT549620109_C',222,'2022-05-28 22:50:01','2022-05-28 22:50:01'),('FA A/2','2022-06-13 00:00:00',1.89,8.2,10.09,2022,'PT517303850_C',223,'2022-05-28 22:50:01','2022-05-28 22:50:01'),('FA A/3','2022-07-18 00:00:00',837.78,3642.5,4480.28,2022,'PT505047748_C',224,'2022-05-28 22:50:01','2022-05-28 22:50:01'),('FA A/4','2022-08-18 00:00:00',1.21,5.25,6.46,2022,'PT500054711_C',225,'2022-05-28 22:50:01','2022-05-28 22:50:01'),('FA A/5','2022-09-19 00:00:00',1370.8,5960,7330.8,2022,'PT500201455_C',226,'2022-05-28 22:50:01','2022-05-28 22:50:01'),('FA A/6','2022-10-03 00:00:00',2472.5,10750,13222.5,2022,'PT501773576_C',227,'2022-05-28 22:50:01','2022-05-28 22:50:01'),('FA A/7','2022-11-16 00:00:00',1389.2,6040,7429.2,2022,'PT500054711_C',228,'2022-05-28 22:50:01','2022-05-28 22:50:01');
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` varchar(255) NOT NULL,
  `payment_type` varchar(255) NOT NULL,
  `tax_payable` float NOT NULL,
  `net_total` float NOT NULL,
  `gross_total` float NOT NULL,
  `customer_id` varchar(255) NOT NULL,
  `month` int NOT NULL,
  `invoice_id` varchar(255) NOT NULL,
  `payment_date` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `customer_id` (`customer_id`),
  KEY `invoice_id` (`invoice_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`invoice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES ('RE A/1','RC',2472.5,10750,13222.5,'PT501773576_C',10,'FA A/6','2022-10-03 00:00:00','2022-05-28 22:50:02','2022-05-28 22:50:02'),('RE A/2','RC',1370.8,5960,7330.8,'PT500201455_C',9,'FA A/5','2022-09-21 00:00:00','2022-05-28 22:50:02','2022-05-28 22:50:02'),('RE A/3','RC',1389.2,6040,7429.2,'PT500054711_C',11,'FA A/7','2022-11-18 00:00:00','2022-05-28 22:50:02','2022-05-28 22:50:02');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_code` varchar(255) NOT NULL,
  `product_description` varchar(255) NOT NULL,
  `product_number_code` varchar(255) NOT NULL,
  `product_group` varchar(255) NOT NULL,
  `product_type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`product_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('Especial','Linha especial','Especial','Sem família','O','2022-05-28 22:50:01','2022-05-28 22:50:01'),('FAN.0001','Anilina Vaca Camel 123','FAN.0001','Forro Anilina','P','2022-05-28 22:50:01','2022-05-28 22:50:01'),('FCR.0001','Anilina Crute Camel 123','FCR.0001','Forro Crute','P','2022-05-28 22:50:01','2022-05-28 22:50:01'),('PAF.0002','Pele Afelpado Navy 075 1214','PAF.0002','Pele Afelpado','P','2022-05-28 22:50:01','2022-05-28 22:50:01'),('PCM.0001','Pele Camurça Negro 001 1416','PCM.0001','Pele Camurça','P','2022-05-28 22:50:01','2022-05-28 22:50:01'),('PCR.0001','Pele Novilhos Crust Negro 001 1214','PCR.0001','Pele Crust','P','2022-05-28 22:50:01','2022-05-28 22:50:01'),('PCR.0003','Pele Novilhos Crust Camel 123 1214','PCR.0003','Pele Crust','P','2022-05-28 22:50:01','2022-05-28 22:50:01'),('PNB.0001','Pele Novilhos Nobuck Negro 001 1416','PNB.0001','Pele Nobuck','P','2022-05-28 22:50:01','2022-05-28 22:50:01'),('PNB.0002','Pele Novilhos Nobuck Navy 075 1416','PNB.0002','Pele Nobuck','P','2022-05-28 22:50:01','2022-05-28 22:50:01'),('PVZ.0001','Pele Vacas Verniz Negro 001 1416','PVZ.0001','Pele Nobuck','P','2022-05-28 22:50:01','2022-05-28 22:50:01'),('PVZ.0002','Pele Vacas Verniz Navy 075 1416','PVZ.0002','Pele Verniz','P','2022-05-28 22:50:01','2022-05-28 22:50:01');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20220508220059-addcustomer.js'),('20220515154153-addSupplier_Table.js'),('20220519212058-product.js'),('20220521154456-invoice.js'),('20220521160907-costumer.js'),('20220521160958-ADDnewcostumer.js'),('20220521161940-deleteSupplier.js'),('20220521162027-deleteSupplier.js'),('20220522135452-invoiceline.js'),('20220527124019-newinvoiceline2.js'),('20220527124740-invoice2.js'),('20220527125137-invoice3.js'),('20220527125444-invoiceid.js'),('20220527125721-invoice4.js'),('20220527125852-invoiceid.js'),('20220527131907-invoiceremove.js'),('20220527132636-transactions.js'),('20220527133251-suppliers.js'),('20220527133352-suppliers.js'),('20220527134846-suppliernew.js'),('20220527135104-we.js'),('20220527135242-suppliers.js'),('20220527135242-we.js'),('20220527135605-newtest.js'),('20220527141315-transactionsnew.js'),('20220527141328-transactionsnews.js'),('20220527182444-invoiceAdreessTable.js'),('20220527183058-fixInvoiceAdress.js'),('20220527185336-teste2.js'),('20220527185748-teste2.js'),('20220528133927-hello.js'),('20220528144734-payment.js'),('20220528155543-transaciton_line.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `supplier_id` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `supplier_tax_id` varchar(256) NOT NULL,
  `self_billing_indicator` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `address_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`supplier_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `suppliers_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES ('02629600244_F','Gruppo Mastrotto Spa','2629600244','0','hugsilva@gmail.com','+39 0444 621200',216,'2022-05-28 22:50:01','2022-05-28 22:50:01'),('500025649_F','Carvalhos - Antonio Nunes de Carvalho, S.A.','500025649','0','hugsilva@gmail.com','+351 249889050',217,'2022-05-28 22:50:01','2022-05-28 22:50:01'),('501122850_F','Curtumes Boaventura, Lda','501122850','0','hugsilva@gmail.com','+351 249887389',218,'2022-05-28 22:50:01','2022-05-28 22:50:01'),('505204070_F','Alcurte - Curtumes, S.A.','505204070','0','hugsilva@gmail.com','+351 249891933',219,'2022-05-28 22:50:01','2022-05-28 22:50:01'),('506607704_F','Derma - Leather Comércio e Indústria de Peles, S.A','506607704','0','hugsilva@gmail.com','+351 249891752',220,'2022-05-28 22:50:01','2022-05-28 22:50:01'),('516471244_F','Curtumes Ibéria - Indústria de Curtumes S.A.','516471244','0','hugsilva@gmail.com','+351 249890676',215,'2022-05-28 22:50:01','2022-05-28 22:50:01'),('573163979_F','Marsipel - Indústria de Cartumes S.A.','573163979','0','hugsilva@gmail.com','+351 249887120',214,'2022-05-28 22:50:01','2022-05-28 22:50:01'),('A30012009_F','Hijos de Juan Martínez S.A.','A30012009','0','hugsilva@gmail.com','+349 68466664',221,'2022-05-28 22:50:01','2022-05-28 22:50:01');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactionlines`
--

DROP TABLE IF EXISTS `transactionlines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactionlines` (
  `transaction_line_id` int NOT NULL AUTO_INCREMENT,
  `transaction_id` varchar(255) NOT NULL,
  `credit_amount` float DEFAULT NULL,
  `debit_amount` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`transaction_line_id`),
  KEY `transaction_id` (`transaction_id`),
  CONSTRAINT `transactionlines_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactionlines`
--

LOCK TABLES `transactionlines` WRITE;
/*!40000 ALTER TABLE `transactionlines` DISABLE KEYS */;
INSERT INTO `transactionlines` VALUES (98,'2022-01-17 00041 10002',110700,110700,'2022-05-28 18:59:08','2022-05-28 18:59:08'),(99,'2022-02-21 00041 20001',108240,108240,'2022-05-28 18:59:08','2022-05-28 18:59:08'),(100,'2022-03-14 00041 30001',429270,429270,'2022-05-28 18:59:08','2022-05-28 18:59:08'),(101,'2022-04-11 00041 40001',1200,1200,'2022-05-28 18:59:08','2022-05-28 18:59:08'),(102,'2022-05-16 00041 50001',61500,61500,'2022-05-28 18:59:08','2022-05-28 18:59:08'),(103,'2022-06-15 00041 60001',98861.2,98861.2,'2022-05-28 18:59:08','2022-05-28 18:59:08'),(104,'2022-07-12 00041 70001',302580,302580,'2022-05-28 18:59:08','2022-05-28 18:59:08'),(105,'2022-08-22 00041 80001',170959,170959,'2022-05-28 18:59:08','2022-05-28 18:59:08'),(106,'2022-09-21 00041 90001',66420,66420,'2022-05-28 18:59:08','2022-05-28 18:59:08'),(107,'2022-10-24 00041 100001',275828,275828,'2022-05-28 18:59:08','2022-05-28 18:59:08'),(108,'2022-11-15 00041 110001',15375,15375,'2022-05-28 18:59:08','2022-05-28 18:59:08'),(109,'2022-12-13 00041 120001',221400,221400,'2022-05-28 18:59:08','2022-05-28 18:59:08');
/*!40000 ALTER TABLE `transactionlines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `transaction_id` varchar(255) NOT NULL,
  `transaction_date` datetime NOT NULL,
  `description` varchar(255) NOT NULL,
  `posting_date` datetime NOT NULL,
  `transaction_type` varchar(255) NOT NULL,
  `supplier_id` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES ('2022-01-17 00041 10002','2022-01-17 00:00:00','VFA Nº 2/A','2022-05-27 00:00:00','N','573163979_F','2022-05-28 22:50:01','2022-05-28 22:50:01'),('2022-02-21 00041 20001','2022-02-21 00:00:00','VFA Nº 4/A','2022-05-22 00:00:00','N','516471244_F','2022-05-28 22:50:01','2022-05-28 22:50:01'),('2022-03-14 00041 30001','2022-03-14 00:00:00','VFA Nº 5/A','2022-05-22 00:00:00','N','500025649_F','2022-05-28 22:50:01','2022-05-28 22:50:01'),('2022-04-11 00041 40001','2022-04-11 00:00:00','VFA Nº 3/A','2022-05-21 00:00:00','N','02629600244_F','2022-05-28 22:50:01','2022-05-28 22:50:01'),('2022-05-16 00041 50001','2022-05-16 00:00:00','VFA Nº 6/A','2022-05-22 00:00:00','N','501122850_F','2022-05-28 22:50:01','2022-05-28 22:50:01'),('2022-06-15 00041 60001','2022-06-15 00:00:00','VFA Nº 8/A','2022-05-22 00:00:00','N','506607704_F','2022-05-28 22:50:01','2022-05-28 22:50:01'),('2022-07-12 00041 70001','2022-07-12 00:00:00','VFA Nº 7/A','2022-05-22 00:00:00','N','505204070_F','2022-05-28 22:50:01','2022-05-28 22:50:01'),('2022-08-22 00041 80001','2022-08-22 00:00:00','VFA Nº 9/A','2022-05-22 00:00:00','N','A30012009_F','2022-05-28 22:50:01','2022-05-28 22:50:01'),('2022-09-21 00041 90001','2022-09-21 00:00:00','VFA Nº 10/A','2022-05-22 00:00:00','N','500025649_F','2022-05-28 22:50:02','2022-05-28 22:50:02'),('2022-10-24 00041 100001','2022-10-24 00:00:00','VFA Nº 11/A','2022-05-22 00:00:00','N','500025649_F','2022-05-28 22:50:02','2022-05-28 22:50:02'),('2022-11-15 00041 110001','2022-11-15 00:00:00','VFA Nº 12/A','2022-05-22 00:00:00','N','505204070_F','2022-05-28 22:50:02','2022-05-28 22:50:02'),('2022-12-13 00041 120001','2022-12-13 00:00:00','VFA Nº 13/A','2022-05-22 00:00:00','N','573163979_F','2022-05-28 22:50:02','2022-05-28 22:50:02');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-29 14:47:03
