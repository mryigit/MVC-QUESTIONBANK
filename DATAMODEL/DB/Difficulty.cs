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
    
    public partial class Difficulty
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Degree { get; set; }
        public int StudentPoint { get; set; }
        public int TeacherPoint { get; set; }
        public byte LanguageID { get; set; }
        public bool State { get; set; }
    }
}
