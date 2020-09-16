using SkillListBackEnd.Models;
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
        /// Update an answer
        /// </summary>
        /// <param name="answerId">The ID of the answer to be updated</param>
        /// <param name="answer">The answer with updated values</param>
        /// <returns>The updated answer</returns>
        Task<Answer> UpdateAnswer(int answerId, Answer answer);

        /// <summary>
        /// Delete an answer
        /// </summary>
        /// <param name="answerId">The ID of the answer to be deleted</param>
        /// <returns>Bool of success</returns>
        Task<bool> DeleteAnswer(int answerId);

        /// <summary>
        /// Give an answer to a question for a certian character
        /// </summary>
        /// <param name="characterId">The character on which the answer is given</param>
        /// <param name="questionId">ID of the question</param>
        /// <param name="answerId">The answer for a question. Answer is linked to question</param>
        /// <returns>The created answer</returns>
        Task<CharacterAnswer> GiveAnswerForCharacter(int characterId, int questionId, int answerId);
    }
}
