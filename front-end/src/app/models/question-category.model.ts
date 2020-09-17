import { Question } from './question.model';

export class QuestionCategory {
  id: number;
  description: string;
  isProfessionCategory: boolean;
  questions: Question[];
}
