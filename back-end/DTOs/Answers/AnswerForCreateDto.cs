namespace SkillListBackEnd.DTOs.Answers
{
    /// <summary>
    /// Data Transfer Object for creating answers
    /// </summary>
    public class AnswerForCreateDto
    {
        public int QuestionId { get; set; }
        public int Rating { get; set; }
        public string Description { get; set; }
    }
}
