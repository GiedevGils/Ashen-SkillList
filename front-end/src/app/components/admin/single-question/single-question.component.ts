import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionCategory } from 'src/app/models/question-category.model';
import { QuestionService } from 'src/app/services/question.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { ToastService } from 'src/app/services/toast.service';
import { WarningPopupComponent } from '../../shared/warning-popup/warning-popup.component';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.css'],
})
export class SingleQuestionComponent implements OnInit {
  @Input() questionCategory: QuestionCategory;
  displayedColumns = ['questionName', 'answerCount', 'adminButtons'];
  shouldViewBeCompact: boolean;

  @Output() questionsChange = new EventEmitter();

  constructor(
    private toast: ToastService,
    private dialog: MatDialog,
    private questionService: QuestionService,
    private responsive: ResponsiveService
  ) {}

  ngOnInit() {
    this.responsive.viewChange.subscribe((shouldBeCompact) => {
      this.shouldViewBeCompact = shouldBeCompact;
    });
    this.shouldViewBeCompact = this.responsive.shouldViewBeCompact;
  }

  deleteQuestion(qId: number) {
    const dialogRef = this.dialog.open(WarningPopupComponent, {
      data: {
        title: 'Are you sure?',
        text:
          'This will delete the question, and the answers to the questions.<br/><b>This is not reversible.</b>',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.questionService.deleteQuestion(qId).subscribe(
          (_) => {
            this.toast.toastSuccess('The question has been deleted');
            const questionToRemove = this.questionCategory.questions.find(
              (x) => x.id === qId
            );
            const indexOfQuestionToRemove = this.questionCategory.questions.indexOf(
              questionToRemove
            );
            this.questionCategory.questions = this.questionCategory.questions.splice(
              indexOfQuestionToRemove - 1,
              1
            );
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
}
