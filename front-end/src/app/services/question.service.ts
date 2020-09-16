import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from 'src/config';
import { CategoryType } from '../enums/cat-type.enum';
import { QuestionCategory } from '../models/question-category.model';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private baseUrl = `${Config.url}:${Config.port}/api/questions`;

  constructor(private http: HttpClient) {}

  /** GET all questions. Gets categories => questions => answers */
  getAllQuestions(): Observable<QuestionCategory[]> {
    return this.http.get<QuestionCategory[]>(
      `${this.baseUrl}/get-all-questions`
    );
  }

  createQuestionCategory(description: string, type: CategoryType): Observable<QuestionCategory> {
    return this.http.post<QuestionCategory>(`${this.baseUrl}/create-category`, {
      description,
      type
    });
  }

  /** PUT an update to a question category */
  updateCategory(cat: QuestionCategory): Observable<QuestionCategory> {
    return this.http.put<QuestionCategory>(`${this.baseUrl}/update-category`, {
      id: cat.id,
      description: cat.description,
      type: cat.type
    });
  }

  /** DELETE a category */
  deleteCategory(id: number) {
    return this.http.request('delete', `${this.baseUrl}/delete-category`, {
      body: { id },
    });
  }

  /** DELETE a question */
  deleteQuestion(id: number) {
    return this.http.request('delete', `${this.baseUrl}/delete-question`, {
      body: { id },
    });
  }
}
