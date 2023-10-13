$("document").ready(function() {

    try {

        // Carregar os componentes, e então seus respectivos scripts
        loadComponent("#fornecedor-section", "/components/fornecedor/fornecedor.html", "/components/fornecedor/fornecedor.js");
        loadComponent("#produtos-section", "/components/produtos/produtos.html", "/components/produtos/produtos.js");
        loadComponent("#anexos-section", "/components/anexos/anexos.html", "/components/anexos/anexos.js");

        // Coletar todos os dados dos componentes e gerar o JSON
        $('#save-button').click(function() {
            try {
                if (validateRequiredFields()) {
                    processData();
                }
            } catch (error) {
                console.error("Erro ao processar os dados: ", error);
                showError("Ocorreu um erro ao processar os dados. Por favor, verifique os campos e tente novamente.");
            }
        });

        // Fechar o alerta
        $('#close-alert-button').click(function() {
            $('#alert-message').hide();
        });

    } catch (error) {
        console.error("Ocorreu um erro: ", error);
        showError("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
    }

});

// Função para conferir se os campos obrigatórios foram preenchidos
function validateRequiredFields() {

    // Campos obrigatórios
    var requiredFields = [
        { fieldId: '#FrazaoSocial', label: 'Razão Social' },
        { fieldId: '#FnomeFantasia', label: 'Nome Fantasia' },
        { fieldId: '#FCNPJ', label: 'CNPJ' },
        { fieldId: '#Fendereco', label: 'Endereço' },
        { fieldId: '#FnomePessoaContato', label: 'Nome da Pessoa de Contato' },
        { fieldId: '#Ftelefone', label: 'Telefone' },
        { fieldId: '#Femail', label: 'E-mail' }
    ];

    // Verificar se os campos obrigatórios foram preenchidos
    for (var i = 0; i < requiredFields.length; i++) {
        var fieldInfo = requiredFields[i];
        var fieldId = fieldInfo.fieldId;
        var fieldValue = $(fieldId).val().trim();

        if (fieldValue === '') {
            showError(fieldInfo.label + ' é obrigatório.');
            return false;
        }
    }

    return true;
}

// Função para coletar os dados dos componentes e gerar o JSON
function processData() {
    try {

            // Verificar se há pelo menos um produto e um anexo
            var numProdutos = $('.produto-card').length;
            var numAnexos = $('.anexo-card').length;
    
            var errorMessage = "";
    
            if (numProdutos === 0) {
                errorMessage = "É necessário adicionar pelo menos um produto.";
            }
    
            if (numAnexos === 0) {
                errorMessage = "É necessário adicionar pelo menos um anexo.";
            }
    
            if (errorMessage) {
                showError(errorMessage);
                return;
            }
    
            // Abrir o modal de loading
            openLoadingModal();
    
            // Coletar os dados dos componentes
            var fornecedorData = {
                razaoSocial: $('#FrazaoSocial').val(),
                nomeFantasia: $('#FnomeFantasia').val(),
                cnpj: $('#Fcnpj').val(),
                inscricaoEstadual: $('#FinscricaoEstadual').val(),
                endereco: $('#Fendereco').val(),
                bairro: $('#Fbairro').val(),
                cep: $('#FCEP').val(),
                inscricaoMunicipal: $('#FinscricaoMunicipal').val(),
                numero: $('#Fnumero').val(),
                complemento: $('#Fcomplemento').val(),
                municipio: $('#Fmunicipio').val(),
                estado: $('#Festado').val(),
                nomePessoaContato: $('#FnomePessoaContato').val(),
                telefone: $('#Ftelefone').val(),
                email: $('#Femail').val(),
                produtos: [],
                anexos: []
            };
    
            $('.produto-card').each(function(index) {
                var produto = {
                    indice: index + 1,
                    descricaoProduto: $(this).find('#Pproduto').val(),
                    unidadeMedida: $(this).find("#Pmedida").val(),
                    qtdeEstoque: $(this).find("#Pestoque").val(),
                    valorUnitario: $(this).find("#PvalorUnit").val(),
                    valorTotal: $(this).find("#PvalorTotal").val()
                };
                fornecedorData.produtos.push(produto);
            });
    
            $('.anexo-card').each(function(index) {
                var nomeArquivo = $(this).find('.container-content').text();
                var fileData = JSON.parse(sessionStorage.getItem("fileBlob_" + nomeArquivo));
                var anexo = {
                    indice: index + 1,
                    nomeArquivo: nomeArquivo,
                    //blobArquivo: fileData.data
                };
                fornecedorData.anexos.push(anexo);
            });

            // Atualizar o texto do modal de "Salvando..." para "Salvo!"
            $('#loading-modal').find('.modal-body').html('<div style="text-align:center;"><h3>Salvo!</h3></div>');

            // Iniciar o download do arquivo JSON
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fornecedorData, null, 2));
            var downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "fornecedorData.json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();

    } catch (error) {
        console.error("Erro ao processar os dados: ", error);
        showError("Ocorreu um erro ao processar os dados. Por favor, verifique os campos e tente novamente.");
    }
}

// Função para carregar um componente e seu respectivo script
function loadComponent(selector, htmlPath, jsPath) {
    $(selector).load(htmlPath, function() {
        $.getScript(jsPath);
    });
}

// Função para abrir o modal de loading
function openLoadingModal() {
    FLUIGC.modal({
        title: 'Salvando Fornecedor',
        content: '<div style="text-align:center;"><h3>Salvando...</h3></div>',
        id: 'loading-modal',
        size: 'small',
    });
}