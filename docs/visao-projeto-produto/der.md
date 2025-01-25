# MER/DER/Dicionário de dados

## Introdução 

O Modelo e o Diagrama de Entidade e Relacionamento apresentados neste documento representa uma visão da estrutura do banco de dados do sistema, assim com encontra-se as definições no dicionário de dados. O modelo foi elaborado com base nas regras de negócio identificadas e detalha as entidades, atributos e relacionamentos que compõem o sistema.

## Modelo de Entidade e Relacionamento

**Entidades:**
- Usuário
- Medicamento
- Lote
- Estoque
- Paciente
- Dispensação
- Recebimento
- Item_Recebido
- Ajuste_Estoque
- Solicitacao_Compra
- Item_Solicitado

**Atributos:**
- Usuário: ID_Usuario, Nome, Login, Senha, Perfil, TentativasFalhasLogin
- Medicamento: ID_Medicamento, Nome, Codigo, Descricao, Fabricante, ControleEspecial, QuantidadeMinima, QuantidadeMaxima
- Lote: ID_Lote, ID_Medicamento, CodigoLote, Validade, QuantidadeDisponivel, Status
- Estoque: ID_Estoque, ID_Lote, QuantidadeAtual, Local
- Paciente: ID_Paciente, Nome, Prontuario
- Dispensação: ID_Dispensacao, ID_Lote, ID_Paciente, ID_Usuario, DataHora, Quantidade
- Recebimento: ID_Recebimento, ID_Usuario, DataHoraRecebimento, Validacao
- Item_Recebido: ID_Item_Recebido, ID_Recebimento, ID_Lote, QuantidadeRecebida
- Ajuste_Estoque: ID_Ajuste, ID_Usuario, ID_Lote, TipoAjuste, Quantidade, Local, Justificativa, DataHora
- Solicitacao_Compra: ID_Solicitacao, DataSolicitacao, ID_Usuario, Status
- Item_Solicitado: ID_Item_Solicitado, ID_Solicitacao, ID_Medicamento, QuantidadeSolicitada


**Relacionamentos:**
- Usuário - Ajuste_Estoque: Um Usuário pode realizar vários Ajustes de Estoque (1:N)
- Usuário - Solicitacao_Compra: Um Usuário pode realizar várias Solicitações de Compra (1:N)
- Usuário - Dispensação: Um Usuário pode realizar várias Dispensações (1:N)
- Usuário - Recebimento: Um Usuário pode realizar vários Recebimentos (1:N)
- Medicamento - Lote: Um Medicamento pode ter vários Lotes (1:N)
- Medicamento - Item_Solicitado: Um Medicamento pode ser solicitado em vários Itens Solicitados (1:N)
- Lote - Medicamento: Um Lote pertence a um único Medicamento (1:1)
- Lote - Dispensação: Um Lote pode estar associado a várias Dispensações (1:N)
- Lote - Item_Recebido: Um Lote pode estar associado a vários Itens Recebidos (1:N)
- Lote - Ajuste_Estoque: Um Lote pode estar associado a vários Ajustes de Estoque (1:N)
- Lote - Estoque: Um Lote pode ter um registro de Estoque (1:1)
- Paciente - Dispensação: Um Paciente pode ter várias Dispensações (1:N)
- Recebimento - Item_Recebido: Um Recebimento pode ter vários Itens Recebidos (1:N)
- Solicitacao_Compra - Item_Solicitado: Uma Solicitação de Compra pode ter vários Itens Solicitados (1:N)

## Diagrama de Entidade e Relacionamento

[docs/DER.png](/workspaces/2024.2-Requisitores/docs/img/DER.png)

## Dicionário de dados

### Tabela: Usuario
**Definição:** A tabela Usuario contém informações sobre os usuários cadastrados no sistema.

| Atributo               | Tipo   | Nulo | Definição                              |
|------------------------|--------|------|---------------------------------------|
| ID_Usuario             | INT    | NÃO  | Identificador único do usuário.        |
| Nome                   | TEXT   | NÃO  | Nome completo do usuário.             |
| Login                  | TEXT   | NÃO  | Nome de login do usuário.             |
| Senha                  | TEXT   | NÃO  | Senha criptografada do usuário.       |
| Perfil                 | TEXT   | NÃO  | Perfil ou função atribuída ao usuário. |
| TentativasFalhasLogin  | INT    | SIM  | Número de tentativas de login falhas. |

---

### Tabela: Medicamento
**Definição:** A tabela Medicamento armazena informações sobre os medicamentos cadastrados.

| Atributo               | Tipo    | Nulo | Definição                                |
|------------------------|---------|------|-----------------------------------------|
| ID_Medicamento         | INT     | NÃO  | Identificador único do medicamento.      |
| Nome                   | TEXT    | NÃO  | Nome do medicamento.                    |
| Codigo                 | TEXT    | NÃO  | Código único do medicamento.            |
| Descricao              | TEXT    | SIM  | Descrição detalhada do medicamento.     |
| Fabricante             | TEXT    | SIM  | Nome do fabricante do medicamento.      |
| ControleEspecial       | BOOLEAN | NÃO  | Indica se o medicamento é de controle especial. |
| QuantidadeMinima       | INT     | SIM  | Quantidade mínima em estoque.           |
| QuantidadeMaxima       | INT     | SIM  | Quantidade máxima em estoque.           |

---

### Tabela: Lote
**Definição:** A tabela Lote registra os lotes de medicamentos cadastrados.

| Atributo               | Tipo   | Nulo | Definição                                |
|------------------------|--------|------|-----------------------------------------|
| ID_Lote                | INT    | NÃO  | Identificador único do lote.            |
| ID_Medicamento         | INT    | NÃO  | Referência ao medicamento associado.    |
| CodigoLote             | TEXT   | NÃO  | Código único do lote.                   |
| Validade               | DATE   | NÃO  | Data de validade do lote.               |
| QuantidadeDisponivel   | INT    | NÃO  | Quantidade disponível no lote.          |
| Status                 | TEXT   | NÃO  | Status do lote (ex.: ativo, expirado).  |

---

### Tabela: Estoque
**Definição:** A tabela Estoque contém informações sobre o estoque atual dos lotes de medicamentos.

| Atributo               | Tipo   | Nulo | Definição                                |
|------------------------|--------|------|-----------------------------------------|
| ID_Estoque             | INT    | NÃO  | Identificador único do estoque.         |
| ID_Lote                | INT    | NÃO  | Referência ao lote armazenado.          |
| QuantidadeAtual        | INT    | NÃO  | Quantidade atual em estoque.            |
| Local                  | TEXT   | NÃO  | Localização atual em estoque.           |

---

### Tabela: Paciente
**Definição:** A tabela Paciente armazena informações dos pacientes atendidos pelo sistema.

| Atributo               | Tipo   | Nulo | Definição                                |
|------------------------|--------|------|-----------------------------------------|
| ID_Paciente            | INT    | NÃO  | Identificador único do paciente.        |
| Nome                   | TEXT   | NÃO  | Nome completo do paciente.              |
| Prontuario             | TEXT   | NÃO  | Número do prontuário do paciente.       |

---

### Tabela: Dispensacao
**Definição:** A tabela Dispensacao registra as dispensações de medicamentos realizadas.

| Atributo               | Tipo     | Nulo | Definição                                |
|------------------------|----------|------|-----------------------------------------|
| ID_Dispensacao         | INT      | NÃO  | Identificador único da dispensação.     |
| ID_Lote                | INT      | NÃO  | Referência ao lote dispensado.          |
| ID_Paciente            | INT      | NÃO  | Referência ao paciente associado.       |
| ID_Usuario             | INT      | NÃO  | Referência ao usuário responsável.      |
| DataHora               | DATETIME | NÃO  | Data e hora da dispensação.             |
| Quantidade             | INT      | NÃO  | Quantidade dispensada.                  |

---

### Tabela: Recebimento
**Definição:** A tabela Recebimento registra os recebimentos de medicamentos no sistema.

| Atributo               | Tipo     | Nulo | Definição                                |
|------------------------|----------|------|-----------------------------------------|
| ID_Recebimento         | INT      | NÃO  | Identificador único do recebimento.     |
| ID_Usuario             | INT      | NÃO  | Referência ao usuário responsável.      |
| DataHoraRecebimento    | DATETIME | NÃO  | Data e hora do recebimento.             |
| Validacao              | BOOLEAN  | SIM  | Validação do recebimento.               |

---

---

### Tabela: ItemRecebido
**Definição:** A tabela ItemRecebido registra os itens recebidos em cada recebimento.

| Atributo               | Tipo   | Nulo | Definição                                |
|------------------------|--------|------|-----------------------------------------|
| ID_Item_Recebido       | INT    | NÃO  | Identificador único do item recebido.   |
| ID_Recebimento         | INT    | NÃO  | Referência ao recebimento associado.    |
| ID_Lote                | INT    | NÃO  | Referência ao lote recebido.            |
| QuantidadeRecebida     | INT    | NÃO  | Quantidade recebida do item.            |

---

### Tabela: AjusteEstoque
**Definição:** A tabela AjusteEstoque armazena os ajustes realizados no estoque.

| Atributo               | Tipo     | Nulo | Definição                                |
|------------------------|----------|------|-----------------------------------------|
| ID_Ajuste              | INT      | NÃO  | Identificador único do ajuste.          |
| ID_Usuario             | INT      | NÃO  | Referência ao usuário responsável.      |
| ID_Lote                | INT      | NÃO  | Referência ao lote ajustado.            |
| TipoAjuste             | TEXT     | NÃO  | Tipo de ajuste realizado.               |
| Quantidade             | INT      | NÃO  | Quantidade ajustada.                    |
| Local                  | TEXT     | NÃO  | Localização atual ajustada.             |
| Justificativa          | TEXT     | SIM  | Justificativa do ajuste.                |
| DataHora               | DATETIME | NÃO  | Data e hora do ajuste.                  |

---

### Tabela: SolicitacaoCompra
**Definição:** A tabela SolicitacaoCompra registra as solicitações de compra realizadas no sistema.

| Atributo               | Tipo     | Nulo | Definição                                |
|------------------------|----------|------|-----------------------------------------|
| ID_Solicitacao         | INT      | NÃO  | Identificador único da solicitação.     |
| DataSolicitacao        | DATETIME | NÃO  | Data e hora da solicitação de compra.   |
| ID_Usuario             | INT      | NÃO  | Referência ao usuário que realizou a solicitação. |
| Status                 | TEXT     | NÃO  | Status atual da solicitação (ex.: pendente, aprovada). |

---

### Tabela: ItemSolicitado
**Definição:** A tabela ItemSolicitado armazena os itens vinculados a uma solicitação de compra.

| Atributo               | Tipo   | Nulo | Definição                                |
|------------------------|--------|------|-----------------------------------------|
| ID_ItemSolicitado      | INT    | NÃO  | Identificador único do item solicitado. |
| ID_Solicitacao         | INT    | NÃO  | Referência à solicitação de compra associada. |
| ID_Medicamento         | INT    | NÃO  | Referência ao medicamento solicitado.   |
| QuantidadeSolicitada   | INT    | NÃO  | Quantidade solicitada do item.          |

## Histórico de Revisão

| **Data**       | **Versão** | **Descrição**                                                     | **Autor**                                                                                      |
|----------------|------------|-------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| 25/01/2025     | 1.1        | Inclusão do MER, DER e do dicionário de dados | Davi Casseb, Fernanda Noronha, Joyce Dionizio, Karolina Barbosa, Vitor Carvalho Pereira, Yago Amin Santos |