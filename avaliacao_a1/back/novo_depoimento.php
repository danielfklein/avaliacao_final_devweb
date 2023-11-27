<?php
// Obter dados do formulário
$nome = $_GET['nomeNovoDepoimento'];
$mensagem = $_GET['mensagemNovoDepoimento'];

// Conexão com o banco de dados
require 'banco_danca.php';

try {
    // Consulta SQL para inserir novo depoimento
    $sql = "INSERT INTO depoimentos (nome, mensagem) VALUES (:nome, :mensagem)";
    
    $consulta = $conexao->prepare($sql);
    $consulta->bindParam(':nome', $nome);
    $consulta->bindParam(':mensagem', $mensagem);
    
    $consulta->execute();
    
    echo "Depoimento adicionado com sucesso!";
} catch (PDOException $e) {
    echo "Erro ao adicionar depoimento: " . $e->getMessage();
}

// Fechar a conexão
$conexao = null;
?>
