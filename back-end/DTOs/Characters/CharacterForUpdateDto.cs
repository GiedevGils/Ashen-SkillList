namespace SkillListBackEnd.DTOs.Characters
{
    /// <summary>
    /// Data Transfer Object for updating a character
    /// </summary>
    public class CharacterForUpdateDto
    {
        public int Id { get; set; }
        public string CharacterName { get; set; }
        public string Squad { get; set; }
    }
}
