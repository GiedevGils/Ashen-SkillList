﻿using Microsoft.EntityFrameworkCore;
using SkillListBackEnd.Data;
using SkillListBackEnd.Helpers;
using SkillListBackEnd.Models;
using SkillListBackEnd.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillListBackEnd.Repositories.Implementations
{
    public class CharacterRepository : ICharacterRepository
    {
        private readonly DataContext _context;
        private readonly IAdminHelper _adminHelper;

        public CharacterRepository(DataContext context, IAdminHelper adminHelper)
        {
            this._context = context;
            this._adminHelper = adminHelper;
        }

        public async Task<Character> CreateCharacter(int userId, Character character)
        {
            User userToAddCharacterTo = _context.Users.FirstOrDefault(x => x.Id == userId);

            // To make sure the user and character get linked, we need to let EF know that the user also needs to be re-saved
            _context.Entry(userToAddCharacterTo).State = EntityState.Modified;

            if (userToAddCharacterTo.Characters == null)
            {
                userToAddCharacterTo.Characters = new List<Character>();
            }

            userToAddCharacterTo.Characters.Add(character);
            await _context.SaveChangesAsync();

            return character;
        }

        public async Task<IEnumerable<Character>> GetCharacters(int userId)
        {
            if (_adminHelper.IsUserAdmin(userId))
            {
                return _context.Characters.AsEnumerable();
            }
            else
            {
                User userToGetCharactersFrom = await _context.Users.Include(x => x.Characters).FirstOrDefaultAsync(x => x.Id == userId);
                IEnumerable<Character> characters = userToGetCharactersFrom.Characters;
                return characters;
            }            
        }

        public async Task<Character> UpdateCharacter(int userId, int characterId, Character updatedCharacter)
        {
            if (!CanOperationContinue(userId, characterId))
                return null;

            Character characterToUpdate = _context.Characters.FirstOrDefault(x => x.Id == characterId);
            characterToUpdate.CharacterName = updatedCharacter.CharacterName;
            characterToUpdate.Squad = updatedCharacter.Squad;
            await _context.SaveChangesAsync();
            return characterToUpdate;
        }

        public async Task<bool> DeleteCharacter(int userId, int characterId)
        {
            if (!CanOperationContinue(userId, characterId))
                return false;

            Character charToDelete = await _context.Characters.FirstOrDefaultAsync(x => x.Id == characterId);
            _context.Characters.Remove(charToDelete);
            await _context.SaveChangesAsync();
            return true;
        }

        /// <summary>
        /// Check if a user can perform the operation.
        /// </summary>
        /// <param name="userId">The ID of the user </param>
        /// <param name="characterId">The ID of the character which the operation will take place on</param>
        /// <returns>A boolean with the yes or no answer</returns>
        private bool CanOperationContinue(int userId, int characterId)
        {
            User user = _context.Users.Include(x => x.Characters).FirstOrDefault(x => x.Id == userId);

            bool doesUserOwnCharacter = user.Characters.Any(x => x.Id == characterId);
            // If the character is not in the list of the user's characters, or if the user is not an admin, the operation is not allowed to continue
            if (!doesUserOwnCharacter && !_adminHelper.IsUserAdmin(userId))
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}