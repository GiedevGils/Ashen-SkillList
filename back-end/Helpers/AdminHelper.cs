using Microsoft.EntityFrameworkCore;
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
    }
}
