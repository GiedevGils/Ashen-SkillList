using AutoMapper;
using SkillListBackEnd.DTOs.Answers;
using SkillListBackEnd.DTOs.Categories;
using SkillListBackEnd.DTOs.Characters;
using SkillListBackEnd.DTOs.Questions;
using SkillListBackEnd.Models;

namespace SkillListBackEnd.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            #region Characters
            CreateMap<CharacterForCreateDto, Character>();
            CreateMap<CharacterForUpdateDto, Character>();
            #endregion

            #region Question and Question Categories
            CreateMap<CategoryForCreateDto, QuestionCategory>();
            CreateMap<CategoryForUpdateDto, QuestionCategory>();

            CreateMap<QuestionForCreateDto, Question>();
            CreateMap<QuestionForUpdateDto, Question>();
            #endregion

            #region Answers
            CreateMap<AnswerForCreateDto, Answer>();
            CreateMap<AnswerForUpdateDto, Answer>();
            #endregion
        }
    }
}
