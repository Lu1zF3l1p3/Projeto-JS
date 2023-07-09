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
                        let tr = document.createElement("tr");
                        let nome = document.createElement("td");
                        let contato = document.createElement("td");
                        let jogar = document.createElement("input");
                        let excluir = document.createElement("button");
                        let input_jogador = document.createElement("input");
                        let input_excluir = document.createElement("input");
                        let form_excluir = document.createElement("form");
                        let td_excluir = document.createElement("td");
                        let form_jogar = document.createElement("form");
                        let input_partidaJogar = document.createElement("input");
                        let button_jogar = document.createElement("button");
                        let input_IDjogar = document.createElement("input");
                        let td_jogar = document.createElement("td");

                        form_jogar.action = "/setJogador";
                        form_jogar.method = "post";
                        input_IDjogar.name = "IDjogar";
                        input_IDjogar.type = "hidden";
                        input_partidaJogar.name = "partidaJogar";
                        input_partidaJogar.type = "hidden";
                        button_jogar.type = "submit";
                        button_jogar.style.opacity = 0;
                        input_IDjogar.value = jogador.id;
                        input_partidaJogar.value = id;
                        jogar.type = "checkbox";
                        jogar.checked = jogador.jogar;
                        jogar.name = "jogar";
                        excluir.className = "botaoExcluir";

                        input_jogador.type = "hidden";
                        input_excluir.type = "hidden";
                        input_jogador.name = "idJogador";
                        input_excluir.name = "idPartida";
                        input_jogador.value = jogador.id;
                        input_excluir.value = id;
                        excluir.type = "submit";
                        form_excluir.action = "/excluirJogador";
                        form_excluir.method = "post";
                        excluir.textContent = "Excluir";

                        nome.textContent = jogador.nome;
                        contato.textContent = jogador.contato;
                      
                        form_excluir.appendChild(input_jogador);
                        form_excluir.appendChild(input_excluir);
                        form_excluir.appendChild(excluir);
                        td_excluir.appendChild(form_excluir);

                        form_jogar.appendChild(input_IDjogar);
                        form_jogar.appendChild(input_partidaJogar);
                        jogar.appendChild(button_jogar);
                        form_jogar.appendChild(jogar);
                        td_jogar.appendChild(form_jogar);

                        tr.appendChild(nome);  
                        tr.appendChild(contato);
                        tr.appendChild(td_jogar);
                        tr.appendChild(td_excluir);

                        tabela.appendChild(tr);

                        jogar.addEventListener("click",() => {
                            jogador.jogar = jogar.checked;
                            button_jogar.click();
                        })
                    })
                }
                //criar evento do botao
            })
        })
    })
})