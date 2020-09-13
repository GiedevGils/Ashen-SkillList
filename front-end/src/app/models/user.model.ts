import { Character } from './character.model';

export class User {
  name: string;
  code: string;
  isAdmin: boolean;
  characters: Character[];
}
