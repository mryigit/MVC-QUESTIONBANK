$(document).ready(function () {

    getEducationProgramAll();

    $("#tblEducationProgram").on("click", "input[type='checkbox']", function() {
        var table = $(this).closest('table');
        
        $('td input:checkbox', table).prop('checked', false);
        $(this).prop("checked", true);
        
        var educationProgramID = $(this).parent().parent().find("td").eq(2).html();
        $("#tblLesson").attr("educationProgramID", educationProgramID)
        getLessonFromEducationID(educationProgramID);
    });

    $("#frmAddEducationProgram").on('submit', function (e) {

        e.preventDefault();
        var eduID = $("#btnEducationProgramSubmit").attr("eduID");
        var dataToPost = getFormData($(this));
        dataToPost.ID = eduID;

        if (dataToPost.Name == "") {
            return;
        }
        else {
            if (eduID == "") {

                $.ajax({
                    type: "POST",
                    url: 'QuestionPreLiminary/addEducationProgram',
                    data: dataToPost,
                    dataType: 'json',
                    success: function (data) {
                        if (data.Code == 0) {

                            var item = data.educationPrograms[0];
                            var row = '<tr>'
                                    + '<td>'
                                        + '<input type="checkbox" />'
                                    + '</td>'
                                    + '<td>'
                                        + item.Name
                                    + '</td>'
                                    + '<td style="display:none" id="eduID">'
                                        + item.ID
                                    + '</td>'
                                    + '<td style="display:none">'
                                        + item.LanguageID
                                    + '</td>'
                                    + '<td onclick="openEducationEditForm(1,this)">'
                                        + 'Düzenle'
                                    + '</td>'
                                    + '<td onclick="deleteEducation(this)">'
                                        + 'Sil'
                                    + '</td>'
                                + '</tr>';

                            $("#tblEducationProgram").find('tbody').append(row);
                        }
                        else {
                            alert(data.Messeage);
                        }
                    },
                    error: function () {
                        alert('Sistem ajax hatası!');
                    },
                    failure: function () {
                        alert('failure');
                    }
                });

            }
            else {

                $.ajax({
                    type: "POST",
                    url: 'QuestionPreLiminary/updateEducationProgram',
                    data: dataToPost,
                    dataType: 'json',
                    success: function (data) {
                        if (data.Code == 0) {

                            var item = data.educationPrograms[0];
                            var row = '<tr>'
                                    + '<td>'
                                        + '<input type="checkbox" />'
                                    + '</td>'
                                    + '<td>'
                                        + item.Name
                                    + '</td>'
                                    + '<td style="display:none" id="eduID">'
                                        + item.ID
                                    + '</td>'
                                    + '<td style="display:none">'
                                        + item.LanguageID
                                    + '</td>'
                                    + '<td onclick="openEducationEditForm(1,this)">'
                                        + 'Düzenle'
                                    + '</td>'
                                    + '<td onclick="deleteEducation(this)">'
                                        + 'Sil'
                                    + '</td>'
                                + '</tr>';

                            var tableRow = $("#tblEducationProgram td[id=eduID]").filter(function () {
                                return $(this).text() == eduID;
                            }).closest("tr");

                            tableRow.replaceWith(row);

                        }
                        else {
                            alert(data.Messeage);
                        }
                    },
                    error: function () {
                        alert('Sistem ajax hatası!');
                    },
                    failure: function () {
                        alert('failure');
                    }
                });

            }
        }

    });

});

function getEducationProgramAll() {
    $.ajax({
        type: "POST",
        url: 'QuestionPreLiminary/getEducationProgramAll',
        data: {},
        dataType: 'json',
        success: function (data) {
            if (data.Code == 0) {
                $.each(data.educationPrograms, function (index, item) {
                    var row = '<tr>'
                                + '<td>'
                                    + '<input type="checkbox" />'
                                + '</td>'
                                + '<td>'
                                    + item.Name
                                + '</td>'
                                + '<td style="display:none" id="eduID">'
                                    + item.ID
                                + '</td>'
                                + '<td style="display:none">'
                                    + item.LanguageID
                                + '</td>'
                                + '<td onclick="openEducationEditForm(1,this)">'
                                    + 'Düzenle'
                                + '</td>'
                                + '<td onclick="deleteEducation(this)">'
                                    + 'Sil'
                                + '</td>'
                            + '</tr>';

                    $("#tblEducationProgram").find('tbody').append(row);
                })
            }
            else {
                alert(data.Messeage);
            }
        },
        error: function () {
            alert('Sistem ajax hatası!');
        },
        failure: function () {
            alert('failure');
        }
    });
}

function deleteEducation(th) {
    var ID = $(th).parent().find("td").eq(2).html();
    var name = $(th).parent().find("td").eq(1).html();

    confirmBox(name + " adlı programı silmek istediğine eminmisin",
        "Uyarı",
        function () {

            $.ajax({
                type: "POST",
                url: 'QuestionPreLiminary/deleteEducationProgram',
                data: { ID: ID },
                dataType: 'json',
                success: function (data) {
                    if (data.Code == 0) {
                        $(th).parent().remove();
                        beautyAlert(data.educationPrograms[0].Name + " adlı program silindi");
                    }
                    else {
                        alert(data.Messeage);
                    }
                },
                error: function () {
                    alert('Sistem ajax hatası!');
                },
                failure: function () {
                    alert('failure');
                }
            });

        },
        function () {
        });
    
}

function openEducationEditForm(type, th) {
    if (type == 0) {

        $("#btnEducationProgramSubmit").attr("eduID", "");
        $("#txtEducationName").val("");
        $("#dvEducationProgramAdd").dialog({
            modal: false,
            title: "Eğitim programı kayıt",
            zIndex: 10000,
            autoOpen: true,
            width: "auto",
            resizable: false,
        });

    }
    else {

        $("#btnEducationProgramSubmit").attr("eduID", $(th).parent().find("td").eq(2).html());
        $("#txtEducationName").val($(th).parent().find("td").eq(1).html())
        $("#ddlEducationLanguage").val($(th).parent().find("td").eq(3).html());
        $("#dvEducationProgramAdd").dialog({
            modal: false,
            title: "Eğitim programı düzenleme",
            zIndex: 10000,
            autoOpen: true,
            width: "auto",
            resizable: false,
        });

    }
}

