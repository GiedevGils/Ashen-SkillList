using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SkillListBackEnd.Data;
using SkillListBackEnd.Helpers;
using SkillListBackEnd.Models;
using SkillListBackEnd.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillListBackEnd.Repositories.Implementations
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<User> Login(string name, string code)
        {
            User user = await _context.Users.Where(x => x.Name == name).FirstOrDefaultAsync(x => x.Code == code);
            if (user == null)
            {
                return null;
            }

            return user;
        }

        public async Task<User> RegisterUser(string username)
        {
            User newUser = new User
            {
                Name = username,
                Code = LoginCodeGenerator.GenerateCode()
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return newUser;
        }
    }
}
