---- Criação das tabelas do bd ----

-- Tabela Usuário
CREATE TABLE IF NOT EXISTS Usuario (
    ID_Usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT NOT NULL,
    Login TEXT NOT NULL UNIQUE,
    Senha TEXT NOT NULL,
    Perfil TEXT NOT NULL,
    TentativasFalhasLogin INTEGER DEFAULT 0
);

-- Tabela Medicamento
CREATE TABLE IF NOT EXISTS Medicamento (
    ID_Medicamento INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT NOT NULL,
    Codigo TEXT NOT NULL UNIQUE,
    Descricao TEXT,
    Fabricante TEXT,
    ControleEspecial BOOLEAN DEFAULT 0,
    QuantidadeMinima INTEGER NOT NULL,
    QuantidadeMaxima INTEGER NOT NULL
);

-- Tabela Lote
CREATE TABLE IF NOT EXISTS Lote (
    ID_Lote INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_Medicamento INTEGER NOT NULL,
    CodigoLote TEXT NOT NULL,
    Validade DATE NOT NULL,
    Status TEXT NOT NULL,
    FOREIGN KEY (ID_Medicamento) REFERENCES Medicamento(ID_Medicamento)
);

-- Tabela Estoque
CREATE TABLE IF NOT EXISTS Estoque (
    ID_Estoque INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_Lote INTEGER NOT NULL,
    QuantidadeAtual INTEGER NOT NULL,
    Local TEXT NOT NULL,
    FOREIGN KEY (ID_Lote) REFERENCES Lote(ID_Lote)
);

-- Tabela Paciente
CREATE TABLE IF NOT EXISTS Paciente (
    ID_Paciente INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT NOT NULL,
    Prontuario TEXT NOT NULL UNIQUE
);

-- Tabela Dispensação
CREATE TABLE IF NOT EXISTS Dispensacao (
    ID_Dispensacao INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_Lote INTEGER NOT NULL,
    ID_Paciente INTEGER NOT NULL,
    ID_Usuario INTEGER NOT NULL,
    DataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    Quantidade INTEGER NOT NULL,
    Status TEXT DEFAULT 'Pendente',
    FOREIGN KEY (ID_Lote) REFERENCES Lote(ID_Lote),
    FOREIGN KEY (ID_Paciente) REFERENCES Paciente(ID_Paciente),
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

-- Tabela Recebimento
CREATE TABLE IF NOT EXISTS Recebimento (
    ID_Recebimento INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_Usuario INTEGER NOT NULL,
    DataHoraRecebimento DATETIME DEFAULT CURRENT_TIMESTAMP,
    Validacao TEXT,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

-- Tabela Item Recebido
CREATE TABLE IF NOT EXISTS Item_Recebido (
    ID_Item_Recebido INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_Recebimento INTEGER NOT NULL,
    ID_Lote INTEGER NOT NULL,
    QuantidadeRecebida INTEGER NOT NULL,
    FOREIGN KEY (ID_Recebimento) REFERENCES Recebimento(ID_Recebimento),
    FOREIGN KEY (ID_Lote) REFERENCES Lote(ID_Lote)
);

-- Tabela Ajuste Estoque
CREATE TABLE IF NOT EXISTS Ajuste_Estoque (
    ID_Ajuste INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_Usuario INTEGER NOT NULL,
    ID_Lote INTEGER NOT NULL,
    TipoAjuste TEXT NOT NULL,
    Quantidade INTEGER NOT NULL,
    Local TEXT NOT NULL,
    Justificativa TEXT,
    DataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario),
    FOREIGN KEY (ID_Lote) REFERENCES Lote(ID_Lote)
);

-- Tabela Solicitação de Compra
CREATE TABLE IF NOT EXISTS Solicitacao_Compra (
    ID_Solicitacao INTEGER PRIMARY KEY AUTOINCREMENT,
    DataSolicitacao DATE DEFAULT CURRENT_DATE,
    ID_Usuario INTEGER NOT NULL,
    Status TEXT NOT NULL,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

-- Tabela Item Solicitado
CREATE TABLE IF NOT EXISTS Item_Solicitado (
    ID_Item_Solicitado INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_Solicitacao INTEGER NOT NULL,
    ID_Medicamento INTEGER NOT NULL,
    QuantidadeSolicitada INTEGER NOT NULL,
    FOREIGN KEY (ID_Solicitacao) REFERENCES Solicitacao_Compra(ID_Solicitacao),
    FOREIGN KEY (ID_Medicamento) REFERENCES Medicamento(ID_Medicamento)
);

---- Popula as tabelas do bd ----

-- Tabela Usuário
INSERT OR IGNORE INTO Usuario (Nome, Login, Senha, Perfil) VALUES
('Admin', 'admin@gmail.com', 'senhaADMIN@', 'Administrador'),
('Farmacêutico', 'farm@gmail.com', 'senhaFARM@', 'Farmacêutico'),
('Técnico de Farmácia', 'tc@gmail.com', 'senhaTF@', 'Técnico de Farmácia'),
('Auditor', 'audit@gmail.com', 'senhaADMIN@', 'Auditor'),
('João Silva', 'joaosilva@gmail.com', 'senha123@', 'Farmacêutico'),
('Maria Oliveira', 'mariaoliveira@gmail.com', 'senha456@', 'Técnico de Farmácia'),
('Lucas Mendes', 'lucasmendes@gmail.com', 'senha789@', 'Auditor'),
('Paulo Souza', 'paulosouza@gmail.com', 'senha321@', 'Farmacêutico'),
('Ana Clara', 'anaclara@gmail.com', 'senha654@', 'Técnico de Farmácia'),
('Carlos Lima', 'carloslima@gmail.com', 'senha987@', 'Auditor');

-- Tabela Medicamento
INSERT OR IGNORE INTO Medicamento (Nome, Codigo, Descricao, Fabricante, ControleEspecial, QuantidadeMinima, QuantidadeMaxima) VALUES
('Paracetamol 500mg', 'MED001', 'Analgésico e antitérmico', 'FarmaCorp', 0, 50, 500),
('Ibuprofeno 200mg', 'MED002', 'Anti-inflamatório', 'MedPharma', 0, 30, 400),
('Clonazepam 2mg', 'MED003', 'Ansiolítico', 'HealthCare', 1, 10, 200),
('Amoxicilina 500mg', 'MED004', 'Antibiótico', 'FarmaCorp', 1, 40, 600),
('Omeprazol 20mg', 'MED005', 'Antiácido', 'PharmaLife', 0, 50, 400),
('Dipirona 500mg', 'MED013', 'Analgésico e antitérmico', 'FarmaCorp', 0, 100, 1000),
('Captopril 25mg', 'MED007', 'Anti-hipertensivo', 'MedPharma', 0, 50, 500),
('Diazepam 10mg', 'MED008', 'Ansiolítico', 'HealthCare', 1, 20, 200),
('Cefalexina 500mg', 'MED009', 'Antibiótico', 'FarmaCorp', 1, 80, 800),
('Ranitidina 150mg', 'MED010', 'Antiácido', 'PharmaLife', 0, 120, 1200),
('Losartana 50mg', 'MED011', 'Anti-hipertensivo', 'MedPharma', 0, 70, 700),
('Sinvastatina 20mg', 'MED012', 'Redutor de colesterol', 'FarmaCorp', 0, 90, 900),
('Aspirina 100mg', 'MED014', 'Analgésico', 'Bayer', 0, 60, 600),
('Metformina 850mg', 'MED015', 'Antidiabético', 'PharmaLife', 0, 80, 800),
('Simeticona 125mg', 'MED016', 'Antiflatulento', 'MedPharma', 0, 40, 400),
('Loratadina 10mg', 'MED017', 'Antialérgico', 'AllerPharma', 0, 50, 500),
('Prednisona 20mg', 'MED018', 'Corticosteroide', 'SteroidPharma', 0, 30, 300),
('Azitromicina 500mg', 'MED019', 'Antibiótico', 'AntibioticCorp', 1, 40, 400),
('Fluoxetina 20mg', 'MED020', 'Antidepressivo', 'MentalHealth', 1, 20, 200),
('Cetirizina 10mg', 'MED021', 'Antialérgico', 'AllerPharma', 0, 60, 600),
('Diclofenaco 50mg', 'MED022', 'Anti-inflamatório', 'PainRelief', 0, 70, 700),
('Levotiroxina 100mcg', 'MED023', 'Hormônio tireoidiano', 'EndocrinePharma', 0, 80, 800),
('Atenolol 50mg', 'MED024', 'Beta-bloqueador', 'CardioPharma', 0, 90, 900),
('Clindamicina 300mg', 'MED025', 'Antibiótico', 'AntibioticCorp', 1, 50, 500),
('Furosemida 40mg', 'MED026', 'Diurético', 'DiureticPharma', 0, 100, 1000),
('Hidroclorotiazida 25mg', 'MED027', 'Diurético', 'DiureticPharma', 0, 110, 1100),
('Enalapril 10mg', 'MED028', 'Anti-hipertensivo', 'CardioPharma', 0, 120, 1200),
('Amlodipina 5mg', 'MED029', 'Anti-hipertensivo', 'CardioPharma', 0, 130, 1300),
('Simvastatina 40mg', 'MED030', 'Redutor de colesterol', 'FarmaCorp', 0, 140, 1400);

-- Tabela Lote
INSERT INTO Lote (ID_Medicamento, CodigoLote, Validade, Status) VALUES
(1, 'L202301', '2025-06-01', 'Ativo'),
(2, 'L202302', '2025-05-15', 'Ativo'),
(3, 'L202303', '2025-12-30', 'Ativo'),
(4, 'L202304', '2024-11-01', 'Expirado'),
(5, 'L202305', '2025-02-15', 'Ativo'),
(6, 'L202306', '2026-01-15', 'Ativo'),
(7, 'L202307', '2025-10-20', 'Ativo'),
(8, 'L202308', '2024-09-05', 'Expirado'),
(9, 'L202309', '2026-03-10', 'Ativo'),
(10, 'L202310', '2025-07-25', 'Ativo'),
(11, 'L202311', '2024-12-18', 'Expirado'),
(12, 'L202312', '2026-05-02', 'Ativo'),
(13, 'L202313', '2025-08-15', 'Ativo'),
(14, 'L202314', '2025-09-10', 'Ativo'),
(15, 'L202315', '2026-02-20', 'Ativo'),
(1, 'L202316', '2025-07-01', 'Ativo'),
(2, 'L202317', '2025-06-15', 'Ativo'),
(3, 'L202318', '2025-11-30', 'Ativo'),
(4, 'L202319', '2024-10-01', 'Expirado'),
(5, 'L202320', '2025-01-15', 'Ativo'),
(6, 'L202321', '2026-02-15', 'Ativo'),
(7, 'L202322', '2025-11-20', 'Ativo'),
(8, 'L202323', '2024-08-05', 'Expirado'),
(9, 'L202324', '2026-04-10', 'Ativo'),
(10, 'L202325', '2025-08-25', 'Ativo'),
(11, 'L202326', '2024-11-18', 'Expirado'),
(12, 'L202327', '2026-06-02', 'Ativo'),
(13, 'L202328', '2025-09-15', 'Ativo'),
(14, 'L202329', '2025-10-10', 'Ativo'),
(15, 'L202330', '2026-03-20', 'Ativo');

-- Tabela Estoque
INSERT INTO Estoque (ID_Lote, QuantidadeAtual, Local) VALUES
(1, 150, 'Prateleira A'),
(2, 20, 'Prateleira B'),
(3, 50, 'Prateleira C'),
(4, 30, 'Prateleira A'),
(5, 18, 'Prateleira E'),
(6, 50, 'Prateleira A'),
(7, 30, 'Prateleira B'),
(8, 10, 'Prateleira C'),
(9, 60, 'Prateleira D'),
(10, 4, 'Prateleira E'),
(11, 20, 'Prateleira F'),
(12, 8, 'Prateleira G'),
(13, 25, 'Prateleira H'),
(14, 35, 'Prateleira I'),
(15, 45, 'Prateleira J'),
(1, 10, 'Prateleira K'),
(2, 15, 'Prateleira L'),
(3, 20, 'Prateleira M'),
(4, 25, 'Prateleira N'),
(5, 3, 'Prateleira O'),
(6, 35, 'Prateleira P'),
(7, 40, 'Prateleira Q'),
(8, 45, 'Prateleira R'),
(9, 5, 'Prateleira S'),
(10, 55, 'Prateleira T'),
(11, 60, 'Prateleira U'),
(12, 65, 'Prateleira V'),
(13, 70, 'Prateleira W'),
(14, 75, 'Prateleira X'),
(15, 8, 'Prateleira Y'),
(1, 85, 'Prateleira Z'),
(2, 9, 'Prateleira AA'),
(3, 95, 'Prateleira BB'),
(4, 10, 'Prateleira CC'),
(5, 105, 'Prateleira DD'),
(6, 110, 'Prateleira EE'),
(7, 115, 'Prateleira FF'),
(8, 120, 'Prateleira GG'),
(9, 125, 'Prateleira HH'),
(10, 130, 'Prateleira II'),
(11, 135, 'Prateleira JJ'),
(12, 140, 'Prateleira KK'),
(13, 145, 'Prateleira LL'),
(14, 150, 'Prateleira MM'),
(15, 155, 'Prateleira NN');

-- Tabela Paciente
INSERT OR IGNORE INTO Paciente (Nome, Prontuario) VALUES
('Carlos Souza', 'PRONT001'),
('Fernanda Lima', 'PRONT002'),
('Ricardo Santos', 'PRONT003'),
('Juliana Pereira', 'PRONT004'),
('Maria Silva', 'PRONT005'),
('Pedro Oliveira', 'PRONT006'),
('Ana Souza', 'PRONT007'),
('Lucas Lima', 'PRONT008'),
('Fernanda Santos', 'PRONT009'),
('João Almeida', 'PRONT010'),
('Mariana Costa', 'PRONT011'),
('Rafael Mendes', 'PRONT012'),
('Beatriz Rocha', 'PRONT013'),
('Gabriel Martins', 'PRONT014'),
('Larissa Fernandes', 'PRONT015');

-- Tabela Dispensação
INSERT INTO Dispensacao (ID_Lote, ID_Paciente, ID_Usuario, Quantidade) VALUES
(1, 1, 1, 2),
(2, 2, 2, 3),
(3, 3, 3, 1),
(4, 4, 4, 4),
(6, 5, 1, 5),
(7, 4, 2, 3),
(8, 3, 3, 2),
(9, 2, 1, 8),
(10, 1, 4, 4),
(11, 5, 2, 10),
(12, 4, 3, 6),
(13, 6, 1, 2),
(14, 7, 2, 3),
(15, 8, 3, 4);

-- Tabela Recebimento
INSERT INTO Recebimento (ID_Usuario, Validacao) VALUES
(1, 'Aprovado'),
(2, 'Aprovado'),
(1, 'Aprovado'),
(2, 'Aprovado'),
(3, 'Aprovado'),
(4, 'Pendente'),
(1, 'Aprovado'),
(2, 'Aprovado'),
(3, 'Pendente'),
(4, 'Aprovado'),
(1, 'Pendente'),
(2, 'Aprovado'),
(3, 'Pendente');

-- Tabela Item Recebido
INSERT INTO Item_Recebido (ID_Recebimento, ID_Lote, QuantidadeRecebida) VALUES
(1, 1, 100),
(2, 2, 200),
(1, 3, 50),
(2, 4, 300),
(3, 6, 400),
(4, 7, 200),
(3, 8, 80),
(4, 9, 500),
(5, 10, 300),
(5, 11, 150),
(5, 12, 700),
(6, 13, 250),
(7, 14, 350),
(8, 15, 450);

-- Tabela Ajuste Estoque
INSERT INTO Ajuste_Estoque (ID_Usuario, ID_Lote, TipoAjuste, Quantidade, Local, Justificativa) VALUES
(3, 1, 'Entrada', 10, 'Prateleira A', 'Ajuste de quantidade'),
(4, 3, 'Saída', 5, 'Prateleira B', 'Ajuste de quantidade'),
(1, 6, 'Saída', 20, 'Prateleira A', 'Ajuste de quantidade'),
(2, 8, 'Entrada', 30, 'Prateleira C', 'Ajuste de quantidade'),
(3, 10, 'Saída', 10, 'Prateleira E', 'Ajuste de quantidade'),
(4, 12, 'Entrada', 50, 'Prateleira G', 'Ajuste de quantidade'),
(1, 13, 'Entrada', 25, 'Prateleira H', 'Ajuste de quantidade'),
(2, 14, 'Saída', 35, 'Prateleira I', 'Ajuste de quantidade'),
(3, 15, 'Entrada', 45, 'Prateleira J', 'Ajuste de quantidade');

-- Tabela Solicitação de Compra
INSERT INTO Solicitacao_Compra (ID_Usuario, Status) VALUES
(3, 'Aprovada'),
(3, 'Pendente'),
(1, 'Aprovada'),
(2, 'Pendente'),
(3, 'Em análise'),
(4, 'Aprovada'),
(1, 'Pendente'),
(2, 'Aprovada'),
(3, 'Em análise');

-- Tabela Item Solicitado
INSERT INTO Item_Solicitado (ID_Solicitacao, ID_Medicamento, QuantidadeSolicitada) VALUES
(1, 1, 300),
(1, 2, 150),
(2, 3, 50),
(2, 4, 200),
(3, 6, 200),
(3, 7, 100),
(4, 8, 50),
(4, 9, 300),
(5, 10, 150),
(5, 11, 80),
(5, 12, 400),
(6, 13, 250),
(7, 14, 350),
(8, 15, 450);