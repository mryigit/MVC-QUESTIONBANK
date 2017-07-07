using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SERVICE.Responses
{
    public class EducationProgramListResponse:BaseResponse
    {
        public List<DATAMODEL.DB.EducationProgram> educationPrograms = new List<DATAMODEL.DB.EducationProgram>();
    }
}