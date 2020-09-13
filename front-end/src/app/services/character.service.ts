import { Injectable } from '@angular/core';
import { Config } from 'src/config';
import { HttpClient } from '@angular/common/http';
import { Character } from '../models/character.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private baseUrl = `${Config.url}:${Config.port}/api/characters`;

  constructor(private http: HttpClient) {}

  /** GET all characters from the API */
  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/get-all-characters`);
  }

  /** POST a new character to the API */
  addCharacter(
    characterName: string,
    squad: string,
    profession: string
  ): Observable<Character> {
    return this.http.post<Character>(`${this.baseUrl}/create-character`, {
      characterName,
      squad,
      profession,
    });
  }

  /** Delete a character by its ID
   * This had to be done by http.request('delete', `url`, `options`) because normal delete requests don't like a body
   * https://stackoverflow.com/questions/54017088
   */
  deleteCharacter(id: number) {
    return this.http.request('delete', `${this.baseUrl}/delete-character`, {
      body: { id },
    });
  }
}
