using Microsoft.EntityFrameworkCore;
using SkillListBackEnd.Models;

namespace SkillListBackEnd.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Answer> Answers { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<QuestionCategory> Categories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<CharacterAnswer> CharacterAnswers { get; set; }
        public DbSet<Character> Characters { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasIndex(u => u.Name)
                .IsUnique();
        }
    }
}
