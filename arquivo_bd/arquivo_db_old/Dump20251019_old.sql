CREATE DATABASE  IF NOT EXISTS `gestao_ultragaz` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gestao_ultragaz`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: gestao_ultragaz
-- ------------------------------------------------------
-- Server version	8.0.43

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
  `RG` varchar(9) DEFAULT NULL,
  `CPF` varchar(11) DEFAULT NULL,
  `celular` varchar(11) DEFAULT NULL,
  `telefone` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id_funcionario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cadastro_funcionario`
--

LOCK TABLES `cadastro_funcionario` WRITE;
/*!40000 ALTER TABLE `cadastro_funcionario` DISABLE KEYS */;
INSERT INTO `cadastro_funcionario` VALUES (1,'ADM','','','','',''),(2,'ELIZANGELA','MARTINEZ','441655331','31166681871','19999436232','36533123'),(3,'MARIA','SOUZA','121438351','70766811883','19987546582','36537854'),(4,'CARLOS','AUGUSTO','121678331','32766681981','19987436232','36533225');
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
INSERT INTO `compras` VALUES (1,'2025-09-23',12,85.00,1),(2,'2025-09-23',12,45.00,2),(3,'2025-09-23',12,135.00,3),(4,'2025-09-23',12,390.00,4),(5,'2025-09-23',12,18.00,5),(6,'2025-09-23',12,0.45,6),(7,'2025-09-23',12,0.45,6),(8,'2025-10-05',2,85.00,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
INSERT INTO `endereco` VALUES (1,'','','','',''),(2,'RUA MONTEIRO LOBATO','23','CENTRO','AGUAÍ','13860000'),(3,'RUA JOAQUIM JOSÉ','198','CENTRO','AGUAÍ','13860970'),(4,'RUA BORGES MOREIRA FILHO','777','SALGUEIRO','AGUAÍ','13860510');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs_sistema`
--

LOCK TABLES `logs_sistema` WRITE;
/*!40000 ALTER TABLE `logs_sistema` DISABLE KEYS */;
INSERT INTO `logs_sistema` VALUES (1,'INSERT','vendas','MARIA.SOUZA@localhost','id_vendas= 9, data_venda= 2025-09-27, qtd= 2, vlr_total= 2.00, produtos_id_produtos= 6, frm_pagemento_i_frm_pagamento= 2, usuarios_id_usuario= 3','2025-10-13 23:29:14'),(2,'INSERT','vendas','root@localhost','id_vendas= 10, data_venda= 2025-09-27, qtd= 2, vlr_total= 2.00, id_produtos= 6, id_frm_pagamento= 2, id_usuario= 3','2025-10-14 00:04:20'),(3,'INSERT','compras','root@localhost','id_compra= 7, data_compra= 2025-09-23, qtd= 12, preco_custo= 0.45, id_produtos= 6','2025-10-14 00:13:45'),(4,'INSERT','compras','root@localhost','id_compra= 8, data_compra= 2025-10-05, qtd= 2, preco_custo= 85.00, id_produtos= 1','2025-10-19 12:33:03'),(5,'INSERT','vendas','root@localhost','id_vendas= 11, data_venda= 2025-10-05, qtd= 2, vlr_total= 220.00, id_produtos= 1, id_frm_pagamento= 2, id_usuario= 2','2025-10-19 12:33:32');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil`
--

LOCK TABLES `perfil` WRITE;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
INSERT INTO `perfil` VALUES (1,'ADMINISTRADOR','GESTOR DO SISTEMA'),(2,'GERENTE','GERENTE DO ESTABELECIMENTO'),(3,'SECRETÁRIO','ACESSO AO MODULO DE VENDAS'),(4,'MOTORISTA','ACESSO AO MODULO DE VENDAS');
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
  `descricao` varchar(50) DEFAULT NULL,
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
INSERT INTO `produtos` VALUES (1,'BUJÃO GAS P13',NULL,'13KG',110.00,10),(2,'BUJÃO GAS P5',NULL,'5KG',70.00,10),(3,'BUJÃO GAS P20',NULL,'20KG',170.00,10),(4,'BUJÃO GAS P45',NULL,'45KG',450.00,10),(5,'GALÃO ÁGUA',NULL,'20L',25.00,10),(6,'COPO ÁGUA',NULL,'200ML',1.00,10);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'ADMINISTRADOR','ADMIN12345',1,1,1,1),(2,'ELIZANGELA.MARTINEZ','ADMIN12345',1,2,2,2),(3,'MARIA.SOUZA','SENHA12345',1,3,3,3),(4,'CARLOS.AUGUSTO','SENHA12345',1,4,4,4);
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
  `vlr_total` float(5,2) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendas`
--

LOCK TABLES `vendas` WRITE;
/*!40000 ALTER TABLE `vendas` DISABLE KEYS */;
INSERT INTO `vendas` VALUES (1,'2025-09-27',2,220.00,1,2,2),(2,'2025-09-27',2,140.00,2,1,3),(3,'2025-09-27',2,340.00,3,3,2),(4,'2025-09-27',2,900.00,4,2,3),(5,'2025-09-27',2,50.00,5,4,2),(6,'2025-09-27',2,2.00,6,2,3),(11,'2025-10-05',2,220.00,1,2,2);
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
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_saida_estoque` AFTER INSERT ON `vendas` FOR EACH ROW BEGIN
    CALL saida_estoque(NEW.produtos_id_produtos, NEW.qtd);
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

-- Dump completed on 2025-10-19  9:39:14
