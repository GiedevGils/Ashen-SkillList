namespace SkillListBackEnd.DTOs.Answers
{
    /// <summary>
    /// Data Transfer Object for updating answers
    /// </summary>
    public class AnswerForUpdateDto
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public string Description { get; set; }
    }
}
