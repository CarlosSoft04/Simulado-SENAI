window.onload = () => {
    get_username(1); // Chama a função para pegar o usuário com ID 1
}

function get_username(id) {
    fetch(`http://localhost:3000/user/${id}`)
    .then(response => {
        if (response.status === 200) {
            return response.json(); // Retorna a resposta como JSON
        } else {
            console.log('ERROR: Usuário não encontrado ou erro na requisição');
        }
    })
    .then(dados => {
        if (!dados || !dados.username) {
            console.log('Erro: Dados ou username não encontrados');
        } else {
            // Preenche o elemento com id "username" com o nome do usuário
            document.querySelector("#username").textContent = dados.username;
        }
    })
    .catch(error => {
        console.log('Erro ao realizar a requisição:', error);
    });
}
