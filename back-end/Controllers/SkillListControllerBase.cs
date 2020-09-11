using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;

namespace SkillListBackEnd.Controllers
{
    /// <summary>
    /// A base controller with shared functionalities that can be used over all controllers
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class SkillListControllerBase : ControllerBase
    {
        /// <summary>
        /// Get a user ID form the token that is sent along
        /// </summary>
        /// <returns>the ID of the user, or -1 if there is no userId found</returns>
        public int GetUserIdFromToken()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var claims = identity.Claims;
            var nameIdentifier = claims.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            if (nameIdentifier == null)
            {
                return -1;
            }
            var id = nameIdentifier.Value;
            return Convert.ToInt32(id);
        }
    }
}
