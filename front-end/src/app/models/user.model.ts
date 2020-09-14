import { Character } from './character.model';

export class User {
  id: number;
  name: string;
  code: string;
  isAdmin: boolean;
  characters: Character[];
}
