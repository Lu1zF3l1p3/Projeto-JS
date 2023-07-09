const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const {v4: uuidv4} = require("uuid");

app.use(express.json());
app.use(express.static(path.join(__dirname,"static")));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/html/index.html");
})

app.get("/partidas", (req,res) => {
    res.sendFile(__dirname + "/partidas.json");
})

app.get("/novaPartida", (req,res) => {
    res.sendFile(__dirname + "/html/novaPartida.html")
})

app.post("/novaPartida", (req,res) => {
    let titulo = req.body.titulo;
    let local = req.body.local;
    let data = req.body.data;
    let partida = {
        id:uuidv4(),
        titulo,
        local,
        data,
        jogadores:[]
    }
    let partidas;
    fs.readFile("partidas.json",(err,content) => {
        if(!err){
            partidas = JSON.parse(content);
            partidas.partidas.push(partida);
            fs.writeFile("partidas.json",JSON.stringify(partidas),(err) => {
                if(err){
                    console.error(err);
                }
            })
        }
    })
    res.redirect("/");
})

app.get("/novoJogador/:id?", (req,res) => {
    res.sendFile(__dirname + "/html/novoJogador.html");
})

app.post("/novojogador/:id?", (req,res) => {
    let nome = req.body.nome;
    let contato = req.body.contato;
    let jogar = Boolean(req.body.jogar);
    let id = req.body.id;
    let jogador = {
        id:uuidv4(),
        nome,
        contato,
        jogar
    }
    let partidas;
    fs.readFile("partidas.json",(err,content) => {
        if(!err){
            partidas = JSON.parse(content);
            partidas.partidas.forEach(partida => {
                if(partida.id === id){
                    partida.jogadores.push(jogador);
                }
            })
            fs.writeFile("partidas.json",JSON.stringify(partidas),(err) => {
                if(err){
                    console.error(err);
                }
            })
        }
    })
    res.redirect(`/novoJogador?id=${id}`);  
})

app.post("/excluirPartida", (req,res) => {
    let id = req.body.id;
    let partidas;
    let novas_partidas = [];
    fs.readFile("partidas.json",(err,content) => {
        if(!err){
            partidas = JSON.parse(content);
            partidas.partidas.forEach(partida => {
                if(partida.id !== id){
                    novas_partidas.push(partida);
                }
            })
            partidas.partidas = novas_partidas;
            fs.writeFile("partidas.json",JSON.stringify(partidas),(err) => {
                if(err){
                    console.error(err);
                }
            })
        }
    })
    res.redirect("/");
})

app.post("/excluirJogador", (req,res) => {
    let idPartida = req.body.idPartida;
    let idJogador = req.body.idJogador;
    let partidas;
    let novos_jogadores = [];
    fs.readFile("partidas.json",(err,content) => {
        if(!err){
            partidas = JSON.parse(content);
            partidas.partidas.forEach(partida => {
                if(partida.id === idPartida){
                    partida.jogadores.forEach(jogador => {
                        if(jogador.id !== idJogador){
                            novos_jogadores.push(jogador);
                        }
                    })
                    partida.jogadores = novos_jogadores;
                }
            })
            fs.writeFile("partidas.json",JSON.stringify(partidas),(err) => {
                if(err){
                    console.error(err);
                }
            })
        }
    })
    res.redirect(`/novoJogador?id=${idPartida}`);
})

app.post("/setjogador", (req,res) => {
    let idPartida = req.body.partidaJogar;
    let idJogador = req.body.IDjogar;
    let jogar = Boolean(req.body.jogar);
    let partidas;
    fs.readFile("partidas.json",(err,content) => {
        if(!err){
            partidas = JSON.parse(content);
            partidas.partidas.forEach(partida => {
                if(partida.id === idPartida){
                    partida.jogadores.forEach(jogador => {
                        if(jogador.id === idJogador){
                            jogador.jogar = jogar;
                        }
                    })
                }
            })
            fs.writeFile("partidas.json",JSON.stringify(partidas),(err) => {
                if(err){
                    console.error(err);
                }
            })
        }
    })
    res.redirect(`/novoJogador?id=${idPartida}`);
})

app.listen(8090,() => {
    console.log("Servidor rodando na url http://localhost:8090");
})