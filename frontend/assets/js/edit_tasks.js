let id_chamado = null;

window.onload = () => {
    
    // Pega o id_chamado da URL
    const url = new URL(window.location.href);
    id_chamado = url.searchParams.get('id_chamado');
    
    // Obtém os dados do chamado
    fetch(`http://localhost:3000/user/chamados/get_chamado/${id_chamado}`)
    .then(response => {
        if(response.status === 200){
            return response.json();
        } else {
            console.log('ERRO!');
        }
    })
    .then(chamado => {
        document.querySelector("#text_task_text").value = chamado[0].descricao;
    })
}

document.querySelector("#btn_atualizar").addEventListener('click', () => {

    let descricao = document.querySelector("#text_task_text").value;
    let error = document.querySelector("#error");

    // Verifica se o campo de texto está vazio
    if(descricao == null || descricao == ''){
        error.textContent="Preencha o campo de texto.";
        error.classList.remove("d-none");
        return;
    }

    // Verifica se o texto tem mais de 100 caracteres
    if(descricao.length > 100) {
        error.textContent="O texto deve ter menos de 100 caracteres.";
        error.classList.remove("d-none");
        return;
    }

    // Atualiza o chamado no banco de dados
    fetch(`http://localhost:3000/user/chamados/update_chamado/`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({id_chamado, descricao})
    })
    .then(response => {
        if(response.status === 200){
            return response.json();
        }
    })

    // Redireciona para a página inicial
    window.location.href = window.location.origin + "/frontend/index.html";
})
