# GestFarma
## Regras de negócio 

## Historico de Revisão


| **Data**       | **Versão** | **Descrição**                                                     | **Autor**                                                                                      |
|----------------|------------|-------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| 11/12/2024     | 1.1        | Declaração de Problema, Posição das regras de negócio do projeto  | Davi Casseb, Fernanda Noronha, Joyce Dionizio, Karolina Barbosa, Vitor Carvalho Pereira, Yago Amin Santos |

## Introdução 

Este documento de Requisitos de Software tem como objetivo detalhar as regras de negócio que devem ser implementadas no sistema em desenvolvimento. As regras de negócio representam diretrizes, políticas e restrições específicas da organização ou do domínio de aplicação, garantindo que o sistema reflita fielmente os processos e necessidades do negócio.
A definição clara das regras de negócio assegura que o sistema automatize, padronize e otimize os processos organizacionais, atendendo aos objetivos estratégicos e operacionais.
As regras de negócio documentadas foram identificadas a partir de entrevistas realizadas com a cliente, uma profissional farmacêutica, que forneceu informações detalhadas sobre os fluxos de trabalho, normas e particularidades da área de atuação. Esse processo de levantamento permitiu captar as regras de negócio essenciais para garantir que o sistema atenda plenamente às expectativas e necessidades específicas do setor farmacêutico.


## Objetivos
Definir o escopo do projeto: Estabelecer os limites e as funcionalidades principais do sistema, garantindo clareza sobre o que será entregue.
Alinhar expectativas: Criar um entendimento comum entre todas as partes interessadas, reduzindo ambiguidades e prevenindo mal-entendidos.
Guiar o desenvolvimento: Fornecer informações detalhadas e priorizadas que orientem as etapas de design, codificação, testes e implantação.
Servir como base para validação: Proporcionar critérios claros para verificar se o sistema atende aos requisitos estabelecidos.
Promover a rastreabilidade: Permitir que mudanças nos requisitos sejam documentadas e acompanhadas ao longo do ciclo de vida do projeto.
Este documento será atualizado conforme necessário para refletir mudanças nos requisitos ou no escopo do projeto, de forma a garantir sua relevância ao longo do desenvolvimento.

## Regras de Negócio
**RN001:** Cada item do estoque deve ter um código único de identificação, descrição, lote, validade, e fabricante.

**RN002:** Medicamentos com prazo de validade inferior a 30 dias devem ser sinalizados automaticamente como "próximos a vencer".

**RN003:** Produtos vencidos não podem ser disponibilizados para dispensação e devem ser automaticamente bloqueados no sistema.

**RN004:** O sistema deve controlar a quantidade mínima e máxima para cada item e emitir alertas de reposição quando atingir o nível crítico.

**RN005:** Produtos controlados (como antibióticos e psicotrópicos) devem ter controle diferenciado e atender à legislação vigente.

**RN006:** Cada requisição de dispensação deve ser vinculada ao prontuário do paciente e autorizada por um profissional habilitado.

**RN007:** Medicamentos devem ser dispensados considerando o princípio de que o  primeiro a vencer, primeiro a sair .

**RN008:** O sistema deve registrar data, hora, responsável e quantidade de cada item dispensado.

**RN009:** Todo recebimento deve ser validado contra o pedido de compra, garantindo que tipo, quantidade, lote e validade estejam corretos.

**RN010:** Medicamentos e insumos recebidos devem ser etiquetados e incluídos no estoque imediatamente após a conferência.

**RN011:** O sistema deve permitir inventários periódicos e emitir relatórios de divergência entre o estoque físico e o registrado.

**RN012:** Itens identificados como extraviados ou danificados devem ser registrados com justificativa e ajustados no sistema.

**RN013:** O sistema deve gerar relatórios mensais de consumo por setor, paciente, e profissional responsável.

**RN014:** Indicadores como índice de vencimento, rotatividade de estoque, e custo médio devem ser disponibilizados para análise.

**RN015:** O sistema deve permitir o planejamento automático de compras com base na rotatividade de estoque e previsão de demanda.

**RN016:** Solicitações de compras devem ser aprovadas por um responsável antes de serem finalizadas.

**RN017:** O sistema deve atender às exigências da ANVISA e outras regulamentações específicas aplicáveis ao armazenamento e controle de medicamentos.

**RN018:** Todos os usuários do sistema devem ter uma conta individual com login e senha fortes, contendo no mínimo 8 caracteres, incluindo letras maiusculas, minúsculas, números e caracteres especiais.

**RN019:** O sistema deve permitir diferentes níveis de acesso, sendo definidos com base no perfil do usuário, como administrador, farmacêutico, técnico de farmácia, e auditor.

**RN020:** Usuários com permissão de acesso limitado devem visualizar apenas as informações necessárias para suas atividades.

**RN021:** Alterações em dados sensíveis, como inclusão, edição ou exclusão de medicamentos, devem ser restritas aos usuários autorizados (ex.: farmacêuticos ou administradores).

**RN022:** O sistema deve bloquear automaticamente a conta do usuário após 5 tentativas falhas consecutivas de login, com opção de desbloqueio apenas por administrador ou redefinição de senha segura.
