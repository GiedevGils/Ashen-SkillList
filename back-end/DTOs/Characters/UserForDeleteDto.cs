using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace SkillListBackEnd.DTOs.Characters
{
    /// <summary>
    /// Data Transfer Object for deleting users
    /// This only contains an ID, because the [FromBody] way was too janky for me.
    /// </summary>
    public class UserForDeleteDto
    {
        public int Id { get; set; }
    }
}
