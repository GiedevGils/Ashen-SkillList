import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionCategory } from 'src/app/models/question-category.model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-overview',
  templateUrl: './question-overview.component.html',
  styleUrls: ['./question-overview.component.css']
})
export class QuestionOverviewComponent implements OnInit {
  readyForTable: boolean;
  questionCategories: QuestionCategory[];
  displayedColumns = ['description', 'numberOfQuestions', 'adminButtons'];
  expandedElement: QuestionCategory | null;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getAllQuestions().subscribe((res) => {
      this.questionCategories = res;
      this.readyForTable = true;
    });
  }
}
