namespace SkillListBackEnd.Models
{
    /// <summary>
    /// Database item for answers. This is used to declare answers for the questions
    /// </summary>
    public class Answer : BaseDatabaseItem
    {
        /// <summary>
        /// The rating of the answer. Is always a number
        /// </summary>
        public int Rating { get; set; }

        /// <summary>
        /// The description of the answer
        /// </summary>
        public string Description { get; set; }
    }
}
