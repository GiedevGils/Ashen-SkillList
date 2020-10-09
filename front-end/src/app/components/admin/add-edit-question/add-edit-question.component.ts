import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { EventEmitter } from 'protractor';
import { forkJoin, Subject } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { Answer } from 'src/app/models/answer.model';
import { Question } from 'src/app/models/question.model';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionService } from 'src/app/services/question.service';
import { ToastService } from 'src/app/services/toast.service';
import { WarningPopupComponent } from '../../shared/warning-popup/warning-popup.component';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';

@Component({
  selector: 'app-add-edit-question',
  templateUrl: './add-edit-question.component.html',
  styleUrls: ['./add-edit-question.component.css'],
})
export class AddEditQuestionComponent implements OnInit {
  questionToEdit: Question;

  isUpdate: boolean;

  qName: FormControl;
  qRating: FormControl;
  qForm: FormGroup;

  answers: Answer[] = [
    { rating: 0, description: 'Zero experience with this skill' },
    { rating: 1, description: 'Has basic theoretical knowledge' },
    {
      rating: 2,
      description: 'Knows how to apply the advanced theoretical knowledge',
    },
    { rating: 3, description: 'Has advanced theoretical knowledge' },
    {
      rating: 4,
      description: 'Knows how to apply the advanced theoretical knowledge',
    },
    { rating: 5, description: 'Has achieved mastery in this skill' },
  ];

  private newAnswers: Answer[] = [];
  private deletedAnswers: Answer[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { question: Question; categoryId: number },
    private questionService: QuestionService,
    private answerService: AnswerService,
    private dialogRef: MatDialogRef<AddEditCategoryComponent>,
    private toast: ToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.data.question) {
      this.questionToEdit = this.data.question;
      this.isUpdate = true;
      this.answers = JSON.parse(JSON.stringify(this.questionToEdit.answers)); // Fastest, but far from the best way to do a value copy
    } else {
      this.isUpdate = false;
    }

    this.initForm();
  }

  initForm() {
    if (this.questionToEdit) {
      this.qName = new FormControl(
        this.questionToEdit.description,
        Validators.required
      );
    } else {
      this.qName = new FormControl('', Validators.required);
    }

    this.qForm = new FormGroup({
      qName: this.qName,
    });
  }

  addRow() {
    const newAnswer = { rating: -1, description: '' };
    this.answers.push(newAnswer);
    this.answers.sort((x) => x.rating);
    this.newAnswers.push(newAnswer);
  }

  removeRow(a: Answer) {
    this.answers.splice(this.answers.indexOf(a), 1);

    // If the answer is a new one, remove it from the new one
    if (this.newAnswers.includes(a)) {
      this.newAnswers.splice(this.newAnswers.indexOf(a), 1);
    } else {
      // If the answer is not new, add it to the deleted answers
      this.deletedAnswers.push(a);
    }
  }

  editRow(a: Answer) {}

  create() {
    const description = this.qForm.get('qName').value;
    let createdQuestion: Question;
    // Create the question
    this.questionService
      .createQuestion(this.data.categoryId, description)
      .pipe(
        concatMap((question) => {
          createdQuestion = question;
          // When the question has been created, create the answers for the question
          return this.answerService.createAnswersBulk(
            question.id,
            this.answers
          );
        })
      )
      .subscribe(
        // When the ansewrs have bene created, inform the users
        (res) => {
          createdQuestion.answers = res;
          this.toast.toastSuccess(
            `${res.length} answers were created to the question ${description}`
          );
          this.dialogRef.close(createdQuestion);
        },
        (err) => {
          this.toast.toastError(
            `${err.status} - Something went wrong. Please let Ilthy know!`
          );
        }
      );
  }

  update() {
    // New answers don't need to be updated, they need to be created
    const answersToUpdate = this.answers.filter(
      (x) => !this.newAnswers.includes(x)
    );

    const canContinue = new Subject();

    // Once the below confirmation popup has been accepted, send out the requests
    canContinue.subscribe((res) => {
      // It should only receive true, but just to be sure we do a check here
      if (!res) {
        return;
      }

      forkJoin({
        newAnswers: this.answerService.createAnswersBulk(
          this.questionToEdit.id,
          this.newAnswers
        ),
        updatedAnswers: this.answerService.updateAnswersBulk(answersToUpdate),
        deletedAnswers: this.answerService.deleteAnswersBulk(
          this.deletedAnswers.map((x) => x.id)
        ),
      })
        .pipe(
          concatMap((r) => {
            return this.questionService.getSingleQuestion(
              this.questionToEdit.id
            );
          })
        )
        .subscribe(
          (res2) => {
            this.questionToEdit.answers = res2.answers.sort(
              (x, y) => x.rating - y.rating
            );
            this.toast.toastSuccess(`The question has been edited.`);
            this.dialogRef.close();
          },
          (err) => {
            console.warn(err);
            this.toast.toastError(
              `${err.status} - Something went wrong. Please let Ilthy know.`
            );
          }
        );
    });

    // If any answers have been deleted, explain to the user that they will be removed from characters
    if (this.deletedAnswers.length > 0) {
      const dialogRef = this.dialog.open(WarningPopupComponent, {
        data: {
          title: 'Delete answers to this question?',
          text:
            'You have deleted answers to this question. This means that the characters that have selected this answer will no longer have an answer selected for this question.<br/><b>This is not reversible</b>',
        },
      });
      dialogRef.afterClosed().subscribe((res) => {
        // If the user pressed "I understand", the requests can be sent
        if (res) {
          canContinue.next(true);
        } else {
          return;
        }
      });
    } else {
      // If there is nothing in the deleted array, the request can be sent
      canContinue.next(true);
    }
  }

  sortAnswers() {
    this.answers.sort((x: Answer, y: Answer) => x.rating - y.rating);
  }
}
