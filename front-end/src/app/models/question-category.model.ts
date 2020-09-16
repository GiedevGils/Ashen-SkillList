import { CategoryType } from '../enums/cat-type.enum';
import { Question } from './question.model';

export class QuestionCategory {
  id: number;
  description: string;
  type: CategoryType;
  questions: Question[];
}
