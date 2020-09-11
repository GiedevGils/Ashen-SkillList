using System.ComponentModel.DataAnnotations;

namespace SkillListBackEnd.DTOs.Users
{
    /// <summary>
    /// Register DTO
    /// </summary>
    public class UserForRegisterDto
    {
        /// <summary>
        /// The username to create a new account for
        /// </summary>
        [Required]
        public string Username { get; set; }
    }
}
