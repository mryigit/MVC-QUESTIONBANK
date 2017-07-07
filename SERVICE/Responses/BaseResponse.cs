using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SERVICE.Responses
{
    public class BaseResponse
    {
        public int Code { get; set; }
        public string Messeage { get; set; }
        public string Description { get; set; }
        public string DeveloperDescription { get; set; }
        public int Language { get; set; }
        public BaseResponse()
        {
            this.Language = 0;//(int)AysaOkul.Common.Constant.Language.Tr;
        }
        public BaseResponse(int errorCode, int language = 0)
        {
            this.Code = errorCode;
        }
        //AysaOkul.Data.Entity.AysaOkulEntities db = new Data.Entity.AysaOkulEntities();
        //AysaOkul.Data.Entity.SystemError error = db.SystemError.Where(t => t.SystemErrorCode == errorCode && t.Language == language).FirstOrDefault();

        //this.Description = error.ErrorDescription;
        //this.DeveloperDescription = error.DeveloperDescription;

        //Database'e yukarıdakileri karşılacak bir yapı kurabilirsin.

        //Hata numaralarını 100'den başlatabilirsin. 100 başarılı, 101 böyle birşey bulunamadı... 
    }
}