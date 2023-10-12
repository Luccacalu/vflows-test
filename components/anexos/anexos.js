$(document).ready(function() {

    function base64toBlob(base64, type) {
        var binary = atob(base64.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: type});
    }

    $('#add-anexo').click(function() {
        $('#file-input').click();  // Trigger the file input
    });

    $('#file-input').change(function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            
            reader.onload = function(e) {
                var blob = new Blob([e.target.result], { type: file.type });
                
                var readerForBlob = new FileReader();
                readerForBlob.onloadend = function() {
                    var base64String = readerForBlob.result;
                    var blobKey = "fileBlob_" + file.name;
                    sessionStorage.setItem(blobKey, JSON.stringify({ data: base64String, type: file.type }));
                };
                readerForBlob.readAsDataURL(blob);

                
                $.get('components/anexos/single/single.html', function(data) {
                    var newAnnex = $(data);
                    newAnnex.find('.container-content').text(file.name);
                    $('.anexos-container').append(newAnnex);
                });
            };
            
            reader.readAsArrayBuffer(file);
        }
    });

    $(document).on('click', '.trash-container', function() {
        var anexoCard = $(this).closest('.anexo-card');
        var fileName = anexoCard.find('.container-content').text();

        sessionStorage.removeItem("fileBlob_" + fileName);
        
        anexoCard.remove();
    });

    $(document).on('click', '.eye-container', function() {
        console.log("eye-container clicked");
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
    });
    
});
