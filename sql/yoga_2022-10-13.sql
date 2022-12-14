# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.31)
# Database: yoga
# Generation Time: 2022-10-13 02:38:02 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table admin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`,`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;

INSERT INTO `admin` (`id`, `name`, `password`, `created_at`, `updated_at`)
VALUES
	(1,'admin','21232f297a57a5a743894a0e4a801fc3','2022-10-11 20:10:53','2022-10-11 20:10:53');

/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table article
# ------------------------------------------------------------

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT '0' COMMENT '用户id',
  `type` int(11) NOT NULL DEFAULT '1' COMMENT '1 提问 2 文章 3 公告',
  `title` varchar(500) NOT NULL DEFAULT '' COMMENT '标题',
  `content` text NOT NULL COMMENT '内容',
  `auth` varchar(50) NOT NULL DEFAULT '' COMMENT '作者',
  `flow` int(11) NOT NULL COMMENT '浏览量',
  `comment_num` int(11) DEFAULT NULL COMMENT '评论数',
  `fabulous_num` int(11) DEFAULT NULL COMMENT '点赞数',
  `is_topping` tinyint(2) NOT NULL COMMENT '是否置顶 1 不置顶 2置顶',
  `is_boutique` tinyint(2) NOT NULL COMMENT '是否精品 1 精品 2不是',
  `is_del` tinyint(2) NOT NULL DEFAULT '1' COMMENT '1 显示 2 隐藏',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `title` (`title`),
  KEY `is_del` (`is_del`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;

INSERT INTO `article` (`id`, `user_id`, `type`, `title`, `content`, `auth`, `flow`, `comment_num`, `fabulous_num`, `is_topping`, `is_boutique`, `is_del`, `created_at`, `updated_at`)
VALUES
	(1,1,1,'111','3','1111',18,0,2,1,2,1,'2022-10-10 15:16:27','2022-10-10 15:16:27');

/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL COMMENT '文章id',
  `avatar` varchar(500) NOT NULL,
  `auth` varchar(500) NOT NULL DEFAULT '',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `text` text NOT NULL COMMENT '评论内容',
  `is_del` tinyint(2) NOT NULL DEFAULT '1' COMMENT '1 显示 2 隐藏',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `article_id` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;

INSERT INTO `comment` (`id`, `comment_id`, `article_id`, `avatar`, `auth`, `user_id`, `text`, `is_del`, `created_at`, `updated_at`)
VALUES
	(1,0,1,'','xiaolin',1,'1',1,'2022-10-11 20:10:53','2022-10-11 20:10:53');

/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table fabulous
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fabulous`;

CREATE TABLE `fabulous` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int(11) NOT NULL COMMENT '文章id',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `article_id` (`article_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `fabulous` WRITE;
/*!40000 ALTER TABLE `fabulous` DISABLE KEYS */;

INSERT INTO `fabulous` (`id`, `article_id`, `user_id`, `created_at`, `updated_at`)
VALUES
	(1,1,1,'2022-10-12 10:30:19','2022-10-12 10:30:19'),
	(16,1,2,'2022-10-12 10:59:04','2022-10-12 10:59:04');

/*!40000 ALTER TABLE `fabulous` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
