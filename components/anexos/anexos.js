$(document).ready(function() {

    $('#add-anexo').click(openFileInput);
    $('#file-input').change(handleFileSelection);
    $(document).on('click', '.trash-container', removeAnnex);
    $(document).on('click', '.eye-container', downloadAnnex);

});

// Função para ao apertar o botão de adicionar anexo, abrir o file input
function openFileInput() {
    $('#file-input').click();
}

// Função de seleção de arquivo
function handleFileSelection(event) {
    try {
        var file = event.target.files[0];
        if (!file) return;

        var reader = new FileReader();

        reader.onload = function(e) {
            createAnnexFromSelectedFile(e, file);
        };

        reader.readAsArrayBuffer(file);

    } catch (error) {
        console.error("Erro ao adicionar anexo: ", error);
        showError("Ocorreu um erro ao adicionar o anexo. Tente novamente.");
    }
}

// Função para criar o anexo a partir do arquivo selecionado
function createAnnexFromSelectedFile(e, file) {
    var blob = new Blob([e.target.result], { type: file.type });
    var readerForBlob = new FileReader();

    readerForBlob.onloadend = function() {
        var base64String = readerForBlob.result;
        var blobKey = "fileBlob_" + file.name;
        sessionStorage.setItem(blobKey, JSON.stringify({ data: base64String, type: file.type }));

        $.get('components/anexos/single/single.html', function(data) {
            var newAnnex = $(data);
            newAnnex.find('.container-content').text(file.name);
            $('.anexos-container').append(newAnnex);

            $('.anexos-items-border').show();
        });
    };

    readerForBlob.readAsDataURL(blob);
}

// Função para remover um anexo
function removeAnnex() {
    try {
        var anexoCard = $(this).closest('.anexo-card');
        var fileName = anexoCard.find('.container-content').text();

        sessionStorage.removeItem("fileBlob_" + fileName);
        anexoCard.remove();

    } catch (error) {
        console.error("Erro ao remover anexo: ", error);
        showError("Ocorreu um erro ao remover o anexo. Tente novamente.");
    }
}

// Função para fazer download de um anexo
function downloadAnnex() {
    try {
        var anexoCard = $(this).closest('.anexo-card');
        var fileName = anexoCard.find('.container-content').text();
        var fileData = JSON.parse(sessionStorage.getItem("fileBlob_" + fileName));

        if (fileData && fileData.data) {
            var blob = base64toBlob(fileData.data, fileData.type);
            var blobUrl = URL.createObjectURL(blob);

            var downloadLink = document.createElement("a");
            downloadLink.href = blobUrl;
            downloadLink.download = fileName;
            downloadLink.click();
        }
    } catch (error) {
        console.error("Erro ao fazer download do anexo: ", error);
        showError("Ocorreu um erro ao fazer download do anexo. Tente novamente.");
    }
}

// Função para converter base64 para Blob
function base64toBlob(base64, type) {
    try {
        var binary = atob(base64.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: type});
    } catch (error) {
        console.error("Erro ao converter base64 para Blob: ", error);
        showError("Ocorreu um erro ao converter base64 para Blob. Tente novamente.");
    }
}
