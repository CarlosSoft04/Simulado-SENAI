// Corrigindo o frontend para verificar corretamente o status
let id = 1;

window.onload = () => {
  get_nome(id);
  get_user_tasks(id);
};

// ---------------------------------------------------
// Função para pegar o nome do usuário
function get_nome(id) {
  fetch(`http://localhost:3000/user/${id}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.log("ERRO!");
      }
    })
    .then((dados) => {
      if (dados.length === 0) {
        console.log("Erro!");
      } else {
        document.querySelector("#nome").textContent = dados[0].nome;
      }
    });
}

// ---------------------------------------------------
// Função para pegar as tarefas do usuário
function get_user_tasks(id) {
  fetch(`http://localhost:3000/user/${id}/tasks`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.log("ERRO!");
      }
    })
    .then((chamados) => {
      if (chamados.length === 0) {
        document.querySelector("#no_tasks").classList.remove("d-none");
        document.querySelector("#total_tasks").classList.add("d-none");
      } else {
        document.querySelector('#tasks_container').innerHTML = null;
       
        chamados.forEach((chamado) => {
          let html = `
                <div class="col-12 border border-secondary rounded p-3 shadow">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <div class="d-flex align-items-center">
                                <h5 class="me-3 text-info"><i class="fa-solid fa-circle-chevron-right"></i></h5>
                                <h5>${chamado.descricao}</h5>
                            </div>
                        </div>
                        <div class="col-2">
                            <select id="task_status" class="form-select p-2">
                                <option value="a fazer" ${chamado.status == 'a fazer' ? 'selected' : ''}>a fazer</option>
                                <option value="fazendo" ${chamado.status == 'fazendo' ? 'selected' : ''}>fazendo</option>
                                <option value="cancelada" ${chamado.status == 'cancelada' ? 'selected' : ''}>cancelada</option>
                                <option value="pronto" ${chamado.status == 'pronto' ? 'selected' : ''}>pronto</option>
                            </select>
                        </div>
                        <div class="col-1 text-end "><span class = "bg-white" ><i class="fa-regular fa-pen-to-square me-2"></i>Edit</span></div>
                        <div class="col-1 text-end text-danger"><i class="fa-regular fa-trash-can me-2"></i>Delete</div>
                    </div>
                </div>
            </div>`;

          let new_task = document.createElement("div");
          new_task.classList.add("row", "mb-3");

          new_task.innerHTML = html;
          document.querySelector("#tasks_container").appendChild(new_task);
        });
        document.querySelector("#no_tasks").classList.add("d-none");
        document.querySelector("#total_tasks").classList.remove("d-none");
        document.querySelector("#total_tasks > div > h4 > span").textContent = chamados.length;
      }
    });
}
