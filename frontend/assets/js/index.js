let id = 1; // Defina o id do usuário conforme necessário

let colors = [
  {
    task_status: "a fazer",
    select_bg_color: "bg-white",
  },
  {
    task_status: "fazendo",
    select_bg_color: "bg-info",
  },
  {
    task_status: "cancelada",
    select_bg_color: "bg-danger",
  },
  {
    task_status: "pronto",
    select_bg_color: "bg-success",
  },
];

window.onload = () => {
  get_nome(id);
  get_user_tasks(id);
};

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
        document.querySelector("#tasks_container").innerHTML = null;

        chamados.forEach((chamado) => {
          let color = colors.find((item) => item.task_status == chamado.status);
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
                            <select id="task_status_${chamado.id_chamados}" onchange="change_task_status(${chamado.id_chamados})" class="form-select p-2 ${color.select_bg_color}">
                                <option value="a fazer" ${chamado.status == "a fazer" ? "selected" : ""}>a fazer</option>
                                <option value="fazendo" ${chamado.status == "fazendo" ? "selected" : ""}>fazendo</option>
                                <option value="cancelada" ${chamado.status == "cancelada" ? "selected" : ""}>cancelada</option>
                                <option value="pronto" ${chamado.status == "pronto" ? "selected" : ""}>pronto</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;

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

// Função para alterar o status da tarefa
function change_task_status(id_chamados) {
  let status = document.querySelector("#task_status_" + id_chamados).value;

  fetch(`http://localhost:3000/user/tasks/update_status`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_chamados, status }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((dados) => {
      console.log(dados);
    });

  let color_obj = colors.find((e) => e.task_status == status);
  let select = document.querySelector(`#task_status_${id_chamados}`);
  let colors_temp = colors.map((c) => c.select_bg_color);
  select.classList.remove(...colors_temp);
  select.classList.add(color_obj.select_bg_color);
}

document.querySelector("#btn_new_task").addEventListener("click", () => {
  const url = window.location.origin + "/frontend/new_task.html?id_user=" + id;
  window.location.href = url;
});