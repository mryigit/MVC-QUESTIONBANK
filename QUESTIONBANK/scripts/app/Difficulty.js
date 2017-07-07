$(document).ready(function () {

    getDifficultyAll();

    $("#tblDifficulty").on("click", "input[type='checkbox']", function () {
        var table = $(this).closest('table');
        $('td input:checkbox', table).prop('checked', false);
        $(this).prop("checked", true);

        var difficultyID = $(this).parent().parent().find("td").eq(5).html();
        $("#tblQuestion").attr("difficultyID", difficultyID);

        if ($("#tblSubject").find('input[type="checkbox"]:checked').length > 0) {
            getQuestionFromSubjectID($("#tblQuestion").attr("subjectID"), difficultyID);
            $("#tblQuestion").parent().show();
        }
    });

    $("#frmAddDifficulty").on('submit', function (e) {
        e.preventDefault();

        var difficultyID = $("#btnDifficultySubmit").attr("difficultyID");
        var dataToPost = getFormData($(this));
        dataToPost.ID = difficultyID;
       
        if (dataToPost.Name == "" || dataToPost.Degree == "" || dataToPost.TeacherPoint == "" || dataToPost.StudentPoint == ""
            || dataToPost.Degree <= 0 || dataToPost.TeacherPoint <= 0 || dataToPost.StudentPoint <= 0) {
            return;
        }
        else {
            if (difficultyID == "") {
                $.ajax({
                    type: "POST",
                    url: 'QuestionPreLiminary/addDifficulty',
                    data: dataToPost,
                    dataType: 'json',
                    success: function (data) {
                        if (data.Code == 0) {
                            var item = data.difficultys[0];

                            var row = '<tr>'
                                        + '<td>'
                                            + '<input type="checkbox" />'
                                        + '</td>'
                                        + '<td>'
                                            + item.Name
                                        + '</td>'
                                        + '<td>'
                                            + item.Degree
                                        + '</td>'
                                        + '<td>'
                                            + item.StudentPoint
                                        + '</td>'
                                        + '<td>'
                                            + item.TeacherPoint
                                        + '</td>'
                                        + '<td style="display:none" id="difficultyID">'
                                            + item.ID
                                        + '</td>'
                                        + '<td style="display:none">'
                                            + item.LanguageID
                                        + '</td>'
                                        + '<td onclick="openDifficultyEditForm(1,this)">'
                                            + 'Düzenle'
                                        + '</td>'
                                        + '<td onclick="deleteDifficulty(this)">'
                                            + 'Sil'
                                        + '</td>'
                                    + '</tr>';

                            $("#tblDifficulty").find('tbody').append(row);
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
                    url: 'QuestionPreLiminary/updateDifficulty',
                    data: dataToPost,
                    dataType: 'json',
                    success: function (data) {
                        if (data.Code == 0) {
                            var item = data.difficultys[0];

                            var row = '<tr>'
                                        + '<td>'
                                            + '<input type="checkbox" />'
                                        + '</td>'
                                        + '<td>'
                                            + item.Name
                                        + '</td>'
                                        + '<td>'
                                            + item.Degree
                                        + '</td>'
                                        + '<td>'
                                            + item.StudentPoint
                                        + '</td>'
                                        + '<td>'
                                            + item.TeacherPoint
                                        + '</td>'
                                        + '<td style="display:none" id="difficultyID">'
                                            + item.ID
                                        + '</td>'
                                        + '<td style="display:none">'
                                            + item.LanguageID
                                        + '</td>'
                                        + '<td onclick="openDifficultyEditForm(1,this)">'
                                            + 'Düzenle'
                                        + '</td>'
                                        + '<td onclick="deleteDifficulty(this)">'
                                            + 'Sil'
                                        + '</td>'
                                    + '</tr>';

                            var tableRow = $("#tblDifficulty td[id=difficultyID]").filter(function () {
                                return $(this).text() == difficultyID;
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


function getDifficultyAll() {
    $.ajax({
        type: "POST",
        url: 'QuestionPreLiminary/getDifficultyAll',
        data: {},
        dataType: 'json',
        success: function (data) {
            if (data.Code == 0) {
                $.each(data.difficultys, function (index, item) {
                    var row = '<tr>'
                                + '<td>'
                                    + '<input type="checkbox" />'
                                + '</td>'
                                + '<td>'
                                    + item.Name
                                + '</td>'
                                + '<td>'
                                    + item.Degree
                                + '</td>'
                                + '<td>'
                                    + item.StudentPoint
                                + '</td>'
                                + '<td>'
                                    + item.TeacherPoint
                                + '</td>'
                                + '<td style="display:none" id="difficultyID">'
                                    + item.ID
                                + '</td>'
                                + '<td style="display:none">'
                                    + item.LanguageID
                                + '</td>'
                                + '<td onclick="openDifficultyEditForm(1,this)">'
                                    + 'Düzenle'
                                + '</td>'
                                + '<td onclick="deleteDifficulty(this)">'
                                    + 'Sil'
                                + '</td>'
                            + '</tr>';

                    $("#tblDifficulty").find('tbody').append(row);
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

function deleteDifficulty(th) {
    var ID = $(th).parent().find("td").eq(5).html();
    var name = $(th).parent().find("td").eq(1).html();

    confirmBox(name + " adlı puanlamayı silmek istediğine eminmisin",
        "Uyarı",
        function () {
            $.ajax({
                type: "POST",
                url: 'QuestionPreLiminary/deleteDifficulty',
                data: { ID: ID },
                dataType: 'json',
                success: function (data) {
                    if (data.Code == 0) {
                        $(th).parent().remove();
                        beautyAlert(data.educationPrograms[0].Name + " adlı puanlama silindi");
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

function openDifficultyEditForm(type, th) {
    if (type == 0) {
        $("#btnDifficultySubmit").attr("difficultyID", "");
        $("#txtDifficultyName").val("");
        $("#txtDifficultyDegree").val("");
        $("#txtDifficultyStudentPoint").val("");
        $("#txtDifficultyTeacherPoint").val("");
        $("#dvDifficultyAdd").dialog({
            modal: false,
            title: "Puanlama Kayıt",
            zIndex: 10000,
            autoOpen: true,
            width: "auto",
            resizable: false,
        });
    }
    else {
        $("#btnDifficultySubmit").attr("difficultyID", $(th).parent().find("td").eq(5).html());
        $("#txtDifficultyName").val($(th).parent().find("td").eq(1).html())
        $("#txtDifficultyDegree").val($(th).parent().find("td").eq(2).html());
        $("#txtDifficultyStudentPoint").val($(th).parent().find("td").eq(3).html());
        $("#txtDifficultyTeacherPoint").val($(th).parent().find("td").eq(4).html());
        $("#ddlDifficultyLanguage").val($(th).parent().find("td").eq(6).html());
        $("#dvDifficultyAdd").dialog({
            modal: false,
            title: "Puanlama Kayıt",
            zIndex: 10000,
            autoOpen: true,
            width: "auto",
            resizable: false,
        });
    }
}