using SkillListBackEnd.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkillListBackEnd.Repositories.Interfaces
{
    /// <summary>
    /// The repository to deal with anything question related, including the question categories.
    /// </summary>
    public interface IQuestionRepository
    {
        /// <summary>
        /// Create a new question category
        /// </summary>
        /// <param name="cat">The category to create</param>
        /// <returns>The created category</returns>
        Task<QuestionCategory> CreateCategory(QuestionCategory cat);

        /// <summary>
        /// Get all questions, returns them filtered in categories
        /// </summary>
        /// <returns>Returns all questions, including their answers</returns>
        Task<IEnumerable<QuestionCategory>> GetAllQuestions();

        /// <summary>
        /// Update a question category
        /// </summary>
        /// <param name="cat">The category with updated values</param>
        /// <returns>The updated category</returns>
        Task<QuestionCategory> UpdateQuestionCategory(int questionCategory, QuestionCategory cat);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        Task<bool> DeleteQuestionCategory(int categoryId);

        /// <summary>
        /// Create a new question
        /// </summary>
        /// <param name="categoryId">The category to add the question to</param>
        /// <param name="questionToCreate">The question to create</param>
        /// <returns>The created question</returns>
        Task<Question> CreateQuestion(int categoryId, Question questionToCreate);
        
        /// <summary>
        /// Get a single question by its id
        /// </summary>
        /// <param name="questionId">The ID of the question to get</param>
        /// <returns>The question</returns>
        Task<Question> GetSingleQuestion(int questionId);


        /// <summary>
        /// Update a question
        /// </summary>
        /// <param name="questionId">ID of the quesiton to update</param>
        /// <param name="updatedQuestion">The updated question values</param>
        /// <returns></returns>
        Task<Question> UpdateQuestion(int questionId, Question updatedQuestion);

        /// <summary>
        /// Delete a question
        /// </summary>
        /// <param name="questionId">The question to be deleted</param>
        /// <returns>Bool of success</returns>
        Task<bool> DeleteQuestion(int questionId);

    }
}
