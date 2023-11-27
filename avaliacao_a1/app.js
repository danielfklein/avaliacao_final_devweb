function enviarMensagem() {
    // Obter form com base no id formContato
    var formulario = document.getElementById("formContato");
    var dados = new FormData(formulario); // dados recebe obj formData, que pega os dados nome, email e mensagem que sao armazenadas na var formulario

    var x = new XMLHttpRequest(); // Faz requisiçao http assinc
    // Indica  requisição. Usa método GET e passa os dados do formulário como parâmetros na URL.
    // Depois transforma o FormData em uma string, para incluir os dados do formulário na URL, concatenar e fazer a req http assincrona
    x.open("GET", "back/mensagem_contato.php?" + new URLSearchParams(dados).toString(), true);

// Ao carregar x, é atribuida uma funçao vazia/anonima. se x for igual a 200, a mensagem é enviada, o formulario é limpo e se nao, dá mensagem de erro
    x.onload = function () {
        if (x.status === 200) {
            alert("Mensagem enviada com sucesso!");
            // Limpar o form para escrever novamente sem os escritos anteriores
            formulario.reset();
        } else {
            alert("Erro ao enviar mensagem. Tente novamente.");
        }
    };
// Envia a requisição
    x.send();
}

// Pegar depoimentos do banco
function carregarDepoimentos() {
    var y = new XMLHttpRequest();
// Indica req GET, url envia a req para depoimentos e o true indica assincrona
    y.open("GET", "back/depoimentos.php", true);
// Carrega y, atribui funçao, status 200 (ok), pega os depoimentos
    y.onload = function () {
        if (y.status === 200) {
            // Substitui o conteúdo do elemento com os depoimentos recuperados
            document.getElementById("depoimentosContainer").innerHTML = y.responseText;
        }
    };
// Req vai pro server
    y.send();
}


// Função pra enviar novo depoimento
function enviarNovoDepoimento() {
    // Obter dados do formulário
    var nome = document.getElementById("nomeNovoDepoimento").value;
    var mensagem = document.getElementById("mensagemNovoDepoimento").value;

    // Criar objeto XMLHttpRequest
    var z = new XMLHttpRequest();
    // Comentario abaixo seria outra forma de fazer. nao usaria linhas 47 a 49
    //z.open("GET", "./back/novo_depoimento.php?nomeNovoDepoimento=" + encodeURIComponent(nome) + "&mensagemNovoDepoimento=" + encodeURIComponent(mensagem), true);
    var url = `./back/novo_depoimento.php?nomeNovoDepoimento=${nome}&mensagemNovoDepoimento=${mensagem}`;
    // Prepara a solicitação p/ arquivo PHP, constroi a URL com os dados do novo depoimento e faz solicitação assíncrona GET para essa URL.
    z.open("GET", url, true);

    z.onload = function () {
        if (z.status === 200) {
            // Limpar campos do formulário após envio bem-sucedido
            document.getElementById("nomeNovoDepoimento").value = "";
            document.getElementById("mensagemNovoDepoimento").value = "";

            // Atualizar a lista de depoimentos
            carregarDepoimentos();
        }
    };

    // Enviar requisição
    z.send();
}
    

// Espera o evento DOMContentLoaded, que sinaliza que a árvore DOM (doc obj model) da pag foi totalmente carregada
document.addEventListener("DOMContentLoaded", function () {
    // Evento ocorre, então a estrutura da página está pronta
    // Chama função carregarDepoimentos para pegar os depoimentos do banco e mostrar na tela
    carregarDepoimentos();
});