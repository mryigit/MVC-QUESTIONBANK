using System;
using System.Collections.Generic;

namespace DATAMODEL.DB
{
    public class ExamFilterModel
    {
        public int EducationProgramID { get; set; }
        public int LessonID { get; set; }
        public int SubjectID { get; set; }
        public int DifficultyID { get; set; }
        public int QuestionTypeID { get; set; }
        public int LanguageID { get; set; }
        public int QuestionCount { get; set; }
        public int QuestionOptionCount { get; set; }
    }
}