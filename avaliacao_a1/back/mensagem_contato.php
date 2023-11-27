<?php
// Obter dados do formulário. ??'' str vazia
$nome = $_GET['nome'] ?? '';
$email = $_GET['email'] ?? '';
$mensagem = $_GET['mensagem'] ?? '';
// Conexao
require 'banco_danca.php';

try {
    // Preparar e executar a consulta SQL
    // Insert é para criar tabela. nome, email, e mensagem são colunas na tabela mensagens_contato 
    //Os values são do formulário e inseridos na tabela
    $sql = "INSERT INTO mensagem_contato (nome, email, mensagem) VALUES (:nome, :email, :contato)";

    $consulta = $conexao->prepare($sql);
    $consulta->bindParam(':nome', $nome);
    $consulta->bindParam(':email', $email);
    $consulta->bindParam(':contato', $mensagem);

    $consulta->execute();

    echo "Mensagem gravada com sucesso!";
} catch (PDOException $e) {
    echo "Erro ao gravar mensagem: " . $e->getMessage();
}

// Fechar a conexão após o uso
$conexao = null;
?>
