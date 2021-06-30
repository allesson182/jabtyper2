var dificuldadeValue = $('input[type="radio"]:checked').val();
var botaoSelect = $("#select-dificult");
var modal = $(".modal-content");
var dificuldade = $('input[type="radio"]')
let lista_de_frases_facil = [];
let lista_de_frases_medio = [];
let lista_de_frases_avancado = [];

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
console.log(dificuldadeValue)

function seleciona_dificuldade(dificuldadeV){
    if (dificuldadeV == "1"){
        //armazenar o tempo inicial 
        tempoJogo.text(15);
        tempoJogo.val(15)
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


   
    // pegando o elemento que imprime o tempo
    
    
   
    
function iniciaModal(modal){
    var modalAbrir = $(modal)
    modalAbrir.addClass('mostrar');
    //zerar o value
    //
    //sempre resetar os valore
}
//fechar
function removerModal(){
    modal.removeClass('mostrar');
}
// elemento da caixa de texto
var campo = $("#campo-digitacao");

botaoSelect.on('click', () => iniciaModal(modal));
modal.on('click', removerModal)
dificuldade.on('click change', function(){
    var dificuldade_atualizada = $('input[type="radio"]:checked').val()
    // location.reload();
    console.log(dificuldadeValue);
    seleciona_dificuldade(dificuldade_atualizada);
    campo.attr("disabled", false);
    campo.addClass("active")
    
    
    // $(".lead").css("display", "block");
    // $("#principal").css("display", "block");
    // $(".nome-jogador").css("display", "none");
    // $(".botao-principal").css("transform", "scale(0.9)");
    // $(".botao-principal").css("outline", "0");
    // $(".mensagem-dificuldade").css("display", "flex");
    // $(".mensagem-dificuldade").css("justify-content", "center")
    // $(".mensagem-dificuldade").css("align-items", "center")
    // $(".mensagem-dificuldade").css("margin-top", "0")
    
    
    
    
});

var tempoJogo  = $("#tempo");








//monitora o clique do campo de digitação

campo.on("input", function () {
    comparar_palavras()
    // //pega o que tem dentro do campo de texto
    // var frase = campo.val();
    // //conta a quantidade de caracteres da frase digitada
    // var nCaracteresDigitados = frase.length;
    // //mostra a quantidade na tela
    // $("#caracteres-digitados").text(nCaracteresDigitados);
    
    // //quebra a frase em palavras e conta as palavras
    // var nPalavrasDigitadas = frase.split(" ").length;
    // //exibe a quantidade de palavras na tela
    // $("#palavras-digitadas").text(nPalavrasDigitadas);
    // //imprimir em cima também
});

//cronometrando o tempo
//quando clicar apenas uma vez na caixa
var running = false;
rodar();
function rodar(){
    campo.on("focus", function(){
        campo.addClass("active")
        //campo.attr("disabled", false);
        if(running == true){
            return;
        }
        //criando uma variavel para o intervalo
        var cronometro = setInterval(function(){
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
                let palavras_sistema = $("#lead").text().split(" ");
                palavrasDigitadas = $("#palavras-digitadas").text()
                pontuacao = `${palavrasDigitadas}/${palavras_sistema.length}`; 
                //palavrasDigitadas/tempoJogo.val() * 60
                $(".table").append('<tr><td>'+nome+'</td><td>'+pontuacao+'</td></tr>');
                $(".progress-bar").css("width", "100%");
            } else{
                running = true;
                tempoRestante--;
                tempoJogo.text(tempoRestante);
                porcentagem = (tempoRestante / tempoJogo.val() * 100) + "%";
                console.log(porcentagem)
                $(".progress-bar").css("width", porcentagem);
                //decrementando o tempo
                
                
            }
            
        }, 1000);
    });
}
function comparar_palavras(){
    let palavras_usuario = campo.val();
    $("#caracteres-digitados").text(palavras_usuario.length);
    let palavras_sistema = $("#lead").text().split(" ");
    let palavras_resposta_usuario = palavras_usuario.split(" ");

    const palavras_certas = palavras_sistema.reduce((num, palavras_sistema, index) => {
        return num += palavras_resposta_usuario[index] == palavras_sistema ? 1 : 0;
    }, 0);

    $("#palavras-digitadas").text(palavras_certas);

}
//botao reset
$(".btn-restart").on("click", function(){
    //desbloquear a caixa de texto
    $(".progress-bar").css("width", "100%");
    campo.attr("disabled", false);
    //limpa a caixa
    campo.val("");
    $("#caracteres-digitados").text("0");
    $("#palavras-digitadas").text("0");
    $("#tempo").text(tempoJogo.val());
    
    //dificuldade.val() = ""
   
});

    
    // async function exec() {
    //     const frases = await getFrases();
    //     console.log("frases",frases);
        
    // }exec();
    // (async () => {
    // const dao = require('./JogadorDao')
    // console.log("foi")
    // console.log('pesquisa no DB');
    // const frases = await dao.getFrases();
    // console.log(frases);
    // })();
    
    //para embararalhar as frases dentro do array
     // minhasFrases = [
    //     "Há duas formas de construir um projeto de software: Uma maneira de fazer isso deve ser tão simples que, obviamente, não deixem deficiências, e a outra forma é a de torná-lo tão complicado que não percebam as evidentes deficiências. O primeiro método é muito mais difícil" ,
    //     "Faça como um programador. Quando tudo está errado e confuso, apague tudo e recomece do zero.",
    //     "Ser desenvolvedor é uma viagem onde a próxima parada é a solução de um problema.",
    //     "Eu sempre quis que o meu computador fosse tão fácil de usar como o meu telefone, o meu desejo foi realizado pois eu já não consigo descobrir como usar o meu telefone.",
    //     "Aproveite enquanto vive como programador no planeta, pois a tecnologia avança de uma forma gradativamente nos transformando em um ser burro.",
    //     "Os primeiros 90% do código representam os primeiros 10% do tempo de desenvolvimento. Os 10% restantes do código é para mostrar aos outros os 90% do tempo de desenvolvimento. ",
    //     "Só existem dois tipos de pessoas no mundo: as que entendem código binário e as que não entendem."
    // ]
    // chamando a função
pontuacao = `${palavrasDigitadas}/${palavras_sistema.length}`; 
module.exports(pontuacao);    