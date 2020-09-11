using AutoMapper;
using SkillListBackEnd.DTOs.Characters;
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
        }
    }
}
