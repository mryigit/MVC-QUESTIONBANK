//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DATAMODEL.DB
{
    using System;
    using System.Collections.Generic;
    
    public partial class QuestionOption
    {
        public int ID { get; set; }
        public string OptionKey { get; set; }
        public string OptionValue { get; set; }
        public bool IsCorrect { get; set; }
        public int QuestionID { get; set; }
    }
}
