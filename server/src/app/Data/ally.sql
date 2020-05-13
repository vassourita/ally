SET sql_mode=(SELECT REPLACE(@@sql_mode, 'ONLY_FULL_GROUP_BY', ''));

CREATE SCHEMA IF NOT EXISTS ally;
USE ally;

CREATE TABLE IF NOT EXISTS user (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(80) NOT NULL,
  fiscal_code VARCHAR(14) NOT NULL,
  phone VARCHAR(11) NOT NULL,
  image_url VARCHAR(120) NOT NULL,
  postal_code CHAR(8) NOT NULL,
  city VARCHAR(24) NOT NULL,
  state CHAR(2) NOT NULL,
  address VARCHAR(60) NOT NULL,
  neighborhood VARCHAR(48) NOT NULL,
  microregion_id INT NOT NULL,
  birth DATE,
  about TEXT,
  employer BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS job_vacancy (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  amount INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT current_timestamp,
  CONSTRAINT fk_job_vacancy_user
    FOREIGN KEY (user_id)
    REFERENCES user (id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS message (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  author_id INT NOT NULL,
  target_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp,
  CONSTRAINT fk_message_author_user
    FOREIGN KEY (author_id)
    REFERENCES user (id)
    ON DELETE NO ACTION,
  CONSTRAINT fk_message_target_user
    FOREIGN KEY (target_id)
    REFERENCES user (id)
    ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS knowledge_type (
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(24) NOT NULL
);

CREATE TABLE IF NOT EXISTS knowledge (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(180) NOT NULL,
  user_id INT,
  job_vacancy_id INT,
  knowledge_type_id INT NOT NULL,
  differential BOOLEAN,
  date DATE,
  CONSTRAINT fk_knowledge_user
    FOREIGN KEY (user_id)
    REFERENCES user (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_knowledge_knowledge_type
    FOREIGN KEY (knowledge_type_id)
    REFERENCES knowledge_type (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_knowledge_job_vacancy
    FOREIGN KEY (job_vacancy_id)
    REFERENCES job_vacancy (id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notification_type (
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(24) NOT NULL
);

CREATE TABLE IF NOT EXISTS notification (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  description VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  notification_type_id INT NOT NULL,
  is_read BOOLEAN NOT NULL,
  link VARCHAR(40) NOT NULL,
  date TIMESTAMP DEFAULT current_timestamp,
  CONSTRAINT fk_notification_user
    FOREIGN KEY (user_id)
    REFERENCES user (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_notification_notification_type
    FOREIGN KEY (notification_type_id)
    REFERENCES notification_type (id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rating (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  author_id INT NOT NULL,
  target_id INT NOT NULL,
  job_vacancy_id INT NOT NULL,
  stars INT NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp,
  CONSTRAINT fk_rating_job_vacancy
    FOREIGN KEY (job_vacancy_id)
    REFERENCES job_vacancy (id)
    ON DELETE NO ACTION,
  CONSTRAINT fk_rating_author
    FOREIGN KEY (author_id)
    REFERENCES user (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_rating_target
    FOREIGN KEY (target_id)
    REFERENCES user (id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS report (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  author_id INT NOT NULL,
  target_id INT NOT NULL,
  job_vacancy_id INT NOT NULL,
  description TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_report_job_vacancy
    FOREIGN KEY (job_vacancy_id)
    REFERENCES job_vacancy (id)
    ON DELETE NO ACTION,
  CONSTRAINT fk_report_author
    FOREIGN KEY (author_id)
    REFERENCES user (id)
    ON DELETE NO ACTION,
  CONSTRAINT fk_report_target
    FOREIGN KEY (target_id)
    REFERENCES user (id)
    ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS proposal (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  job_vacancy_id INT NOT NULL,
  user_accepted BOOLEAN NOT NULL,
  job_vacancy_accepted BOOLEAN NOT NULL,
  adequacy INT NOT NULL,
  CONSTRAINT fk_proposal_user
    FOREIGN KEY (user_id)
    REFERENCES user (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_proposal_job_vacancy
    FOREIGN KEY (job_vacancy_id)
    REFERENCES job_vacancy (id)
    ON DELETE CASCADE
);

INSERT INTO knowledge_type (id, name) VALUES (1, 'especialização');
INSERT INTO knowledge_type (id, name) VALUES (2, 'graduação');
INSERT INTO knowledge_type (id, name) VALUES (3, 'certificação');
INSERT INTO knowledge_type (id, name) VALUES (4, 'curso');
INSERT INTO knowledge_type (id, name) VALUES (5, 'experiência');
INSERT INTO knowledge_type (id, name) VALUES (6, 'conhecimento');

INSERT INTO notification_type (id, name) VALUES (1, 'Nova mensagem');
INSERT INTO notification_type (id, name) VALUES (2, 'Proposta');
INSERT INTO notification_type (id, name) VALUES (3, 'Nova vaga');
INSERT INTO notification_type (id, name) VALUES (4, 'Avaliação');
