import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryTypeHelper } from 'src/app/enums/cat-type.enum';
import { QuestionCategory } from 'src/app/models/question-category.model';
import { QuestionService } from 'src/app/services/question.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css'],
})
export class AddEditCategoryComponent implements OnInit {
  categoryToEdit: QuestionCategory;
  isUpdate: boolean;

  catName: FormControl;
  catType: FormControl;
  catForm: FormGroup;

  catTypes: { typeId: number; text: string }[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { category: QuestionCategory },
    private questionService: QuestionService,
    private dialogRef: MatDialogRef<AddEditCategoryComponent>,
    private toast: ToastService
  ) {}

  ngOnInit() {
    if (this.data) {
      // If a category is sent with, then it is an edit
      this.categoryToEdit = this.data.category;
      this.isUpdate = true;
    } else {
      // If no data is sent with, it is a create
      this.categoryToEdit = null;
      this.isUpdate = false;
    }

    this.initForm(this.categoryToEdit);

    this.catTypes = CategoryTypeHelper.getArrayOfTypes();
  }

  initForm(data: QuestionCategory) {
    if (data) {
      this.catType = new FormControl(data.type, Validators.required);
      this.catName = new FormControl(data.description, Validators.required);
    } else {
      this.catType = new FormControl(null, Validators.required);
      this.catName = new FormControl('', Validators.required);
    }
    this.catForm = new FormGroup({
      catName: this.catName,
      catType: this.catType,
    });
  }

  update() {
    const newDescription = this.catForm.get('catName').value;
    const newType = this.catForm.get('catType').value;
    this.categoryToEdit.description = newDescription;
    this.categoryToEdit.type = newType;
    this.questionService.updateCategory(this.categoryToEdit).subscribe(
      (res) => {
        this.toast.toastSuccess(`Category updated: ${res.description}`);
        this.dialogRef.close();
      },
      (err) => {
        this.toast.toastError(
          `${err.status} - Something went wrong! Please let Ilthy know!`
        );
      }
    );
  }

  create() {
    const description = this.catForm.get('catName').value;
    const type = this.catForm.get('catType').value;
    this.questionService.createQuestionCategory(description, type).subscribe(
      (res) => {
        this.toast.toastSuccess(
          `The category ${res.description} has been created!`
        );
        this.dialogRef.close(res);
      },
      (err) => {
        this.toast.toastError(
          `${err.status} - Something went wrong! Please let Ilthy know!`
        );
      }
    );
  }
}
