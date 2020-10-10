import { Answer } from './answer.model';
import { Character } from './character.model';
import { Question } from './question.model';

export class CharacterAnswer {
  question: Question;
  character: Character;
  answer: Answer;
}
