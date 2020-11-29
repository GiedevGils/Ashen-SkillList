using SkillListBackEnd.Models;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace SkillListBackEnd.Repositories.Interfaces
{
    /// <summary>
    /// Interface for all functionalities related to answers.
    /// This does not have a functionality to get all the answers, this is done in the <see cref="IQuestionRepository.GetAllQuestions"/>
    /// </summary>
    public interface IAnswerRepository
    {
        /// <summary>
        /// Create an answer for a question
        /// </summary>
        /// <param name="questionId"></param>
        /// <returns>The created answer</returns>
        Task<Answer> CreateAnswer(int questionId, Answer anwer);

        /// <summary>
        /// Create a lot of answers linked to a certain question in one go.
        /// </summary>
        /// <param name="questionId">The ID of the question to link them to</param>
        /// <param name="answers">The answers to link</param>
        /// <returns>The created answers</returns>
        Task<IEnumerable<Answer>> CreateAnswersBulk(int questionId, IEnumerable<Answer> answers);

        /// <summary>
        /// Update an answer
        /// </summary>
        /// <param name="answerId">The ID of the answer to be updated</param>
        /// <param name="answer">The answer with updated values</param>
        /// <returns>The updated answer</returns>
        Task<Answer> UpdateAnswer(int answerId, Answer answer);

        /// <summary>
        /// Update answers in bulk
        /// </summary>
        /// <param name="answerId">The ID of the answer to be updated</param>
        /// <param name="answer">The answer with updated values</param>
        /// <returns>The updated answer</returns>
        Task<IEnumerable<Answer>> UpdateAnswersBulk(IEnumerable<Answer> answers);

        /// <summary>
        /// Delete an answer
        /// </summary>
        /// <param name="answerId">The ID of the answer to be deleted</param>
        /// <returns>Bool of success</returns>
        Task<bool> DeleteAnswer(int answerId);

        /// <summary>
        /// Delete many answers
        /// </summary>
        /// <param name="answerIds"></param>
        /// <returns></returns>
        Task<bool> DeleteAnswersBulk(IEnumerable<int> answerIds);

        /// <summary>
        /// Give an answer to a question for a certian character
        /// </summary>
        /// <param name="characterId">The character on which the answer is given</param>
        /// <param name="questionId">ID of the question</param>
        /// <param name="answerId">The answer for a question. Answer is linked to question</param>
        /// <returns>The created answer</returns>
        Task<CharacterAnswer> GiveAnswerForCharacter(int characterId, int questionId, int answerId);

        /// <summary>
        /// Get all answers for al characters.
        /// Used for admins to filter in the front-end
        /// </summary>
        /// <returns>An IEnumerable with all answers</returns>
        Task<IEnumerable<CharacterAnswer>> GetAnsersForAllCharacters();

        /// <summary>
        /// Get all answers for a specific question
        /// </summary>
        /// <returns>IEnumerable of anwers for that question</returns>
        Task<IEnumerable<CharacterAnswer>> GetAnswersForQuestion(int questionId);

        /// <summary>
        /// Get all answers for a character. Can be used for editing answers
        /// </summary>
        /// <param name="characterId"></param>
        /// <returns>An IEnumerable with existing answers</returns>
        Task<IEnumerable<CharacterAnswer>> GetAnswersForSingleCharacter(int characterId);

    }
}
