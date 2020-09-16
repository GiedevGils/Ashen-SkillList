﻿namespace SkillListBackEnd.DTOs.Questions
{
    /// <summary>
    /// Data Transfer Object for creating questions
    /// </summary>
    public class QuestionForCreateDto
    {
        public int CategoryId { get; set; }
        public string Description { get; set; }
    }
}
