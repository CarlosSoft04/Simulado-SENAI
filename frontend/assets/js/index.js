// javascript do index.html

let id = 1

window.onload = () => {
    
    get_username(id);
    get_user_tasks(id);
}

// ---------------------------------------------------
function get_username(id){

    fetch(`http://localhost:3000/user/${id}`)
    .then(response => {
        if(response.status === 200){
            return response.json();
        } else {
            console.log('ERRO!');
        }
    })
    .then(dados => {
        if(dados.length === 0){
            console.log('Erro!');
        } else {
            document.querySelector("#username").textContent = dados[0].username;
        }
    })

}

// ---------------------------------------------------
function get_user_tasks(id){

    fetch(`http://localhost:3000/user/${id}/tasks`)
    .then(response => {
        if(response.status === 200){
            return response.json();
        } else {
            console.log('ERRO!');
        }
    })
    .then(dados => {
        if(dados.length === 0){
            document.querySelector("#no_tasks").classList.remove("d-none");
        } else {
            console.log(dados);
        }
    })

}
