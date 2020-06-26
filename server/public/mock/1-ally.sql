CREATE DATABASE IF NOT EXISTS `ally` 
USE `ally`;

/*
- não precisa inserir nenhum id que seja chave primaria em nenhuma tabela pq todos sao auto increment;
- não precisa inserir nenhuma data nos campos created_at em nenhuma tabela;
- tem uma exemplo de insert pra cada tabela;
- não faça nenhuma insert a mais na tabela 'knowledge_type' nem na tabela 'report' nem na tabela 'chat' e nem na tabela 'message' nem na tabela notification;
- na tabela de usuarios no campo image_url coloquem só o nome do arquivo por completo, com a extensão (exemplo: 'eudaniel.jpg');
- usem sempre essa senha nos inserts de usuario (é '1234567' encriptado):
$2a$08$K0quDTpvomGjK9GmIZ9LzuoPu0xDMXv8IE20G3GDP/drSF7iEuJyW
*/

DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `employer_id` int(10) unsigned,
  `user_id` int(10) unsigned,
  PRIMARY KEY (`id`),
  CONSTRAINT `chat_employer_id_foreign` FOREIGN KEY (`employer_id`) REFERENCES `user` (`id`) ON DELETE SET NULL,
  CONSTRAINT `chat_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL
);

DROP TABLE IF EXISTS `job_vacancy`;
CREATE TABLE `job_vacancy` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `employer_id` int(10) unsigned NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `amount` int(11) NOT NULL,
  `local` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `job_vacancy_employer_id_foreign` FOREIGN KEY (`employer_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

/*
INSERT INTO `job_vacancy`
  (`employer_id`, `name`, `description`, `amount`, `local`)
  VALUES
  ('id da empresa', 'nome da vaga', 'descricao', 'quantidade de vagas', 'algum valor entre city/state/region/any')
*/

DROP TABLE IF EXISTS `knowledge`;
CREATE TABLE `knowledge` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `user_id` int(10) unsigned,
  `job_vacancy_id` int(10) unsigned,
  `knowledge_type_id` int(10) unsigned NOT NULL,
  `differential` tinyint(1),
  PRIMARY KEY (`id`),
  CONSTRAINT `knowledge_job_vacancy_id_foreign` FOREIGN KEY (`job_vacancy_id`) REFERENCES `job_vacancy` (`id`) ON DELETE CASCADE,
  CONSTRAINT `knowledge_knowledge_type_id_foreign` FOREIGN KEY (`knowledge_type_id`) REFERENCES `knowledge_type` (`id`) ON DELETE CASCADE,
  CONSTRAINT `knowledge_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

/*
SE FOR VAGA:

INSERT INTO `knowledge`
  (`job_vacancy_id`, `name`, `knowledge_type_id`, `differential`)
  VALUES
  ('id da vaga', 'nome da conhecimento', 'id do tipo de conhecimento', 'true ou false (diferencial ou requisito)')

----------------
SE FOR USUARIO:

INSERT INTO `knowledge`
  (`user_id`, `name`, `knowledge_type_id`)
  VALUES
  ('id do usuario', 'nome da conhecimento', 'id do tipo de conhecimento')

*/

DROP TABLE IF EXISTS `knowledge_type`;
CREATE TABLE `knowledge_type` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(24) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `knowledge_type` VALUES (1, `Especialização`);
INSERT INTO `knowledge_type` VALUES (2, `Graduação`);
INSERT INTO `knowledge_type` VALUES (3, `Certificação`);
INSERT INTO `knowledge_type` VALUES (4, `Curso`);
INSERT INTO `knowledge_type` VALUES (5, `Experiência`);
INSERT INTO `knowledge_type` VALUES (6, `Conhecimento`);

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `author_id` int(10) unsigned,
  `chat_id` int(10) unsigned,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `message_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`) ON DELETE SET NULL,
  CONSTRAINT `message_chat_id_foreign` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(48) NOT NULL,
  `description` varchar(255) NOT NULL,
  `link` varchar(48) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `notification_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `proposal`;
CREATE TABLE `proposal` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `status` varchar(24) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `job_vacancy_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `proposal_job_vacancy_id_foreign` FOREIGN KEY (`job_vacancy_id`) REFERENCES `job_vacancy` (`id`) ON DELETE CASCADE,
  CONSTRAINT `proposal_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

/*
INSERT INTO `proposal`
  (`status`, `user_id`, `job_vacancy_id`)
  VALUES
  ('um valor entre approved/denied/awaiting', 'id do usuario', 'id da vaga')
*/

DROP TABLE IF EXISTS `report`;
CREATE TABLE `report` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `job_vacancy_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `report_job_vacancy_id_foreign` FOREIGN KEY (`job_vacancy_id`) REFERENCES `job_vacancy` (`id`) ON DELETE CASCADE,
  CONSTRAINT `report_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(80) NOT NULL,
  `fiscal_code` varchar(14) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `image_url` varchar(120) NOT NULL,
  `postal_code` char(8) NOT NULL,
  `city` varchar(24) NOT NULL,
  `state` char(2) NOT NULL,
  `address` varchar(60) NOT NULL,
  `neighborhood` varchar(48) NOT NULL,
  `microregion_id` int(11) NOT NULL,
  `about` text,
  `employer` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

/*
INSERT INTO `user`
  (`name`, `email`, `password`, `fiscal_code`, `phone`, `image_url`, `postal_code`, `city`, `state`, `address`, `neighborhood`, `microregion_id`, `about`, `employer`)
  VALUES
  ('nome', 'email@a.com', '$2a$08$K0quDTpvomGjK9GmIZ9LzuoPu0xDMXv8IE20G3GDP/drSF7iEuJyW', 'cnpj se for empresa, cpf se nao, sem pontuação', '13997261001', 'foto.png', 'cep sem pontuação', 'SP', 'Santos', 'Rua Epitácio Pessoa', 'Aparecida', 'aqui vcs me falam as cidades/estado q vao usar q eu mando o codigo pra colocar', 'descrição elaborada aqui', 'true se for empresa, se nao false')
*/
