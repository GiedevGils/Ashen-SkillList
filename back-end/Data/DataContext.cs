using Microsoft.EntityFrameworkCore;

namespace SkillListBackEnd.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    }
}
