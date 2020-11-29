import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { QuestionHolder } from 'src/app/models/question-holder.model';

@Component({
  selector: 'app-submit-answer',
  templateUrl: './submit-answer.component.html',
  styleUrls: ['./submit-answer.component.css'],
})
export class SubmitAnswerComponent implements OnInit {
  @Input() holder: QuestionHolder;
  @Output() questionAnswered = new EventEmitter();
  @Input() selectedAnswerId: number;

  constructor() {}

  ngOnInit() {}

  onAnswerSelected() {
    const selectedAnswer = this.holder.answers.find(x => x.id === this.selectedAnswerId);
    this.questionAnswered.emit(selectedAnswer);
  }
}
