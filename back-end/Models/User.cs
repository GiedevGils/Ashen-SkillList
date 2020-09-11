using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillListBackEnd.Models
{
    /// <summary>
    /// Database storage item for users
    /// </summary>
    public class User : BaseDatabaseItem
    {
        /// <summary>
        /// The name of the user
        /// </summary>
        [MaxLength(40)]
        [Index(IsUnique = true)]
        public string Name { get; set; }

        /// <summary>
        /// The code that is generated for the user
        /// </summary>
        [MaxLength(6)]
        [MinLength(6)]
        public string Code { get; set; }

        public ICollection<Character> Characters { get; set; }

        /// <summary>
        /// Whether the user is an admin or not. This is not settable, and can only be changed in the database itself.
        /// </summary>
        public bool IsAdmin { get; set; }
    }
}
