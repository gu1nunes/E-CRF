from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt

path = r'C:\Users\ResTIC16\Documents\Nova pasta\E-CRFramework-EngenhariaSoftware\ECRF_RELATORIO.docx'

doc = Document()

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run('E-CRF: Framework de E-commerce Componentizado com Recomendações')
run.bold = True
run.font.size = Pt(24)

doc.add_paragraph('Universidade Federal de Alagoas')
doc.add_paragraph('Instituto de Computação')
doc.add_paragraph('Curso de Engenharia de Computação')
doc.add_paragraph('Guilherme Nunes Alves')
doc.add_paragraph('Maceió - AL')
doc.add_paragraph('2026')
doc.add_paragraph('')
doc.add_paragraph('Projeto apresentado como requisito parcial para a disciplina de Engenharia de Software')
doc.add_paragraph('Orientador: Prof. Arturo Hernandez Dominguez')
doc.add_paragraph('GitHub: https://github.com/gu1nunes/E-CRFramework')

doc.add_page_break()

headings = [
    ('1. Enunciado do Projeto', 'Este projeto consiste no desenvolvimento do E-CRF, um framework para prototipação e desenvolvimento de sistemas de e-commerce. O objetivo central não é a criação de uma loja isolada, mas a construção de uma base reutilizável de componentes e serviços usados em aplicações de e-commerce. O sistema foi pensado para demonstrar boa prática de engenharia de software, modularização e reutilização de ativos de software.'),
    ('2. Metodologia Ágil Utilizada', 'A metodologia adotada foi Scrum. A organização do projeto em sprints permitiu o desenvolvimento em etapas, priorizando funcionalidade e qualidade. Cada ciclo foi voltado para uma entrega incremental de valor, com revisões periódicas e ajustes de arquitetura e implementação.'),
    ('3. Técnicas de Reuso de Software', 'As principais técnicas aplicadas foram: reutilização de componentes de UI, uso de Context API para compartilhar estados entre telas, abstração de serviços no backend e organização da solução em módulos com responsabilidades específicas. Isso reduz acoplamento, facilita manutenção e permite a extensão do sistema.'),
    ('4. Desenvolvimento do Projeto Segundo a Metodologia Ágil e as Técnicas de Reuso', 'O desenvolvimento foi dividido em sprints, começando pela base do framework e evolução dos componentes. A primeira etapa focou em estrutura do projeto e UI básica. Em seguida, foram implementados catálogo, carrinho e estado global. Posteriormente, o sistema incluiu detalhes do produto, recomendações e simulação de checkout. A última etapa consolidou a experiência do usuário e a documentação acadêmica.'),
    ('5. Product Backlog', 'Como cliente, desejo visualizar os produtos disponíveis.\nComo cliente, desejo acessar os detalhes de um produto.\nComo cliente, desejo receber recomendações.\nComo cliente, desejo adicionar itens ao carrinho.\nComo cliente, desejo alterar quantidades e remover itens.\nComo cliente, desejo simular login e logout.\nComo cliente, desejo finalizar a compra.'),
    ('6. Sprint Backlog', 'Sprint 1: estrutura do projeto e componentes iniciais.\nSprint 2: catálogo e carrinho.\nSprint 3: detalhes do produto e recomendações.\nSprint 4: autenticação, checkout e refinamento final.'),
    ('7. Arquitetura do Sistema', 'O sistema foi organizado em duas camadas principais: frontend em React e backend em Node.js/Express. Essa separação reforça a ideia de manutenção, desacoplamento e possibilidade de evolução. O frontend é responsável pela interface e pelo estado de tela; o backend oferece serviços e dados de forma estruturada.'),
    ('8. API Gateway e Serviços', 'O projeto foi documentado em uma visão orientada a serviços, com foco em API Gateway como ponto de entrada unificado para a comunicação entre cliente e serviços. Os serviços podem ser organizados em catálogo, carrinho, autenticação, recomendações e pedidos, mantendo o sistema escalável e bem modularizado.'),
    ('9. Tecnologias Utilizadas', 'Frontend: React.js, React Router, Axios, Context API.\nBackend: Node.js, Express.js, CORS, JSON como base de dados acadêmica.\nArquitetura: modular, com separação de responsabilidades e foco em reutilização de componentes.'),
    ('10. Funcionamento do Sistema', 'O usuário acessa a página inicial, visualiza os produtos, escolhe itens, adiciona ao carrinho, altera quantidades, recebe recomendações e finaliza a compra. O fluxo foi desenhado para demonstrar uso consistente de componentes, lógica compartilhada e organização de software.'),
    ('11. Código e Execução', 'O código completo está disponível no GitHub: https://github.com/gu1nunes/E-CRFramework. Para executar localmente, basta iniciar o backend e o frontend em terminais separados, conforme a documentação do projeto.'),
    ('12. Referências Bibliográficas', 'PRESSMAN, Roger S. Engenharia de Software: uma abordagem profissional. AMGH, 2016.\nSOMMERVILLE, Ian. Engenharia de Software. Pearson, 2019.\nMARTIN, Robert C. Clean Architecture. Pearson, 2017.'),
    ('Conclusão', 'O E-CRF foi adaptado para a disciplina de Engenharia de Software como um estudo prático de organização, modularização e reutilização de software. O projeto demonstra que soluções de e-commerce podem ser construídas de forma mais enxuta, sustentável e preparada para manutenção e futura evolução.')
]

for title, text in headings:
    doc.add_heading(title, level=1)
    for line in text.split('\n'):
        if line.strip():
            doc.add_paragraph(line)

doc.save(path)
print('OK:', path)
