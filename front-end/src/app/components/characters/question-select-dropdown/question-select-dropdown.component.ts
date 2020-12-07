import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CharacterAnswer } from 'src/app/models/character-answer.model';
import { QuestionCategory } from 'src/app/models/question-category.model';
import { QuestionHolder } from 'src/app/models/question-holder.model';
import { Question } from 'src/app/models/question.model';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionService } from 'src/app/services/question.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-question-select-dropdown',
  templateUrl: './question-select-dropdown.component.html',
  styleUrls: ['./question-select-dropdown.component.css']
})
export class QuestionSelectDropdownComponent implements OnInit {
  @Input() listOfQuestions: QuestionCategory[] = [];
  @Output() questionSelect = new EventEmitter();

  filterInput = new FormControl();
  filteredOptions: Observable<QuestionCategory[]>;
  selectedQuestion: QuestionHolder = null;
  filledInAnswersForQuestion: CharacterAnswer[] = [];
  displayedColumns = ['character', 'rating'];

  constructor() {}

  ngOnInit() {
    this.filteredOptions = this.filterInput.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterGroup(value))
    );
  }

  itemSelected(event: MatAutocompleteSelectedEvent) {
    const categoryDesc: string = event.option.group.label;
    const questionValue: string = event.option.value;

    const chosenCategory = this.listOfQuestions.find(
      (x) => x.description === categoryDesc
    );
    const chosenQuestion = chosenCategory.questions.find(
      (x) => x.description === questionValue
    );

    this.selectedQuestion = {
      answers: chosenQuestion.answers,
      category: chosenCategory,
      question: chosenQuestion
    };

    this.questionSelect.emit(this.selectedQuestion);
  }

  sortData(event) {
    let sortedData;
    if (event.direction === 'asc') {
      sortedData = this.filledInAnswersForQuestion.sort((x, y) => {
        return y.answer.rating - x.answer.rating;
      });
    } else if (event.direction === 'desc') {
      sortedData = this.filledInAnswersForQuestion.sort((x, y) => {
        return x.answer.rating - y.answer.rating;
      });
    } else {
      sortedData = this.filledInAnswersForQuestion;
    }
  }

  // Filter the categories. Returns an array of categories in which the questions are filtered
  private _filterGroup(value: string): QuestionCategory[] {
    if (value) {
      return (
        this.listOfQuestions
          .map((group) => ({
            id: group.id,
            description: group.description,
            questions: this._filter(group.questions, value),
            isProfessionCategory: group.isProfessionCategory
          }))
          // If teh new item made in the map above does not have any questions, hide it
          .filter((group) => group.questions.length > 0)
      );
    }

    return this.listOfQuestions;
  }

  // Check which question description is typed in, and return the filtered questions
  private _filter(opt: Question[], value: string): Question[] {
    const filterValue = value.toLowerCase();

    return opt.filter(
      (item) => item.description.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
