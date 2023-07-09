window.addEventListener("load",() => {
    let tabela = document.querySelector("table");
    fetch("/partidas").then((response) => {
        response.json().then((partidas) => {
            partidas.partidas.forEach(partida => {
                let tr = document.createElement("tr");
                let titulo = document.createElement("td");
                let local = document.createElement("td");
                let data = document.createElement("td");
                let excluir = document.createElement("button");
                let presenca = document.createElement("button");
                let form_presenca = document.createElement("form");
                let form_excluir = document.createElement("form");
                let td_presenca = document.createElement("td");
                let td_excluir = document.createElement("td");
                let input_presenca = document.createElement("input");
                let input_excluir = document.createElement("input");

                input_presenca.value = partida.id;
                input_excluir.value = partida.id;
                titulo.textContent = partida.titulo;
                local.textContent = partida.local;
                data.textContent = partida.data;
                presenca.type = "submit";
                excluir.type = "submit";
                presenca.textContent = "Presença";
                excluir.textContent = "Excluir";
                form_presenca.action = "/novoJogador";
                form_excluir.action = "/excluirPartida";
                form_excluir.method = "post";
                input_presenca.name = "id";
                input_excluir.name = "id";
                input_presenca.type = "hidden";
                input_excluir.type = "hidden";
                excluir.className = "botaoExcluir";

                form_presenca.appendChild(input_presenca);
                form_excluir.appendChild(input_excluir);
                form_presenca.appendChild(presenca);
                form_excluir.appendChild(excluir);
                td_presenca.appendChild(form_presenca);
                td_excluir.appendChild(form_excluir);

                tr.appendChild(titulo);
                tr.appendChild(local);
                tr.appendChild(data);
                tr.appendChild(td_presenca);
                tr.appendChild(td_excluir);
                tabela.appendChild(tr);

                //criar evento do botao excluir
            })
        })
    })
})