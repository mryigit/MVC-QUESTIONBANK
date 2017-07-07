$(document).ready(function () {

    $("#tblSubject").on("click", "input[type='checkbox']", function () {
        var table = $(this).closest('table');
        $('td input:checkbox', table).prop('checked', false);
        $(this).prop("checked", true);

        var subjectID = $(this).parent().parent().find("td").eq(2).html();
        $("#tblQuestion").attr("subjectID", subjectID);
        if ($("#tblDifficulty").find('input[type="checkbox"]:checked').length > 0) {
            getQuestionFromSubjectID(subjectID, $("#tblQuestion").attr("difficultyID"));
            $("#tblQuestion").parent().show();
        }
    });

    $("#frmAddSubject").on('submit', function (e) {
        e.preventDefault();
       
        var subjectID = $("#btnSubjectSubmit").attr("subjectID");
        var dataToPost = getFormData($(this));
        dataToPost.ID = subjectID;
        dataToPost.LessonID = $("#ddlSubjectLesson").val();
        if (dataToPost.Name == "") {
            return;
        }
        else {
            if (subjectID == "") {
                $.ajax({
                    type: "POST",
                    url: 'QuestionPreLiminary/addSubject',
                    data: dataToPost,
                    dataType: 'json',
                    success: function (data) {
                        if (data.Code == 0) {
                            var item = data.subjects[0];

                            var row = '<tr>'
                                            + '<td>'
                                                + '<input type="checkbox" />'
                                            + '</td>'
                                            + '<td>'
                                                + item.Name
                                            + '</td>'
                                            + '<td style="display:none" id="subjectID">'
                                                + item.ID
                                            + '</td>'
                                            + '<td style="display:none">'
                                                + item.LanguageID
                                            + '</td>'
                                            + '<td style="display:none">'
                                                + item.LessonID
                                            + '</td>'
                                            + '<td onclick="openSubjectEditForm(1,this)">'
                                                + 'Düzenle'
                                            + '</td>'
                                            + '<td onclick="deleteSubject(this)">'
                                                + 'Sil'
                                            + '</td>'
                                     + '</tr>';

                            $("#tblSubject").find('tbody').append(row);
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
                    url: 'QuestionPreLiminary/updateSubject',
                    data: dataToPost,
                    dataType: 'json',
                    success: function (data) {
                        if (data.Code == 0) {
                            var item = data.subjects[0];
                            var tableRow = $("#tblSubject td[id=subjectID]").filter(function () {
                                return $(this).text() == subjectID;
                            }).closest("tr");
                            if (item.LessonID== $("#tblSubject").attr("lessonID")) {
                                
                                var row = '<tr>'
                                            + '<td>'
                                                + '<input type="checkbox" />'
                                            + '</td>'
                                            + '<td>'
                                                + item.Name
                                            + '</td>'
                                            + '<td style="display:none" id="subjectID">'
                                                + item.ID
                                            + '</td>'
                                            + '<td style="display:none">'
                                                + item.LanguageID
                                            + '</td>'
                                            + '<td style="display:none">'
                                                + item.LessonID
                                            + '</td>'
                                            + '<td onclick="openSubjectEditForm(1,this)">'
                                                + 'Düzenle'
                                            + '</td>'
                                            + '<td onclick="deleteSubject(this)">'
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


function getSubjectFromLessonID(lessonID) {

    $.ajax({
        type: "POST",
        url: 'QuestionPreLiminary/getSubjectFromLessonID',
        data: { lessonID: lessonID },
        dataType: 'json',
        success: function (data) {
            if (data.Code == 0) {

                var row = "";
                $.each(data.subjects, function (index, item) {
                    row += '<tr>'
                                + '<td>'
                                    + '<input type="checkbox" />'
                                + '</td>'
                                + '<td>'
                                    + item.Name
                                + '</td>'
                                + '<td style="display:none" id="subjectID">'
                                    + item.ID
                                + '</td>'
                                + '<td style="display:none">'
                                    + item.LanguageID
                                + '</td>'
                                + '<td style="display:none">'
                                    + item.LessonID
                                + '</td>'
                                + '<td onclick="openSubjectEditForm(1,this)">'
                                    + 'Düzenle'
                                + '</td>'
                                + '<td onclick="deleteSubject(this)">'
                                    + 'Sil'
                                + '</td>'
                            + '</tr>';



                });
                $("#tblSubject").find('tbody').html(row);
                $("#tblSubject").parent().show();
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

function deleteSubject(th) {
    var ID = $(th).parent().find("td").eq(2).html();
    var name = $(th).parent().find("td").eq(1).html();

    confirmBox(name + " adlı konuyu silmek istediğine eminmisin",
        "Uyarı",
        function () {
            $.ajax({
                type: "POST",
                url: 'QuestionPreLiminary/deleteSubject',
                data: { ID: ID },
                dataType: 'json',
                success: function (data) {
                    if (data.Code == 0) {
                        $(th).parent().remove();
                        beautyAlert(data.subjects[0].Name + " adlı konu silindi");
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

function openSubjectEditForm(type, th) {
    var lessonID = $("#tblSubject").attr("lessonID");

    if (type == 0) {
        $("#btnSubjectSubmit").attr("subjectID", "");
        $("#txtSubjectName").val("");
        $("#ddlSubjectLesson").val(lessonID);
        $("#ddlSubjectLesson").prop("disabled", true);

        $("#dvSubjectAdd").dialog({
            modal: false,
            title: "Konu kayıt",
            zIndex: 10000,
            autoOpen: true,
            width: "auto",
            resizable: false,
        });
    }
    else {
        $("#btnSubjectSubmit").attr("subjectID", $(th).parent().find("td").eq(2).html());
        $("#txtSubjectName").val($(th).parent().find("td").eq(1).html())
        $("#ddlSubjectLanguage").val($(th).parent().find("td").eq(3).html());
        $("#ddlSubjectLesson").val(lessonID);
        $("#ddlSubjectLesson").prop("disabled", false);
        $("#dvSubjectAdd").dialog({
            modal: false,
            title: "Konu kayıt",
            zIndex: 10000,
            autoOpen: true,
            width: "auto",
            resizable: false,
        });
    }
}

function setLessonDropDown(educationProgramID) {
    $.ajax({
        type: "POST",
        url: 'QuestionPreLiminary/getLessonFromEducationID',
        data: { educationProgramID: educationProgramID },
        dataType: 'json',
        success: function (data) {
            if (data.Code == 0) {
                var html = "";
                $.each(data.lessions, function (index, item) {
                    html += "<option value='" + item.ID + "'>" + item.Name + "</option>";
                });
                $("#ddlSubjectLesson").html(html);
            }
            else {
                alert(data.Messeage);
            }
            //ddlSubjectLesson
        },
        error: function () {
            alert('Sistem ajax hatası!');
        },
        failure: function () {
            alert('failure');
        }
    });
}