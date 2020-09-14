import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from 'src/config';
import { QuestionCategory } from '../models/question-category.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private baseUrl = `${Config.url}:${Config.port}/api/questions`;

  constructor(private http: HttpClient) {}

  getAllQuestions(): Observable<QuestionCategory[]> {
    return this.http.get<QuestionCategory[]>(`${this.baseUrl}/get-all-questions`);
  }
}
