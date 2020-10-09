import { Answer } from './answer.model';

export class Question {
  id: number;
  description: string;
  answers: Answer[];
}
