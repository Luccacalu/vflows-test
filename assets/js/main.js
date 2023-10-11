$("document").ready(function() {
    
    // Carregar a seção de fornecedor
    $("#fornecedor-section").load("/components/fornecedor/fornecedor.html");

    // Carregar a seção de produtos
    $("#produtos-section").load("/components/produtos/produtos.html");

    // Carregar a seção de anexos
    $("#anexos-section").load("/components/anexos/anexos.html");

});