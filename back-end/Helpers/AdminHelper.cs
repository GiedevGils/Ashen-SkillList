﻿using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SkillListBackEnd.Data;
using SkillListBackEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillListBackEnd.Helpers
{

    public interface IAdminHelper
    {
        bool IsUserAdmin(int userId);
        bool CanOperationContinue(int userId, int characterId);
    }

    public class AdminHelper : IAdminHelper
    {
        private readonly DataContext _context;

        public AdminHelper(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Check if a user is admin
        /// </summary>
        /// <param name="userId">The ID of the user</param>
        /// <returns>If the user is admin or nto</returns>
        public bool IsUserAdmin(int userId)
        {
            User user = _context.Users.FirstOrDefault(x => x.Id == userId);
            if (user.IsAdmin)
                return true;
            return false;
        }

        /// <summary>
        /// Check if a user can perform the operation.
        /// </summary>
        /// <param name="userId">The ID of the user </param>
        /// <param name="characterId">The ID of the character which the operation will take place on</param>
        /// <returns>A boolean with the yes or no answer</returns>
        public bool CanOperationContinue(int userId, int characterId)
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
