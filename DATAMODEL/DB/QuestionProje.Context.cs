﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class QuestionProjeEntities : DbContext
    {
        public QuestionProjeEntities()
            : base("name=QuestionProjeEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Difficulty> Difficulty { get; set; }
        public virtual DbSet<EducationProgram> EducationProgram { get; set; }
        public virtual DbSet<Language> Language { get; set; }
        public virtual DbSet<Lesson> Lesson { get; set; }
        public virtual DbSet<Question> Question { get; set; }
        public virtual DbSet<QuestionOption> QuestionOption { get; set; }
        public virtual DbSet<QuestionType> QuestionType { get; set; }
        public virtual DbSet<Subject> Subject { get; set; }
    }
}
