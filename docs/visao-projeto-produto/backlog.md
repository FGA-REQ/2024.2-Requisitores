## Backlog do SOftware Gerenciador de Estoque de Farmácia Hospitalar da FAB (Gest Farma)

### 1. Visão Geral do Produto

#### 1.1. Problema
O controle e a gestão de medicamentos representam um dos principais desafios na área farmacêutica, dado que cada tipo de fármaco exige condições específicas de armazenamento, administração dentro do prazo de validade e alinhamento com as necessidades individuais de cada paciente. No contexto da Força Aérea Brasileira (FAB), esses desafios são acentuados, podendo impactar diretamente a eficiência operacional e a segurança no uso dos medicamentos. Os principais problemas identificados incluem:

1. **Validade dos Medicamentos:** Ausência de um controle eficaz que identifique e alerte sobre medicamentos próximos ao vencimento, resultando em desperdício de recursos e potenciais riscos à saúde.

2. **Restrição de Medicamentos:** Falta de ferramentas que permitam a verificação ágil de restrições, como lotes destinados a usos específicos, limitações regulamentares ou requisitos especiais de armazenamento.

3. **Falta de Centralização das Informações:** Os dados sobre os estoques encontram-se dispersos em diferentes sistemas ou registros manuais, dificultando consultas e decisões rápidas.

4. **Erro Humano:** Dependência de processos manuais, suscetíveis a erros de registro, perda de dados ou interpretações equivocadas das informações.

#### 1.2. Objetivo do Produto
O produto tem como objetivo oferecer um sistema eficiente e confiável para a gestão de estoques de produtos farmacêuticos, atendendo às demandas do HFAB. A solução buscará:

- Otimizar o controle de entrada e saída de medicamentos;
- Minimizar desperdícios e custos operacionais;
- Garantir a rastreabilidade de lotes e prazos de validade;
- Fornecer funcionalidades que auxiliem no planejamento estratégico e na tomada de decisões gerenciais.

#### 1.3. Tecnologias a Serem Utilizadas
Para o desenvolvimento do referido produto, será implementada uma solução web, considerando sua elevada acessibilidade para o usuário final. Nesse contexto, a tecnologia escolhida para o front-end é o React, uma vez que a equipe já possui familiaridade com essa ferramenta, o que permitirá um desenvolvimento mais ágil e eficiente. Para o back-end, optou-se pelo uso do Node.js, decisão fundamentada na possibilidade de manter a uniformidade da linguagem de programação em todo o sistema. Por fim, o banco de dados selecionado será o SQLite, pois apresenta uma estrutura que atende aos requisitos da solução proposta.

---

### 2. Backlog Estruturado

#### Épico 1: Gestão de Estoque
**Objetivo:** Controlar o estoque de medicamentos, insumos e materiais hospitalares.  
**Benefício:** Reduzir desperdícios e garantir disponibilidade.

##### Features:
1. **Cadastro de Produtos**  
   - Permitir o cadastro detalhado de medicamentos e insumos com dados como lote, validade e fabricante.

2. **Controle de Entrada e Saída**  
   - Registrar entradas e saídas de medicamentos, vinculando a pacientes ou setores.

3. **Monitoramento de Validade**  
   - Alertar para produtos próximos da data de validade.

4. **Relatórios de Estoque**  
   - Gerar relatórios para análise de consumo e necessidade de reposição.

##### User Stories:
1. **Cadastro de Produtos**  
   - *Como farmacêutico*, quero cadastrar novos medicamentos para manter o estoque atualizado.  
   - Critérios de Aceitação: Deve incluir campos para nome, lote, validade, fabricante e quantidade inicial.

2. **Registro de Entrada de Medicamentos**  
   - *Como estoquista*, quero registrar a entrada de medicamentos para atualizar o estoque.  
   - Critérios de Aceitação: Deve permitir o registro de fornecedor, data e quantidade recebida.

3. **Alerta de Validade**  
   - *Como gestor de estoque*, quero ser notificado sobre medicamentos que vencerão em 30 dias para evitar perdas.  
   - Critérios de Aceitação: Alertas exibidos no dashboard e enviados por e-mail.

---

#### Épico 2: Integração com Sistemas Hospitalares  
**Objetivo:** Facilitar o fluxo de informações entre a farmácia e outros setores.  
**Benefício:** Agilizar processos e reduzir erros.

##### Features:
1. **Integração com o Sistema de Prescrição Médica**  
   - Sincronizar informações de medicamentos prescritos com o estoque.

2. **Histórico de Pacientes**  
   - Vincular medicamentos retirados ao prontuário do paciente.

##### User Stories:
1. **Consulta de Prescrição**  
   - *Como farmacêutico*, quero visualizar prescrições médicas diretamente no sistema para agilizar o atendimento.  
   - Critérios de Aceitação: Exibir lista de prescrições com nome do paciente, medicamentos e doses.

2. **Registro de Retirada por Paciente**  
   - *Como enfermeiro*, quero registrar a retirada de medicamentos para associá-los ao paciente.  
   - Critérios de Aceitação: Permitir busca por nome do paciente e registrar data/hora da retirada.

---

#### Épico 3: Controle de Reabastecimento Automático  
**Objetivo:** Automatizar a reposição de estoque para evitar falta de medicamentos.  
**Benefício:** Reduzir o risco de desabastecimento.

##### Features:
1. **Definição de Níveis Mínimos e Máximos**  
   - Configurar limites de estoque para cada produto.

2. **Requisição Automática de Reposição**  
   - Gerar pedidos automáticos para fornecedores ao atingir o nível mínimo.

##### User Stories:
1. **Configuração de Limites**  
   - *Como gestor de estoque*, quero definir níveis mínimos e máximos de medicamentos para cada item.  
   - Critérios de Aceitação: Exibir notificações quando o estoque atingir o nível mínimo.

2. **Geração Automática de Pedidos**  
   - *Como gestor de compras*, quero que o sistema envie automaticamente uma solicitação ao fornecedor quando o nível mínimo for atingido.  
   - Critérios de Aceitação: Gerar pedido com itens, quantidades e fornecedor correspondente.

## Histórico de versão

| Versão | Data       | Descrição                             | Autor(es)                                       | Revisor(es)             |
| ------ | ---------- | ------------------------------------- | ----------------------------------------------- | ----------------------- |
| `1.0`  | 14/01/2025 | Criação do documento                  | [Davi Casseb](https://github.com/dcasseb) | Joyce Dionizio, Fernanda Noronha |
