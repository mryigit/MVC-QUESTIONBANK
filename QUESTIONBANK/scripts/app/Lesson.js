$(document).ready(function () {

    $("#tblLesson").on("click", "input[type='checkbox']", function () {
        var table = $(this).closest('table');
        $('td input:checkbox', table).prop('checked', false);
        $(this).prop("checked", true);
        var lessonID = $(this).parent().parent().find("td").eq(2).html();
        $("#tblSubject").attr("lessonID", lessonID);
        getSubjectFromLessonID(lessonID);
        setLessonDropDown($("#tblLesson").attr("educationprogramID"));
    });

    $("#frmAddLesson").on('submit', function (e) {

        e.preventDefault();
        var lessonID = $("#btnLessonSubmit").attr("lessonID");
        var dataToPost = getFormData($(this));
        dataToPost.ID = lessonID;
        dataToPost.EducationProgramID = $("#ddlLessonEducationProgram").val();

        if (dataToPost.Name == "") {
            return;
        }
        else {

            if (lessonID == "") {

                $.ajax({
                    type: "POST",
                    url: 'QuestionPreLiminary/addLesson',
                    data: dataToPost,
                    dataType: 'json',
                    success: function (data) {
                        if (data.Code == 0) {
                            var item = data.lessions[0];

                            var row = '<tr>'
                                        + '<td>'
                                            + '<input type="checkbox" />'
                                        + '</td>'
                                        + '<td>'
                                            + item.Name
                                        + '</td>'
                                        + '<td style="display:none" id="lessonID">'
                                            + item.ID
                                        + '</td>'
                                        + '<td style="display:none">'
                                            + item.LanguageID
                                        + '</td>'
                                        + '<td style="display:none">'
                                            + item.EducationProgramID
                                        + '</td>'
                                        + '<td onclick="openLessonEditForm(1,this)">'
                                            + 'Düzenle'
                                        + '</td>'
                                        + '<td onclick="deleteLesson(this)">'
                                            + 'Sil'
                                        + '</td>'
                                    + '</tr>';

                            $("#tblLesson").find('tbody').append(row);
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
                    url: 'QuestionPreLiminary/updateLesson',
                    data: dataToPost,
                    dataType: 'json',
                    success: function (data) {
                        if (data.Code == 0) {

                            var item = data.lessions[0];
                            var tableRow = $("#tblLesson td[id=lessonID]").filter(function () {
                                return $(this).text() == lessonID;
                            }).closest("tr");

                            if (item.EducationProgramID == $("#tblLesson").attr("educationprogramid")) {

                                var row = '<tr>'
                                            + '<td>'
                                                + '<input type="checkbox" />'
                                            + '</td>'
                                            + '<td>'
                                                + item.Name
                                            + '</td>'
                                            + '<td style="display:none" id="lessonID">'
                                                + item.ID
                                            + '</td>'
                                            + '<td style="display:none">'
                                                + item.LanguageID
                                            + '</td>'
                                            + '<td style="display:none">'
                                                + item.EducationProgramID
                                            + '</td>'
                                            + '<td onclick="openLessonEditForm(1,this)">'
                                                + 'Düzenle'
                                            + '</td>'
                                            + '<td onclick="deleteLesson(this)">'
                                                + 'Sil'
                                            + '</td>'
                                        + '</tr>';

                                tableRow.replaceWith(row);
                            }
                            else {
                                tableRow.remove();
                            }
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


function getLessonFromEducationID(educationProgramID) {
    $.ajax({
    type: "POST",
    url: 'QuestionPreLiminary/getLessonFromEducationID',
    data: { educationProgramID: educationProgramID },
    dataType: 'json',
    success: function (data) {

        if (data.Code == 0) {
           
            var row = "";
            $.each(data.lessions, function (index, item) {
                row += '<tr>'
                            + '<td>'
                                + '<input type="checkbox" />'
                            + '</td>'
                            + '<td>'
                                + item.Name
                            + '</td>'
                            + '<td style="display:none" id="lessonID">'
                                + item.ID
                            + '</td>'
                            + '<td style="display:none">'
                                + item.LanguageID
                            + '</td>'
                            + '<td style="display:none">'
                                + item.EducationProgramID
                            + '</td>'
                            + '<td onclick="openLessonEditForm(1,this)">'
                                + 'Düzenle'
                            + '</td>'
                            + '<td onclick="deleteLesson(this)">'
                                + 'Sil'
                            + '</td>'
                        + '</tr>';
            });
            $("#tblLesson").find('tbody').html(row);
            $("#tblLesson").parent().show();
            $("#tblSubject").parent().hide();
            $("#tblQuestion").parent().hide();
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

function deleteLesson(th) {
    var ID = $(th).parent().find("td").eq(2).html();
    var name = $(th).parent().find("td").eq(1).html();

    confirmBox(name + " adlı dersi silmek istediğine eminmisin",
        "Uyarı",
        function () {
            $.ajax({
                type: "POST",
                url: 'QuestionPreLiminary/deleteLesson',
                data: { ID: ID },
                dataType: 'json',
                success: function (data) {
                    if (data.Code == 0) {
                        $(th).parent().remove();
                        beautyAlert(data.lessions[0].Name + " adlı ders silindi");
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

function openLessonEditForm(type, th) {
    var educationProgramID = $("#tblLesson").attr("educationProgramID");
    
    if (type == 0) {
        $("#btnLessonSubmit").attr("lessonID", "");
        $("#txtLessonName").val("");
        $("#ddlLessonEducationProgram").val(educationProgramID);
        $("#ddlLessonEducationProgram").prop("disabled", true);

        $("#dvLessonAdd").dialog({
            modal: false,
            title: "Ders kayıt",
            zIndex: 10000,
            autoOpen: true,
            width: "auto",
            resizable: false,
        });
    }
    else {
        $("#btnLessonSubmit").attr("lessonID", $(th).parent().find("td").eq(2).html());
        $("#txtLessonName").val($(th).parent().find("td").eq(1).html())
        $("#ddlLessonLanguage").val($(th).parent().find("td").eq(3).html());
        $("#ddlLessonEducationProgram").val(educationProgramID);
        $("#ddlLessonEducationProgram").prop("disabled", false);
        $("#dvLessonAdd").dialog({
            modal: false,
            title: "Ders kayıt",
            zIndex: 10000,
            autoOpen: true,
            width: "auto",
            resizable: false,
        });
    }
}