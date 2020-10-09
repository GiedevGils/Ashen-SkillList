using Microsoft.EntityFrameworkCore;
using SkillListBackEnd.Data;
using SkillListBackEnd.Models;
using SkillListBackEnd.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillListBackEnd.Repositories.Implementations
{
    public class AnswerRepository : IAnswerRepository
    {
        private readonly DataContext _context;

        public AnswerRepository(DataContext context)
        {
            this._context = context;
        }

        public async Task<Answer> CreateAnswer(int questionId, Answer answer)
        {
            Question questionToAddAnswerTo = await _context.Questions.FirstOrDefaultAsync(x => x.Id == questionId);

            // To make sure the category and question get linked, we need to let EF know that the category also needs to be re-saved
            _context.Entry(questionToAddAnswerTo).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

            if (questionToAddAnswerTo.Answers == null)
            {
                questionToAddAnswerTo.Answers = new List<Answer>();
            }

            questionToAddAnswerTo.Answers.Add(answer);
            await _context.SaveChangesAsync();
            return answer;
        }

        public async Task<IEnumerable<Answer>> CreateAnswersBulk(int questionId, IEnumerable<Answer> answers)
        {
            Question questionToAddAnswersTo = await _context.Questions.FirstOrDefaultAsync(x => x.Id == questionId);

            _context.Entry(questionToAddAnswersTo).State = Microsoft.EntityFrameworkCore.EntityState.Modified;


            if (questionToAddAnswersTo.Answers == null)
            {
                questionToAddAnswersTo.Answers = new List<Answer>();
            }

            foreach (Answer answer in answers)
            {
                questionToAddAnswersTo.Answers.Add(answer);
            }
            await _context.SaveChangesAsync();
            return questionToAddAnswersTo.Answers;
        }

        public async Task<Answer> UpdateAnswer(int answerId, Answer answer)
        {
            Answer answerToUpdate = await _context.Answers.FirstOrDefaultAsync(x => x.Id == answerId);
            answerToUpdate.Rating = answer.Rating;
            answerToUpdate.Description = answer.Description;
            await _context.SaveChangesAsync();
            return answerToUpdate;
        }

        public async Task<IEnumerable<Answer>> UpdateAnswersBulk(IEnumerable<Answer> answers)
        {
            ICollection<Answer> updatedAnswers = new List<Answer>();
            foreach(Answer a in answers)
            {
                Answer answerToEdit = _context.Answers.FirstOrDefault(x => x.Id == a.Id);
                answerToEdit.Description = a.Description;
                answerToEdit.Rating = a.Rating;
                updatedAnswers.Add(answerToEdit);
            }

            await _context.SaveChangesAsync();
            return updatedAnswers;
        }

        public async Task<bool> DeleteAnswer(int answerId)
        {
            IEnumerable<CharacterAnswer> answersToDelete = _context.CharacterAnswers.Where(x => x.Answer.Id == answerId);
            _context.CharacterAnswers.RemoveRange(answersToDelete);

            Answer answerToDelete = await _context.Answers.FirstOrDefaultAsync(x => x.Id == answerId);
            _context.Answers.Remove(answerToDelete);

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAnswersBulk(IEnumerable<int> answerIds)
        {

            IEnumerable<CharacterAnswer> answersToDeleteFromCharacters = _context.CharacterAnswers.Where(x => answerIds.Contains(x.Answer.Id));
            _context.CharacterAnswers.RemoveRange(answersToDeleteFromCharacters);

            IEnumerable<Answer> answersToDelete = _context.Answers.Where(x => answerIds.Contains(x.Id));
            _context.Answers.RemoveRange(answersToDelete);

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<CharacterAnswer> GiveAnswerForCharacter(int characterId, int questionId, int answerId)
        {
            Question question = await _context.Questions.FirstOrDefaultAsync(x => x.Id == questionId);
            Character character = await _context.Characters.FirstOrDefaultAsync(x => x.Id == characterId);
            Answer answer = await _context.Answers.FirstOrDefaultAsync(x => x.Id == answerId);

            if (question == null || character == null || answer == null)
            {
                throw new ArgumentException();
            }

            // Delete existing entries, so that there's only one entry per answer per character
            IEnumerable<CharacterAnswer> potentiallyExistingAnswers = _context.CharacterAnswers.Where(x => x.Question == question).Where(x => x.Character == character);
            _context.CharacterAnswers.RemoveRange(potentiallyExistingAnswers);


            CharacterAnswer charAnswer = new CharacterAnswer()
            {
                Question = question,
                Character = character,
                Answer = answer
            };

            _context.CharacterAnswers.Add(charAnswer);
            await _context.SaveChangesAsync();
            return charAnswer;
        }

        public async Task<IEnumerable<CharacterAnswer>> GetAnsersForAllCharacters()
        {
            IEnumerable<CharacterAnswer> answers = _context.CharacterAnswers.Include(x => x.Answer).Include(x => x.Character).Include(x => x.Question);
            return answers;
        }
    }
}
