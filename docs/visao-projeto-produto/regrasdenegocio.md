# GestFarma
## Requisitos

## Historico de Revisão


| **Data**       | **Versão** | **Descrição**                                                     | **Autor**                                                                                      |
|----------------|------------|-------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| 11/12/2024     | 1.1        | Declaração de Problema, Posição das regras de negócio do projeto  | Davi Casseb, Fernanda Noronha, Joyce Dionizio, Karolina Barbosa, Vitor Carvalho Pereira, Yago Amin Santos |
| 26/01/2025     | 2.0        | Declaração dos requisitos conforme o SAFe baseado nas regras de negócio previamente estabelecidas e revisadas com o cliente.  | Fernanda Noronha  |
| 06/02/2025     | 2.1        | Ajuste da declaração dos requisitos conforme o SAFe baseado nas regras de negócio previamente estabelecidas e revisadas com o cliente.  | Davi Casseb, Fernanda Noronha, Joyce Dionizio, Karolina Barbosa, Vitor Carvalho Pereira, Yago Amin Santos  |


## Introdução 

Esta documentação segue os princípios do SAFe (Scaled Agile Framework) para garantir a organização e priorização das demandas do sistema de gerenciamento de estoques. O objetivo é descrever claramente os épicos, funcionalidades, requisitos e histórias de usuário, alinhando as entregas às necessidades do negócio e garantindo que o desenvolvimento ocorra de forma ágil e eficiente.
O framework SAFe foi escolhido por sua abordagem escalável e estruturada, permitindo que equipes multidisciplinares colaborem de maneira coordenada, atendendo às demandas técnicas e de negócio de forma incremental e iterativa.

## Objetivos
Alinhar as entregas às necessidades estratégicas: Garantir que as implementações do sistema estejam diretamente ligadas aos objetivos do negócio.
Melhorar a eficiência operacional: Reduzir perdas, aumentar a segurança e otimizar processos de controle e planejamento de estoques.
Prover uma base clara para o desenvolvimento ágil: Facilitar o entendimento e a comunicação entre stakeholders, desenvolvedores e usuários finais.
Aumentar a qualidade e segurança: Estabelecer critérios de aceite e requisitos claros para garantir robustez, usabilidade e acessibilidade no sistema.

# Estrutura SAFe

## **1. Épicos**
Os épicos representam grandes iniciativas de negócio ou de tecnologia, sendo desdobrados em funcionalidades e histórias de usuário. Seguem os épicos identificados:

### **Épico 1: Gerenciamento de Estoque**
Objetivo: Melhorar o controle de estoque para reduzir perdas por vencimento e aumentar a eficiência operacional.

### **Épico 2: Planejamento e Automação**
Objetivo: Automatizar alertas e planejar compras com base em dados históricos, garantindo a continuidade operacional.

---

## **2. Funcionalidades**
As funcionalidades representam partes significativas do épico e orientam a implementação de histórias de usuário.

### **Funcionalidade 1: Cadastro de Itens do Estoque**
Descrição: Permitir o registro completo de itens do estoque com informações relevantes.

### **Funcionalidade 2: Alerta de Validade Próxima**
Descrição: Notificar os responsáveis sobre produtos próximos ao vencimento.

### **Funcionalidade 3: Dispensação por FIFO**
Descrição: Garantir que produtos com validade próxima sejam priorizados na saída.

### **Funcionalidade 4: Controle de Acesso por Perfil**
Descrição: Configurar níveis de acesso diferenciados para cada perfil de usuário.

### **Funcionalidade 5: Autenticação Segura**
Descrição: Garantir a segurança no login com senhas fortes e bloqueios automáticos.

---

## **3. Requisitos e Relacionamento "De-Para"**
| **Regras de Negócio**                      | **Requisitos Funcionais**                                           | **Requisitos Não Funcionais**                                     |
|--------------------------------------------|----------------------------------------------------------------------|-------------------------------------------------------------------|
| Cadastro de itens deve evitar duplicidade. | Cadastro de itens com código único, lote, validade e fabricante.    | Tempo de resposta menor que 3 segundos.                          |
| Alertar sobre produtos próximos ao vencimento. | Geração de alertas automáticos para produtos com validade < 30 dias. | Design responsivo e acessível conforme WCAG 2.1.              |
| Compras devem ser planejadas.              | Planejamento baseado em rotatividade e níveis críticos de estoque.  | Dados criptografados para segurança.                             |
| Dispensação deve priorizar o FIFO.         | Organização automática de itens baseando-se na validade.            | Sistema deve operar sem perda de desempenho em alta demanda.     |
| Controle de acesso deve ser restrito.      | Configuração de perfis de acesso com permissões específicas.        | Logs armazenados por pelo menos 5 anos.                          |
| Segurança de acesso ao sistema.            | Autenticação com senhas fortes e bloqueio após múltiplas tentativas. |                                                                  |

---

## **4. Histórias de Usuário e Critérios de Aceite**

### **História 1: Cadastro de Itens do Estoque**
**Como** administrador do sistema,  
**eu quero** cadastrar itens no estoque com informações detalhadas (código único, lote, validade e fabricante),  
**para que** eu possa gerenciar os itens de forma precisa e evitar duplicidade.  

**Critérios de Aceite:**

- Deve ser possível cadastrar um item com as informações: código único, descrição, lote, validade e fabricante.
- O sistema deve validar a unicidade do código no momento do cadastro.
- Exibir mensagem de erro clara caso algum campo obrigatório não seja preenchido ou o código já exista.

---

### **História 2: Alerta de Validade Próxima**
**Como** farmacêutico responsável,  
**eu quero** receber alertas automáticos sobre medicamentos que estão próximos a vencer,  
**para que** eu possa tomar as devidas ações antes que eles expirem.  

**Critérios de Aceite:**

- O sistema deve gerar alertas automáticos para medicamentos com validade inferior a 30 dias.
- Os alertas devem ser exibidos em um painel principal.

---


### **História 3: Planejamento de Compras**
**Como** gestor de compras,  
**eu quero** que o sistema sugira o planejamento de compras com base em rotatividade e níveis críticos,  
**para que** eu possa evitar rupturas no estoque.  

**Critérios de Aceite:**

- O sistema deve emitir alertas para produtos que atingirem o nível crítico de estoque.
- Relatórios gerados devem incluir a disponibilização dos medicamentos.
---

### **História 4: Dispensação por FIFO**
**Como** técnico de farmácia,  
**eu quero** que o sistema priorize o princípio "primeiro a vencer, primeiro a sair" na dispensação de medicamentos,  
**para que** eu reduza o risco de perdas por vencimento.  

**Critérios de Aceite:**

- O sistema deve organizar automaticamente os itens disponíveis com base na validade.
- Deve exibir uma mensagem informativa caso o operador tente dispensar um item fora da ordem.
- A regra FIFO deve ser aplicada a todos os processos de dispensação.

---

### **História 5: Controle de Acesso**
**Como** administrador,  
**eu quero** configurar níveis de acesso para diferentes tipos de usuários,  
**para que** cada usuário visualize apenas as informações necessárias para suas atividades.  

**Critérios de Aceite:**

- O sistema deve permitir criar perfis de acesso (administrador, farmacêutico, técnico e auditor).
- Usuários com permissão limitada devem ter acesso apenas às funcionalidades pertinentes ao seu perfil.
- O sistema deve registrar logs de todas as ações realizadas pelos usuários, armazenando por pelo menos 5 anos.

---

### **História 6: Autenticação Segura**
**Como** usuário,  
**eu quero** realizar login com uma senha forte e bloqueio após múltiplas tentativas inválidas,  
**para que** minhas informações e acessos sejam mantidos seguros.  

**Critérios de Aceite:**

- O sistema deve exigir senhas com no mínimo 8 caracteres, incluindo letras maiúsculas, números e símbolos.
- Após 5 tentativas de login inválidas, a conta deve ser bloqueada automaticamente.
- Deve ser possível desbloquear contas somente por administradores.

---

## **5. Requisitos Não Funcionais**

- **Segurança:** O sistema deve garantir criptografia de dados sensíveis, como senhas e informações de usuários.
- **Desempenho:** O tempo de resposta para qualquer operação não deve ultrapassar 3 segundos.
- **Escalabilidade:** O sistema deve suportar até 10.000 registros simultâneos de itens sem perda de desempenho.
- **Usabilidade:** O sistema deve seguir as diretrizes de design responsivo e acessibilidade (WCAG 2.1).
