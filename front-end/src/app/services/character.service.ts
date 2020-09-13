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

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/get-all-characters`);
  }
}
