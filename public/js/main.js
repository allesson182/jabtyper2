function exec() {
    const frases = await getFrases();
    console.log("frases",frases);
}
exec();


// (async () => {
// const dao = require('./JogadorDao')
// console.log("foi")
// console.log('pesquisa no DB');
// const frases = await dao.getFrases();
// console.log(frases);
// })();

//para embararalhar as frases dentro do array
function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
minhasFrases = [
    "Há duas formas de construir um projeto de software: Uma maneira de fazer isso deve ser tão simples que, obviamente, não deixem deficiências, e a outra forma é a de torná-lo tão complicado que não percebam as evidentes deficiências. O primeiro método é muito mais difícil" ,
    "Faça como um programador. Quando tudo está errado e confuso, apague tudo e recomece do zero.",
    "Ser desenvolvedor é uma viagem onde a próxima parada é a solução de um problema.",
    "Eu sempre quis que o meu computador fosse tão fácil de usar como o meu telefone, o meu desejo foi realizado pois eu já não consigo descobrir como usar o meu telefone.",
    "Aproveite enquanto vive como programador no planeta, pois a tecnologia avança de uma forma gradativamente nos transformando em um ser burro.",
    "Os primeiros 90% do código representam os primeiros 10% do tempo de desenvolvimento. Os 10% restantes do código é para mostrar aos outros os 90% do tempo de desenvolvimento. ",
    "Só existem dois tipos de pessoas no mundo: as que entendem código binário e as que não entendem."
]
//chamando a função
shuffle(minhasFrases)
console.log(minhasFrases);
lead = minhasFrases[0];
$(".lead").text(lead);
var botaoSelect = $("#select-dificult");
var modal = $(".modal-content");
var dificuldade = $('input[type="radio"]')
var dificuldadeValue = $('input[type="radio"]:checked').val();

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
botaoSelect.on('click', () => iniciaModal(modal));
modal.on('click', removerModal)
dificuldade.on('click change', function(){
    $(".lead").css("display", "block");
    $("#principal").css("display", "block");
    $(".nome-jogador").css("display", "none");
    $(".botao-principal").css("transform", "scale(0.9)");
    $(".botao-principal").css("outline", "0");
    $(".mensagem-dificuldade").css("display", "flex");
    $(".mensagem-dificuldade").css("justify-content", "center")
    $(".mensagem-dificuldade").css("align-items", "center")
    $(".mensagem-dificuldade").css("margin-top", "0")




});

//calcula o tamanho da frase e imprime no console
var numPalavras = lead.split(" ").length;


var tempoJogo  = $("#tempo");
//armazenar o tempo inicial
var tempoInicial = tempoJogo.text();

// pega o tamanho da frase
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);



//monitora o clique do campo de digitação
var campo = $("#campo-digitacao");
campo.on("input", function () {
    //pega o que tem dentro do campo de texto
    var frase = campo.val();
    //conta a quantidade de caracteres da frase digitada
    var nCaracteresDigitados = frase.length;
    //mostra a quantidade na tela
    $("#caracteres-digitados").text(nCaracteresDigitados);

    //quebra a frase em palavras e conta as palavras
    var nPalavrasDigitadas = frase.split(" ").length;
    //exibe a quantidade de palavras na tela
    $("#palavras-digitadas").text(nPalavrasDigitadas);
    //imprimir em cima também
});

//cronometrando o tempo
//quando clicar apenas uma vez na caixa
var running = false;
rodar();
function rodar(){
    campo.on("focus", function(){
        campo.addClass("active")
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
                palavrasDigitadas = $("#palavras-digitadas").text()
                pontuacao = palavrasDigitadas/tempoInicial * 60
                $(".table").append('<tr><td>'+nome+'</td><td>'+pontuacao+'</td></tr>');
                $(".progress-bar").css("width", "100%");
            } else{
                running = true;
                tempoRestante--;
                tempoJogo.text(tempoRestante);
                porcentagem = (tempoRestante / tempoInicial * 100) + "%";
                console.log(porcentagem)
                $(".progress-bar").css("width", porcentagem);
                //decrementando o tempo
                
    
            }
          
        }, 1000);
    });
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
    $("#tempo").text(tempoInicial);
    
    //dificuldade.val() = ""

});


