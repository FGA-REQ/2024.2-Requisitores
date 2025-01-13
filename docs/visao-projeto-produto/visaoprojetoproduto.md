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

### 2.2. Planejamento das Fases e/ou 

### 2.3. Matriz de Comunicação

### 2.4. Gerenciamento de Riscos

### 2.5. Critérios de Replanejamento

