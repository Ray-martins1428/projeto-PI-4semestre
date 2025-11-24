-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: gestao_ultragaz
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `cadastro_funcionario`
--

DROP TABLE IF EXISTS `cadastro_funcionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cadastro_funcionario` (
  `id_funcionario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `sobrenome` varchar(100) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `RG` varchar(9) DEFAULT NULL,
  `CPF` varchar(11) DEFAULT NULL,
  `celular` varchar(11) DEFAULT NULL,
  `telefone` varchar(8) DEFAULT NULL,
  `DATA_NASCIMENTO` date NOT NULL DEFAULT '1990-12-31',
  PRIMARY KEY (`id_funcionario`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cadastro_funcionario`
--

LOCK TABLES `cadastro_funcionario` WRITE;
/*!40000 ALTER TABLE `cadastro_funcionario` DISABLE KEYS */;
INSERT INTO `cadastro_funcionario` VALUES (1,'adm','',NULL,'','','','','1990-12-31'),(2,'elizangela','martinez',NULL,NULL,'31166681871','19999436232',NULL,'1990-12-31'),(3,'maria','souza',NULL,'121438351','70766811883','19987546582','36537854','1990-12-31'),(4,'carlos','augusto',NULL,'121678331','32766681981','19987436232','36533225','1990-12-31'),(5,'rodrigo','silva',NULL,NULL,'60154695017','19983460299',NULL,'1979-11-05'),(6,'teste','',NULL,NULL,'74862959032','1999389999',NULL,'1985-12-03'),(7,'joao','victor viana','joao.viana@gmail.com',NULL,'46872495073','12938417268',NULL,'1996-02-08'),(8,'teste','endereco','teste.endereco@email.com',NULL,'46872495073','65464565444',NULL,'1996-02-08'),(9,'teste','endereco','teste.endereco@email.com',NULL,'46872495073','65464565444',NULL,'1996-02-08'),(10,'teste','endereco','teste.endereco@email.com',NULL,'46872495073','65464565444',NULL,'1996-02-08'),(11,'teste','endereco','teste.endereco@email.com',NULL,'46872495073','65464565444',NULL,'1996-02-08'),(12,'teste','endereco','teste.endereco@email.com',NULL,'46872495073','65464565444',NULL,'1996-02-08'),(13,'novo','teste edicao','novoteste_edicao@gmail.com',NULL,'11386000122','9985656444',NULL,'1989-02-01'),(14,'julio','de castro','julio.braido@email.com',NULL,'45678932144','1998762345',NULL,'1999-09-02'),(15,'Ray','Nakamura','ray.nakamura@email.com',NULL,'45654654421','19987456312',NULL,'2002-05-22');
/*!40000 ALTER TABLE `cadastro_funcionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras`
--

DROP TABLE IF EXISTS `compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compras` (
  `id_compra` int NOT NULL AUTO_INCREMENT,
  `data_compra` date DEFAULT NULL,
  `qtd` int DEFAULT NULL,
  `preco_custo` float(5,2) DEFAULT NULL,
  `produtos_id_produtos` int NOT NULL,
  PRIMARY KEY (`id_compra`),
  KEY `fk_compras_produtos1_idx` (`produtos_id_produtos`),
  CONSTRAINT `fk_compras_produtos1` FOREIGN KEY (`produtos_id_produtos`) REFERENCES `produtos` (`id_produtos`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
INSERT INTO `compras` VALUES (1,'2025-09-23',12,85.00,1),(2,'2025-09-23',12,45.00,2),(3,'2025-09-23',12,135.00,3),(4,'2025-09-23',12,390.00,4),(5,'2025-09-23',12,18.00,5),(6,'2025-09-23',12,0.45,6),(7,'2025-09-23',12,0.45,6),(8,'2025-10-05',2,85.00,1),(9,'2025-10-20',30,85.00,1),(10,'2025-10-20',10,45.00,2),(11,'2025-10-20',5,135.00,3),(12,'2025-10-20',5,390.00,4),(13,'2025-10-20',50,18.00,5),(14,'2025-10-20',200,0.45,6);
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_insert_compras_logs` AFTER INSERT ON `compras` FOR EACH ROW BEGIN
    CALL insert_logs('INSERT', 'compras',  CONCAT('id_compra= ', NEW.id_compra, ', data_compra= ',NEW.data_compra, ', qtd= ',
    NEW.qtd, ', preco_custo= ', NEW.preco_custo, ', id_produtos= ', NEW.produtos_id_produtos));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_entrada_estoque` AFTER INSERT ON `compras` FOR EACH ROW BEGIN
    CALL entrada_estoque(NEW.produtos_id_produtos, NEW.qtd);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endereco` (
  `id_endereco` int NOT NULL AUTO_INCREMENT,
  `rua` varchar(100) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `bairro` varchar(50) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `CEP` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`id_endereco`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
INSERT INTO `endereco` VALUES (1,'','','','',''),(2,'RUA MONTEIRO LOBATO','23','CENTRO','AGUAÍ','13860000'),(3,'RUA JOAQUIM JOSÉ','198','CENTRO','AGUAÍ','13860970'),(4,'RUA BORGES MOREIRA FILHO','777','SALGUEIRO','AGUAÍ','13860510'),(5,'rua teste endereco','123','teste endereco','Aguaí','13860001'),(6,'rua teste endereco','123','teste endereco','Aguaí','13860001'),(7,'rua teste endereco','123','teste endereco','Aguaí','13860001'),(8,'rua teste endereco','123','teste endereco','Aguaí','13860001'),(9,'rua teste endereco','123','teste endereco','Aguaí','13860001'),(10,'teste endereco na tabela edição','1122','joazeiros do sul','Aguaí','13860001'),(11,'Rua joaquim farias','125','jardim tundra infame','Aguaí','13860001'),(12,'R. Eliz Maria de Souza','775','Jardim Amélia','Aguaí','13860001');
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frm_pagamento`
--

DROP TABLE IF EXISTS `frm_pagamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `frm_pagamento` (
  `id_frm_pagamento` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_frm_pagamento`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frm_pagamento`
--

LOCK TABLES `frm_pagamento` WRITE;
/*!40000 ALTER TABLE `frm_pagamento` DISABLE KEYS */;
INSERT INTO `frm_pagamento` VALUES (1,'CRÉDITO',1),(2,'DÉBITO',1),(3,'PIX',1),(4,'DINHEIRO',1),(5,'CHEQUE',0);
/*!40000 ALTER TABLE `frm_pagamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs_sistema`
--

DROP TABLE IF EXISTS `logs_sistema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logs_sistema` (
  `id` int NOT NULL AUTO_INCREMENT,
  `operacao` varchar(10) DEFAULT NULL,
  `tabela` varchar(50) DEFAULT NULL,
  `usuario` varchar(100) DEFAULT NULL,
  `valores` text,
  `data` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs_sistema`
--

LOCK TABLES `logs_sistema` WRITE;
/*!40000 ALTER TABLE `logs_sistema` DISABLE KEYS */;
INSERT INTO `logs_sistema` VALUES (1,'INSERT','vendas','MARIA.SOUZA@localhost','id_vendas= 9, data_venda= 2025-09-27, qtd= 2, vlr_total= 2.00, produtos_id_produtos= 6, frm_pagemento_i_frm_pagamento= 2, usuarios_id_usuario= 3','2025-10-13 23:29:14'),(2,'INSERT','vendas','root@localhost','id_vendas= 10, data_venda= 2025-09-27, qtd= 2, vlr_total= 2.00, id_produtos= 6, id_frm_pagamento= 2, id_usuario= 3','2025-10-14 00:04:20'),(3,'INSERT','compras','root@localhost','id_compra= 7, data_compra= 2025-09-23, qtd= 12, preco_custo= 0.45, id_produtos= 6','2025-10-14 00:13:45'),(4,'INSERT','compras','root@localhost','id_compra= 8, data_compra= 2025-10-05, qtd= 2, preco_custo= 85.00, id_produtos= 1','2025-10-19 12:33:03'),(5,'INSERT','vendas','root@localhost','id_vendas= 11, data_venda= 2025-10-05, qtd= 2, vlr_total= 220.00, id_produtos= 1, id_frm_pagamento= 2, id_usuario= 2','2025-10-19 12:33:32'),(6,'INSERT','vendas','root@localhost','id_vendas= 12, data_venda= 2025-09-27, qtd= 2, vlr_total= 220.00, id_produtos= 1, id_frm_pagamento= 2, id_usuario= 2','2025-11-10 23:59:27'),(7,'INSERT','compras','root@localhost','id_compra= 9, data_compra= 2025-10-20, qtd= 30, preco_custo= 85.00, id_produtos= 1','2025-11-22 16:45:29'),(8,'INSERT','compras','root@localhost','id_compra= 10, data_compra= 2025-10-20, qtd= 10, preco_custo= 45.00, id_produtos= 2','2025-11-22 16:45:29'),(9,'INSERT','compras','root@localhost','id_compra= 11, data_compra= 2025-10-20, qtd= 5, preco_custo= 135.00, id_produtos= 3','2025-11-22 16:45:29'),(10,'INSERT','compras','root@localhost','id_compra= 12, data_compra= 2025-10-20, qtd= 5, preco_custo= 390.00, id_produtos= 4','2025-11-22 16:45:29'),(11,'INSERT','compras','root@localhost','id_compra= 13, data_compra= 2025-10-20, qtd= 50, preco_custo= 18.00, id_produtos= 5','2025-11-22 16:45:29'),(12,'INSERT','compras','root@localhost','id_compra= 14, data_compra= 2025-10-20, qtd= 200, preco_custo= 0.45, id_produtos= 6','2025-11-22 16:45:29'),(13,'INSERT','vendas','root@localhost','id_vendas= 13, data_venda= 2025-10-21, qtd= 1, vlr_total= 110.00, id_produtos= 1, id_frm_pagamento= 2, id_usuario= 2','2025-11-22 16:52:38'),(14,'INSERT','vendas','root@localhost','id_vendas= 14, data_venda= 2025-10-21, qtd= 1, vlr_total= 110.00, id_produtos= 1, id_frm_pagamento= 2, id_usuario= 2','2025-11-22 16:52:42'),(15,'INSERT','vendas','root@localhost','id_vendas= 15, data_venda= 2025-10-21, qtd= 1, vlr_total= 110.00, id_produtos= 1, id_frm_pagamento= 2, id_usuario= 2','2025-11-22 16:52:56'),(16,'INSERT','vendas','root@localhost','id_vendas= 16, data_venda= 2025-10-22, qtd= 2, vlr_total= 220.00, id_produtos= 1, id_frm_pagamento= 2, id_usuario= 2','2025-11-22 16:53:13'),(17,'INSERT','vendas','root@localhost','id_vendas= 17, data_venda= 2025-10-22, qtd= 1, vlr_total= 110.00, id_produtos= 1, id_frm_pagamento= 2, id_usuario= 2','2025-11-22 16:53:26'),(18,'INSERT','vendas','root@localhost','id_vendas= 18, data_venda= 2025-10-23, qtd= 3, vlr_total= 300.00, id_produtos= 1, id_frm_pagamento= 2, id_usuario= 2','2025-11-22 16:53:51'),(19,'INSERT','vendas','root@localhost','id_vendas= 19, data_venda= 2025-10-24, qtd= 1, vlr_total= 110.00, id_produtos= 1, id_frm_pagamento= 2, id_usuario= 2','2025-11-22 16:54:12'),(20,'INSERT','vendas','root@localhost','id_vendas= 20, data_venda= 2025-10-24, qtd= 1, vlr_total= 110.00, id_produtos= 1, id_frm_pagamento= 2, id_usuario= 2','2025-11-22 16:54:15'),(21,'INSERT','vendas','root@localhost','id_vendas= 21, data_venda= 2025-10-24, qtd= 1, vlr_total= 110.00, id_produtos= 1, id_frm_pagamento= 2, id_usuario= 2','2025-11-22 16:54:17'),(22,'INSERT','vendas','root@localhost','id_vendas= 22, data_venda= 2025-10-24, qtd= 1, vlr_total= 110.00, id_produtos= 1, id_frm_pagamento= 2, id_usuario= 2','2025-11-22 16:54:20'),(23,'INSERT','vendas','root@localhost','id_vendas= 23, data_venda= 2025-10-25, qtd= 1, vlr_total= 110.00, id_produtos= 1, id_frm_pagamento= 2, id_usuario= 2','2025-11-22 16:56:21'),(24,'INSERT','vendas','root@localhost','id_vendas= 24, data_venda= 2025-10-25, qtd= 2, vlr_total= 220.00, id_produtos= 1, id_frm_pagamento= 2, id_usuario= 2','2025-11-22 16:56:31'),(25,'INSERT','vendas','root@localhost','id_vendas= 25, data_venda= 2025-10-21, qtd= 1, vlr_total= 70.00, id_produtos= 2, id_frm_pagamento= 1, id_usuario= 3','2025-11-22 17:00:50'),(26,'INSERT','vendas','root@localhost','id_vendas= 26, data_venda= 2025-10-21, qtd= 1, vlr_total= 70.00, id_produtos= 2, id_frm_pagamento= 1, id_usuario= 3','2025-11-22 17:00:56'),(27,'INSERT','vendas','root@localhost','id_vendas= 27, data_venda= 2025-10-21, qtd= 1, vlr_total= 70.00, id_produtos= 2, id_frm_pagamento= 1, id_usuario= 3','2025-11-22 17:00:58'),(28,'INSERT','vendas','root@localhost','id_vendas= 28, data_venda= 2025-10-22, qtd= 1, vlr_total= 70.00, id_produtos= 2, id_frm_pagamento= 1, id_usuario= 3','2025-11-22 17:01:07'),(29,'INSERT','vendas','root@localhost','id_vendas= 29, data_venda= 2025-10-22, qtd= 1, vlr_total= 70.00, id_produtos= 2, id_frm_pagamento= 1, id_usuario= 3','2025-11-22 17:01:10'),(30,'INSERT','vendas','root@localhost','id_vendas= 30, data_venda= 2025-10-23, qtd= 2, vlr_total= 140.00, id_produtos= 2, id_frm_pagamento= 1, id_usuario= 3','2025-11-22 17:01:25'),(31,'INSERT','vendas','root@localhost','id_vendas= 31, data_venda= 2025-10-23, qtd= 2, vlr_total= 140.00, id_produtos= 2, id_frm_pagamento= 1, id_usuario= 3','2025-11-22 17:01:27'),(32,'INSERT','vendas','root@localhost','id_vendas= 32, data_venda= 2025-10-24, qtd= 1, vlr_total= 70.00, id_produtos= 2, id_frm_pagamento= 1, id_usuario= 3','2025-11-22 17:01:38'),(33,'INSERT','vendas','root@localhost','id_vendas= 33, data_venda= 2025-10-24, qtd= 1, vlr_total= 70.00, id_produtos= 2, id_frm_pagamento= 1, id_usuario= 3','2025-11-22 17:01:40'),(34,'INSERT','vendas','root@localhost','id_vendas= 34, data_venda= 2025-10-24, qtd= 1, vlr_total= 70.00, id_produtos= 2, id_frm_pagamento= 1, id_usuario= 3','2025-11-22 17:01:41'),(35,'INSERT','vendas','root@localhost','id_vendas= 35, data_venda= 2025-09-27, qtd= 1, vlr_total= 170.00, id_produtos= 3, id_frm_pagamento= 3, id_usuario= 2','2025-11-22 17:07:19'),(36,'INSERT','vendas','root@localhost','id_vendas= 36, data_venda= 2025-10-21, qtd= 1, vlr_total= 170.00, id_produtos= 3, id_frm_pagamento= 3, id_usuario= 2','2025-11-22 17:07:31'),(37,'INSERT','vendas','root@localhost','id_vendas= 37, data_venda= 2025-10-21, qtd= 1, vlr_total= 170.00, id_produtos= 3, id_frm_pagamento= 3, id_usuario= 2','2025-11-22 17:07:33'),(38,'INSERT','vendas','root@localhost','id_vendas= 38, data_venda= 2025-10-22, qtd= 1, vlr_total= 170.00, id_produtos= 3, id_frm_pagamento= 3, id_usuario= 2','2025-11-22 17:07:38'),(39,'INSERT','vendas','root@localhost','id_vendas= 39, data_venda= 2025-10-22, qtd= 1, vlr_total= 170.00, id_produtos= 3, id_frm_pagamento= 3, id_usuario= 2','2025-11-22 17:07:41'),(40,'INSERT','vendas','root@localhost','id_vendas= 40, data_venda= 2025-10-23, qtd= 2, vlr_total= 340.00, id_produtos= 3, id_frm_pagamento= 3, id_usuario= 2','2025-11-22 17:07:56'),(41,'INSERT','vendas','root@localhost','id_vendas= 41, data_venda= 2025-10-24, qtd= 1, vlr_total= 170.00, id_produtos= 3, id_frm_pagamento= 3, id_usuario= 2','2025-11-22 17:08:10'),(42,'INSERT','vendas','root@localhost','id_vendas= 42, data_venda= 2025-10-24, qtd= 1, vlr_total= 170.00, id_produtos= 3, id_frm_pagamento= 3, id_usuario= 2','2025-11-22 17:08:12'),(43,'INSERT','vendas','root@localhost','id_vendas= 43, data_venda= 2025-10-20, qtd= 1, vlr_total= 450.00, id_produtos= 4, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:10:06'),(44,'INSERT','vendas','root@localhost','id_vendas= 44, data_venda= 2025-10-21, qtd= 1, vlr_total= 450.00, id_produtos= 4, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:10:13'),(45,'INSERT','vendas','root@localhost','id_vendas= 45, data_venda= 2025-10-23, qtd= 2, vlr_total= 900.00, id_produtos= 4, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:10:24'),(46,'INSERT','vendas','root@localhost','id_vendas= 46, data_venda= 2025-10-25, qtd= 1, vlr_total= 450.00, id_produtos= 4, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:10:33'),(47,'INSERT','vendas','root@localhost','id_vendas= 47, data_venda= 2025-10-25, qtd= 1, vlr_total= 450.00, id_produtos= 4, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:10:36'),(48,'INSERT','vendas','root@localhost','id_vendas= 48, data_venda= 2025-10-21, qtd= 2, vlr_total= 50.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:12:28'),(49,'INSERT','vendas','root@localhost','id_vendas= 49, data_venda= 2025-10-21, qtd= 1, vlr_total= 25.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:12:39'),(50,'INSERT','vendas','root@localhost','id_vendas= 50, data_venda= 2025-10-21, qtd= 1, vlr_total= 25.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:12:49'),(51,'INSERT','vendas','root@localhost','id_vendas= 51, data_venda= 2025-10-21, qtd= 1, vlr_total= 25.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:12:49'),(52,'INSERT','vendas','root@localhost','id_vendas= 52, data_venda= 2025-10-22, qtd= 1, vlr_total= 25.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:13:01'),(53,'INSERT','vendas','root@localhost','id_vendas= 53, data_venda= 2025-10-22, qtd= 1, vlr_total= 25.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:13:01'),(54,'INSERT','vendas','root@localhost','id_vendas= 54, data_venda= 2025-10-23, qtd= 1, vlr_total= 25.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:13:08'),(55,'INSERT','vendas','root@localhost','id_vendas= 55, data_venda= 2025-10-23, qtd= 1, vlr_total= 25.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:13:08'),(56,'INSERT','vendas','root@localhost','id_vendas= 56, data_venda= 2025-10-23, qtd= 1, vlr_total= 25.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:13:09'),(57,'INSERT','vendas','root@localhost','id_vendas= 57, data_venda= 2025-10-23, qtd= 2, vlr_total= 50.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:13:19'),(58,'INSERT','vendas','root@localhost','id_vendas= 58, data_venda= 2025-10-23, qtd= 2, vlr_total= 50.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:13:19'),(59,'INSERT','vendas','root@localhost','id_vendas= 59, data_venda= 2025-10-23, qtd= 2, vlr_total= 50.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:13:20'),(60,'INSERT','vendas','root@localhost','id_vendas= 60, data_venda= 2025-10-24, qtd= 1, vlr_total= 25.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:13:29'),(61,'INSERT','vendas','root@localhost','id_vendas= 61, data_venda= 2025-10-24, qtd= 1, vlr_total= 25.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:13:30'),(62,'INSERT','vendas','root@localhost','id_vendas= 62, data_venda= 2025-10-24, qtd= 1, vlr_total= 25.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:13:30'),(63,'INSERT','vendas','root@localhost','id_vendas= 63, data_venda= 2025-10-26, qtd= 1, vlr_total= 25.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:13:38'),(64,'INSERT','vendas','root@localhost','id_vendas= 64, data_venda= 2025-10-26, qtd= 1, vlr_total= 25.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:13:39'),(65,'INSERT','vendas','root@localhost','id_vendas= 65, data_venda= 2025-10-26, qtd= 1, vlr_total= 25.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:13:39'),(66,'INSERT','vendas','root@localhost','id_vendas= 66, data_venda= 2025-10-27, qtd= 2, vlr_total= 50.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:13:50'),(67,'INSERT','vendas','root@localhost','id_vendas= 67, data_venda= 2025-10-27, qtd= 2, vlr_total= 50.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:13:50'),(68,'INSERT','vendas','root@localhost','id_vendas= 68, data_venda= 2025-10-28, qtd= 1, vlr_total= 25.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:14:00'),(69,'INSERT','vendas','root@localhost','id_vendas= 69, data_venda= 2025-10-28, qtd= 1, vlr_total= 25.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:14:00'),(70,'INSERT','vendas','root@localhost','id_vendas= 70, data_venda= 2025-10-28, qtd= 1, vlr_total= 25.00, id_produtos= 5, id_frm_pagamento= 4, id_usuario= 2','2025-11-22 17:14:01'),(71,'INSERT','vendas','root@localhost','id_vendas= 71, data_venda= 2025-10-28, qtd= 4, vlr_total= 4.00, id_produtos= 6, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:17:32'),(72,'INSERT','vendas','root@localhost','id_vendas= 72, data_venda= 2025-10-21, qtd= 4, vlr_total= 4.00, id_produtos= 6, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:17:42'),(73,'INSERT','vendas','root@localhost','id_vendas= 73, data_venda= 2025-10-21, qtd= 2, vlr_total= 2.00, id_produtos= 6, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:17:48'),(74,'INSERT','vendas','root@localhost','id_vendas= 74, data_venda= 2025-10-21, qtd= 2, vlr_total= 2.00, id_produtos= 6, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:17:49'),(75,'INSERT','vendas','root@localhost','id_vendas= 75, data_venda= 2025-10-23, qtd= 12, vlr_total= 12.00, id_produtos= 6, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:18:03'),(76,'INSERT','vendas','root@localhost','id_vendas= 76, data_venda= 2025-10-23, qtd= 12, vlr_total= 12.00, id_produtos= 6, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:18:03'),(77,'INSERT','vendas','root@localhost','id_vendas= 77, data_venda= 2025-10-24, qtd= 12, vlr_total= 12.00, id_produtos= 6, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:18:10'),(78,'INSERT','vendas','root@localhost','id_vendas= 78, data_venda= 2025-10-24, qtd= 12, vlr_total= 12.00, id_produtos= 6, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:18:11'),(79,'INSERT','vendas','root@localhost','id_vendas= 79, data_venda= 2025-10-25, qtd= 24, vlr_total= 24.00, id_produtos= 6, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:18:22'),(80,'INSERT','vendas','root@localhost','id_vendas= 80, data_venda= 2025-10-26, qtd= 24, vlr_total= 24.00, id_produtos= 6, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:18:30'),(81,'INSERT','vendas','root@localhost','id_vendas= 81, data_venda= 2025-10-27, qtd= 24, vlr_total= 24.00, id_produtos= 6, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:18:42'),(82,'INSERT','vendas','root@localhost','id_vendas= 82, data_venda= 2025-10-28, qtd= 12, vlr_total= 12.00, id_produtos= 6, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:18:55'),(83,'INSERT','vendas','root@localhost','id_vendas= 83, data_venda= 2025-10-28, qtd= 12, vlr_total= 12.00, id_produtos= 6, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:18:56'),(84,'INSERT','vendas','root@localhost','id_vendas= 84, data_venda= 2025-11-01, qtd= 12, vlr_total= 12.00, id_produtos= 6, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:19:07'),(85,'INSERT','vendas','root@localhost','id_vendas= 85, data_venda= 2025-11-01, qtd= 12, vlr_total= 12.00, id_produtos= 6, id_frm_pagamento= 2, id_usuario= 3','2025-11-22 17:19:08');
/*!40000 ALTER TABLE `logs_sistema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfil`
--

DROP TABLE IF EXISTS `perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfil` (
  `id_cargos` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `descricao` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_cargos`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil`
--

LOCK TABLES `perfil` WRITE;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
INSERT INTO `perfil` VALUES (1,'administrador','gestor do sistema'),(2,'gerente','gerente do estabelecimento'),(3,'secretario(a)','acesso ao modulo de vendas'),(4,'motorista','acesso ao modulo de vendas'),(5,'ent. de gás','acesso ao modulo de vendas'),(6,'aux. de depósito','acesso ao modulo de compras');
/*!40000 ALTER TABLE `perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id_produtos` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `volume` varchar(20) DEFAULT NULL,
  `valor` float(5,2) DEFAULT NULL,
  `estoque_saldo` int DEFAULT NULL,
  PRIMARY KEY (`id_produtos`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'BUJÃO GAS P13','13KG',110.00,22),(2,'BUJÃO GAS P5','5KG',70.00,8),(3,'BUJÃO GAS P20','20KG',170.00,6),(4,'BUJÃO GAS P45','45KG',450.00,14),(5,'GALÃO ÁGUA','20L',25.00,31),(6,'COPO ÁGUA','200ML',1.00,30);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `login` varchar(50) DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  `perfil_id_cargos` int NOT NULL,
  `cadastro_funcionario_id_funcionario` int NOT NULL,
  `endereco_id_endereco` int NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `fk_usuarios_perfil_idx` (`perfil_id_cargos`),
  KEY `fk_usuarios_cadastro_funcionario1_idx` (`cadastro_funcionario_id_funcionario`),
  KEY `fk_usuarios_endereco1_idx` (`endereco_id_endereco`),
  CONSTRAINT `fk_usuarios_cadastro_funcionario1` FOREIGN KEY (`cadastro_funcionario_id_funcionario`) REFERENCES `cadastro_funcionario` (`id_funcionario`),
  CONSTRAINT `fk_usuarios_endereco1` FOREIGN KEY (`endereco_id_endereco`) REFERENCES `endereco` (`id_endereco`),
  CONSTRAINT `fk_usuarios_perfil` FOREIGN KEY (`perfil_id_cargos`) REFERENCES `perfil` (`id_cargos`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'administrador','$2b$12$lg1iLd8ubo8kYB/bEzsN4uV7AaA44aEauOIw7S8UXIO2nR8P8foWW',1,1,1,1),(2,'elizangela.martinez','ADMIN12345',1,2,2,2),(3,'maria.souza','SENHA12345',1,3,3,3),(4,'carlos.augusto','SENHA12345',1,4,4,4),(5,'rodrigo.silva','19791105',1,4,5,1),(6,'teste.teste','19851203',1,5,6,1),(7,'joao.viana','$2b$12$9Qt4zJ.tT.FdU./2FsPZN.oP90vc28y/UKRJiTLttXQqqCQHC/8Oe',1,5,7,1),(8,'novo.endereco','19901101',0,4,13,10),(9,'julio.braido','19990907',0,4,14,11),(10,'ray.nakamura','$2b$12$AXlJMSlDX/2jEgRRO6K0EOPFg054UQaUOBrtMgnTPQVW53Vi5G8uG',1,3,15,12);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendas`
--

DROP TABLE IF EXISTS `vendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendas` (
  `id_vendas` int NOT NULL AUTO_INCREMENT,
  `data_venda` date DEFAULT NULL,
  `qtd` int DEFAULT NULL,
  `vlr_total` decimal(10,2) NOT NULL,
  `produtos_id_produtos` int NOT NULL,
  `frm_pagamento_id_frm_pagamento` int NOT NULL,
  `usuarios_id_usuario` int NOT NULL,
  PRIMARY KEY (`id_vendas`),
  KEY `fk_vendas_produtos1_idx` (`produtos_id_produtos`),
  KEY `fk_vendas_usuarios1_idx` (`usuarios_id_usuario`),
  KEY `fk_vendas_frm_pagamento1_idx` (`frm_pagamento_id_frm_pagamento`),
  CONSTRAINT `fk_vendas_frm_pagamento1` FOREIGN KEY (`frm_pagamento_id_frm_pagamento`) REFERENCES `frm_pagamento` (`id_frm_pagamento`),
  CONSTRAINT `fk_vendas_produtos1` FOREIGN KEY (`produtos_id_produtos`) REFERENCES `produtos` (`id_produtos`),
  CONSTRAINT `fk_vendas_usuarios1` FOREIGN KEY (`usuarios_id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendas`
--

LOCK TABLES `vendas` WRITE;
/*!40000 ALTER TABLE `vendas` DISABLE KEYS */;
INSERT INTO `vendas` VALUES (1,'2025-09-27',2,220.00,1,2,2),(2,'2025-09-27',2,140.00,2,1,3),(3,'2025-09-27',2,340.00,3,3,2),(4,'2025-09-27',2,900.00,4,2,3),(5,'2025-09-27',2,50.00,5,4,2),(6,'2025-09-27',2,2.00,6,2,3),(11,'2025-10-05',2,220.00,1,2,2),(12,'2025-09-27',2,220.00,1,2,2),(13,'2025-10-21',1,110.00,1,2,2),(14,'2025-10-21',1,110.00,1,2,2),(15,'2025-10-21',1,110.00,1,2,2),(16,'2025-10-22',2,220.00,1,2,2),(17,'2025-10-22',1,110.00,1,2,2),(18,'2025-10-23',3,330.00,1,2,2),(19,'2025-10-24',1,110.00,1,2,2),(20,'2025-10-24',1,110.00,1,2,2),(21,'2025-10-24',1,110.00,1,2,2),(22,'2025-10-24',1,110.00,1,2,2),(23,'2025-10-25',1,110.00,1,2,2),(24,'2025-10-25',2,220.00,1,2,2),(25,'2025-10-21',1,70.00,2,1,3),(26,'2025-10-21',1,70.00,2,1,3),(27,'2025-10-21',1,70.00,2,1,3),(28,'2025-10-22',1,70.00,2,1,3),(29,'2025-10-22',1,70.00,2,1,3),(30,'2025-10-23',2,140.00,2,1,3),(31,'2025-10-23',2,140.00,2,1,3),(32,'2025-10-24',1,70.00,2,1,3),(33,'2025-10-24',1,70.00,2,1,3),(34,'2025-10-24',1,70.00,2,1,3),(35,'2025-09-27',1,170.00,3,3,2),(36,'2025-10-21',1,170.00,3,3,2),(37,'2025-10-21',1,170.00,3,3,2),(38,'2025-10-22',1,170.00,3,3,2),(39,'2025-10-22',1,170.00,3,3,2),(40,'2025-10-23',2,340.00,3,3,2),(41,'2025-10-24',1,170.00,3,3,2),(42,'2025-10-24',1,170.00,3,3,2),(43,'2025-10-20',1,450.00,4,2,3),(44,'2025-10-21',1,450.00,4,2,3),(45,'2025-10-23',2,900.00,4,2,3),(46,'2025-10-25',1,450.00,4,2,3),(47,'2025-10-25',1,450.00,4,2,3),(48,'2025-10-21',2,50.00,5,4,2),(49,'2025-10-21',1,25.00,5,4,2),(50,'2025-10-21',1,25.00,5,4,2),(51,'2025-10-21',1,25.00,5,4,2),(52,'2025-10-22',1,25.00,5,4,2),(53,'2025-10-22',1,25.00,5,4,2),(54,'2025-10-23',1,25.00,5,4,2),(55,'2025-10-23',1,25.00,5,4,2),(56,'2025-10-23',1,25.00,5,4,2),(57,'2025-10-23',2,50.00,5,4,2),(58,'2025-10-23',2,50.00,5,4,2),(59,'2025-10-23',2,50.00,5,4,2),(60,'2025-10-24',1,25.00,5,4,2),(61,'2025-10-24',1,25.00,5,4,2),(62,'2025-10-24',1,25.00,5,4,2),(63,'2025-10-26',1,25.00,5,4,2),(64,'2025-10-26',1,25.00,5,4,2),(65,'2025-10-26',1,25.00,5,4,2),(66,'2025-10-27',2,50.00,5,4,2),(67,'2025-10-27',2,50.00,5,4,2),(68,'2025-10-28',1,25.00,5,4,2),(69,'2025-10-28',1,25.00,5,4,2),(70,'2025-10-28',1,25.00,5,4,2),(71,'2025-10-28',4,4.00,6,2,3),(72,'2025-10-21',4,4.00,6,2,3),(73,'2025-10-21',2,2.00,6,2,3),(74,'2025-10-21',2,2.00,6,2,3),(75,'2025-10-23',12,12.00,6,2,3),(76,'2025-10-23',12,12.00,6,2,3),(77,'2025-10-24',12,12.00,6,2,3),(78,'2025-10-24',12,12.00,6,2,3),(79,'2025-10-25',24,24.00,6,2,3),(80,'2025-10-26',24,24.00,6,2,3),(81,'2025-10-27',24,24.00,6,2,3),(82,'2025-10-28',12,12.00,6,2,3),(83,'2025-10-28',12,12.00,6,2,3),(84,'2025-11-01',12,12.00,6,2,3),(85,'2025-11-01',12,12.00,6,2,3);
/*!40000 ALTER TABLE `vendas` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_insert_vendas_logs` AFTER INSERT ON `vendas` FOR EACH ROW BEGIN
    CALL insert_logs('INSERT', 'vendas',  CONCAT('id_vendas= ', NEW.id_vendas, ', data_venda= ',NEW.data_venda, ', qtd= ',
    NEW.qtd, ', vlr_total= ', NEW.vlr_total, ', id_produtos= ', NEW.produtos_id_produtos, ', id_frm_pagamento= ', NEW.frm_pagamento_id_frm_pagamento,
    ', id_usuario= ', NEW.usuarios_id_usuario));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `vw_vendas`
--

DROP TABLE IF EXISTS `vw_vendas`;
/*!50001 DROP VIEW IF EXISTS `vw_vendas`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_vendas` AS SELECT 
 1 AS `ID_VENDAS`,
 1 AS `DATA_VENDA`,
 1 AS `QTD`,
 1 AS `VLR_TOTAL`,
 1 AS `NOME`,
 1 AS `DESCRICAO`,
 1 AS `LOGIN`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'gestao_ultragaz'
--

--
-- Dumping routines for database 'gestao_ultragaz'
--
/*!50003 DROP PROCEDURE IF EXISTS `entrada_estoque` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `entrada_estoque`(
	IN id_produto INT,
    IN quantidade INT
)
BEGIN
	DECLARE qtd_novo INT;
    DECLARE qtd_antigo INT;
    
    SELECT estoque_saldo INTO qtd_antigo FROM produtos where id_produtos = id_produto;
    
    SET qtd_novo = qtd_antigo + quantidade;
    
    update produtos set estoque_saldo = qtd_novo where id_produtos = id_produto;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_logs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_logs`(
    IN p_operacao VARCHAR(10),
    IN p_tabela VARCHAR(50),
    IN p_valores TEXT
)
BEGIN
    DECLARE p_usuario VARCHAR(50);
    SET p_usuario = USER();
    INSERT INTO logs_sistema (operacao, tabela, usuario, valores)
    VALUES (p_operacao, p_tabela, p_usuario, p_valores);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `saida_estoque` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `saida_estoque`(
	IN id_produto INT,
    IN quantidade INT
)
BEGIN
	DECLARE qtd_novo INT;
    DECLARE qtd_antigo INT;
    
    SELECT estoque_saldo INTO qtd_antigo FROM produtos where id_produtos = id_produto;
    
    SET qtd_novo = qtd_antigo - quantidade;
    
    update produtos set estoque_saldo = qtd_novo where id_produtos = id_produto;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `vw_vendas`
--

/*!50001 DROP VIEW IF EXISTS `vw_vendas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_vendas` AS select `a`.`id_vendas` AS `ID_VENDAS`,`a`.`data_venda` AS `DATA_VENDA`,`a`.`qtd` AS `QTD`,`a`.`vlr_total` AS `VLR_TOTAL`,`b`.`nome` AS `NOME`,`c`.`descricao` AS `DESCRICAO`,`d`.`login` AS `LOGIN` from (((`vendas` `a` join `produtos` `b` on((`a`.`produtos_id_produtos` = `b`.`id_produtos`))) join `frm_pagamento` `c` on((`a`.`frm_pagamento_id_frm_pagamento` = `c`.`id_frm_pagamento`))) join `usuarios` `d` on((`a`.`usuarios_id_usuario` = `d`.`id_usuario`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-23 22:43:52
