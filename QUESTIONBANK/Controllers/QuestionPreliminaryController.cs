using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DATAMODEL.DB;
using System.IO;

namespace QUESTIONBANK.Controllers
{
    public class QuestionPreliminaryController : Controller
    {
        // GET: QuestionPreliminary
        public ActionResult Index()
        {
            SERVICE.service ss = new SERVICE.service();
            ViewBag.LanguageID = new SelectList(ss.getLanguageAll(), "ID", "Name");
            ViewBag.EducationProgramID = new SelectList(ss.getEducationProgramAll().educationPrograms, "ID", "Name");
            ViewBag.SubjectID = new SelectList(ss.getSubjectAll().subjects, "ID", "Name");
            ViewBag.DifficultyID = new SelectList(ss.getDifficultyAll().difficultys, "ID", "Name");
            ViewBag.QuestionTypeID = new SelectList(ss.getQuestionTypeAll(), "ID", "Name");

            List<Lesson> lesson = new List<Lesson>();
            ViewBag.LessonID = new SelectList(lesson, "ID", "Name");
            return View();
        }



        #region EDUCATION PROGRAM
        public ActionResult getEducationProgramAll()
        {
            SERVICE.service ss = new SERVICE.service();
            return Json(ss.getEducationProgramAll());
        }

        public ActionResult addEducationProgram(EducationProgram educationProgram)
        {
            SERVICE.service ss = new SERVICE.service();
            educationProgram.State = true;
            return Json(ss.addEducationProgram(educationProgram));
        }

        public ActionResult updateEducationProgram(EducationProgram educationProgram)
        {
            SERVICE.service ss = new SERVICE.service();
            educationProgram.State = true;
            return Json(ss.updateEducationProgram(educationProgram));
        }

        public ActionResult deleteEducationProgram(int ID)
        {
            SERVICE.service ss = new SERVICE.service();
            return Json(ss.deleteEducationProgram(ID));
        }
        #endregion

        #region LESSON
        public ActionResult getLessonFromEducationID(int educationProgramID)
        {
            SERVICE.service ss = new SERVICE.service();
            return Json(ss.getLessonFromEducationID(educationProgramID));
        }

        public ActionResult addLesson(Lesson lesson)
        {
            lesson.State = true;
            SERVICE.service ss = new SERVICE.service();
            return Json(ss.addLesson(lesson));
        }

        public ActionResult updateLesson(Lesson lesson)
        {
            lesson.State = true;
            SERVICE.service ss = new SERVICE.service();
            return Json(ss.updateLesson(lesson));
        }

        public ActionResult deleteLesson(int ID)
        {
            SERVICE.service ss = new SERVICE.service();
            return Json(ss.deleteLesson(ID));
        }
        #endregion

        #region SUBJECT
        public ActionResult getSubjectFromLessonID(int lessonID)
        {
            SERVICE.service ss = new SERVICE.service();
            return Json(ss.getSubjectFromLessonID(lessonID));
        }

        public ActionResult addSubject(Subject subject)
        {
            subject.State = true;
            SERVICE.service ss = new SERVICE.service();
            return Json(ss.addSubject(subject));
        }

        public ActionResult updateSubject(Subject subject)
        {
            subject.State = true;
            SERVICE.service ss = new SERVICE.service();
            return Json(ss.updateSubject(subject));
        }

        public ActionResult deletesubject(int ID)
        {
            SERVICE.service ss = new SERVICE.service();
            return Json(ss.deleteSubject(ID));
        }
        #endregion

        #region DIFFICULTY
        public ActionResult getDifficultyAll()
        {
            SERVICE.service ss = new SERVICE.service();
            return Json(ss.getDifficultyAll());
        }

        public ActionResult addDifficulty(Difficulty difficulty)
        {
            SERVICE.service ss = new SERVICE.service();
            difficulty.State = true;
            return Json(ss.addDifficulty(difficulty));
        }

        public ActionResult updateDifficulty(Difficulty difficulty)
        {
            SERVICE.service ss = new SERVICE.service();
            difficulty.State = true;
            return Json(ss.updateDifficulty(difficulty));
        }

        public ActionResult deleteDifficulty(int ID)
        {
            SERVICE.service ss = new SERVICE.service();
            return Json(ss.deleteDifficulty(ID));
        }
        #endregion

        #region QUESTION
        //getQuestionFromSubjectID
        public ActionResult getQuestionFromSubjectID(int subjectID, int difficultyID)
        {
            SERVICE.service ss = new SERVICE.service();
            return Json(ss.getQuestionFromSubjectID(subjectID, difficultyID));
        }
        
        public ActionResult addQuestion(Question question)
        {
            SERVICE.service ss = new SERVICE.service();
            return Json(ss.addQuestion(question));
        }

        public ActionResult updateQuestion(Question question)
        {
            SERVICE.service ss = new SERVICE.service();
            return Json(ss.updateQuestion(question));
        }

        public ActionResult deletequestion(int ID)
        {
            SERVICE.service ss = new SERVICE.service();
            return Json(ss.deleteQuestion(ID));
        }

        #endregion

    }
}