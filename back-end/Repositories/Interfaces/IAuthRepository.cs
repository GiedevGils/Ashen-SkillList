using SkillListBackEnd.Models;
using System.Threading.Tasks;

namespace SkillListBackEnd.Repositories.Interfaces
{
    public interface IAuthRepository
    {
        /// <summary>
        /// Register a user
        /// </summary>
        /// <param name="username">The username of the user to register</param>
        /// <returns>The newly created user</returns>
        Task<User> RegisterUser(string username);

        /// <summary>
        /// Login the user, and 
        /// </summary>
        /// <param name="name"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        Task<User> Login(string name, string code);
    }
}
