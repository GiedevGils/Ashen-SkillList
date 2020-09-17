using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SkillListBackEnd.DTOs.Users;
using SkillListBackEnd.Helpers;
using SkillListBackEnd.Models;
using SkillListBackEnd.Repositories.Interfaces;
using System.Collections.Generic;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;

namespace SkillListBackEnd.Controllers
{
    /// <summary>
    /// Controls the requests for authentication and user data
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : SkillListControllerBase
    {
        private readonly IAuthRepository _authRepo;
        private readonly IConfiguration _config;
        private readonly IAdminHelper _adminHelper;

        public AuthController(IAuthRepository authRepo, IConfiguration config, IAdminHelper adminHelper)
        {
            _authRepo = authRepo;
            _config = config;
            this._adminHelper = adminHelper;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegister)
        {
            var createdUser = await _authRepo.RegisterUser(userForRegister.Username);
            if (createdUser == null)
            {
                return BadRequest("This username is already used. Please choose another username");
            }
            return Created("no-url", createdUser);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto login)
        {
            User userFromRepo = await _authRepo.Login(login.Username, login.Code);

            if (userFromRepo == null)
            {
                return Unauthorized();
            }

            string token = TokenHelper.GenerateJwtForUser(userFromRepo, _config.GetSection("AppSettings:Token").Value);
            return Ok(new { token });
        }

        [Authorize]
        [HttpGet("user-info")]
        public async Task<IActionResult> GetUserInfo()
        {
            int userId = GetUserIdFromToken();
            User user = await _authRepo.GetUserInfo(userId);
            return Ok(user);
        }
        
        [Authorize]
        [HttpGet("user-info-bulk")]
        public async Task<IActionResult> GetUserInfoBulk()
        {
            int userId = GetUserIdFromToken();

            if (!_adminHelper.IsUserAdmin(userId))
            {
                return Unauthorized();
            }

            IEnumerable<User> userInfo = await _authRepo.GetUserInfoBulk();
            return Ok(userInfo);
        }
    }
}
