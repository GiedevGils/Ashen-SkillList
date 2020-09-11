using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure;
using Microsoft.Extensions.Configuration;
using SkillListBackEnd.DTOs.Users;
using SkillListBackEnd.Helpers;
using SkillListBackEnd.Models;
using SkillListBackEnd.Repositories.Interfaces;

namespace SkillListBackEnd.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository authRepo, IConfiguration config)
        {
            _authRepo = authRepo;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegister)
        {
            var createdUser = await _authRepo.RegisterUser(userForRegister.Username);
            return Created("no-url", createdUser);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto login)
        {
            User userFromRepo = await _authRepo.Login(login.Username, login.Code);

            if (userFromRepo == null)
            {
                return Unauthorized();
            }

            string token = Crypto.GenerateJwtForUser(userFromRepo, _config.GetSection("AppSettings:Token").Value);
            return Ok(new { token });
        }
    }
}
