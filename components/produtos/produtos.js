$(document).ready(function() {

    $('#add-produto').click(addNewProduct);
    $(document).on('click', '.trash-container', removeProduct);
    $(document).on('input', '.produto-card #Pestoque', handleStockInput);
    $(document).on('input', '.produto-card #PvalorUnit', handleUnitValueInput);

});


// Função para formatar o valor total do produto
function handleStockInput() {
    var input = $(this);

    // Remove caracteres não numéricos
    var value = input.val().replace(/[^0-9]/g, '');

    input.val(value);
    updateTotalValue(input.closest('.produto-card'));
}


// Função para formatar o valor unitário do produto
function handleUnitValueInput() {
    var input = $(this);

    // Remove caracteres não numéricos
    var value = input.val().replace(/[^0-9]/g, '');

    // Remove zeros à esquerda
    while (value.startsWith('0') && value.length > 1) {
        value = value.substring(1);
    }

    // Formata o valor para o formato de moeda
    if (value.length > 2) {
        var mainPart = value.slice(0, -2);
        var decimalPart = value.slice(-2);
        value = mainPart + '.' + decimalPart;
    } else if (value.length == 2) {
        value = '0.' + value;
    } else if (value.length == 1) {
        value = '0.0' + value;
    }

    input.val(value);
    updateTotalValue(input.closest('.produto-card'));
}

// Função para atualizar o valor total do produto
function updateTotalValue(productCard) {
    var stock = parseInt(productCard.find('#Pestoque').val() || "0");
    var unitValue = parseFloat(productCard.find('#PvalorUnit').val() || "0.00");
    var totalValue = stock * unitValue;
    
    productCard.find('#PvalorTotal').val(totalValue.toFixed(2));
}

// Função para adicionar um novo produto
function addNewProduct() {
    try {
        $.get('components/produtos/card/card.html', function(data) {

            var newProduct = $(data);
            var productsLength = $('.produtos-container .produto-card').length;
            var newProductNumber = productsLength + 1;

            // Adiciona o número do produto na label
            newProduct.find('.container-label').text('Produto - ' + newProductNumber);

            $('.produtos-container').append(newProduct);
        });
    } catch (error) {
        console.error("Erro ao adicionar produto: ", error);
        FLUIGC.toast({
            title: 'Erro: ',
            message: 'Ocorreu um erro ao adicionar o produto. Tente novamente.',
            type: 'danger'
        });
    }
}

// Função para remover um produto
function removeProduct() {
    try {
        var produtoCard = $(this).closest('.produto-card');
        produtoCard.remove();
    } catch (error) {
        console.error("Erro ao remover produto: ", error);
        FLUIGC.toast({
            title: 'Erro: ',
            message: 'Ocorreu um erro ao remover o produto. Tente novamente.',
            type: 'danger'
        });
    }
}