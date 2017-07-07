using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SERVICE.Responses
{
	public class LessonListResponse : BaseResponse
	{
		public List<DATAMODEL.DB.Lesson> lessions = new List<DATAMODEL.DB.Lesson>();
	}
}