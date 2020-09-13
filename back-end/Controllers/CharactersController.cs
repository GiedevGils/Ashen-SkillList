using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillListBackEnd.DTOs.Characters;
using SkillListBackEnd.Models;
using SkillListBackEnd.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkillListBackEnd.Controllers
{
    /// <summary>
    /// Controller to manage everything related to characters.
    /// </summary>
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CharactersController : SkillListControllerBase
    {
        private readonly ICharacterRepository _charRepo;
        private readonly IMapper _mapper;

        public CharactersController(ICharacterRepository charRepo, IMapper mapper)
        {
            this._charRepo = charRepo;
            this._mapper = mapper;
        }

        /// <summary>
        /// Create a new characterr and link it to a user
        /// </summary>
        /// <param name="character">The character to create</param>
        /// <returns>A <see cref="CreatedResult"/> with the created character</returns>
        [HttpPost("create-character")]
        public async Task<IActionResult> CreateCharacter(CharacterForCreateDto character)
        {
            int userId = GetUserIdFromToken();
            Character charToCreate = _mapper.Map<Character>(character);
            Character createdCharacter = await _charRepo.CreateCharacter(userId, charToCreate);
            return Created("no-url", createdCharacter);
        }

        /// <summary>
        /// Get all characters for a user
        /// </summary>
        /// <returns>An <see cref="OkResult"/> with an <see cref="IEnumerable{T}"/></returns>
        [HttpGet("get-all-characters")]
        public async Task<IActionResult> GetCharactersForUser()
        {
            int userId = GetUserIdFromToken();
            IEnumerable<Character> characters = await _charRepo.GetCharacters(userId);
            return Ok(characters);
        }

        /// <summary>
        /// Update a character
        /// </summary>
        /// <param name="character">the parameters of the character to update with</param>
        /// <returns>An <see cref="IActionResult"/> with the updated character</returns>
        [HttpPut("update-character")]
        public async Task<IActionResult> UpdateCharacter(CharacterForUpdateDto character)
        {
            int userId = GetUserIdFromToken();
            Character characterToUpdate = _mapper.Map<Character>(character);
            Character updatedCharacter = await _charRepo.UpdateCharacter(userId, characterToUpdate.Id, characterToUpdate);
            if(updatedCharacter == null)
            {
                return Unauthorized();
            }
            return Ok(updatedCharacter);
        }

        /// <summary>
        /// Delete a character.
        /// </summary>
        /// <param name="characterId">The character ID, which is given in the body</param>
        /// <returns>A <see cref="IActionResult"/> with a boolean of success</returns>
        [HttpDelete("delete-character")]
        public async Task<IActionResult> DeleteCharacter(CharacterForDeleteDto character)
        {
            int userId = GetUserIdFromToken();
            bool success = await _charRepo.DeleteCharacter(userId, character.Id);
            if (success)
            {
                return Ok(success);
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
