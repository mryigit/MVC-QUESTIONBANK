using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SERVICE
{
	public class Constant
	{


	
        public enum ERRORCODE
        {
            SYS_SUCCESS = 0,
            SYS_CONVERT_ERROR = 1,
            SYS_EMTRYERNTRY_ERROR = 2,
            SYS_SYSTEM_ERROR = 3,
         



        }




	    public static Dictionary<int, string> ERRCODDES = new Dictionary<int, string> {
           {0,"İşlem başarılı"},
           {1,"Bir parametre dönüştürme hatası oluştu"},
           {2,"Boş olmaması gereken bir data geldi" },
           {3,"Sistemde hata oluştu." }
         

        };
	}
}