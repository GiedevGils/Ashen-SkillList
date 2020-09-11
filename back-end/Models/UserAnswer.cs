using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillListBackEnd.Models
{
    /// <summary>
    /// A in which user answers can be saved
    /// </summary>
    public class UserAnswer : BaseDatabaseItem
    {
        /// <summary>
        /// The character to which the answer applies
        /// </summary>
        public Character Character { get; set; }
        /// <summary>
        /// The question on which the answer was submitted
        /// </summary>
        public Question Question { get; set; }
        /// <summary>
        /// The answer on the question
        /// </summary>
        public Answer Answer { get; set; }
    }
}
