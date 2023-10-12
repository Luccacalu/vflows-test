$(document).ready(function() {
    $('#FCEP').blur(function() {
        var cep = $(this).val().replace(/\D/g, '');

        if(cep != "") {
            var validacep = /^[0-9]{8}$/;

            if(validacep.test(cep)) {
                $("#Fendereco").val("...");
                $("#Fbairro").val("...");
                $("#Fmunicipio").val("...");
                $("#Festado").val("...");

                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        $("#Fendereco").val(dados.logradouro);
                        $("#Fbairro").val(dados.bairro);
                        $("#Fmunicipio").val(dados.localidade);
                        $("#Festado").val(dados.uf);
                    }
                    else {
                        alert("CEP não encontrado.");
                        limpaFormularioCep();
                    }
                });
            } 
            else {
                alert("Formato de CEP inválido.");
                limpaFormularioCep();
            }
        } 
        else {
            limpaFormularioCep();
        }
    });
});

function limpaFormularioCep() {
    $("#Fendereco").val("");
    $("#Fbairro").val("");
    $("#Fmunicipio").val("");
    $("#Festado").val("");
}