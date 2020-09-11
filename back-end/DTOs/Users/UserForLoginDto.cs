namespace SkillListBackEnd.DTOs.Users
{
    /// <summary>
    /// DTO for logging in
    /// </summary>
    public class UserForLoginDto
    {
        /// <summary>
        /// Username of user who wants to log in
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Login code
        /// </summary>
        public string Code { get; set; }
    }
}
