import { Answer } from './answer.model';
import { QuestionCategory } from './question-category.model';
import { Question } from './question.model';

export interface QuestionHolder {
  question: Question;
  category: QuestionCategory;
  answers: Answer[];
}
