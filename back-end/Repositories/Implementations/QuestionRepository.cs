using Microsoft.EntityFrameworkCore;
using SkillListBackEnd.Data;
using SkillListBackEnd.Models;
using SkillListBackEnd.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace SkillListBackEnd.Repositories.Implementations
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly DataContext _context;
        private readonly IAnswerRepository _answerRepository;

        public QuestionRepository(DataContext context, IAnswerRepository answerRepository)
        {
            this._context = context;
            this._answerRepository = answerRepository;
        }

        public async Task<QuestionCategory> CreateCategory(QuestionCategory cat)
        {
            _context.Categories.Add(cat);
            await _context.SaveChangesAsync();
            return cat;
        }

        public async Task<QuestionCategory> UpdateQuestionCategory(int categoryId, QuestionCategory cat)
        {
            QuestionCategory category = await _context.Categories.FirstOrDefaultAsync(x => x.Id == categoryId);
            category.Description = cat.Description;
            category.IsProfessionCategory = cat.IsProfessionCategory;
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<bool> DeleteQuestionCategory(int categoryId)
        {
            QuestionCategory category = _context.Categories.FirstOrDefault(x => x.Id == categoryId);
            _context.Categories.Remove(category);

            // Delete the questions in the category
           if(category.Questions != null)
           {
                foreach (Question q in category.Questions)
                {
                    await this.DeleteQuestion(q.Id);
                }
           }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Question> CreateQuestion(int categoryId, Question questionToCreate)
        {
            QuestionCategory categoryToAddQuestionTo = await _context.Categories.FirstOrDefaultAsync(x => x.Id == categoryId);

            // To make sure the category and question get linked, we need to let EF know that the category also needs to be re-saved
            _context.Entry(categoryToAddQuestionTo).State = EntityState.Modified;

            if (categoryToAddQuestionTo.Questions == null)
            {
                categoryToAddQuestionTo.Questions = new List<Question>();
            }

            categoryToAddQuestionTo.Questions.Add(questionToCreate);
            await _context.SaveChangesAsync();
            return questionToCreate;
        }

        public async Task<IEnumerable<QuestionCategory>> GetAllQuestions()
        {
            IEnumerable<QuestionCategory> questions = _context.Categories.Include(x => x.Questions).ThenInclude(y => y.Answers);
            return questions;
        }

        public async Task<Question> GetSingleQuestion(int questionId)
        {
            Question q = await _context.Questions.Include(x => x.Answers).FirstOrDefaultAsync(x => x.Id == questionId);
            return q;
        }

        public async Task<Question> UpdateQuestion(int questionId, Question updatedQuestion)
        {
            Question questionToUpdate = await _context.Questions.FirstOrDefaultAsync(x => x.Id == questionId);
            questionToUpdate.Description = updatedQuestion.Description;
            await _context.SaveChangesAsync();
            return questionToUpdate;
        }

        public async Task<bool> DeleteQuestion(int questionId)
        {
            Question questionToDelete = await _context.Questions.Include(x => x.Answers).FirstOrDefaultAsync(x => x.Id == questionId);

            if (questionToDelete.Answers != null)
            {
                ICollection<int> idsOfAnswersToDelete = new List<int>();
                foreach(Answer a in questionToDelete.Answers)
                {
                    idsOfAnswersToDelete.Add(a.Id);
                }
                await _answerRepository.DeleteAnswersBulk(idsOfAnswersToDelete);
            }

            _context.Questions.Remove(questionToDelete);

            await _context.SaveChangesAsync();
            return true;
        }

        
    }
}
