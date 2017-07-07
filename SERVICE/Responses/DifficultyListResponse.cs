using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SERVICE.Responses
{
    public class DifficultyListResponse:BaseResponse
    {
        public List<DATAMODEL.DB.Difficulty> difficultys = new List<DATAMODEL.DB.Difficulty>();
    }
}