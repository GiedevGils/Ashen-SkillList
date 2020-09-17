import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from 'src/config';
import { Answer } from '../models/answer.model';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private baseUrl = `${Config.url}:${Config.port}/api/answers`;

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
    return this.http.put<Answer[]>(
      `${this.baseUrl}/update-answers-bulk`,
      answers
    );
  }

  deleteAnswersBulk(answers: number[]) {
    return this.http.request('delete', `${this.baseUrl}/delete-answers-bulk`, {
      body: { answers },
    });
  }
}
