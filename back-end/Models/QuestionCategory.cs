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
        public string Description { get; set; }
    }
}
