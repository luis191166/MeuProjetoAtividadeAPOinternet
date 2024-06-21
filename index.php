<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
    <title>Currículo Luís Carlos (PRINCIPAL)</title>
    <style>
        body {
            padding: 20px;
        }
        .centralizado {
            text-align: center;
        }
        .formacao, .experiencia {
            margin: 10px 0;
            padding: 10px;
        }
        .formacao input, .experiencia input {
            display: inline-block;
            margin: 0px 0;
        }
        .add-button {
            background-color: #4CAF50;
            color: black;
            border: none;
            padding: 10px;
            font-size: 16px;
            cursor: pointer;
        }
        .form-control {
            width: 100%;
            height: 30px;
        }
        .botoes .botao {
            margin: 10px;
        }
        .photo {
            display: block;
            margin: 0 auto;
            width: 200px;
            height: auto;
            border-radius: 50%;
        }
        img {
            width: 100px;
            border-radius: 50%;
            display: block;
            margin: 0 auto 20px;
        }
        @media print {
            .no-print {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="header centralizado">
        <h1>Currículo Vitae</h1>
        <img id="fotoCurriculo" src="#" alt="Sua Foto" style="display: none;">
    </div>
    <main class="container">
        <h3>Dados Pessoais</h3>
        <form id="form-dados-pessoais" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="nome">Nome</label>
                <input type="text" class="form-control" id="nome" name="nome" required>
            </div>
            <div class="form-group">
                <label for="dataNascimento">Data de Nascimento</label>
                <input type="date" class="form-control" id="dataNascimento" name="dataNascimento" required>
            </div>
            <div class="form-group">
                <label for="idade">Idade</label>
                <input type="text" class="form-control" id="idade" name="idade" readonly>
            </div>
            <div class="form-group">
                <label for="cargo">Cargo pretendido</label>
                <input type="text" class="form-control" name="cargo" id="cargo">
            </div>
            <div class="form-group">
                <label for="endereco">Endereço</label>
                <input type="text" class="form-control" name="endereco" id="endereco">
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="telefone">Telefone</label>
                        <input type="text" class="form-control" name="telefone" id="telefone">
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" class="form-control" name="email" id="email">
                    </div>
                </div>
            </div>
            <div class="form-group no-print">
                <label for="foto">Foto</label>
                <input type="file" class="form-control" name="foto" id="foto" accept="image/*">
                <button type="button" onclick="uploadPhoto()">Enviar Foto</button>
            </div>
            <h4>Formação Acadêmica</h4>
            <div id="education-container"></div>
            <button type="button" class="add-button no-print" onclick="addEducation()">+</button>

            <h4>Experiências Profissionais</h4>
            <div id="experience-container"></div>
            <button type="button" class="add-button no-print" onclick="addExperience()">+</button>

            <div class="botoes no-print">
                <button type="submit" class="botao btn btn-primary" name="salvarDados">Enviar</button>
                <button class="botao btn btn-secondary" onclick="window.print()">Imprimir</button>
                <button type="button" class="botao btn btn-success" onclick="salvarEmPDF()">Salvar em PDF</button>
            </div>
        </form>
    </main>
    <script src="js/scripts.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
    <script>
        function uploadPhoto() {
            const fotoInput = document.getElementById('foto');
            const file = fotoInput.files[0];
            const reader = new FileReader();

            reader.onloadend = function () {
                const imgElement = document.getElementById('fotoCurriculo');
                imgElement.src = reader.result;
                imgElement.style.display = 'block';
            }

            if (file) {
                reader.readAsDataURL(file);
            } else {
                alert('Por favor, selecione uma foto para enviar.');
            }
        }

        function addEducation() {
            const container = document.getElementById('education-container');
            const div = document.createElement('div');
            div.classList.add('education');
            div.innerHTML = `
                <label>Instituição:</label>
                <input type="text" name="instituicao[]" required>
                <label>Curso:</label>
                <input type="text" name="curso[]" required>
                <label>Ano de Conclusão:</label>
                <input type="text" name="anodeconclusao[]" required>
                <button type="button" class="no-print" onclick="removeEducation(this)">Remover</button>
                <br><br>
            `;
            container.appendChild(div);
        }

        function removeEducation(button) {
            const div = button.parentNode;
            div.remove();
        }

        function addExperience() {
            const container = document.getElementById('experience-container');
            const div = document.createElement('div');
            div.classList.add('experience');
            div.innerHTML = `
                <label>Empresa:</label>
                <input type="text" name="empresa[]" required>
                <label>Cargo:</label>
                <input type="text" name="cargo[]" required>
                <label>Período:</label>
                <input type="text" name="periodo[]" required>
                <button type="button" class="no-print" onclick="removeExperience(this)">Remover</button>
                <br><br>
            `;
            container.appendChild(div);
        }

        function removeExperience(button) {
            const div = button.parentNode;
            div.remove();
        }

        document.getElementById('dataNascimento').addEventListener('change', function() {
            const dataNascimento = new Date(this.value);
            const hoje = new Date();
            let idade = hoje.getFullYear() - dataNascimento.getFullYear();
            const mes = hoje.getMonth() - dataNascimento.getMonth();
            if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
                idade--;
            }
            document.getElementById('idade').value = idade;
        });

        function salvarEmPDF() {
            const element = document.body;
            html2pdf()
                .from(element)
                .save('Curriculo.pdf');
        }
    </script>
    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Coletar dados pessoais
        $dadosPessoais = [
            "nome" => $_POST["nome"],
            "dataNascimento" => $_POST["dataNascimento"],
            "idade" => $_POST["idade"],
            "cargo" => $_POST["cargo"],
            "endereco" => $_POST["endereco"],
            "telefone" => $_POST["telefone"],
            "email" => $_POST["email"]
        ];

        // Coletar formação acadêmica
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

        // Coletar experiências profissionais
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

        // Salvar foto
        if (isset($_FILES["foto"]) && $_FILES["foto"]["error"] == 0) {
            $foto = $_FILES["foto"];
            $extensao = pathinfo($foto["name"], PATHINFO_EXTENSION);
            $novoNome = uniqid() . "." . $extensao;
            $caminho = "uploads/" . $novoNome;
            move_uploaded_file($foto["tmp_name"], $caminho);
            $dadosPessoais["foto"] = $caminho;
        }

        // Combinar todos os dados em um array
        $dados = [
            "dadosPessoais" => $dadosPessoais,
            "formacaoAcademica" => $formacaoAcademica,
            "experienciasProfissionais" => $experienciasProfissionais
        ];

        // Salvar dados em um arquivo JSON
        $dadosJson = json_encode($dados, JSON_PRETTY_PRINT);
        file_put_contents("dados_curriculo.json", $dadosJson);

        echo "<script>alert('Dados salvos com sucesso!');</script>";
    }
    ?>
</body>
</html>
