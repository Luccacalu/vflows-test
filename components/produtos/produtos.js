$(document).ready(function() {
    $('#add-produto').click(function() {
        $.get('components/produtos/card/card.html', function(data) {
            var newProduct = $(data);

            // Determinar o número do próximo produto
            var productsLength = $('.produtos-container .produto-card').length;
            var newProductNumber = productsLength + 1;

            // Atualizar o texto do container-label
            newProduct.find('.container-label').text('Produto - ' + newProductNumber);

            $('.produtos-container').append(newProduct);

            $(document).on('click', '.trash-container', function() {
                // Encontrar o produto correspondente
                var produtoCard = $(this).closest('.produto-card');
                
                // Remover o produto
                produtoCard.remove();
            });
        });
    });
});
