using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkillListBackEnd.DTOs.Answers;
using SkillListBackEnd.Helpers;
using SkillListBackEnd.Models;
using SkillListBackEnd.Repositories.Interfaces;

namespace SkillListBackEnd.Controllers
{
    /// <summary>
    /// Controls the requests for answers. Most functionalities are admin-only
    /// </summary>
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AnswersController : SkillListControllerBase
    {
        private readonly IAdminHelper _adminHelper;
        private readonly IMapper _mapper;
        private readonly IAnswerRepository _answerRepository;

        public AnswersController(IAdminHelper adminHelper, IMapper mapper, IAnswerRepository answerRepository)
        {
            this._adminHelper = adminHelper;
            this._mapper = mapper;
            this._answerRepository = answerRepository;
        }

        [HttpPost("create-answer")]
        public async Task<IActionResult> CreateAnswer(AnswerForCreateDto body)
        {
            int userId = GetUserIdFromToken();

            if (!_adminHelper.IsUserAdmin(userId))
                return Unauthorized();

            Answer ans = _mapper.Map<Answer>(body);
            var result = await _answerRepository.CreateAnswer(body.QuestionId, ans);
            return Created("no-url", result);
        }

        [HttpPut("update-answer")]
        public async Task<IActionResult> UpdateAnswer(AnswerForUpdateDto body)
        {
            int userId = GetUserIdFromToken();

            if (!_adminHelper.IsUserAdmin(userId))
                return Unauthorized();

            Answer answer = _mapper.Map<Answer>(body);
            Answer updatedAnswer = await _answerRepository.UpdateAnswer(body.Id, answer);
            return Ok(updatedAnswer);
        }

        [HttpDelete("delete-answer")]
        public async Task<IActionResult> DeleteAnswer(AnswerForDeleteDto body)
        {
            int userId = GetUserIdFromToken();

            if (!_adminHelper.IsUserAdmin(userId))
                return Unauthorized();

            var result = await _answerRepository.DeleteAnswer(body.Id);
            return Ok(result);
        }

        [HttpPost("vote")]
        public async Task<IActionResult> SelectAnswerForCharacter(CharacterAnswerForCreateDto body)
        {
            int userId = GetUserIdFromToken();

            if (!_adminHelper.CanOperationContinue(userId, body.CharacterId))
                return Unauthorized();

            CharacterAnswer result = await _answerRepository.GiveAnswerForCharacter(body.CharacterId, body.QuestionId, body.AnswerId);
            return Created("no-url", result);
        }
    }
}
