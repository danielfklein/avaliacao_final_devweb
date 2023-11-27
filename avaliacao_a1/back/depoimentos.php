<?php
// Conexão com o banco de dados
require 'banco_danca.php';

try {
    // Consulta SQL para obter depoimentos do banco
    $sql = "SELECT nome, mensagem FROM depoimentos";
    $consulta = $conexao->query($sql);

    // Pegar e imprimir depoimentos
    while ($row = $consulta->fetch(PDO::FETCH_ASSOC)) {
        //enquanto tiver linha de dados para pegar, faça:
        // printa os quadros com os depoimentos pegos no banco
        echo "<div class='col-md-4 mb-4'>";
        echo "<div class='card'>";
        echo "<div class='card-body'>";
        echo "<p class='card-title'>{$row['nome']}</p>"; //mostra a linha nome, pegando o valor do nome no banco
        echo "<p class='card-text'>\"{$row['mensagem']}\"</p>";
        echo "</div>";
        echo "</div>";
        echo "</div>";
    }
} catch (PDOException $e) {
    echo "Erro ao recuperar depoimentos: " . $e->getMessage();
}

// Fechar a conexão
$conexao = null;
?>
