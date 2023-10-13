$(document).ready(function() {

    handleCNPJFormat();
    handlePhoneFormat();
    handleEmailValidation();
    fetchAddressFromCEP();

});

// Função para validar o input do CNPJ
function handleCNPJFormat() {
    $("#FCNPJ").on('input', function() {
        var input = $(this);

        // Remove caracteres não numéricos
        var cnpjValue = input.val().replace(/[^0-9]/g, '');

        // Limites de tamanho
        if (cnpjValue.length > 14) {
            cnpjValue = cnpjValue.substring(0, 14);
        }

        cnpjValue = formatCNPJ(cnpjValue);
        input.val(cnpjValue);
    });
}

// Função para formatar o valor do CNPJ para o formato padrão
function formatCNPJ(cnpj) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

// Função para validar o input do telefone
function handlePhoneFormat() {
    $("#Ftelefone").on('input', function() {
        var input = $(this);

        // Remove caracteres não numéricos
        var phoneValue = input.val().replace(/[^0-9]/g, '');

        // Limites de tamanho
        if (phoneValue.length > 11) {
            phoneValue = phoneValue.substring(0, 11);
        }

        phoneValue = formatPhone(phoneValue);
        input.val(phoneValue);
    });
}

// Função para formatar o valor do telefone para o formato padrão
function formatPhone(phone) {
    if (phone.length <= 10) {
        return phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else {
        return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
}

// Função para validar o input do e-mail
function handleEmailValidation() {
    $("#Femail").blur(function() {
        var input = $(this);

        // Caso o e-mail não seja válido, mostra um toast de erro
        if (!validateEmail(input.val())) {
            FLUIGC.toast({
                title: 'Erro:',
                message: 'Informe um e-mail válido.',
                type: 'danger'
            });
        }
    });
}

// Função para verificar o input e-mail
function validateEmail(email) {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,6}$/;
    return regex.test(email);
}

// Função para buscar o endereço a partir do CEP com a API ViaCEP
function fetchAddressFromCEP() {
    $('#FCEP').blur(function() {
        var cep = $(this).val().replace(/\D/g, '');

        if (cep !== "") {
            var validacep = /^[0-9]{8}$/;

            if (validacep.test(cep)) {

                // Preenche os campos de endereço com "..."
                setLocFieldsAsLoading();
                setFieldsDisabledState(true);

                // Busca o endereço a partir do CEP, e preenche os campos caso o CEP seja válido
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function(dados) {
                    if (!("erro" in dados)) {
                        fillAddressFields(dados);
                        setFieldsDisabledState(true);
                    } else {
                        showError("CEP não encontrado.");
                        clearAddressFields();
                        setFieldsDisabledState(false);
                    }
                }).fail(function() {
                    showError("Erro ao buscar CEP.");
                    clearAddressFields();
                    setFieldsDisabledState(false);
                });

            } else {
                showError("Formato de CEP inválido.");
                clearAddressFields();
                setFieldsDisabledState(false);
            }
        } else {
            clearAddressFields();
            setFieldsDisabledState(false);
        }
    });
}

// Função para setar os campos de endereço como carregando
function setLocFieldsAsLoading() {
    $("#Fendereco").val("...");
    $("#Fbairro").val("...");
    $("#Fmunicipio").val("...");
    $("#Festado").val("...");
}

// Função para preencher os campos de endereço
function fillAddressFields(data) {
    $("#Fendereco").val(data.logradouro);
    $("#Fbairro").val(data.bairro);
    $("#Fmunicipio").val(data.localidade);
    $("#Festado").val(data.uf);
}

// Função para limpar os campos de endereço
function clearAddressFields() {
    $("#Fendereco").val("");
    $("#Fbairro").val("");
    $("#Fmunicipio").val("");
    $("#Festado").val("");
}

// Função para setar o estado dos campos de endereço
function setFieldsDisabledState(isDisabled) {
    $("#Fendereco").prop('disabled', isDisabled);
    $("#Fbairro").prop('disabled', isDisabled);
    $("#Fmunicipio").prop('disabled', isDisabled);
    $("#Festado").prop('disabled', isDisabled);
}