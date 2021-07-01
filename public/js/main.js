// ^^^  variaveis ^^^
// var dificuldadeValue = $('input[type="radio"]:checked').val();
$("#nomeJogador").val("");
// elemento da caixa de texto
var campo = $("#campo-digitacao");
campo.val("");
var botaoSelect = $("#select-dificult");
var modal = $(".modal-content");
var dificuldade = $('input[type="radio"]')
let lista_de_frases_facil = [];
let lista_de_frases_medio = [];
let lista_de_frases_avancado = [];
var tempoJogo  = $("#tempo");
var running = false;
// ~~ ~ ~~ 

// funçao para embaralhar os arrays
function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}


function seleciona_dificuldade(dificuldadeV){
    if (dificuldadeV == "1"){
        //armazenar o tempo inicial 
        tempoJogo.text(2);
        tempoJogo.val(2)
        //embaralha o array especifico
        shuffle(lista_de_frases_facil);
        // console.log("tttt",lista_de_frases_facil[0]);
        // //calcula o tamanho da frase e imprime no console
        var numPalavras = lista_de_frases_facil[0].split(" ").length;
        // // pega o tamanho da frase
        var tamanhoFrase = $("#tamanho-frase");
        // // imprimindo a quantidade de palavras
        tamanhoFrase.text(numPalavras);
        // console.log(lead1)
        $(".lead").text(lista_de_frases_facil[0]);
    }
    else if (dificuldadeV == "2"){
        tempoJogo.text(20);
        tempoJogo.val(20)
        shuffle(lista_de_frases_medio)
        lead2 = lista_de_frases_medio[0];
        // //calcula o tamanho da frase e imprime no console
        var numPalavras = lista_de_frases_medio[0].split(" ").length;
        // // pega o tamanho da frase
        var tamanhoFrase = $("#tamanho-frase");
        // // imprimindo a quantidade de palavras
        tamanhoFrase.text(numPalavras);
        console.log(lista_de_frases_medio)
        $(".lead").text(lead2);
    }
    else if (dificuldadeV == "3"){
        tempoJogo.text(30);
        tempoJogo.val(30);
        shuffle(lista_de_frases_avancado)
        lead3 = lista_de_frases_avancado[0];
        // //calcula o tamanho da frase e imprime no console
        var numPalavras = lista_de_frases_avancado[0].split(" ").length;
        // // pega o tamanho da frase
        var tamanhoFrase = $("#tamanho-frase");
        // // imprimindo a quantidade de palavras
        tamanhoFrase.text(numPalavras);
        $(".lead").text(lead3);
        console.log(lead3);
    }
}

/// buscando frases do backend ///
fetch("http://localhost:3000/frases").then(function (response){
    return response.json();
})
.then(function (data){
    
    for (const frase_display of data ){
        if (frase_display.dificuldade == 1){
            lista_de_frases_facil.push(frase_display.frase);
        }else if (frase_display.dificuldade == 2){
            lista_de_frases_medio.push(frase_display.frase);
        }else{
            lista_de_frases_avancado.push(frase_display.frase);
        }

        seleciona_dificuldade()
        
    }
    
    
    console.log("lista facil",lista_de_frases_facil);
    console.log("lista medio",lista_de_frases_medio);
    console.log("lista avancado",lista_de_frases_avancado);
    var teste = lista_de_frases_facil[0];
    console.log("teste aqui",teste);


});

fetch("http://localhost:3000/jogador").then(function (response){
    return response.json();
})
.then(function (data){
    for (const jogador_display of data ){
        console.log(jogador_display)
        //$(".table").append('<tr><td>'+jogador_display.nome+'</td><td>'+jogador_display.pontuacao+'</td><td>'+jogador_display.dificuldade+'</td></tr>');
    }
    
});
// fetch("http://localhost:3000/jogadores").then(function (response){
//     return response.json();
// })
// .then(function (data){
    
//     }
// });

//abrir caixa de seleção de dificuldade
function iniciaModal(modal){
    var modalAbrir = $(modal)
    modalAbrir.addClass('mostrar');
}
//fechar
function removerModal(){
    modal.removeClass('mostrar');
}

//ao clicar em uma dificuldade
botaoSelect.on('click', () => iniciaModal(modal));

modal.on('click', removerModal)

dificuldade.on('click change', function(){
    var dificuldade_atualizada = $('input[type="radio"]:checked').val()
    
    // location.reload();
    console.log(dificuldade_atualizada);
    var nomeJogador = $("#nomeJogador").val();
    console.log(nomeJogador);
    seleciona_dificuldade(dificuldade_atualizada);
    // aparecer a parte principal do jogo
    $(".lead").css("display", "block");
    $("#principal").css("display", "block");
    $(".nome-jogador").css("display", "none");
    $(".botao-principal").css("transform", "scale(0.9)");
    $(".botao-principal").css("outline", "0");
    $(".mensagem-dificuldade").css("flex-direction", "row");
    $(".mensagem-dificuldade").css("display", "flex");
    $(".mensagem-dificuldade").css("justify-content", "center")
    $(".mensagem-dificuldade").css("align-items", "center")
    $(".mensagem-dificuldade").css("margin-top", "0")
    
    campo.attr("disabled", false);
    campo.addClass("active")
    
    
    
});
/**
 *        posso subir essa variavel?
 */

//monitora o clique do campo de digitação
campo.on("input", function () {
    comparar_palavras()
});

let palavras_sistema = $("#lead").text().split(" ");
rodar();
//funçao que inicia o tempo de digitaçao quando o usuario digita 
//algo na caixa de texto
function rodar(){
    campo.on("focus", function(){
        campo.addClass("active")
        //campo.attr("disabled", false);
        if(running == true){
            return;
        }
        //criando uma variavel para o intervalo
        var cronometro = setInterval(async function(){
            var tempoRestante = tempoJogo.text();
            //condicional para desabilitar a caixa de texto
            if (tempoRestante <= 0) {
                campo.removeClass("active")
                running = false;
                campo.attr("disabled", true);
                console.log(tempoRestante);
                //limpando o console
                clearInterval(cronometro);
                nome = $(".form-control").val()
                // let palavras_sistema = $("#lead").text().split(" ");
                palavrasDigitadas = $("#palavras-digitadas").text()
                pontuacao = `${palavrasDigitadas}/${palavras_sistema.length}`; 
                //palavrasDigitadas/tempoJogo.val() * 60
                $(".table").append('<tr><td>'+nome+'</td><td>'+pontuacao+'</td></tr>');
                $(".progress-bar").css("width", "100%");
                
                //TODO - send request
                const jogadorBody = getJogador();
                const response = await inserirJogador(jogadorBody);
                console.log(response);
            } else{
                running = true;
                tempoRestante--;
                tempoJogo.text(tempoRestante);
                porcentagem = (tempoRestante / tempoJogo.val() * 100) + "%";
                // console.log(porcentagem)
                $(".progress-bar").css("width", porcentagem);
                //decrementando o tempo
            }
            
        }, 1000);
    });
}


/// verificação de acerto de palavras
function comparar_palavras(){
    let palavras_usuario = campo.val();
    $("#caracteres-digitados").text(palavras_usuario.length);
    let palavras_sistema = $("#lead").text().split(" ");
    let palavras_resposta_usuario = palavras_usuario.split(" ");

    const palavras_certas = palavras_sistema.reduce((num, palavras_sistema, index) => {
        return num += palavras_resposta_usuario[index] == palavras_sistema ? 1 : 0;
    }, 0);

    $("#palavras-digitadas").text(palavras_certas);

};

//botao reset
function resetar(){
    //preenche a barra de progresso novamente
    $(".progress-bar").css("width", "100%");
    //desbloquear a caixa de texto
    campo.attr("disabled", false);
    //limpa a caixa
    campo.val("");
    $("#caracteres-digitados").text("0");
    $("#palavras-digitadas").text("0");
    $("#tempo").text(tempoJogo.val());
};

//ao clicar no botao de reset, volta as configuraçoes do inicio.
$(".btn-restart").on("click", resetar);
    
function getJogador(){
    var jogador = {
        nome: $("#nomeJogador").val(),
        dificuldade: $('input[type="radio"]:checked').val(),
        pontuacao: `${$("#palavras-digitadas").text()}/${palavras_sistema.length}`
    };
    return jogador;
}