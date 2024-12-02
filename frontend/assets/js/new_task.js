let id_user = null;

window.onload = () => {
  const url = new URL(window.location.href);
  id_user = url.searchParams.get('id_user');
};

document.querySelector("#btn_guardar").addEventListener('click', () => {
  let descricao = document.querySelector("#text_task_text").value;
  let error = document.querySelector("#error");

  // Verifica se o campo de texto está vazio
  if (descricao == null || descricao == '') {
    error.textContent = "Preencha o campo de texto";
    error.classList.remove("d-none");
    return;
  }

  // Verifica se o texto é muito longo
  if (descricao.length > 100) {
    error.textContent = "Texto muito longo";
    error.classList.remove("d-none");
    return;
  }

  // Envia a requisição para o backend
  fetch("http://localhost:3000/user/tasks/new_task", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ descricao, usuario_id: id_user })  // Envia descricao e usuario_id para o backend
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log("Erro na requisição:", response);
    }
  })
  .then((dados) => {
    console.log(dados);  // Exibe a resposta do backend no console
  })
  .catch((error) => {
    console.error("Erro na requisição:", error);
  });

  // Redireciona para a página de index após salvar
  window.location.href = window.location.origin + "/frontend/index.html";
});