$(document).ready(function () {

    $("#frmAddQuestion").on('submit', function (e) {
        e.preventDefault();
        var result = $("#frmAddQuestion").valid();
        var dataToPost = getFormDataforQuestion($(this));
        var questionID = $("#btnQuestionSubmit").attr("questionID");
   
        var tableCorrectChecboxCount = $('#tblAddOption').find('.clsIsCorrect:checked').length;

        if (tableCorrectChecboxCount == 0) {
            $("#lblCorrect").html("Bir doğru cevap seçilmeli");
            result = false;
        }
       
        var educationProgramID = $('#tblEducationProgram').find('input[type="checkbox"]:checked').parent().parent().find("td").eq(2).html();
        var lessonID = $('#tblLesson').find('input[type="checkbox"]:checked').parent().parent().find("td").eq(2).html();

        dataToPost.EducationProgramID = educationProgramID;
        dataToPost.LessonID = lessonID;
        dataToPost.State = "true";
        
        
        if (result) {
            if (questionID == "") {

                $.ajax({
                    type: "POST",
                    url: 'QuestionPreLiminary/addQuestion',
                    data: JSON.stringify(dataToPost),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                      
                        if (data.Code == 0) {
                            var item = data.questions[0];
                           
                            var optionRows = "";
                            
                            $.each(item.QuestionOption, function (index2, item2) {
                                var corText = item2.IsCorrect == true ? "D" : "Y";
                                optionRows += '<tr>'
                                                    + '<td>'
                                                        + item2.OptionKey
                                                    + '</td>'
                                                    + '<td>'
                                                        + item2.OptionValue
                                                    + '</td>'
                                                    + '<td style=display:none>'
                                                        + item2.IsCorrect
                                                    + '</td>'
                                                    + '<td style=display:none>'
                                                        + item2.ID
                                                    + '</td>'
                                                    + '<td style=display:none>'
                                                        + item2.QuestionID
                                                    + '</td>'
                                                    + '<td >'
                                                        + corText
                                                    + '</td>'
                                            + '</tr>';
                            });

                            var row = '<tr>'
                                        + '<td>'
                                            + item.QuestionDefinition
                                        + '</td>'
                                        + '<td >'
                                            + item.QuestionType.Name
                                        + '</td>'
                                        + '<td style="display:none" id="questionID">'
                                        + item.ID
                                        + '</td>'
                                        + '<td style="display:none">'
                                        + item.QuestionTypeID
                                        + '</td>'
                                        + '<td onclick="openOptionList(this)">'
                                            + 'Şıklar'
                                            + '<table id="tblOptions"  style="display:none"><tbody>' + optionRows + '</tbody></table>'
                                        + '</td>'
                                        + '<td onclick="openQuestionEditForm(1,this)">'
                                            + 'Düzenle'
                                        + '</td>'
                                        + '<td onclick="deleteQuestion(this)">'
                                            + 'Sil'
                                        + '</td>'

                                    + '</tr>';

                            $("#tblQuestion").find('tbody[id=motherTable]').append(row);
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

                dataToPost.ID = questionID;

                $.ajax({
                    type: "POST",
                    url: 'QuestionPreLiminary/updateQuestion',
                    data: dataToPost,
                    dataType: 'json',
                    success: function (data) {

                        if (data.Code == 0) {
                            var item = data.questions[0];

                            var tableRow = $("#tblQuestion td[id=questionID]").filter(function () {
                                return $(this).text() == item.ID;
                            }).closest("tr");
                            if (item.DifficultyID == $("#tblQuestion").attr("difficultyID") && item.SubjectID == $("#tblQuestion").attr("subjectID")) {

                                var optionRows = "";

                                $.each(item.QuestionOption, function (index2, item2) {
                                    var corText = item2.IsCorrect == true ? "D" : "Y";
                                    optionRows += '<tr>'
                                                        + '<td>'
                                                            + item2.OptionKey
                                                        + '</td>'
                                                        + '<td>'
                                                            + item2.OptionValue
                                                        + '</td>'
                                                        + '<td style=display:none>'
                                                            + item2.IsCorrect
                                                        + '</td>'
                                                        + '<td style=display:none>'
                                                            + item2.ID
                                                        + '</td>'
                                                        + '<td style=display:none>'
                                                            + item2.QuestionID
                                                        + '</td>'
                                                        + '<td >'
                                                            + corText
                                                        + '</td>'
                                                + '</tr>';
                                });

                                var row = '<tr>'
                                            + '<td>'
                                                + item.QuestionDefinition
                                            + '</td>'
                                            + '<td >'
                                                + item.QuestionType.Name
                                            + '</td>'
                                            + '<td style="display:none" id="questionID">'
                                            + item.ID
                                            + '</td>'
                                            + '<td style="display:none">'
                                            + item.QuestionTypeID
                                            + '</td>'
                                            + '<td onclick="openOptionList(this)">'
                                                + 'Şıklar'
                                                + '<table id="tblOptions"  style="display:none"><tbody>' + optionRows + '</tbody></table>'
                                            + '</td>'
                                            + '<td onclick="openQuestionEditForm(1,this)">'
                                                + 'Düzenle'
                                            + '</td>'
                                            + '<td onclick="deleteQuestion(this)">'
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

    $("#tblAddOption").on("click", "input[class=clsIsCorrect]", function () {
        $("#lblCorrect").html("");
        var table = $(this).closest('table');
        $('td input[class=clsIsCorrect]', table).prop('checked', false);
        $(this).prop("checked", true);
    });
});

function getQuestionFromSubjectID(subjectID, difficultyID) {
    $.ajax({
        type: "POST",
        url: 'QuestionPreLiminary/getQuestionFromSubjectID',
        data: { subjectID: subjectID, difficultyID: difficultyID },
        dataType: 'json',
        success: function (data) {

            if (data.Code == 0) {
              
                var row = "";
                $.each(data.questions, function (index, item) {
                    var optionRows = "";

                    $.each(item.QuestionOption, function (index2, item2) {

                        var corText = item2.IsCorrect == true ? "D" : "Y";
                        optionRows += '<tr>'
                                            + '<td>'
                                                + item2.OptionKey
                                            + '</td>'
                                            + '<td>'
                                                + item2.OptionValue
                                            + '</td>'
                                            + '<td style=display:none>'
                                                + item2.IsCorrect
                                            + '</td>'
                                            + '<td style=display:none>'
                                                + item2.ID
                                            + '</td>'
                                            + '<td style=display:none>'
                                                + item2.QuestionID
                                            + '</td>'
                                           + '<td >'
                                                + corText
                                            + '</td>'
                                    + '</tr>';
                    });

                    row += '<tr>'
                                + '<td>'
                                    + item.QuestionDefinition
                                + '</td>'
                                + '<td >'
                                    + item.QuestionType.Name
                                + '</td>'
                                + '<td style="display:none" id="questionID">'
                                + item.ID
                                + '</td>'
                                + '<td style="display:none">'
                                + item.QuestionTypeID
                                + '</td>'
                                + '<td onclick="openOptionList(this)">'
                                    + 'Şıklar'
                                    + '<table id="tblOptions"  style="display:none"><tbody>' + optionRows + '</tbody></table>'
                                + '</td>'
                                + '<td onclick="openQuestionEditForm(1,this)">'
                                    + 'Düzenle'
                                + '</td>'
                                + '<td onclick="deleteQuestion(this)">'
                                    + 'Sil'
                                + '</td>'
                               
                            + '</tr>';
                });
                $("#tblQuestion").find('tbody').html(row);
                
                if ($("#tblDifficulty").find('input[type="checkbox"]:checked').length > 0)
                    $("#tblQuestion").parent().show();
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

function openQuestionEditForm(type, th) {
    $("#ddlQuestionSubect").val($('#tblSubject').find('input[type="checkbox"]:checked').parent().parent().find("td").eq(2).html());
    $("#ddlQuestionDifficulty").val($('#tblDifficulty').find('input[type="checkbox"]:checked').parent().parent().find("td").eq(5).html());

    $("#txtOptionCount").parent().parent().show();
    $("#txtQuestionDefinition").removeAttr("onchange");

    if (type == 0) {
        $("#btnQuestionSubmit").attr("questionID", "");
        $("#ddlQuestionType").val($("#ddlQuestionType option:first").val());
        $("#txtQuestionDefinition").val("");
        
        $("#ddlQuestionSubect").attr("readonly", "readonly");
        $("#ddlQuestionDifficulty").attr("readonly", "readonly");
        $("#txtOptionCount").val('');
        $("#tblAddOption").find("tbody").html("")
        $("#tblAddOption").hide();
        $("#txtOptionCount").attr("onkeyup", "addOption(this)");
        $("#txtOptionCount").attr("onmouseup", "addOption(this)");
        

        $("#dvQuestionAdd").dialog({
            modal: false,
            title: "Soru kayıt",
            zIndex: 10000,
            autoOpen: true,
            width: "auto",
            resizable: false,
        });

    }
    else {
        $("#btnQuestionSubmit").attr("questionID", $(th).parent().find("td").eq(2).html());
        $("#ddlQuestionType").val($(th).parent().find("td").eq(3).html());
        $("#txtQuestionDefinition").val($(th).parent().find("td").eq(0).html());

        
        $("#txtOptionCount").val($(th).parent().find("table[id=tblOptions] tr").length);
        $("#txtOptionCount").attr("onkeyup", "addOptionForUpdate(this)");
        $("#txtOptionCount").attr("onmouseup", "addOptionForUpdate(this)");
        fillOption(th)
       
        $("#ddlQuestionSubect").removeAttr("readonly");
        $("#ddlQuestionDifficulty").attr("readonly");
        
        
        $("#dvQuestionAdd").dialog({
            modal: false,
            title: "Soru kayıt",
            zIndex: 10000,
            autoOpen: true,
            width: "auto",
            resizable: false,
        });

    }
}

function openOptionList(th) {
  
    $('#tblQuestionOption').find('tbody').html($(th).find('tbody').html());

    $("#dvQuestionOption").dialog({
        modal: false,
        title: "Şıklar",
        zIndex: 10000,
        autoOpen: true,
        width: "auto",
        resizable: false,
    });
}

function addOption(th) {
    var html = "";
    $("#tblAddOption").hide();
    
    if ($(th).val().trim() != "" && $(th).val() > 0) {

        for (var i = 0; i < $(th).val() ; i++) {
            html += '<tr>'
                        + '<td>'
                            + '<input type="text" value="" class="form-control" data-val="true" data-val-required="Bu alan boş bırakılamaz." name="QuestionOption[' + i + '].OptionKey" style="width:50px" />'
                            + '<span class="field-validation-valid text-danger" data-valmsg-for="QuestionOption[' + i + '].OptionKey" data-valmsg-replace="true"></span>'
                        + '</td>'
                        + '<td>'
                            + '<input type="text" name="QuestionOption[' + i + '].OptionValue" class="form-control" data-val="true" data-val-required="Bu alan boş bırakılamaz." />'
                            + '<span class="field-validation-valid text-danger" data-valmsg-for="QuestionOption[' + i + '].OptionValue" data-valmsg-replace="true"></span>'
                        + '</td>'
                        + '<td><input type="checkbox" class="clsIsCorrect" name="QuestionOption[' + i + '].IsCorrect" value="true" /></td>'
                        
                    + '</tr>';
        }
        $("#tblAddOption").find("tbody").html(html)
        $("#tblAddOption").show();
        $('#frmAddQuestion').data('validator', null);
        $.validator.unobtrusive.parse($('#frmAddQuestion'));
    }
    
    

}

function fillOption(th) {
    var html = "";
    $("#tblAddOption").hide();

    if ($("#txtOptionCount").val().trim() != "" && $("#txtOptionCount").val() > 0) {
        var table = $(th).parent().find("td").find("table tr");
        
        for (var i = 0; i < $("#txtOptionCount").val() ; i++) {
            var isCorrect = table.eq(i).find("td").eq(2).html() == "true" ? "checked" : "";
           
            html += '<tr>'
                        + '<td>'
                            + '<input type="text" value="' + table.eq(i).find("td").eq(0).html() + '" class="form-control" data-val="true" data-val-required="Bu alan boş bırakılamaz." name="QuestionOption[' + i + '].OptionKey" style="width:50px" />'
                            + '<span class="field-validation-valid text-danger" data-valmsg-for="QuestionOption[' + i + '].OptionKey" data-valmsg-replace="true"></span>'
                        + '</td>'
                        + '<td>'
                            + '<input type="text"  value="' + table.eq(i).find("td").eq(1).html() + '" name="QuestionOption[' + i + '].OptionValue" class="form-control" data-val="true" data-val-required="Bu alan boş bırakılamaz." />'
                            + '<span class="field-validation-valid text-danger" data-valmsg-for="QuestionOption[' + i + '].OptionValue" data-valmsg-replace="true"></span>'
                        + '</td>'
                        + '<td><input type="checkbox" ' + isCorrect + ' class="clsIsCorrect" name="QuestionOption[' + i + '].IsCorrect" value="true" /></td>'
                        + '<td style="display:none"><input type="text" value="' + table.eq(i).find("td").eq(3).html() + '" class="form-control" data-val="true" data-val-required="Bu alan boş bırakılamaz." name="QuestionOption[' + i + '].ID" style="width:50px" /></td>'
                        + '<td style="display:none"><input type="text" value="' + table.eq(i).find("td").eq(4).html() + '" class="form-control" data-val="true" data-val-required="Bu alan boş bırakılamaz." name="QuestionOption[' + i + '].QuestionID" style="width:50px" /></td>'
                    + '</tr>';
        }
        
        $("#tblAddOption").find("tbody").html(html)
        
        $("#tblAddOption").show();
        $('#frmAddQuestion').data('validator', null);
        $.validator.unobtrusive.parse($('#frmAddQuestion'));
    }



}

function addOptionForUpdate(th) {
    var tableRow = $("#tblQuestion td").filter(function () {
        return $(this).text() == $("#btnQuestionSubmit").attr("questionID");
    }).closest("tr");

    var table = tableRow.find("td").find("table tr");
    var html = "";
    for (var i = 0; i < $("#txtOptionCount").val() ; i++) {
        var isCorrect = table.eq(i).find("td").eq(2).html() == "true" ? "checked" : "";
        var optionKey = table.eq(i).find("td").eq(0).html() == undefined ? "" : table.eq(i).find("td").eq(0).html();
        var optionValue = table.eq(i).find("td").eq(1).html() == undefined ? "" : table.eq(i).find("td").eq(1).html();
        var ID = table.eq(i).find("td").eq(3).html() == undefined ? "" : table.eq(i).find("td").eq(3).html();
        var questionID = table.eq(i).find("td").eq(4).html() == undefined ? "" : table.eq(i).find("td").eq(4).html();
        html += '<tr>'
                    + '<td>'
                        + '<input type="text" value="' + optionKey + '" class="form-control" data-val="true" data-val-required="Bu alan boş bırakılamaz." name="QuestionOption[' + i + '].OptionKey" style="width:50px" />'
                        + '<span class="field-validation-valid text-danger" data-valmsg-for="QuestionOption[' + i + '].OptionKey" data-valmsg-replace="true"></span>'
                    + '</td>'
                    + '<td>'
                        + '<input type="text"  value="' + optionValue + '" name="QuestionOption[' + i + '].OptionValue" class="form-control" data-val="true" data-val-required="Bu alan boş bırakılamaz." />'
                        + '<span class="field-validation-valid text-danger" data-valmsg-for="QuestionOption[' + i + '].OptionValue" data-valmsg-replace="true"></span>'
                    + '</td>'
                    + '<td><input type="checkbox" ' + isCorrect + ' class="clsIsCorrect" name="QuestionOption[' + i + '].IsCorrect" value="true" /></td>'
                    + '<td style="display:none"><input type="text" value="' + ID + '" class="form-control" data-val="true" data-val-required="Bu alan boş bırakılamaz." name="QuestionOption[' + i + '].ID" style="width:50px" /></td>'
                    + '<td style="display:none"><input type="text" value="' + questionID + '" class="form-control" data-val="true" data-val-required="Bu alan boş bırakılamaz." name="QuestionOption[' + i + '].QuestionID" style="width:50px" /></td>'
                + '</tr>';
    }

    $("#tblAddOption").find("tbody").html(html)
    $('#frmAddQuestion').data('validator', null);
    $.validator.unobtrusive.parse($('#frmAddQuestion'));
}

function deleteQuestion(th) {
    var ID = $(th).parent().find("td").eq(2).html();
    var name = $(th).parent().find("td").eq(0).html();
   
    confirmBox(name + " tanımlı soruyu silmek istediğine eminmisin",
        "Uyarı",
        function () {
            $.ajax({
                type: "POST",
                url: 'QuestionPreLiminary/deleteQuestion',
                data: { ID: ID },
                dataType: 'json',
                success: function (data) {
                    if (data.Code == 0) {
                        $(th).parent().remove();
                        beautyAlert(data.questions[0].QuestionDefinition + " adlı soru silindi");
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

function getFormDataforQuestion($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    list = [];
    var child_Array = {}
    
    $.map(unindexed_array, function (n, i) {
        
        if (n['name'] != "txtOptionCount") {
            if (n['name'].indexOf("QuestionOption") == -1) {
                indexed_array[n['name']] = n['value'];
               
            }
            else {
                if (child_Array[n['name'].split('.')[1]] == undefined) {
                    child_Array[n['name'].split('.')[1]] = n['value']
                    if (unindexed_array.length - 1 == i) {
                        if (child_Array["IsCorrect"] == undefined)
                            child_Array["IsCorrect"] = "false"
                        
                        if (child_Array["ID"] == undefined)
                            child_Array["ID"] = "0"
                        if (child_Array["QuestionID"] == undefined)
                            child_Array["QuestionID"] = "0"
                        
                        list.push(child_Array);
                    }
                }
                else {
                    if (child_Array["IsCorrect"] == undefined)
                        child_Array["IsCorrect"] = "false"
                  
                    if (child_Array["ID"] == undefined)
                        child_Array["ID"] = "0"
                    if (child_Array["QuestionID"] == undefined)
                        child_Array["QuestionID"] = "0"
                    
                    list.push(child_Array);
                    child_Array = {};
                    child_Array[n['name'].split('.')[1]] = n['value']

                }

            }
        }
        
    });
    
    indexed_array['QuestionOption'] = list;
   
    return indexed_array;
}

function questionTypeChange() {
    $("#tblAddOption").find('tbody').html("");
    $("#tblAddOption").hide();
    if ($("#ddlQuestionType").val() == 2) {
        $("#txtOptionCount").parent().parent().hide();
        $("#txtQuestionDefinition").attr("onchange", "addOptionForDragAndDrop()")
        
    }
    else {
        $("#txtOptionCount").parent().parent().show();
        $("#txtQuestionDefinition").removeAttr("onchange");
    }
}

function addOptionForDragAndDrop() {
    var html = "";
    var i = 0;
    $($("#txtQuestionDefinition").val()).map(function () {
        $(this).find("span[class=DropSlot]").each(function (index, item) {
            var key = $(item).attr("key");
            var value = $(item).attr("value");
            html += '<tr>'
                        + '<td>'
                            + '<input type="text" value="' + key + '" class="form-control" data-val="true" data-val-required="Bu alan boş bırakılamaz." name="QuestionOption[' + i + '].OptionKey" style="width:50px" readonly />'
                            + '<span class="field-validation-valid text-danger" data-valmsg-for="QuestionOption[' + i + '].OptionKey" data-valmsg-replace="true"></span>'
                        + '</td>'
                        + '<td>'
                            + '<input type="text" value="' + value + '" name="QuestionOption[' + i + '].OptionValue" class="form-control" data-val="true" data-val-required="Bu alan boş bırakılamaz." />'
                            + '<span class="field-validation-valid text-danger" data-valmsg-for="QuestionOption[' + i + '].OptionValue" data-valmsg-replace="true"></span>'
                        + '</td>'
                        + '<td><input type="checkbox" class="clsIsCorrect" name="QuestionOption[' + i + '].IsCorrect" value="true" checked /></td>'

                    + '</tr>';
            i += 1;
        });
    });

    $("#tblAddOption").find("tbody").html(html)
    $("#tblAddOption").show();
    $('#frmAddQuestion').data('validator', null);
    $.validator.unobtrusive.parse($('#frmAddQuestion'));
}