// app-dirty.js — Funciona, mas tem vários maus cheiros.
// 1) Variáveis globais expostas
(function() {
    var tarefas = []; 
    var proximoId = 0;
    var filtroAtual = "all"; 

    function completarTarefa(idTarefa) {
        for(var i=0; i<tarefas.length; i++){
            if(tarefas[i].id === idTarefa){
                tarefas[i].completed = !tarefas[i].completed;
                break;
            }
        }
    }

    function deletarTarefa(idTarefa) {
        for(var i=0; i<tarefas.length; i++){
            if(tarefas[i].id === idTarefa){
                tarefas.splice(i, 1);
                break;
            }
        }
    }

    function renderizarTarefas() {
        var listaTarefas = document.getElementById("list");
        listaTarefas.innerHTML = "";
        for(var i=0; i<tarefas.length; i++){
            if(filtroAtual==="all" || (filtroAtual==="1" && !tarefas[i].completed) || (filtroAtual==="2" && tarefas[i].completed)){
                var li = document.createElement("li");
                if(tarefas[i].completed){ li.className="done"; }
                var caixaSelecao = document.createElement("input"); caixaSelecao.type="checkbox"; caixaSelecao.checked=tarefas[i].completed;
                caixaSelecao.addEventListener("change", (function(id){ return function(){ 
                    completarTarefa(id);
                    renderizarTarefas();
                } })(tarefas[i].id));
                var spanTexto = document.createElement("span"); spanTexto.textContent=tarefas[i].text;
                var botaoDeletar = document.createElement("button"); botaoDeletar.textContent="x";
                botaoDeletar.addEventListener("click",(function(id){ return function(){
                    deletarTarefa(id);
                    renderizarTarefas();
                }})(tarefas[i].id));
                li.appendChild(caixaSelecao); li.appendChild(spanTexto); li.appendChild(botaoDeletar);
                listaTarefas.appendChild(li);
            }
        }
    }

    function adicionarTarefa() {
        var entradaTarefa = document.getElementById("t");
        var textoTarefa = entradaTarefa.value;
        if(textoTarefa == "" || textoTarefa == "   "){ alert("Digite algo"); return; }
        var tarefa = { id: ++proximoId, text: textoTarefa, completed: false };
        tarefas.push(tarefa);
        entradaTarefa.value = "";
        renderizarTarefas();
    }

    function vincularEventos() {
        var botaoAdicionar = document.getElementById("b");
        var botoesFiltro = document.getElementsByClassName("f");
        botaoAdicionar.onclick = function(){ adicionarTarefa(); };
        for(var i=0; i<botoesFiltro.length; i++){
            botoesFiltro[i].addEventListener("click", function(){
                filtroAtual = this.getAttribute("data-f");
                renderizarTarefas();
            });
        }
    }

    document.addEventListener("DOMContentLoaded", function(){
        vincularEventos();
        renderizarTarefas();
    });
})();
