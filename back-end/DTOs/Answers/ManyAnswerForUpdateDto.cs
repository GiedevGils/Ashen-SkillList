using SkillListBackEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillListBackEnd.DTOs.Answers
{
    /// <summary>
    /// Data transfer object for updating many answers in one go
    /// </summary>
    public class ManyAnswerForUpdateDto
    {
        public IEnumerable<Answer> Answers { get; set; }
    }
}
