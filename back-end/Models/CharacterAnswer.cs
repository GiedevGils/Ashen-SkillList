namespace SkillListBackEnd.Models
{
    /// <summary>
    /// A in which character answers can be saved
    /// </summary>
    public class CharacterAnswer : BaseDatabaseItem
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
