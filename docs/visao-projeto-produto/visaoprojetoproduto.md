# Gest Farma
## Visão do Produto e Projeto

## Histórico de Revisão


| **Data**       | **Versão** | **Descrição**                                                     | **Autor**                                                                                      |
|----------------|------------|-------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| 25/11/2024     | 1.1        | Declaração de Problema, Posição do Produto e Objetivos do Produto | Davi Casseb, Fernanda Noronha, Joyce Dionizio, Karolina Barbosa, Vitor Carvalho Pereira, Yago Amin Santos |
| 13/01/2025     | 2.0        | Ajustes na Declaração de Problema, Posição do Produto, e Objetivos do Produto; Tecnologias a serem utilizadas; Organização do Projeto; Planejamento das Fazes e/ou Iterações do Projeto; Matriz de comunicação; Gerenciamento de Risco; Critérios de Replanejamento; Processo de Desenvolvimento de Software | Fernanda Noronha |

## 1. Visão Geral do Produto
### 1.1. Problema
O controle e a gestão de medicamentos representam um dos principais desafios na área farmacêutica, dado que cada tipo de fármaco exige condições específicas de armazenamento, administração dentro do prazo de validade e alinhamento com as necessidades individuais de cada paciente. No contexto da Força Aérea Brasileira (FAB), esses desafios são acentuados, podendo impactar diretamente a eficiência operacional e a segurança no uso dos medicamentos. Os principais problemas identificados incluem:

- **Validade dos Medicamentos:** Ausência de um controle eficaz que identifique e alerte sobre medicamentos próximos ao vencimento, resultando em desperdício de recursos e potenciais riscos à saúde.

- **Restrição de Medicamentos:** Falta de ferramentas que permitam a verificação ágil de restrições, como lotes destinados a usos específicos, limitações regulamentares ou requisitos especiais de armazenamento.

- **Falta de Centralização das Informações:** Os dados sobre os estoques encontram-se dispersos em diferentes sistemas ou registros manuais, dificultando consultas e decisões rápidas.

- **Erro Humano:** Dependência de processos manuais, suscetíveis a erros de registro, perda de dados ou interpretações equivocadas das informações.


[docs/espinhadepeixe.png](/workspaces/2024.2-Requisitores/docs/img/espinhadepeixe.png)

### 1.2. Declaração de Posição do Produto

O produto a ser desenvolvido é uma ferramenta de gestão de estoque de medicamentos, projetada para atender às especificidades exigidas pela FAB.

A solução é direcionada aos profissionais que atuam na farmácia da FAB, permitindo não apenas otimizar o trabalho com organização mais eficiente dos estoques, mas também prevenir o desperdício de medicamentos, promovendo uma gestão mais sustentável e segura.


| **Para** | Hospital de Força de Aérea de Brasília |
|----------|----------------------------------------|
| **Quem** | Grupo Requisitores                    |
| **O (nome do produto)** | GestFarma                           |
| **Que**  | Auxilia na gestão de fármacos do Hospital de Força Aérea de Brasília |
| **Ao contrário** | MGITECH                             |
| **Nosso produto** | Software desenvolvido sob medida para atender às necessidades específicas do HFAB, oferecendo uma usabilidade aprimorada e facilitada. A solução será acessível via internet, eliminando a necessidade de hardwares dedicados. |

### 1.3. Objetivo do Produto

O produto tem como objetivo oferecer um sistema eficiente e confiável para a gestão de estoques de produtos farmacêuticos, atendendo às demandas do HFAB. A solução buscará:

- Otimizar o controle de entrada e saída de medicamentos;
- Minimizar desperdícios e custos operacionais;
- Garantir a rastreabilidade de lotes e prazos de validade;
- Fornecer funcionalidades que auxiliem no planejamento estratégico e na tomada de decisões gerenciais.

### 1.4. Tecnologias a Serem Utilizadas

Para o desenvolvimento do referido produto, será implementada uma solução web, considerando sua elevada acessibilidade para o usuário final. Nesse contexto, a tecnologia escolhida para o front-end é o React, uma vez que a equipe já possui familiaridade com essa ferramenta, o que permitirá um desenvolvimento mais ágil e eficiente. Para o back-end, optou-se pelo uso do Node.js, decisão fundamentada na possibilidade de manter a uniformidade da linguagem de programação em todo o sistema. Por fim, o banco de dados selecionado será o SQLite, pois apresenta uma estrutura que atende aos requisitos da solução proposta.

## 2. Visão Geral do Projeto

### 2.1. Organização do Projeto
A equipe responsável pelo desenvolvimento do projeto foi estruturada com base em papéis e responsabilidades claras, assegurando a organização e eficiência durante todas as etapas do trabalho. A tabela a seguir apresenta a descrição de cada papel, suas atribuições específicas, o responsável principal e os participantes envolvidos:


| **Papel**          | **Atribuições**                                                                                   | **Responsável**                         | **Participantes**                                                                                                      |  
|---------------------|--------------------------------------------------------------------------------------------------|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------------|  
| **Desenvolvedores** | Responsáveis pelo desenvolvimento do projeto, incluindo codificação, refatoração de código e testes. | Davi Casseb                              | Fernanda Noronha, Joyce Dionizio, Karolina Barbosa, Vitor Carvalho Pereira, Yago Amin Santos                           |  
| **Product Owner**   | Responsável pela priorização do backlog, definição de requisitos e alinhamento com as expectativas do cliente. | Davi Casseb                              | Davi Casseb                                                                                                           |  
| **Cliente**         | Farmacêutica responsável por validar o produto final, garantindo que atenda às necessidades definidas. | Ana Cristina                             | Ana Cristina                                                                                                          |  

### 2.2. Planejamento das Fases e/ou Iterações do Projeto
O planejamento do projeto foi dividido em sprints, com entregas específicas para cada etapa, garantindo uma abordagem iterativa e incremental. Cada sprint possui objetivos claros e prazos definidos, permitindo a gestão eficaz das atividades e o acompanhamento do progresso. A tabela a seguir detalha as entregas, datas de início e fim de cada sprint:
| **Sprint**          | **Produto (Entrega)**                                                                                   | **Data Início**                         | **Data Fim**                                                                                                      |  
|---------------------|--------------------------------------------------------------------------------------------------|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------------|  
| **Sprint 1** | Proposta do Projeto | 18/11/2024                              | 24/11/2024                           |  
| **Sprint 2** | Definição do Problema, Visão do Produto e Projeto | 25/11/2024                              | 01/12/2024                           |  
| **Sprint 3**   | Planejamento do Projeto | 02/12/2024                              | 08/12/2024                                                                                                          |  
| **Sprint 4**         | Definições das Regras de Negócio |            09/12/2024                  |15/12/2024                                                                                                          |
| **Sprint 5**         | Definições dos Requisitos Funcionais e Não Funcionais |            16/12/2024                  | 22/12/2024                                                                                                          |
| **Sprint 6**         | Construção do GitPages, Iniciar MVP, Visão do Produto e Projeto. |            06/01/2024                  |12/01/20242024                                                                                                          |
| **Sprint 7**         | Backlog do Produto, MVP e os processos de desenvolvimento de software. |            13/01/2025                  |19/01/2025                                                                                                          |
| **Sprint 8**         | MVP, DoR, DoD |            20/01/2025                  |26/01/2025                                                                                                          |
| **Sprint 9**         | MVP, Vídeo de validação cliente, vídeo de apresentação resultados |            27/01/2025                  |02/01/2025                                                                                                          |
| **Sprint 10**         | Ajustes finais, entrega do MVP |            03/02/2025                  |09/02/2025                                                                                                          |
| **Sprint 11**         | Preparar e realizar apresentação |            10/02/2025                  |12/02/2025                                                                                                          |

### 2.3. Matriz de Comunicação

### 2.4. Gerenciamento de Riscos

### 2.5. Critérios de Replanejamento

## 3. Processo de Desenvolvimento de Software

## 4. Lições Aprendidas