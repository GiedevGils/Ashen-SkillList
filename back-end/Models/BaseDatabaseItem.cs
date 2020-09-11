using System.ComponentModel.DataAnnotations;

namespace SkillListBackEnd.Models
{
    /// <summary>
    /// Parent class for all databse items. Inherited by anything that requires saving into the database
    /// </summary>
    public abstract class BaseDatabaseItem
    {
        /// <summary>
        /// PK in the database, is the auto-increment ID.
        /// </summary>
        [Key]
        public virtual int Id { get; set; }
    }
}
