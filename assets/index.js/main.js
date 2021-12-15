const inputTarefa=document.querySelector('.input-tarefa');
const btnTarefa=document.querySelector('.btn-tarefa');
const tarefas=document.querySelector('.tarefas');

function criaLi() {
  const li=document.createElement('li');
  return li;
}

inputTarefa.addEventListener('keypress', function(e){
if (e.keyCode===13) {
  if (!inputTarefa.value) return;
 criaTarefa(inputTarefa.value);
}
})

function limpaImput() {
  inputTarefa.value= '';
  inputTarefa.focus();
}

function criaBotaoApagar(li) {
  li.innerHTML += ' ';
  const botaoApagar= document.createElement('button');
  botaoApagar.innerText= 'Apagar';
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('title', 'Apagar esta tarefa');
  li.appendChild(botaoApagar);
}


function criaTarefa(textoInput) {
  const li= criaLi();
  li.innerHTML= textoInput;
  tarefas.appendChild(li);
  limpaImput();
  criaBotaoApagar(li);
  salvarTarefas();
 
}

btnTarefa.addEventListener('click', function(e){
  if (!inputTarefa.value) return;
 criaTarefa(inputTarefa.value);
})

document.addEventListener('click', function(e){
const el = e.target;

if (el.classList.contains('apagar')) {
 el.parentElement.remove();
 salvarTarefas();
}
  });

  function salvarTarefas() {
    const liTarefas= tarefas.querySelectorAll('li');
    const listaDeTarefas= [];

    for (let tarefa of liTarefas){
      let tarefaTexto = tarefa.innerText;
      tarefaTexto = tarefaTexto.replace('Apagar', '');
      listaDeTarefas.push(tarefaTexto);

    }
    const tarefasJSON = JSON.stringify(listaDeTarefas); // converteu as tarefas de array para string
    localStorage.setItem('tarefas', tarefasJSON);

  }

  function adicionaTarefasSalvas() {
    const tarefas= localStorage.getItem('tarefas');
    const listaDeTarefas= JSON.parse(tarefas); //converte as tarefas strings de volta para um array
    
    for (let tarefa of listaDeTarefas) {
      criaTarefa(tarefa);
    }
  }
  adicionaTarefasSalvas();
