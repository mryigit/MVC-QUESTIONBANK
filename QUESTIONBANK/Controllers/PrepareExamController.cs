using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using DATAMODEL.DB;

namespace QUESTIONBANK.Controllers
{
    public class PrepareExamController : Controller
    {
        private QuestionProjeEntities db = new QuestionProjeEntities();

        // GET: PrepareExam
        public ActionResult Index()
        {
            SERVICE.service ss = new SERVICE.service();
            List<SelectListItem> EducationProgramList = new List<SelectListItem>();
            EducationProgramList.AddRange(new SelectList(ss.getEducationProgramAll().educationPrograms, "ID", "Name"));
            EducationProgramList.Insert(0, new SelectListItem { Text = "Seçim", Value = "-1" });
            ViewBag.EducationProgramID = EducationProgramList;

            List<SelectListItem> DifficultyList = new List<SelectListItem>();
            DifficultyList.AddRange(new SelectList(ss.getDifficultyAll().difficultys, "ID", "Name"));
            DifficultyList.Insert(0, new SelectListItem { Text = "Seçim", Value = "-1" });
            ViewBag.DifficultyID = DifficultyList;

            List<SelectListItem> QuestionTypeList = new List<SelectListItem>();
            QuestionTypeList.AddRange(new SelectList(ss.getQuestionTypeAll(), "ID", "Name"));
            QuestionTypeList.Insert(0, new SelectListItem { Text = "Seçim", Value = "-1" });
            ViewBag.QuestionTypeID = QuestionTypeList;

            List<SelectListItem> LanguageList = new List<SelectListItem>();
            LanguageList.AddRange(new SelectList(ss.getLanguageAll(), "ID", "Name"));
            LanguageList.Insert(0, new SelectListItem { Text = "Seçim", Value = "-1" });
            ViewBag.LanguageID = LanguageList;

            List<Lesson> lesson = new List<Lesson>();
            List<SelectListItem> LessonList = new List<SelectListItem>();
            LessonList.AddRange(new SelectList(lesson, "ID", "Name"));
            LessonList.Insert(0, new SelectListItem { Text = "Seçim", Value = "-1" });
            ViewBag.LessonID = LessonList;

            List<Subject> subject = new List<Subject>();
            List<SelectListItem> SubjectList = new List<SelectListItem>();
            SubjectList.AddRange(new SelectList(subject, "ID", "Name"));
            SubjectList.Insert(0, new SelectListItem { Text = "Seçim", Value = "-1" });
            ViewBag.SubjectID = SubjectList;
            return View();
        }

        public ActionResult getQuestionFromFilters(List<ExamFilterModel> filters)
        {
            SERVICE.service ss = new SERVICE.service();
            return Json(ss.getQuestionFromFilters(filters));
        }
    }
}
