$(document).ready(function() {
    $('#add-anexo').click(function() {
        $.get('components/anexos/single/single.html', function(data) {
            var newAnnex = $(data);

            $('.anexos-container').append(newAnnex);

            $(document).on('click', '.trash-container', function() {
                // Encontrar o produto correspondente
                var produtoCard = $(this).closest('.produto-card');
                
                // Remover o produto
                produtoCard.remove();
            });
        });
    });
});