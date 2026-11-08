from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt

path = r'C:\Users\ResTIC16\Documents\Nova pasta\E-CRFramework-EngenhariaSoftware\ECRF_RELATORIO.docx'

doc = Document()

def add_centered_line(text, size=18, bold=False):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(text)
    run.bold = bold
    run.font.size = Pt(size)

# --- Capa ---
add_centered_line('UNIVERSIDADE FEDERAL DE ALAGOAS', 18, False)
add_centered_line('CAMPUS A. C. SIMÕES', 18, False)
add_centered_line('INSTITUTO DE COMPUTAÇÃO', 18, False)
add_centered_line('CURSO DE ENGENHARIA DE COMPUTAÇÃO', 18, False)
add_centered_line('', 18, False)
add_centered_line('E-CRF: Framework de E-commerce Componentizado com Recomendações', 22, True)
add_centered_line('Guilherme Nunes Alves', 20, False)
add_centered_line('Maceió-AL', 18, False)
add_centered_line('2026', 18, False)

doc.add_page_break()

# --- Contracapa ---
add_centered_line('UNIVERSIDADE FEDERAL DE ALAGOAS', 18, False)
add_centered_line('CAMPUS A. C. SIMÕES', 18, False)
add_centered_line('INSTITUTO DE COMPUTAÇÃO', 18, False)
add_centered_line('CURSO DE ENGENHARIA DE COMPUTAÇÃO', 18, False)
add_centered_line('', 18, False)
add_centered_line('E-CRF: Framework de E-commerce Componentizado com Recomendações', 22, True)
add_centered_line('Trabalho desenvolvido na disciplina', 18, False)
add_centered_line('de Engenharia de Software do curso de', 18, False)
add_centered_line('Engenharia de Computação da', 18, False)
add_centered_line('Universidade Federal de Alagoas', 18, False)
add_centered_line('(UFAL), sob orientação do professor', 18, False)
add_centered_line('ARTURO HERNANDEZ DOMINGUEZ.', 18, True)
add_centered_line('Guilherme Nunes Alves', 20, False)
add_centered_line('Maceió-AL', 18, False)
add_centered_line('2026', 18, False)

doc.add_page_break()

# --- Conteúdo do relatório ---
content = [
    '1. Enunciado do Projeto',
    'Este projeto consiste no desenvolvimento do E-CRF, um framework para prototipação e desenvolvimento de sistemas de e-commerce. O objetivo central não é a criação de uma loja isolada, mas a criação de uma base reutilizável de componentes e serviços.',
    '',
    '2. Metodologia Ágil Utilizada',
    'A metodologia adotada foi Scrum, com ciclos de desenvolvimento em sprints, entregas incrementais e priorização de funcionalidades.',
    '',
    '3. Técnicas de Reuso de Software',
    'As principais técnicas aplicadas foram reutilização de componentes de UI, compartilhamento de estado com Context API e abstração de serviços no backend.',
    '',
    '4. Product Backlog e Sprint Backlog',
    'Product Backlog: visualização dos produtos, detalhes, recomendações, carrinho, autenticação e checkout.',
    'Sprint Backlog: estrutura inicial, catálogo, carrinho, detalhes e recomendação, autenticação e fluxo final.',
    '',
    '5. Arquitetura do Sistema',
    'O sistema foi organizado em frontend em React e backend em Node.js/Express, com separação de responsabilidades e foco em manutenção.',
    '',
    '6. Tecnologias Utilizadas',
    'Frontend: React.js, React Router, Axios, Context API. Backend: Node.js, Express.js, CORS.',
    '',
    '7. Código e Execução',
    'O código completo está disponível no GitHub: https://github.com/gu1nunes/E-CRFramework',
    '',
    '8. Referências Bibliográficas',
    'PRESSMAN, Roger S. Engenharia de Software. AMGH, 2016.',
    'SOMMERVILLE, Ian. Engenharia de Software. Pearson, 2019.',
    'MARTIN, Robert C. Clean Architecture. Pearson, 2017.'
]

for item in content:
    if item == '':
        doc.add_paragraph()
    elif item.startswith(('1. ', '2. ', '3. ', '4. ', '5. ', '6. ', '7. ', '8. ')):
        doc.add_heading(item, level=1)
    else:
        doc.add_paragraph(item)

# Save final report
# This preserves the new cover/back cover and keeps the body content afterward.
doc.save(path)
print('Arquivo atualizado:', path)
