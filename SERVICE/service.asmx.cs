using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using DATAMODEL.DB;
using SERVICE.Responses;
using System.Data.Entity;


namespace SERVICE
{
    /// <summary>
    /// Summary description for service
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class service : System.Web.Services.WebService
    {

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }

        [WebMethod]
        public List<Language> getLanguageAll()
        {
            QuestionProjeEntities db = new QuestionProjeEntities();
            return db.Language.ToList();
        }

        public List<QuestionType> getQuestionTypeAll()
        {
            QuestionProjeEntities db = new QuestionProjeEntities();
            return db.QuestionType.ToList();
        }

        #region EDUCATION PROGRAM
        [WebMethod]
        public EducationProgramListResponse addEducationProgram(EducationProgram educationProgram)
        {
            EducationProgramListResponse response = new EducationProgramListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();

            try
            {
                db.EducationProgram.Add(educationProgram);
                db.SaveChanges();
                response.educationPrograms.Add(educationProgram);

            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }

            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }

        [WebMethod]
        public EducationProgramListResponse updateEducationProgram(EducationProgram educationProgram)
        {
            EducationProgramListResponse response = new EducationProgramListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();

            try
            {
                db.EducationProgram.Attach(educationProgram);
                db.Entry(educationProgram).State = EntityState.Modified;
                db.SaveChanges();
                response.educationPrograms.Add(educationProgram);
            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }

            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }

        [WebMethod]
        public EducationProgramListResponse deleteEducationProgram(int ID)
        {
            EducationProgramListResponse response = new EducationProgramListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();

            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                EducationProgram educationProgram = db.EducationProgram.Where(r=>r.ID == ID).SingleOrDefault();
                educationProgram.State = false;
                db.SaveChanges();
                response.educationPrograms.Add(educationProgram);
            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }

            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }

        [WebMethod]
        public EducationProgramListResponse getEducationProgramAll()
        {
            EducationProgramListResponse response = new EducationProgramListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                response.educationPrograms = db.EducationProgram
                    .Where(r=>r.State == true).ToList();

            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }


            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }
        #endregion

        #region LESSON
        [WebMethod]
        public LessonListResponse addLesson(Lesson lesson)
        {
            LessonListResponse response = new LessonListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();

            try
            {
                db.Lesson.Add(lesson);
                db.SaveChanges();
                response.lessions.Add(lesson);
            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }


            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }

        [WebMethod]
        public LessonListResponse updateLesson(Lesson lesson)
        {
            LessonListResponse response = new LessonListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();

            try
            {
                db.Lesson.Attach(lesson);
                db.Entry(lesson).State = EntityState.Modified;
                db.SaveChanges();
                response.lessions.Add(lesson);
            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }


            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }

        [WebMethod]
        public LessonListResponse getLessonFromEducationID(int educationProgramID)
        {

            LessonListResponse response = new LessonListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                response.lessions = db.Lesson
                    .Where(r=>r.EducationProgramID == educationProgramID && r.State == true).ToList();

            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }


            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }

        public LessonListResponse deleteLesson(int ID)
        {
            LessonListResponse response = new LessonListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();

            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                Lesson lesson = db.Lesson.Where(r => r.ID == ID).SingleOrDefault();
                lesson.State = false;
                db.SaveChanges();
                response.lessions.Add(lesson);
            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }

            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }
        #endregion

        #region SUBJECT
        [WebMethod]
        public SubjectListResponse addSubject(Subject subject)
        {
            SubjectListResponse response = new SubjectListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();

            try
            {
                db.Subject.Add(subject);
                db.SaveChanges();
                response.subjects.Add(subject);
            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }


            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }

        [WebMethod]
        public SubjectListResponse updateSubject(Subject subject)
        {
            SubjectListResponse response = new SubjectListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();

            try
            {
                db.Subject.Attach(subject);
                db.Entry(subject).State = EntityState.Modified;
                db.SaveChanges();
                response.subjects.Add(subject);
            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }


            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }

        [WebMethod]
        public SubjectListResponse deleteSubject(int ID)
        {
            SubjectListResponse response = new SubjectListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();

            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                Subject subject = db.Subject.Where(r => r.ID == ID).SingleOrDefault();
                subject.State = false;
                db.SaveChanges();
                response.subjects.Add(subject);
            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }

            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }

        [WebMethod]
        public SubjectListResponse getSubjectFromLessonID(int lessonID)
        {

            SubjectListResponse response = new SubjectListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                response.subjects = db.Subject.Where(r=>r.LessonID == lessonID && r.State == true).ToList();

            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }


            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }

        public SubjectListResponse getSubjectAll()
        {

            SubjectListResponse response = new SubjectListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                response.subjects = db.Subject.Where(r=>r.State == true).ToList();

            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }


            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }
        #endregion

        #region DIFFICULTY
        [WebMethod]
        public DifficultyListResponse addDifficulty(Difficulty difficulty)
        {
            DifficultyListResponse response = new DifficultyListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();

            try
            {
                db.Difficulty.Add(difficulty);
                db.SaveChanges();
                response.difficultys.Add(difficulty);
            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }


            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }

        [WebMethod]
        public DifficultyListResponse updateDifficulty(Difficulty difficulty)
        {
            DifficultyListResponse response = new DifficultyListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();

            try
            {
                db.Difficulty.Attach(difficulty);
                db.Entry(difficulty).State = EntityState.Modified;
                db.SaveChanges();
                response.difficultys.Add(difficulty);
            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }


            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }

        [WebMethod]
        public DifficultyListResponse deleteDifficulty(int ID)
        {
            DifficultyListResponse response = new DifficultyListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();

            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                Difficulty difficulty = db.Difficulty.Where(r => r.ID == ID).SingleOrDefault();
                difficulty.State = false;
                db.SaveChanges();
                response.difficultys.Add(difficulty);
            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }

            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }

        [WebMethod]
        public DifficultyListResponse getDifficultyAll()
        {

            DifficultyListResponse response = new DifficultyListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                response.difficultys = db.Difficulty.Where(r=>r.State == true).ToList();

            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }


            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }
        #endregion

        #region QUESTİION
        [WebMethod]
        public QuestionListResponse getQuestionFromSubjectID(int subjectID, int diffiCultyID)
        {

            QuestionListResponse response = new QuestionListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();
           
            try
            {
                response.questions = db.Question.Where(r=>r.SubjectID == subjectID && r.DifficultyID == diffiCultyID && r.State == true).ToList();
            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }


            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }

        [WebMethod]
        public QuestionListResponse getQuestionFromFilters(List<ExamFilterModel> filters)
        {

            QuestionListResponse response = new QuestionListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();

            try
            {
                QuestionListResponse qList = new QuestionListResponse();
                foreach (var filter in filters)
                {
                    
                    var idList = qList.questions.Select(c => c.ID);
                    var question = db.Question.Where(r => r.State == true && !idList.Contains(r.ID));

                    if (filter.EducationProgramID != -1 && question == null)
                        question =  question.Where(r=> r.EducationProgramID == filter.EducationProgramID);

                    if (filter.LessonID != -1)
                        question = question.Where(r=>r.LessonID == filter.LessonID);

                    if (filter.SubjectID != -1)
                        question = question.Where(r=>r.SubjectID == filter.SubjectID);

                    if (filter.DifficultyID != -1)
                        question = question.Where(r=>r.DifficultyID == filter.DifficultyID);

                    if (filter.QuestionTypeID != -1)
                        question = question.Where(r=>r.QuestionTypeID == filter.QuestionTypeID);

                    if (filter.LanguageID != -1)
                        question = question.Where(r=>r.LanguageID == filter.LanguageID);

                    if (filter.QuestionCount != -1)
                        question = question.OrderBy(r => Guid.NewGuid()).Take(filter.QuestionCount);


                    if (filter.QuestionOptionCount != -1)
                        question = question.Where(r=>r.QuestionOption.Count == filter.QuestionOptionCount);
                    
                    qList.questions.AddRange(question.ToList());
                }
               
                response.questions = qList.questions;
            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }


            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }

        [WebMethod]
        public QuestionListResponse addQuestion(Question question)
        {
            
            QuestionListResponse response = new QuestionListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();

            try
            {
                db.Question.Add(question);
                db.SaveChanges();
                question.QuestionType = db.QuestionType.Where(r => r.ID == question.QuestionTypeID).FirstOrDefault();
                response.questions.Add(question);
            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }


            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }

        [WebMethod]
        public QuestionListResponse updateQuestion(Question question)
        {
            QuestionListResponse response = new QuestionListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();

            try
            {
                
                var idList = question.QuestionOption.Select(r => r.ID).ToList();

                db.QuestionOption.RemoveRange(db.QuestionOption.Where(r => r.QuestionID == question.ID && !idList.Contains(r.ID)));

                foreach (var item in question.QuestionOption)
                {
                    if (item.ID != 0)
                    {
                        db.QuestionOption.Attach(item);
                        db.Entry(item).State = EntityState.Modified;
                    }
                    else
                    {
                        item.QuestionID = question.ID;
                        db.QuestionOption.Add(item);
                        db.SaveChanges();
                        
                    }
                }



                db.Question.Attach(question);
                db.Entry(question).State = EntityState.Modified;

                db.SaveChanges();
                question.QuestionType = db.QuestionType.Where(r => r.ID == question.QuestionTypeID).FirstOrDefault();
                response.questions.Add(question);
            }
            catch (Exception ex)
            {

                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }


            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }

        [WebMethod]
        public QuestionListResponse deleteQuestion(int ID)
        {
            QuestionListResponse response = new QuestionListResponse();
            QuestionProjeEntities db = new QuestionProjeEntities();

            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                Question question = db.Question.Where(r => r.ID == ID).SingleOrDefault();
                question.State = false;
                db.SaveChanges();
                response.questions.Add(question);
            }
            catch (Exception ex)
            {
                //bir hata olursa response set edilsin
                Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SYSTEM_ERROR, response);
                return response;
            }

            //başarılı olduğu response a set edilsin 
            Helper.setErrorToResponse(Constant.ERRORCODE.SYS_SUCCESS, response);
            return response;
        }
        #endregion
    }
}
