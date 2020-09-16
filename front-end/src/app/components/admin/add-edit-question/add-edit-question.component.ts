import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Answer } from 'src/app/models/answer.model';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { ToastService } from 'src/app/services/toast.service';
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
  private updatedAnswers: Answer[] = [];
  private deletedAnswers: Answer[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { question: Question },
    private questionService: QuestionService,
    private dialogRef: MatDialogRef<AddEditCategoryComponent>,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.questionToEdit = this.data.question;
      this.isUpdate = true;
      this.answers = this.questionToEdit.answers;
    } else {
      this.isUpdate = false;
    }

    this.answers.sort((x: Answer, y: Answer) => x.rating - y.rating);

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

    if (this.newAnswers.indexOf(a)) {
      this.newAnswers.splice(this.newAnswers.indexOf(a), 1);
    } else {
      this.deletedAnswers.push(a);
    }
  }

  create() {}

  update() {}
}
