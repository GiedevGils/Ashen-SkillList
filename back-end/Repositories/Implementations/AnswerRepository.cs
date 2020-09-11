﻿using Microsoft.EntityFrameworkCore;
using SkillListBackEnd.Data;
using SkillListBackEnd.Models;
using SkillListBackEnd.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
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
            _context.Entry(questionToAddAnswerTo).State = EntityState.Modified;

            if (questionToAddAnswerTo.Answers == null)
            {
                questionToAddAnswerTo.Answers = new List<Answer>();
            }

            questionToAddAnswerTo.Answers.Add(answer);
            await _context.SaveChangesAsync();
            return answer;

        }

        public async Task<Answer> UpdateAnswer(int answerId, Answer answer)
        {
            Answer answerToUpdate = await _context.Answers.FirstOrDefaultAsync(x => x.Id == answerId);
            answerToUpdate.Rating = answer.Rating;
            answerToUpdate.Description = answer.Description;
            await _context.SaveChangesAsync();
            return answerToUpdate;
        }

        public async Task<bool> DeleteAnswer(int answerId)
        {
            Answer answerToDelete = await _context.Answers.FirstOrDefaultAsync(x => x.Id == answerId);
            _context.Answers.Remove(answerToDelete);
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
            IEnumerable<CharacterAnswer> potentiallyExistingAnswers = _context.CharacterAnswer.Where(x => x.Question == question).Where(x => x.Character == character);
            _context.CharacterAnswer.RemoveRange(potentiallyExistingAnswers);


            CharacterAnswer charAnswer = new CharacterAnswer()
            {
                Question = question,
                Character = character,
                Answer = answer
            };

            _context.CharacterAnswer.Add(charAnswer);
            await _context.SaveChangesAsync();
            return charAnswer;
        }
    }
}