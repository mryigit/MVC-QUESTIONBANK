using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SERVICE.Responses
{
    public class SubjectListResponse:BaseResponse
    {
        public List<DATAMODEL.DB.Subject> subjects = new List<DATAMODEL.DB.Subject>();
    }
}