import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryType, CategoryTypeHelper } from 'src/app/enums/cat-type.enum';
import { QuestionCategory } from 'src/app/models/question-category.model';
import { QuestionService } from 'src/app/services/question.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { ToastService } from 'src/app/services/toast.service';
import { WarningPopupComponent } from '../../shared/warning-popup/warning-popup.component';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { AddEditQuestionComponent } from '../add-edit-question/add-edit-question.component';

@Component({
  selector: 'app-question-overview',
  templateUrl: './question-overview.component.html',
  styleUrls: ['./question-overview.component.css'],
})
export class QuestionOverviewComponent implements OnInit {
  readyForTable: boolean;
  questionCategories: QuestionCategory[];
  displayedColumns = ['description', 'numberOfQuestions', 'adminButtons'];
  expandedElement: QuestionCategory | null;
  shouldViewBeCompact: boolean;

  constructor(
    private questionService: QuestionService,
    private dialog: MatDialog,
    private toast: ToastService,
    private responsive: ResponsiveService
  ) {}

  ngOnInit(): void {
    this.getQuestions();
    this.responsive.viewChange.subscribe((shouldBeCompact) => {
      this.shouldViewBeCompact = shouldBeCompact;
    });
    this.shouldViewBeCompact = this.responsive.shouldViewBeCompact;
  }

  deleteCategory(catId: number) {
    const dialogRef = this.dialog.open(WarningPopupComponent, {
      data: {
        title: 'Are you sure?',
        text:
          'This will delete the category, all the questions in the category, and the answers to the questions.<br/><b>This is not reversible.</b>',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.questionService.deleteCategory(catId).subscribe(
          (_) => {
            this.toast.toastSuccess('The category has been deleted');
            const catToRemove = this.questionCategories.find(
              (x) => x.id === catId
            );
            const indexOfItemToRemove = this.questionCategories.indexOf(
              catToRemove
            );
            this.questionCategories.splice(indexOfItemToRemove, 1);
          },
          (err) => {
            this.toast.toastError(
              `${err.status} - Something went wrong! Please let Ilthy know!`
            );
          }
        );
      }
    });
  }

  addCategory() {
    const dialogRef = this.dialog.open(AddEditCategoryComponent);
    dialogRef.afterClosed().subscribe((newCat) => {
      if (!newCat) {
        return;
      } // If newCat is empty, don't push
      if (!this.questionCategories) {
        this.questionCategories = [];
      }
      this.questionCategories.push(newCat);
    });
  }

  addQuestion(c: QuestionCategory) {
    const dialogRef = this.dialog.open(AddEditQuestionComponent, {
      data: { categoryId: c.id },
    });

    dialogRef.afterClosed().subscribe((createdQuestion) => {
      c.questions.push(createdQuestion);
      // for reasons unknown, this is needed to reload the data
      // https://stackoverflow.com/a/50654218
      c.questions = [...c.questions];
    });
  }

  editCategory(cat: QuestionCategory) {
    this.dialog.open(AddEditCategoryComponent, {
      data: { category: cat },
    });
  }

  getQuestions() {
    this.questionService.getAllQuestions().subscribe((res) => {
      this.questionCategories = res;

      // https://stackoverflow.com/a/17387454
      this.questionCategories.sort((x, y) => {
        return x.isProfessionCategory === y.isProfessionCategory ? 0 : x.isProfessionCategory ? -1 : 1;
      });

      this.readyForTable = true;
    });
  }

  filterQuestionsIntoProfs() {
    if (this.questionCategories) {
      return this.questionCategories.filter(
        (x) => x.isProfessionCategory === true
      );
    } else {
      return [];
    }
  }
}
