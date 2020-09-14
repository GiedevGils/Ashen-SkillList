import { Component, Input, OnInit } from '@angular/core';
import { QuestionCategory } from 'src/app/models/question-category.model';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.css'],
})
export class SingleQuestionComponent implements OnInit {
  @Input() questionCategory: QuestionCategory;
  displayedColumns = ['questionName', 'answerCount', 'adminButtons'];

  constructor() {}

  ngOnInit() {}
}
