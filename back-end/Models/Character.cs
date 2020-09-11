using System.ComponentModel.DataAnnotations;

namespace SkillListBackEnd.Models
{
    public class Character : BaseDatabaseItem
    {
        /// <summary>
        /// The character name
        /// </summary>
        [MaxLength(30)]
        public string CharacterName { get; set; }

        /// <summary>
        /// The squad of the user
        /// </summary>
        [MaxLength(15)]
        public string Squad { get; set; }
    }
}
