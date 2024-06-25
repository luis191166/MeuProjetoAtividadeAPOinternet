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
                <div class="formacao">
                    <label>Instituição:</label>
                    <input type="text" name="instituicao[]" required>
                    <label>Curso:</label>
                    <input type="text" name="curso[]" required>
                    <label>Ano de Conclusão:</label>
                    <input type="text" name="anodeconclusao[]" required>
                    <button type="button" class="no-print" onclick="removeEducation(this)">Remover</button>
                </div>
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
                <div class="experiencia">
                    <label>Empresa:</label>
                    <input type="text" name="empresa[]" required>
                    <label>Cargo:</label>
                    <input type="text" name="cargo[]" required>
                    <label>Período:</label>
                    <input type="text" name="periodo[]" required>
                    <label>Habilidades:</label>
                    <textarea name="habilidades[]" rows="4" required></textarea>
                    <button type="button" class="no-print" onclick="removeExperience(this)">Remover</button>
                </div>
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

        function salvarDados() {
            const dadosPessoais = {
                nome: document.getElementById('nome').value,
                dataNascimento: document.getElementById('dataNascimento').value,
                idade: document.getElementById('idade').value,
                cargo: document.getElementById('cargo').value,
                endereco: document.getElementById('endereco').value,
                telefone: document.getElementById('telefone').value,
                email: document.getElementById('email').value,
                foto: document.getElementById('fotoCurriculo').src
            };

            const formacaoAcademica = Array.from(document.getElementsByClassName('education')).map(education => {
                return {
                    instituicao: education.querySelector('[name="instituicao[]"]').value,
                    curso: education.querySelector('[name="curso[]"]').value,
                    anoDeConclusao: education.querySelector('[name="anodeconclusao[]"]').value
                };
            });

            const experienciasProfissionais = Array.from(document.getElementsByClassName('experience')).map(experience => {
                return {
                    empresa: experience.querySelector('[name="empresa[]"]').value,
                    cargo: experience.querySelector('[name="cargo[]"]').value,
                    periodo: experience.querySelector('[name="periodo[]"]').value,
                    habilidades: experience.querySelector('[name="habilidades[]"]').value
                };
            });

            const dados = {
                dadosPessoais,
                formacaoAcademica,
                experienciasProfissionais
            };

            localStorage.setItem('curriculo', JSON.stringify(dados));
            alert('Dados salvos com sucesso!');
        }

        function alternarSecao(secaoId) {
            document.querySelectorAll('.section').forEach(secao => {
                secao.classList.remove('active');
            });
            document.getElementById(secaoId).classList.add('active');

            if (secaoId === 'visualizacao-section') {
                carregarDadosParaVisualizacao();
            }
        }

        function carregarDadosParaVisualizacao() {
            const dados = JSON.parse(localStorage.getItem('curriculo'));

            if (dados) {
                const dadosPessoaisDiv = document.getElementById('dados-pessoais');
                dadosPessoaisDiv.innerHTML = `
                    <p><strong>Nome:</strong> ${dados.dadosPessoais.nome}</p>
                    <p><strong>Data de Nascimento:</strong> ${dados.dadosPessoais.dataNascimento}</p>
                    <p><strong>Idade:</strong> ${dados.dadosPessoais.idade}</p>
                    <p><strong>Cargo Pretendido:</strong> ${dados.dadosPessoais.cargo}</p>
                    <p><strong>Endereço:</strong> ${dados.dadosPessoais.endereco}</p>
                    <p><strong>Telefone:</strong> ${dados.dadosPessoais.telefone}</p>
                    <p><strong>Email:</strong> ${dados.dadosPessoais.email}</p>
                `;

                const imgElement = document.getElementById('fotoCurriculoVisualizacao');
                imgElement.src = dados.dadosPessoais.foto;

                const formacaoContainer = document.getElementById('formacao-academica');
                formacaoContainer.innerHTML = '';
                dados.formacaoAcademica.forEach(formacao => {
                    const div = document.createElement('div');
                    div.classList.add('formacao');
                    div.style.backgroundColor = '#f2f2f2'; // Fundo cinza claro
                    div.innerHTML = `
                        <p><strong>Instituição:</strong> ${formacao.instituicao}</p>
                        <p><strong>Curso:</strong> ${formacao.curso}</p>
                        <p><strong>Ano de Conclusão:</strong> ${formacao.anoDeConclusao}</p>
                    `;
                    formacaoContainer.appendChild(div);
                });

                const experienciaContainer = document.getElementById('experiencias-profissionais');
                experienciaContainer.innerHTML = '';
                dados.experienciasProfissionais.forEach(experiencia => {
                    const div = document.createElement('div');
                    div.classList.add('experiencia');
                    div.style.backgroundColor = '#f2f2f2'; // Fundo cinza claro
                    div.innerHTML = `
                        <p><strong>Empresa:</strong> ${experiencia.empresa}</p>
                        <p><strong>Cargo:</strong> ${experiencia.cargo}</p>
                        <p><strong>Período:</strong> ${experiencia.periodo}</p>
                        <p><strong>Habilidades:</strong> ${experiencia.habilidades}</p>
                    `;
                    experienciaContainer.appendChild(div);
                });
            } else {
                alert('Nenhum dado encontrado. Por favor, volte e preencha o formulário.');
                alternarSecao('preenchimento-section');
            }
        }

        function salvarEmPDF() {
            const element = document.getElementById('visualizacao-section');

            // Ocultar botões durante a geração do PDF
            const botoes = document.querySelectorAll('.no-print');
            botoes.forEach(botao => botao.style.display = 'none');

            // Aplicar temporariamente o estilo de fundo antes de gerar o PDF
            document.body.style.backgroundColor = '#f2f2f2'; // Fundo cinza claro

            html2pdf()
                .from(element)
                .save('Curriculo.pdf')
                .then(() => {
                    // Restaurar o estilo de fundo original
                    document.body.style.backgroundColor = '';

                    // Mostrar botões novamente após salvar o PDF
                    botoes.forEach(botao => botao.style.display = 'block');
                });
        }
    </script>