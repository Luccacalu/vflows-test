$("document").ready(function() {
    
    // Carregar a seção de fornecedor e, em seguida, carregar o script fornecedor.js
    $("#fornecedor-section").load("/components/fornecedor/fornecedor.html", function() {
        $.getScript("/components/fornecedor/fornecedor.js");
    });

    // Carregar a seção de produtos e, em seguida, carregar o script produtos.js
    $("#produtos-section").load("/components/produtos/produtos.html", function() {
        $.getScript("/components/produtos/produtos.js");
    });

    // Carregar a seção de anexos e, em seguida, carregar o script anexos.js
    $("#anexos-section").load("/components/anexos/anexos.html", function() {
        $.getScript("/components/anexos/anexos.js");
    });

});