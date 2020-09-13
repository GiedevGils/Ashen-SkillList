namespace SkillListBackEnd.DTOs.Characters
{
    /// <summary>
    /// Data Transfer Object for characters to be created
    /// </summary>
    public class CharacterForCreateDto
    {
        public string CharacterName { get; set; }
        public string Squad { get; set; }
        public string Profession { get; set; }
    }
}
