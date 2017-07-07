using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SERVICE
{
	public class Helper
	{
	
		public static void setErrorToResponse(Constant.ERRORCODE  code, Responses.BaseResponse respose)
		{

			respose.Code = (int)code;
			respose.Messeage = (from t in Constant.ERRCODDES
							   where t.Key == respose.Code 
							   select t).FirstOrDefault().Value;

		}


	}
}