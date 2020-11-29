import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from 'src/config';
import { Answer } from '../models/answer.model';
import { CharacterAnswer } from '../models/character-answer.model';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private baseUrl = `${Config.url}/api/answers`;

  constructor(private http: HttpClient) {}

  createAnswersBulk(
    questionId: number,
    answers: Answer[]
  ): Observable<Answer[]> {
    return this.http.post<Answer[]>(`${this.baseUrl}/create-answers-bulk`, {
      questionId,
      answers,
    });
  }

  updateAnswersBulk(answers: Answer[]): Observable<Answer[]> {
    return this.http.put<Answer[]>(`${this.baseUrl}/update-answers-bulk`, {
      answers,
    });
  }

  deleteAnswersBulk(answers: number[]) {
    return this.http.request('delete', `${this.baseUrl}/delete-answers-bulk`, {
      body: { answers },
    });
  }

  submitAnswer(body: {
    questionId: number;
    answerId: number;
    characterId: number;
  }) {
    return this.http.post(`${this.baseUrl}/answer`, body);
  }

  getAnswersForQuestion(questionId: number): Observable<CharacterAnswer[]> {
    return this.http.get<CharacterAnswer[]>(
      `${this.baseUrl}/get-answers-for-question/${questionId}`
    );
  }

  getAnswersForCharacter(characterId: number): Observable<CharacterAnswer[]> {
    return this.http.get<CharacterAnswer[]>(
      `${this.baseUrl}/get-answers-for-character/${characterId}`
    );
  }
}
