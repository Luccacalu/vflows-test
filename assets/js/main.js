$("document").ready(function() {

    $("#fornecedor-section").load("/components/fornecedor/fornecedor.html", function() {
        $.getScript("/components/fornecedor/fornecedor.js");
    });

    $("#produtos-section").load("/components/produtos/produtos.html", function() {
        $.getScript("/components/produtos/produtos.js");
    });

    $("#anexos-section").load("/components/anexos/anexos.html", function() {
        $.getScript("/components/anexos/anexos.js");
    });

    $('#save-button').click(function() {
        var fornecedorData = {
            razaoSocial: $('#FrazaoSocial').val(),
            nomeFantasia: $('#FnomeFantasia').val(),
            produtos: [],
            anexos: []
        };

        $('.produto-card').each(function(index) {
            var produto = {
                indice: index + 1,
                descricaoProduto: $(this).find('#Pproduto').val(),
            };
            fornecedorData.produtos.push(produto);
        });

        $('.anexo-card').each(function(index) {
            var nomeArquivo = $(this).find('.container-content').text();
            var fileData = JSON.parse(sessionStorage.getItem("fileBlob_" + nomeArquivo));
            var anexo = {
                indice: index + 1,
                nomeArquivo: nomeArquivo,
                blobArquivo: fileData.data
            };
            fornecedorData.anexos.push(anexo);
        });

        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fornecedorData, null, 2));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "fornecedorData.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });
});