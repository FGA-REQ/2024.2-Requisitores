# Gest Farma
## Visão do Produto e Projeto

## Histórico de Revisão

| **Data**       | **Versão** | **Descrição**                                                     | **Autor**                                                                                      |
|----------------|------------|-------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| 25/11/2024     | 1.1        | Declaração de Problema, Posição do Produto e Objetivos do Produto | Davi Casseb, Fernanda Noronha, Joyce Dionizio, Karolina Barbosa, Vitor Carvalho Pereira, Yago Amin Santos |
| 13/01/2025     | 2.0        | Ajustes na Declaração de Problema, Posição do Produto, e Objetivos do Produto; Tecnologias a serem utilizadas; Organização do Projeto; Planejamento das Fazes e/ou Iterações do Projeto; Matriz de comunicação; Gerenciamento de Risco; Critérios de Replanejamento; Lições aprendidas, referências | Fernanda Noronha |

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
| **Sprint**          | **Produto (Entrega)**                                                                                     | **Data de Início**                     | **Data de Término**                                                                                              |  
|---------------------|----------------------------------------------------------------------------------------------------|-----------------------------------------|------------------------------------------------------------------------------------------------------------------|  
| **Sprint 1**        | Proposta do Projeto                                                                                | 18/11/2024                              | 24/11/2024                                                                                                      |  
| **Sprint 2**        | Definição do Problema, Visão do Produto e Projeto                                                  | 25/11/2024                              | 01/12/2024                                                                                                      |  
| **Sprint 3**        | Planejamento do Projeto                                                                            | 02/12/2024                              | 08/12/2024                                                                                                      |  
| **Sprint 4**        | Definição das Regras de Negócio                                                                    | 09/12/2024                              | 15/12/2024                                                                                                      |  
| **Sprint 5**        | Definição dos Requisitos Funcionais e Não Funcionais                                               | 16/12/2024                              | 22/12/2024                                                                                                      |  
| **Sprint 6**        | Construção do GitPages, início do MVP, Visão do Produto e Projeto                                  | 06/01/2025                              | 12/01/2025                                                                                                      |  
| **Sprint 7**        | Backlog do Produto, MVP e processos de desenvolvimento de software                                 | 13/01/2025                              | 19/01/2025                                                                                                      |  
| **Sprint 8**        | MVP, DoR, DoD                                                                                      | 20/01/2025                              | 26/01/2025                                                                                                      |  
| **Sprint 9**        | MVP, vídeo de validação com o cliente, vídeo de apresentação de resultados                         | 27/01/2025                              | 02/02/2025                                                                                                      |  
| **Sprint 10**       | Ajustes finais e entrega do MVP                                                                    | 03/02/2025                              | 09/02/2025                                                                                                      |  
| **Sprint 11**       | Preparação e realização da apresentação                                                            | 10/02/2025                              | 12/02/2025                                                                                                      |  

**2.3. Matriz de Comunicação**

Uma matriz de comunicação é fundamental para assegurar a troca eficiente de informações entre os envolvidos no projeto. Foram definidos canais, periodicidade e responsáveis para cada tipo de interação, levando em consideração a agilidade necessária para tomadas de decisão e alinhamentos estratégicos.

| **Descrição**                         | **Área/Envolvidos**                      | **Periodicidade**     | **Produtos Gerados**                     | **Canal de Comunicação**           |  
|---------------------------------------|------------------------------------------|-----------------------|-----------------------------------------|------------------------------------|  
| Acompanhamento das atividades         | Equipe de desenvolvimento                | Semanal               | Ata de reunião                         | Horário da aula ou Discord         |  
| Relatório de progresso do projeto     | Equipe de desenvolvimento, professora    | Semanal               | Relatório de status                    | Horário da aula ou Discord         |  
| Alinhamento de expectativas com o cliente | Product Owner                           | Quinzenal             | Product Backlog atualizado             | Discord                            |  
| Comunicação emergencial               | Toda a equipe                            | Conforme necessidade  | Resolução de questões urgentes         | WhatsApp                           |  
| Validação de entregas                 | Cliente, Product Owner                   | Mensal                | Feedback sobre MVP ou protótipos       | Discord                            |  

É importante destacar que o WhatsApp será utilizado exclusivamente como meio de comunicação emergencial, reservado para tratar questões de caráter crítico ou urgente. Isso garante celeridade na resolução de problemas e alinhamentos imediatos entre os membros da equipe.  

As reuniões de alinhamento, realizadas semanalmente e quinzenalmente, ocorrerão preferencialmente durante o horário regular de aula ou, alternativamente, por meio da plataforma Discord, conforme a disponibilidade previamente acordada pelos integrantes do projeto.

A plataforma Discord será adotada como o principal canal de comunicação para atividades estratégicas, como planejamento, validação de entregas, alinhamento de expectativas e condução de reuniões de retrospectiva, promovendo maior organização e interação entre os participantes.

### 2.4. Gerenciamento de Riscos
O gerenciamento de riscos é uma prática indispensável em qualquer projeto, especialmente em um contexto acadêmico que visa preparar os estudantes para identificar, analisar e mitigar riscos de forma eficiente. No caso do GestFarma, um sistema de gestão de medicamentos desenvolvido para atender às necessidades da Força Aérea Brasileira (FAB), a equipe tem como objetivo principal minimizar os impactos negativos dos riscos e garantir que os entregáveis estejam alinhados com os prazos, custos e padrões de qualidade estabelecidos.  

A abordagem do gerenciamento de riscos no projeto segue as etapas básicas de identificação, análise, resposta e monitoramento. Essas etapas são realizadas de maneira contínua ao longo do ciclo de vida do projeto, permitindo uma resposta ágil a possíveis problemas e mantendo o progresso em direção aos objetivos.  

Para alcançar esse propósito, o processo de gerenciamento de riscos envolve atividades específicas, como:  
- Identificação dos riscos potenciais em todas as fases do projeto, desde o planejamento até a entrega final.  
- Análise dos riscos técnicos, operacionais e regulatórios relacionados ao desenvolvimento do sistema.  
- Avaliação detalhada da probabilidade de ocorrência e do impacto de cada risco, classificando-os em categorias como técnicos, de cronograma, orçamento e comunicação.  
- Desenvolvimento de planos de resposta, incluindo estratégias de mitigação e contingência para riscos com alto grau de exposição.  
- Revisão periódica da lista de riscos identificados para incluir novos fatores e monitorar a evolução dos existentes.  
- Registro detalhado de todas as análises e respostas implementadas, garantindo a rastreabilidade das decisões tomadas.   

A tabela a seguir detalha os principais riscos identificados no projeto GestFarma, suas probabilidades e impactos, além das ações de resposta planejadas para minimizar seus efeitos:

| **Risco**                                                       | **Probabilidade**   | **Impacto**         | **Ações de Resposta**                                                                                                                                                           |
|-----------------------------------------------------------------|---------------------|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Atrasos na entrega de requisitos do cliente**                 | Alta                | Significativo       | - Definir prazos claros para a entrega de requisitos. <br> - Realizar reuniões quinzenais para alinhamento de expectativas. <br> - Manter comunicação constante com o cliente. |
| **Falhas no controle de validade e restrições dos medicamentos** | Alta                | Significativo       | - Implementar sistemas automáticos de alerta para validade e restrições. <br> - Realizar testes rigorosos para garantir a precisão dos dados processados.                      |
| **Erros no registro de entrada/saída de medicamentos**          | Média               | Moderado            | - Automatizar os processos relacionados à entrada e saída de medicamentos. <br> - Implementar validações e auditorias regulares de dados.                                     |
| **Falta de recursos humanos qualificados para o desenvolvimento do sistema** | Média               | Significativo       | - Promover treinamentos e capacitações para a equipe interna.                                                                                                                 |
| **Atraso nas entregas devido a falta de comunicação interna**   | Média               | Moderado            | - Adotar ferramentas de comunicação eficientes, como Discord ou Slack. <br> - Estabelecer reuniões semanais de alinhamento entre as equipes.                                   |
| **Mudança nos requisitos do cliente durante o desenvolvimento** | Alta                | Moderado            | - Avaliar o impacto das mudanças no escopo, cronograma e orçamento. <br> - Negociar ajustes realistas com o cliente para garantir o alinhamento estratégico.                   |
| **Falhas no monitoramento do estoque de medicamentos**          | Alta                | Significativo       | - Estabelecer alertas automáticos para níveis críticos de estoque e datas de validade próximas.                                                                               |  

Esse processo sistemático de identificação e controle de riscos não apenas prepara a equipe para lidar com imprevistos, mas também promove um ambiente de aprendizado contínuo e alinhamento entre todos os envolvidos. O acompanhamento e a atualização constantes garantem que o projeto se mantenha adaptável e resiliente frente aos desafios encontrados.  

### 2.5. Critérios de Replanejamento 

O replanejamento é uma ferramenta essencial para assegurar que o projeto permaneça alinhado aos seus objetivos iniciais, mesmo diante de imprevistos ou mudanças significativas no cenário de desenvolvimento. No caso do GestFarma, os critérios estabelecidos para replanejamento têm como objetivo orientar a equipe na tomada de decisões estratégicas, garantindo a continuidade do projeto com o menor impacto possível em termos de cronograma, custos e qualidade do produto.  

Entre os principais critérios identificados estão os atrasos críticos nas entregas, que podem comprometer o andamento das atividades subsequentes. Nessas situações, a equipe realiza uma reavaliação do cronograma para redistribuir tarefas de forma equilibrada, buscando mitigar os impactos no prazo final. Além disso, mudanças nos requisitos do cliente são tratadas com especial atenção, já que alterações significativas nas funcionalidades ou nas regras de negócio exigem revisão do escopo e análise das tarefas realizadas até o momento.  

Outro ponto crítico refere-se à identificação de riscos que se concretizem durante o projeto. Quando isso ocorre, o plano de contingência previamente estabelecido é acionado, enquanto a lista de riscos é atualizada para incluir possíveis novos impactos. Da mesma forma, problemas técnicos que surgirem durante o desenvolvimento podem demandar uma revisão das ferramentas ou tecnologias utilizadas, garantindo que as soluções adotadas continuem viáveis e eficazes.  

A falta de alinhamento entre a equipe e o cliente também pode motivar o replanejamento. Divergências na comunicação ou na definição de metas são tratadas com reuniões de alinhamento, promovendo um entendimento comum sobre os objetivos e as entregas do projeto. 

Além disso, as avaliações regulares do progresso do projeto, realizadas nas revisões de sprint, permitem a identificação de gargalos ou falhas que possam comprometer o desenvolvimento. Essas avaliações resultam em ajustes no backlog e no planejamento das sprints seguintes, mantendo a adaptabilidade do projeto.  

Mudanças em legislações ou regulamentações também desempenham um papel importante no replanejamento, pois podem impactar diretamente as funcionalidades do sistema. Nesse contexto, o escopo é revisado e adequado para garantir a conformidade regulatória. Por fim, o feedback do cliente é constantemente monitorado; críticas ou insatisfações motivam revisões no produto, garantindo que as entregas estejam alinhadas às expectativas.  

O acompanhamento dos critérios de replanejamento ocorre de forma contínua, sendo reavaliado a cada ciclo de desenvolvimento. Todas as alterações realizadas são devidamente registradas no Plano do Projeto e comunicadas às partes interessadas, assegurando transparência e alinhamento entre todos os envolvidos.  

## 3. Processo de Desenvolvimento de Software

## 4. Lições Aprendidas  

### 4.1. Unidade 1  
A primeira unidade foi marcada por um aprendizado profundo sobre os fundamentos da Engenharia de Software e a importância estratégica da Engenharia de Requisitos (ER). Essa etapa trouxe uma visão ampliada sobre como abordagens e ciclos de vida podem impactar diretamente o sucesso do projeto. A equipe compreendeu que a escolha de metodologias adequadas, como os frameworks ágeis, não é apenas uma decisão técnica, mas um elemento essencial para lidar com a complexidade e a mutabilidade dos requisitos.

Outro ponto de destaque foi a descoberta da relevância de uma documentação bem estruturada e contínua. Essa prática demonstrou ser um alicerce para a comunicação eficaz entre a equipe e os stakeholders, mitigando riscos relacionados a falhas de entendimento. No contexto da ER, o levantamento inicial dos requisitos revelou a importância de técnicas que garantam clareza e rastreabilidade, fatores que foram fundamentais para alinhar as expectativas entre as partes envolvidas.

Entender as necessidades do cliente e mapear os requisitos funcionais e não funcionais não só fortaleceu a construção de um escopo robusto, mas também possibilitou a categorização e priorização das funcionalidades mais críticas para o projeto. No entanto, a equipe enfrentou desafios significativos, especialmente relacionados à escolha do ciclo de vida mais adequado e à aplicação prática das técnicas de ER. A inexperiência em traduzir as necessidades do cliente em requisitos objetivos tornou algumas decisões mais lentas e complexas.

Como resposta, a equipe decidiu intensificar o contato com os stakeholders, promovendo reuniões mais frequentes para esclarecer dúvidas e alinhar os objetivos. Além disso, a realização de capacitações sobre ferramentas e técnicas de ER, como entrevistas e prototipagem, foi reconhecida como uma estratégia essencial para superar as limitações iniciais e construir um ambiente de desenvolvimento mais eficiente.

### 4.2. Unidade 2  
A segunda unidade consolidou o aprendizado anterior e trouxe uma aplicação prática das técnicas de ER no planejamento do backlog e no desenvolvimento do projeto. A introdução de ferramentas como User Stories, critérios de aceitação (DoD) e preparação (DoR) não apenas aumentou a organização interna, mas também deu maior transparência ao processo de desenvolvimento, fortalecendo a confiança entre a equipe e o cliente.

Durante as atividades de levantamento de requisitos, foi possível observar um avanço na aplicação de técnicas como brainstorming e entrevistas direcionadas. Essas metodologias permitiram refinar as histórias de usuário e identificar as prioridades do produto com maior precisão. A construção do backlog, por sua vez, proporcionou uma visão integrada do projeto, facilitando a organização das entregas por valor agregado.

O conceito de MVP foi outro aprendizado importante, ajudando a equipe a manter o foco nas funcionalidades essenciais e a evitar a dispersão em tarefas de menor impacto. Essa abordagem também trouxe maior agilidade no processo de desenvolvimento, permitindo que o cliente obtivesse resultados tangíveis em prazos mais curtos.

No entanto, a equipe enfrentou dificuldades ao estimar o esforço necessário para as tarefas e ao priorizá-las de maneira objetiva. A falta de critérios bem definidos inicialmente gerou divergências sobre o que seria considerado uma entrega concluída, causando alguns atrasos no cronograma.

Para enfrentar esses desafios, foram adotadas ações corretivas, como a criação de critérios claros e documentados para DoR e DoD, além de reuniões de alinhamento focadas na priorização das tarefas com base em critérios objetivos. Sessões internas de capacitação sobre frameworks ágeis, também foram propostas para aprofundar o entendimento sobre metodologias que possam otimizar o fluxo de trabalho e a colaboração entre os membros da equipe. Além disso, foi perceptível a necessidade de estruturar documentos DOR e DOD em um formato mais adequado que permita o entendimento do que deve ser de fato entregue.

## 5. Referências

AGILE ALLIANCE. Agile Alliance – Advocating for Agile Development. Disponível em: https://www.agilealliance.org/. Acesso em: 13 jan. 2025.

AGILE MANIFESTO. Manifesto Ágil. 2001. Disponível em: http://www.manifestoagil.com.br/. Acesso em: 13 jan. 2025.

PROJECT MANAGEMENT INSTITUTE. PMBOK® Guide: Project Management Body of Knowledge. Disponível em: https://www.pmi.org/pmbok-guide-standards. Acesso em: 13 jan. 2025.

SCRUM.org. Home – Scrum.org. Disponível em: https://www.scrum.org/. Acesso em: 13 jan. 2025.
