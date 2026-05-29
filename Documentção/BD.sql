CREATE DATABASE projetoIndividual;
USE projetoIndividual;

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeCompleto VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    senha VARCHAR(100)
);

CREATE TABLE voto (
    idVoto INT PRIMARY KEY AUTO_INCREMENT,
    personagem VARCHAR(100) NOT NULL,
    dtVoto DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_usuario INT NOT NULL,
    CONSTRAINT fkUsuarioVoto
        FOREIGN KEY (fk_usuario)
        REFERENCES usuario(idUsuario)
);

CREATE TABLE registro (
    idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    dtRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_voto INT NOT NULL,
    CONSTRAINT fkVotoRegistro
        FOREIGN KEY (fk_voto)
        REFERENCES voto(idVoto)
);

CREATE TABLE ranking (
    idRanking INT PRIMARY KEY AUTO_INCREMENT,
    nomeJogador VARCHAR(100),
    qtdAcertos INT,
    dtPartida DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT,
    CONSTRAINT fkUsuarioRanking
        FOREIGN KEY (fkUsuario)
        REFERENCES usuario(idUsuario)
);