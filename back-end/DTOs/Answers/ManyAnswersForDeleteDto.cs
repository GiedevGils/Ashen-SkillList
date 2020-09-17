using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillListBackEnd.DTOs.Answers
{
    /// <summary>
    /// Data Transfer Object for deleting many answers in one go
    /// </summary>
    public class ManyAnswersForDeleteDto
    {
        public IEnumerable<int> Answers { get; set; }
    }
}
