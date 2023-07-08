window.addEventListener("load",() => {
    let urlparam = new URLSearchParams(window.location.search);
    let id = urlparam.get("id");
    let tabela = document.querySelector("table");
    let form = document.querySelector("form");
    let input_id = document.createElement("input");
    input_id.type = "hidden";
    input_id.value = id;
    input_id.name = "id";
    form.appendChild(input_id);

    fetch("/partidas").then((response) => {
        response.json().then((partidas) => {
            partidas.partidas.forEach(partida => {
                if(partida.id === id){
                    partida.jogadores.forEach(jogador => {
                        console.log(jogador);
                        let tr = document.createElement("tr");
                        let nome = document.createElement("td");
                        let contato = document.createElement("td");
                        let jogar = document.createElement("input");
                        let excluir = document.createElement("button");

                        nome.textContent = jogador.nome;
                        contato.textContent = jogador.contato;
                        jogar.type = "checkbox";
                        jogar.checked = jogador.jogar;
                        excluir.textContent = "Excluir";
                       
                        tr.appendChild(nome);  
                        tr.appendChild(contato);
                        tr.appendChild(jogar);
                        tr.appendChild(excluir);

                        tabela.appendChild(tr);
                    });
                }
                //criar evento do botao
            })
        })
    })
})