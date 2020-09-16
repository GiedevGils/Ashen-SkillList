using SkillListBackEnd.Enums;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SkillListBackEnd.Models
{
    /// <summary>
    /// Database item for question categories
    /// </summary>
    public class QuestionCategory : BaseDatabaseItem
    {
        /// <summary>
        /// Description of the question, e.g. "Elementalist" or "Miscelaneous skills"
        /// </summary>
        [MaxLength(50)]
        public string Description { get; set; }
        /// <summary>
        /// The type of category it is.
        /// </summary>
        public CategoryType Type { get; set; }
        public ICollection<Question> Questions { get; set; }
    }
}
