//#region FILTRE

$(document).ready(function () {
    

    $("#frmAddFilter").on('submit', function (e) {

        e.preventDefault();
        var result = $("#frmAddFilter").valid();

        if (result) {
            var educationProgramText = $("#ddlEducationProgram").val() == -1 ? "filtre yok" : $("#ddlEducationProgram option:selected").text();
            var lessonText = $("#ddlLesson").val() == -1 ? "filtre yok" : $("#ddlLesson option:selected").text();
            var subjectText = $("#ddlSubject").val() == -1 ? "filtre yok" : $("#ddlSubject option:selected").text();
            var DifficultyText = $("#ddlDifficulty").val() == -1 ? "filtre yok" : $("#ddlDifficulty option:selected").text();
            var questionTypeText = $("#ddlQuestionType").val() == -1 ? "filtre yok" : $("#ddlQuestionType option:selected").text();
            var languageText = $("#ddlLanguage").val() == -1 ? "filtre yok" : $("#ddlLanguage option:selected").text();
            var questionOptionCountText = $("#txtQuestionOptionCount").val() == "" ? "filtre yok" : $("#txtQuestionOptionCount").val();
            var questionOptionCountValue = $("#txtQuestionOptionCount").val() == "" ? "-1" : $("#txtQuestionOptionCount").val();
            var row = '<tr>'
                        + '<td>' + educationProgramText + '</td>'
                        + '<td>' + lessonText + '</td>'
                        + '<td>' + subjectText + '</td>'
                        + '<td>' + DifficultyText + '</td>'
                        + '<td>' + questionTypeText + '</td>'
                        + '<td>' + languageText + '</td>'
                        + '<td id="QuestionCount">' + $("#txtQuestionCount").val() + '</td>'
                        + '<td >' + questionOptionCountText + '</td>'
                        + '<td onclick="deleteFilter(this)">Sil</td>'
                        + '<td id="QuestionOptionCount" style = "display:none">' + questionOptionCountValue + '</td>'
                        + '<td style="display:none" id="EducationProgramID">' + $("#ddlEducationProgram").val() + '</td>'
                        + '<td style="display:none" id="LessonID">' + $("#ddlLesson").val() + '</td>'
                        + '<td style="display:none" id="SubjectID">' + $("#ddlSubject").val() + '</td>'
                        + '<td style="display:none" id="DifficultyID">' + $("#ddlDifficulty").val() + '</td>'
                        + '<td style="display:none" id="QuestionTypeID">' + $("#ddlQuestionType").val() + '</td>'
                        + '<td style="display:none" id="LanguageID">' + $("#ddlLanguage").val() + '</td>'
                    + '</tr>'
            $("#tblFilter").find("tbody").append(row);
        }
    });
});

function openFilterEditForm() {
    
    
    $("#txtQuestionCount").val("");
    $("#txtQuestionOptionCount").val("");
    $("#ddlEducationProgram").val(-1);
    $("#ddlLesson").val(-1);
    $("#ddlSubject").val(-1);
    $("#ddlDifficulty").val(-1);
    $("#ddlQuestionType").val(-1);
    $("#ddlLanguage").val(-1);
    $("#dvAddFilter").dialog({
        modal: false,
        title: "Filtre Ekleme",
        zIndex: 10000,
        autoOpen: true,
        width: "auto",
        resizable: false,
    });
   
}

function fillLessonDropDown() {
    var id = $("#ddlEducationProgram").val();
    $.ajax({
        type: "POST",
        url: 'QuestionPreLiminary/getLessonFromEducationID',
        data: { educationProgramID: id },
        dataType: 'json',
        success: function (data) {
            if (data.Code == 0) {
                $("#ddlLesson").empty();
                $("#ddlLesson").append(new Option("Seçim", "-1"));
                $.each(data.lessions, function (index, item) {
                    $("#ddlLesson").append(new Option(item.Name, item.ID));
                });
               
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

function fillSubjectDropDown() {
    var id = $("#ddlLesson").val();
    $.ajax({
        type: "POST",
        url: 'QuestionPreLiminary/getSubjectFromLessonID',
        data: { lessonID: id },
        dataType: 'json',
        success: function (data) {
            if (data.Code == 0) {
                $("#ddlSubject").empty();
                $("#ddlSubject").append(new Option("Seçim", "-1"));
                $.each(data.subjects, function (index, item) {
                    $("#ddlSubject").append(new Option(item.Name, item.ID));
                });

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

function deleteFilter(th) {
    $(th).parent().remove();
}
//#endregion

//#region QUESTİONS
function getfilterQuestions() {
    var filterData = tableToJson("tblFilter")
   
    $.ajax({
        type: "POST",
        url: 'PrepareExam/getQuestionFromFilters',
        data: JSON.stringify(filterData),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            var html = "";
            if (data.Code == 0) {
                $.each(data.questions, function (index, item) {
                    
                  
                    var motherDiv = "";
                    if (item.QuestionTypeID == 1) {//çoktan seçmeli ise

                        motherDiv = '<div class="Question" id="' + item.ID + '">' + '<span class="QuestionNumber">' + (index + 1) + ')</span>'  + item.QuestionDefinition;

                        $.each(item.QuestionOption, function (index2, item2) {
                            motherDiv += '<div>'
                                + '<input type="radio" name="' + item.ID + '"  value="' + item2.ID + '">'+ item2.OptionKey + ") " + item2.OptionValue + '</div>';
                        });
                        motherDiv = motherDiv + '</div>';
                    }
                    else {
                        var x = $(item.QuestionDefinition).find('span').removeAttr('value');
                        motherDiv = '<div class="Question" id="radio_' + item.ID + '">' + '<span class="QuestionNumber">' + (index + 1) + ')</span>' + x.parent().html();

                        var dragDiv = '<div class="options">';
                        $.each(item.QuestionOption, function (index2, item2) {
                            dragDiv += '<div class="DragAnswer">' + item2.OptionValue + '</div>'
                        });
                        dragDiv = dragDiv + '</div>'
                        motherDiv = motherDiv + dragDiv + '</div>';
                    }
                    html += motherDiv;
                });
               
                $("#questionList").html(html);
                
                $(".DragAnswer").draggable({
                    revert: function (event, ui) {
                        $(this).data("uiDraggable").originalPosition = {
                            top: 0,
                            left: 0
                        };
                        return !event;
                    }
                    
                });

                $(".DropSlot").droppable({
                    accept: ".DragAnswer",
                    
                    drop: function (event, ui) {
                        $(this).addClass('ui-state-highlight');
                        ui.draggable.position({
                            of: $(this),
                            at: 'top+auto right+auto'
                        });
                       
                        $(this).droppable('option', 'accept', ui.draggable);
                       
                    },
                    out: function (event, ui) {
                        $(this).removeClass('ui-state-highlight')
                        $(this).droppable('option', 'accept', '.DragAnswer');
                    }   
               
                
                });

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

function tableToJson(tableID) {
    var data = [];
    $("#" + tableID + " tbody tr").each(function (index, item) {
        var rowData = {};
        $(item).find("td").each(function (index2, item2) {
       
            if ($(item2).attr("id") != undefined) {
                rowData[$(item2).attr("id")] = $(item2).html();
            }
        })
        data.push(rowData);
    });

    
    return data;
}
//#endregion




