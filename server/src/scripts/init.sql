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

-- Tabela Usuáriov
INSERT OR IGNORE INTO Usuario (Nome, Login, Senha, Perfil) VALUES
('João Silva', 'joaosilva', 'senha123@', 'Farmacêutico'),
('Maria Oliveira', 'mariaoliveira', 'senha456@', 'Técnico de Farmácia'),
('Lucas Mendes', 'lucasmendes', 'senha789@', 'Auditor'),
('Admin Admin', 'admin', 'senhaADMIN@', 'Administrador');   

-- Tabela Medicamento
INSERT INTO Medicamento (Nome, Codigo, Descricao, Fabricante, ControleEspecial, QuantidadeMinima, QuantidadeMaxima) VALUES
('Paracetamol 500mg', 'MED001', 'Analgésico e antitérmico', 'FarmaCorp', 0, 50, 500),
('Ibuprofeno 200mg', 'MED002', 'Anti-inflamatório', 'MedPharma', 0, 30, 400),
('Clonazepam 2mg', 'MED003', 'Ansiolítico', 'HealthCare', 1, 10, 200),
('Amoxicilina 500mg', 'MED004', 'Antibiótico', 'FarmaCorp', 1, 40, 600),
('Omeprazol 20mg', 'MED005', 'Antiácido', 'PharmaLife', 0, 50, 400);

-- Tabela Lote
INSERT INTO Lote (ID_Medicamento, CodigoLote, Validade, Status) VALUES
(1, 'L202301', '2025-06-01', 'Ativo'),
(2, 'L202302', '2025-05-15', 'Ativo'),
(3, 'L202303', '2025-12-30', 'Ativo'),
(4, 'L202304', '2024-11-01', 'Expirado'),
(5, 'L202305', '2025-02-15', 'Ativo');

-- Tabela Estoque
INSERT INTO Estoque (ID_Lote, QuantidadeAtual, Local) VALUES
(1, 150, 'Prateleira A'),
(2, 200, 'Prateleira B'),
(3, 50, 'Prateleira C'),
(4, 300, 'Prateleira A'),
(5, 180, 'Prateleira E');

-- Tabela Paciente
INSERT INTO Paciente (Nome, Prontuario) VALUES
('Carlos Souza', 'PRONT001'),
('Fernanda Lima', 'PRONT002'),
('Ricardo Santos', 'PRONT003'),
('Juliana Pereira', 'PRONT004');

-- Tabela Dispensação
INSERT INTO Dispensacao (ID_Lote, ID_Paciente, ID_Usuario, Quantidade) VALUES
(1, 1, 1, 20),
(2, 2, 2, 30),
(3, 3, 3, 10),
(4, 4, 4, 40);

-- Tabela Recebimento
INSERT INTO Recebimento (ID_Usuario, Validacao) VALUES
(1, 'Aprovado'),
(2, 'Aprovado'),
(1, 'Aprovado'),
(2, 'Aprovado');

-- Tabela Item Recebido
INSERT INTO Item_Recebido (ID_Recebimento, ID_Lote, QuantidadeRecebida) VALUES
(1, 1, 100),
(2, 2, 200),
(1, 3, 50),
(2, 4, 300);

-- Tabela Ajuste Estoque
INSERT INTO Ajuste_Estoque (ID_Usuario, ID_Lote, TipoAjuste, Quantidade, Local, Justificativa) VALUES
(3, 1, 'Entrada', 10, 'Prateleira A', 'Ajuste de quantidade'),
(4, 3, 'Saída', 5, 'Prateleira B', 'Ajuste de quantidade');

-- Tabela Solicitação de Compra
INSERT INTO Solicitacao_Compra (ID_Usuario, Status) VALUES
(3, 'Aprovada'),
(3, 'Pendente');

-- Tabela Item Solicitado
INSERT INTO Item_Solicitado (ID_Solicitacao, ID_Medicamento, QuantidadeSolicitada) VALUES
(1, 1, 300),
(1, 2, 150),
(2, 3, 50),
(2, 4, 200);