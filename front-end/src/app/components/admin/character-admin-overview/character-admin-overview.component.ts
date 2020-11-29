import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  selector: 'app-character-admin-overview',
  templateUrl: './character-admin-overview.component.html',
  styleUrls: ['./character-admin-overview.component.css'],
})
export class CharacterAdminOverviewComponent implements OnInit {
  allQuestions: QuestionCategory[];
  filterInput = new FormControl();
  filteredOptions: Observable<QuestionCategory[]>;
  selectedQuestion: QuestionHolder = null;
  filledInAnswersForQuestion: CharacterAnswer[] = [];
  displayedColumns = ['character', 'rating'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSource = new MatTableDataSource(this.filledInAnswersForQuestion);

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    private toast: ToastService
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
    const categoryDesc: string = event.option.group.label;
    const questionValue: string = event.option.value;

    const chosenCategory = this.allQuestions.find(
      (x) => x.description === categoryDesc
    );
    const chosenQuestion = chosenCategory.questions.find(
      (x) => x.description === questionValue
    );

    this.selectedQuestion = {
      answers: chosenQuestion.answers,
      category: chosenCategory,
      question: chosenQuestion,
    };

    this.answerService.getAnswersForQuestion(chosenQuestion.id).subscribe(
      (res) => {
        this.filledInAnswersForQuestion = res.filter((x) => {
          if (chosenCategory.isProfessionCategory) {
            return x.answer.rating > 0;
          } else {
            return true;
          }
        });
        this.dataSource.data = this.filledInAnswersForQuestion;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.toast.toastError(
          `${err.status} - There was an error, please let Ilthy know.`
        );
      }
    );
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

    this.dataSource.data = sortedData;
    this.dataSource.sort = this.sort;
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
