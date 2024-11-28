# LISTA DE TAREFAS

# BASE DE DADOS
    usuarios
    id_usuario int primary key auto_increment not null,
    nome varchar(50) not null,
    email varchar(100) not null unique


    create table chamados
    id_chamados int primary key auto_increment not null,
    descricao text not null,
    setor varchar(20) not null,
    prioridade enum('baixa','media','alta'),
    data_cadastro datetime default current_timestamp,
    status enum('a fazer','fazendo','pronto') not  null default 'a fazer',
    usuario_id int not null,
    foreign key(usuario_id) references usuarios(id_usuario)


# PASSO A PASSO ESTRTURA DO PROJETO
    1.estrutura inicial
    - base de front end(html, css, bootstrap)
    - base do backend(node, express,mysql) com resposta padrao

# FRONTEND
    - seguindo requisito do sistema, teremos paginas necessarias para navegacao na nossa app.
    - testes de comunicacao entre front e backend - AJAX(xmlhttprequest / fetch API)

    APOS TELA DE LOGIN
      -VER TAREFAS
        > titulo
        > filtro para escolher que tarefas quer ver
        > botao para add tarefa
        > caixa para tarefa(possibilidade de alterar o status, editar tarefa e eliminar tarefa)
    
      -ADICIONAR CHAMADOS
        input: text com o texto dos chamados
        botao para cancelar o chamado
        botao para submeter os chamados

       -EDITAR CHAMADOS
         input text paa editar o texto da tarefa
         botao para cancelar alteracao
         botao para submter a alteracao

    (ELIMINAR SERA FEITO COM UMA MODEL)



# BACKEND

    -Criar um servidor nodejs + express + mysql
    -Criar um endpoint inicalpara testar conmunicacoes

    (Eliminar sera feito com uma model)