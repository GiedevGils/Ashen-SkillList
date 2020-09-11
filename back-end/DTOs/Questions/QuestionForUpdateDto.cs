using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillListBackEnd.DTOs.Questions
{
    /// <summary>
    /// Data Transfer Object for updating questions
    /// </summary>
    public class QuestionForUpdateDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
    }
}
