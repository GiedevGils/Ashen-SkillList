import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-overview',
  templateUrl: './question-overview.component.html',
  styleUrls: ['./question-overview.component.css'],
})
export class QuestionOverviewComponent implements OnInit {
  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    
  }
}
