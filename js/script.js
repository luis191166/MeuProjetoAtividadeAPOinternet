</script>
    
    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $dadosPessoais = [
            "nome" => $_POST["nome"],
            "dataNascimento" => $_POST["dataNascimento"],
            "idade" => $_POST["idade"],
            "cargo" => $_POST["cargo"],
            "endereco" => $_POST["endereco"],
            "telefone" => $_POST["telefone"],
            "email" => $_POST["email"]
        ];

        $formacaoAcademica = [];
        if (isset($_POST["instituicao"])) {
            foreach ($_POST["instituicao"] as $index => $instituicao) {
                $formacaoAcademica[] = [
                    "instituicao" => $instituicao,
                    "curso" => $_POST["curso"][$index],
                    "anoDeConclusao" => $_POST["anodeconclusao"][$index]
                ];
            }
        }

        $experienciasProfissionais = [];
        if (isset($_POST["empresa"])) {
            foreach ($_POST["empresa"] as $index => $empresa) {
                $experienciasProfissionais[] = [
                    "empresa" => $empresa,
                    "cargo" => $_POST["cargo"][$index],
                    "periodo" => $_POST["periodo"][$index]
                ];
            }
        }

        $dados = [
            "dadosPessoais" => $dadosPessoais,
            "formacaoAcademica" => $formacaoAcademica,
            "experienciasProfissionais" => $experienciasProfissionais
        ];

        $dadosJson = json_encode($dados, JSON_PRETTY_PRINT);
        file_put_contents("dados_curriculo.json", $dadosJson);
        echo "<script>alert('Dados salvos com sucesso!');

        </script>";