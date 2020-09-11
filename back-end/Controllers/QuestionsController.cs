using System.Security.Authentication;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor.TagHelpers;
using SkillListBackEnd.DTOs.Categories;
using SkillListBackEnd.DTOs.Questions;
using SkillListBackEnd.Helpers;
using SkillListBackEnd.Models;
using SkillListBackEnd.Repositories.Interfaces;

namespace SkillListBackEnd.Controllers
{
    /// <summary>
    /// Controls the requests for questions and question categories. Only accesible by admins
    /// </summary>
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : SkillListControllerBase
    {
        private readonly IAdminHelper _adminHelper;
        private readonly IMapper _mapper;
        private readonly IQuestionRepository _questionRepository;

        public QuestionsController(IAdminHelper adminHelper, IMapper mapper, IQuestionRepository _questionRepository)
        {
            this._adminHelper = adminHelper;
            this._mapper = mapper;
            this._questionRepository = _questionRepository;
        }
        
        [HttpPost("create-category")]
        public async Task<IActionResult> CreateCategory(CategoryForCreateDto body)
        {
            int userId = GetUserIdFromToken();

            if (!_adminHelper.IsUserAdmin(userId))
                return Unauthorized();

            QuestionCategory cat = _mapper.Map<QuestionCategory>(body);
            QuestionCategory result = await _questionRepository.CreateCategory(cat);
            return Created("no-url", result);
        }

        [HttpGet("get-all-questions")]
        public async Task<IActionResult> GetAllQuestions()
        {
            int userId = GetUserIdFromToken();

            if (!_adminHelper.IsUserAdmin(userId))
                return Unauthorized();

            var result = await _questionRepository.GetAllQuestions();

            return Ok(result);
        }

        [HttpPut("update-category")]
        public async Task<IActionResult> UpdateCategory(CategoryForUpdateDto categoryToUpdate)
        {
            int userId = GetUserIdFromToken();

            if (!_adminHelper.IsUserAdmin(userId))
                return Unauthorized();

            QuestionCategory category = _mapper.Map<QuestionCategory>(categoryToUpdate);

            QuestionCategory updatedCategory = await _questionRepository.UpdateQuestionCategory(categoryToUpdate.Id, category);

            return Ok(updatedCategory);
        }

        [HttpDelete("delete-category")]
        public async Task<IActionResult> DeleteCategory(CategoryForDeleteDto categoryForDelete)
        {
            int userId = GetUserIdFromToken();

            if (!_adminHelper.IsUserAdmin(userId))
                return Unauthorized();

            bool result = await _questionRepository.DeleteQuestionCategory(categoryForDelete.Id);
            return Ok(result);
        }

        [HttpPost("create-question")]
        public async Task<IActionResult> CreateCategory(QuestionForCreateDto body)
        {
            int userId = GetUserIdFromToken();

            if (!_adminHelper.IsUserAdmin(userId))
                return Unauthorized();

            Question question = _mapper.Map<Question>(body);

            Question result = await _questionRepository.CreateQuestion(body.CategoryId, question);
            return Created("no-url", result);
        }

        [HttpPut("update-question")]
        public async Task<IActionResult> UpdateQuestion(QuestionForUpdateDto body)
        {
            int userId = GetUserIdFromToken();

            if (!_adminHelper.IsUserAdmin(userId))
                return Unauthorized();

            Question question = _mapper.Map<Question>(body);
            Question result = await _questionRepository.UpdateQuestion(body.Id, question);
            return Ok(result);
        }

        [HttpDelete("delete-question")]
        public async Task<IActionResult> DeleteQuestion(QuestionForDeleteDto body)
        {
            int userId = GetUserIdFromToken();

            if (!_adminHelper.IsUserAdmin(userId))
                return Unauthorized();

            bool result = await _questionRepository.DeleteQuestion(body.Id);
            return Ok(result);
        }

    }
}
