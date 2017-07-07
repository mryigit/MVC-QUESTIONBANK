using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SERVICE.Responses
{
    public class QuestionListResponse:BaseResponse
    {
        public List<DATAMODEL.DB.Question> questions = new List<DATAMODEL.DB.Question>();
    }
}