using System.Collections.Generic;

namespace SkillListBackEnd.Models
{
    /// <summary>
    /// Database item for questions
    /// </summary>
    public class Question : BaseDatabaseItem
    {
        /// <summary>
        /// The description of the question (e.g. "aeromancy" or "climbing")
        /// </summary>
        public string Description { get; set; }
        public ICollection<Answer> Answers { get; set; }
    }
}
