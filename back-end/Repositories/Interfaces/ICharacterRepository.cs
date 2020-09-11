using SkillListBackEnd.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkillListBackEnd.Repositories.Interfaces
{
    public interface ICharacterRepository
    {
        /// <summary>
        /// Create a character and link it to a user
        /// </summary>
        /// <param name="userId">The user to whom the character belongs</param>
        /// <param name="character">The character to be created</param>
        /// <returns>The newly created character</returns>
        Task<Character> CreateCharacter(int userId, Character character);

        /// <summary>
        /// Get all characters for a user
        /// Displays all characters for administrators
        /// </summary>
        /// <param name="userId">The ID of the user to get the characters from </param>
        /// <returns>A list of characters</returns>
        Task<IEnumerable<Character>> GetCharacters(int userId);

        /// <summary>
        /// Update a character
        /// </summary>
        /// <param name="userId">The ID of the user performing the operation</param>
        /// <param name="characterId">The ID of the character to update</param>
        /// <param name="updatedCharacter">The newly updated values</param>
        /// <returns>The updated character</returns>
        Task<Character> UpdateCharacter(int userId, int characterId, Character updatedCharacter);

        /// <summary>
        /// Delete a character
        /// </summary>
        /// <param name="userId">The ID of the user performing the operation</param
        /// <param name="characterId">ID of the character to delete</param>
        /// <returns>A boolean whether the operation was successful or not</returns>
        Task<bool> DeleteCharacter(int userId, int characterId);
    }
}
