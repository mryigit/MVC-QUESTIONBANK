function confirmBox(text, title, yesFunction, noFunction) {
    $('<div></div>').appendTo('body')
    .html('<div><h6>' + text + '</h6></div>')
    .dialog({
        modal: true,
        title: title,
        zIndex: 10000,
        autoOpen: true,
        width: '300px',
        resizable: false,
        buttons: {
            Evet: function () {
                yesFunction();

                $(this).dialog("close");
            },
            Hayır: function () {
                noFunction();
                $(this).dialog("close");
            }
        },
        close: function (event, ui) {
            $(this).remove();
        }
    });
}

function beautyAlert(text) {
    $('<div></div>').appendTo('body')
    .html('<div><h6>' + text + '</h6></div>')
    .dialog({
        modal: false,
        title: "Bilgilendirme",
        zIndex: 10000,
        autoOpen: true,
        width: '300px',
        resizable: false,
        buttons: {
            Tamam: function () {

                $(this).dialog("close");
            }
        },
        close: function (event, ui) {
            $(this).remove();
        }
    });
}

function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}