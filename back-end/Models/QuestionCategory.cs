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
        /// Whether or not the category is one for professions or not. Later used in for filtering in the front end
        /// </summary>
        public bool IsProfessionCategory { get; set; }
        public ICollection<Question> Questions { get; set; }
    }
}
