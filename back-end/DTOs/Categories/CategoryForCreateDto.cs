namespace SkillListBackEnd.DTOs.Categories
{
    /// <summary>
    /// Data Transfer Object for creating categories
    /// </summary>
    public class CategoryForCreateDto
    {
        public string Description { get; set; }
        public bool IsProfessionCategory { get; set; }

    }
}
