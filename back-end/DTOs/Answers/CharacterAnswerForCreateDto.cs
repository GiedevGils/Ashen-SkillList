namespace SkillListBackEnd.DTOs.Answers
{
    /// <summary>
    /// Data Transfer Object for creating character answers
    /// </summary>
    public class CharacterAnswerForCreateDto
    {
        public int CharacterId { get; set; }
        public int AnswerId { get; set; }
        public int QuestionId { get; set; }

    }
}
