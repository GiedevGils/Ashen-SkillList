namespace SkillListBackEnd.DTOs.Categories
{
    /// <summary>
    /// Data Transfer Object for updating categories
    /// </summary>
    public class CategoryForUpdateDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public bool IsProfessionCategory { get; set; }

    }
}
