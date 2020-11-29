using Microsoft.EntityFrameworkCore;
using SkillListBackEnd.Data;
using SkillListBackEnd.Models;
using System.Linq;

namespace SkillListBackEnd.Helpers
{

    public interface IAdminHelper
    {
        /// <summary>
        /// Check if a user is admin
        /// </summary>
        /// <param name="userId">The ID of the user</param>
        /// <returns>If the user is admin or nto</returns>
        bool IsUserAdmin(int userId);

        /// <summary>
        /// Check if a user owns the character or is an admin, and thus would be able to perform the operation.
        /// </summary>
        /// <param name="userId">The ID of the user </param>
        /// <param name="characterId">The ID of the character which the operation will take place on</param>
        /// <returns>A boolean with the yes or no answer</returns>
        bool DoesUserOwnCharacterOrIsAdmin(int userId, int characterId);
    }

    public class AdminHelper : IAdminHelper
    {
        private readonly DataContext _context;

        public AdminHelper(DataContext context)
        {
            _context = context;
        }

        
        public bool IsUserAdmin(int userId)
        {
            User user = _context.Users.FirstOrDefault(x => x.Id == userId);
            if (user.IsAdmin)
                return true;
            return false;
        }

        
        public bool DoesUserOwnCharacterOrIsAdmin(int userId, int characterId)
        {
            User user = _context.Users.Include(x => x.Characters).FirstOrDefault(x => x.Id == userId);

            bool doesUserOwnCharacter = user.Characters.Any(x => x.Id == characterId);
            // If the character is not in the list of the user's characters, or if the user is not an admin, the operation is not allowed to continue
            if (!doesUserOwnCharacter && !IsUserAdmin(userId))
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
