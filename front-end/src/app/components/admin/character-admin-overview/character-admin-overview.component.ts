import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteActivatedEvent,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { QuestionCategory } from 'src/app/models/question-category.model';
import { QuestionHolder } from 'src/app/models/question-holder.model';
import { Question } from 'src/app/models/question.model';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-character-admin-overview',
  templateUrl: './character-admin-overview.component.html',
  styleUrls: ['./character-admin-overview.component.css'],
})
export class CharacterAdminOverviewComponent implements OnInit {
  allQuestions: QuestionCategory[];
  filterInput = new FormControl();
  filteredOptions: Observable<QuestionCategory[]>;

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService
  ) {}

  ngOnInit() {
    this.questionService.getAllQuestions().subscribe((res) => {
      this.allQuestions = res;

      this.filteredOptions = this.filterInput.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterGroup(value))
      );
    });
  }

  itemSelected(event: MatAutocompleteSelectedEvent) {
    const value: string = event.option.value;
    // TODO, filter correctly so that the question is returned
    const filtered = this.allQuestions.filter((cat) => {
      cat.questions.find((q) => {
        return q.description === value;
      });
    });
    console.log(filtered);
  }

  // Filter the categories. Returns an array of categories in which the questions are filtered
  private _filterGroup(value: string): QuestionCategory[] {
    if (value) {
      return (
        this.allQuestions
          .map((group) => ({
            id: group.id,
            description: group.description,
            questions: this._filter(group.questions, value),
            isProfessionCategory: group.isProfessionCategory,
          }))
          // If teh new item made in the map above does not have any questions, hide it
          .filter((group) => group.questions.length > 0)
      );
    }

    return this.allQuestions;
  }

  // Check which question description is typed in, and return the filtered questions
  private _filter(opt: Question[], value: string): Question[] {
    const filterValue = value.toLowerCase();

    return opt.filter(
      (item) => item.description.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
